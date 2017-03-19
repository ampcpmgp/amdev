fse = require("fs-extra")
_ = require("lodash")
webpack = require("webpack")
fs =require("fs")
path = require("path")

module.exports = class Compiler
  @baseOption:
    output:
      path: path.resolve()
      filename: "[name].js"
      libraryTarget: "commonjs2"
    module:
      loaders: [
        {test: /\.coffee$/, loader: "coffee-loader"}
        {test: /\.cson$/, loader: "cson-loader"}
        {test: /\.es$/, loader: "babel", query: {presets: ["es2015", "stage-0"]}}
        {test: /\.json$/, loader: "json"}
        {test: /\.ya?ml$/, loader: "json!yaml-loader"}
        {test: /\.tag$/, exclude: /node_modules/, loader: "riot-tag-loader"}
        {test: /\.raw$/, loader: "raw-loader"}
      ]
    devtool: "cheap-module-eval-source-map"
    resolve:
      modulesDirectories: ["modules", "node_modules"]
      extensions: [".coffee", ".tag", ".es", ".js", ""]
  @nodeModules: do =>
    retObj = {}
    fs.readdirSync('node_modules')
      .filter((x) =>
        ['.bin'].indexOf(x) is -1
        ).forEach((mod) =>
          retObj[mod] = 'commonjs ' + mod
          )
    retObj
  @checkNum: 0
  @_config: =>
    @electronOption = _.cloneDeep(@baseOption)
    @electronOption.target = "atom"
    @electronOption.externals = @nodeModules
    @nodeOption = _.cloneDeep(@baseOption)
    @nodeOption.target = "node"
    @nodeOption.externals = @nodeModules
    @browserOption = _.cloneDeep(@baseOption)
    @browserOption.target = "web"
    @browserOption.module.preLoaders = []
    @browserOption.output.library = "[name]"
    @browserOption.output.libraryTarget = "umd"
  @run: () =>
    @setFilePath()
    delete @electronOption.devtool
    delete @nodeOption.devtool
    delete @browserOption.devtool
    @electronStart = => 0
    webpack(@electronOption).run((err, stats) => @callback(err,stats)) if @electronOption.entry
    webpack(@nodeOption).run((err, stats) => @callback(err,stats)) if @nodeOption.entry
    webpack(@browserOption).run((err, stats) => @callback(err,stats)) if @browserOption.entry
  @start: () =>
    @setFilePath()
    webpack(@electronOption).watch({}, (err, stats) => @callback(err,stats)) if @electronOption.entry
    webpack(@nodeOption).watch({}, (err, stats) => @callback(err,stats)) if @nodeOption.entry
    webpack(@browserOption).watch({}, (err, stats) => @callback(err,stats)) if @browserOption.entry
  @setFilePath: =>
    @electronOption.entry = {}
    @nodeOption.entry = {}
    @browserOption.entry = {}
    # TODO: 開発に必要なファイル軍だけをコンパイルする方針に変えたい
    require("glob").sync(
      "./**/@(electron|app)/*.@(coffee|es)"
      , {ignore: "./**/@(node_modules)/**"}
    )
    .forEach((filepath) => @electronOption.entry[filepath.replace(/\.(coffee|es)$/, "").replace(/^\.\//, "")] = [filepath])
    require("glob").sync(
      "./**/node/*.@(coffee|es)"
      , {ignore: "./**/@(node_modules)/**"}
    )
    .forEach((filepath) => @nodeOption.entry[filepath.replace(/\.(coffee|es)$/, "").replace(/^\.\//, "")] = [filepath])
    require("glob").sync(
      "./**/@(web|browser)/*.@(coffee|es)"
      , {ignore: "./**/@(node_modules)/**"}
    )
    .forEach((filepath) => @browserOption.entry[filepath.replace(/\.(coffee|es)$/, "").replace(/^\.\//, "")] = [filepath])
  @callback: (err, stats) =>
    return console.log(err) if (err)
    jsonStats = stats.toJson()
    console.log stats.toString(
      colors: true
      assets: false
      version: false
      hash: false
      timings: false
      chunkModules: false
      )
    # TODO: コンパイル数をチェックする以外の方法にしたい
    @electronStart() if (++@checkNum is 3)
  @electronStart: =>
    cmd = fse.readJsonSync("package.json").scripts.electron
    require("child_process").exec(cmd)

Compiler._config()

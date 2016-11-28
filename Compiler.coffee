fs =require("fs")
path = require("path")
fse = require("fs-extra")
_ = require("lodash")
webpack = require("webpack")

module.exports = class Compiler
  @baseOption:
    output:
      path: path.resolve()
      filename: "[name].js"
      libraryTarget: "commonjs2"
    module:
      loaders: [
        {test: /\.coffee$/, loader: "coffee"}
        {test: /\.cson$/, loader: "cson-loader"}
        {test: /\.html$/, loader: "html"}
        {test: /\.json$/, loader: "json"}
        {test: /\.ya?ml$/, loader: "json!yaml"}
      ]
      postLoaders: [
        {test: /\.src\.coffee$/, loader: "raw"}
      ]
    devtool: "cheap-module-eval-source-map"
    resolve:
      modulesDirectories: ["modules", "node_modules"]
      extensions: [".coffee", ".tag", ".js", ""]
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
    @electronOption.module.loaders.push({test: /\.tag$/, loader: "riotjs-loader", query: {type: 'none' }})
    @nodeOption = _.cloneDeep(@baseOption)
    @nodeOption.target = "node"
    @nodeOption.externals = @nodeModules
    @browserOption = _.cloneDeep(@baseOption)
    @browserOption.target = "web"
    @browserOption.module.preLoaders = []
    @browserOption.output.library = "[name]"
    @browserOption.output.libraryTarget = "umd"
    @browserOption.module.loaders.push({test: /\.tag$/, loader: "riotjs-loader", query: {type: 'none' }})
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
      "./**/@(electron|app)/test/*.coffee"
      , {ignore: "./**/@(node_modules)/**"}
    )
    .forEach((filepath) => @electronOption.entry[filepath.replace(/\.coffee$/, "").replace(/^\.\//, "")] = [filepath])
    require("glob").sync(
      "./**/node/test/*.coffee"
      , {ignore: "./**/@(node_modules)/**"}
    )
    .forEach((filepath) => @nodeOption.entry[filepath.replace(/\.coffee$/, "").replace(/^\.\//, "")] = [filepath])
    require("glob").sync(
      "./**/web/*.coffee"
      , {ignore: "./**/@(node_modules)/**"}
    ).concat(
      require("glob").sync(
        "./**/browser/*.coffee"
        , {ignore: "./**/@(node_modules)/**"}
      )
    )
    .forEach((filepath) => @browserOption.entry[filepath.replace(/\.coffee$/, "").replace(/^\.\//, "")] = [filepath])
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

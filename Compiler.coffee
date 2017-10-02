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
      rules: [
        {test: /\.coffee$/, use: {loader: "coffee-loader"}}
        {test: /\.cson$/,  use: {loader: "cson-loader"}}
        {test: /\.es$/, use: {loader: "babel-loader", query: {presets: ["es2015", "stage-0"]}}}
        {test: /\.json$/, use: {loader: "json-loader"}}
        {test: /\.ya?ml$/,  use: {loader: "yml-loader"}}
        {test: /\.tag\.html$/,  use: {loader: "riot-tag-loader"}}
        {test: /\.raw$/,  use: {loader: "raw-loader"}}
      ]
    devtool: "cheap-module-eval-source-map"
    resolve:
      modules: ["modules", "node_modules"]
      extensions: [".coffee", ".tag.html", ".es", ".js"]
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
    @browserOption = _.cloneDeep(@baseOption)
    @browserOption.target = "web"
    @browserOption.output.library = "[name]"
    @browserOption.output.libraryTarget = "umd"
  @run: () =>
    @setFilePath()
    delete @electronOption.devtool
    delete @browserOption.devtool
    @electronStart = => 0
    webpack(@electronOption).run((err, stats) => @callback(err,stats)) if @electronOption.entry
    webpack(@browserOption).run((err, stats) => @callback(err,stats)) if @browserOption.entry
  @start: () =>
    @setFilePath()
    webpack(@electronOption).watch({}, (err, stats) => @callback(err,stats)) if @electronOption.entry
    webpack(@browserOption).watch({}, (err, stats) => @callback(err,stats)) if @browserOption.entry
  @setFilePath: =>
    @electronOption.entry = {}
    @browserOption.entry = {}
    # TODO: 開発に必要なファイル軍だけをコンパイルする方針に変えたい
    require("glob").sync(
      "./**/{,.*/**}/{electron,app}/*.{coffee,es}"
      , {ignore: "./**/{,.*/**}/node_modules/**"}
    ).forEach((filepath) => @electronOption.entry[filepath.replace(/\.(coffee|es)$/, "").replace(/^\.\//, "")] = [filepath])
    require("glob").sync(
      "./**/{,.*/**}/{web,browser}/*.{coffee,es}"
      , {ignore: "./**/{,.*/**}/node_modules/**"}
    ).forEach((filepath) => @browserOption.entry[filepath.replace(/\.(coffee|es)$/, "").replace(/^\.\//, "")] = [filepath])
  @callback: (err, stats) =>
    return console.log(err) if (err)
    console.log stats.toString(
      colors: true
      assets: false
      version: false
      hash: false
      timings: false
      chunkModules: false
      )
    # TODO: コンパイル数をチェックする以外の方法にしたい
    @electronStart() if (++@checkNum is 2)
  @electronStart: =>
    cmd = fse.readJsonSync("package.json").scripts.electron
    require("child_process").exec(cmd)

Compiler._config()

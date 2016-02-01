# TODO: templateと共通の部分は共有化する
fs =require("fs")
fse = require("fs-extra")
path = require("path")
webpack = require("webpack")
_ = require("underscore")

module.exports = class Base
  nodeModules: {}
  checkNum: 0
  baseOption:
    output:
      path: path.resolve()
      filename: "[name].js"
    module:
      loaders: [
        {test: /\.coffee$/, loader: "coffee-loader"}
      ]
    devtool: "cheap-module-eval-source-map"
    resolve:
      modulesDirectories: ["am_modules", "node_modules"]
      extensions: [".coffee", ".js", ""]
  init: =>
    #node_moduelsを読み込まないよう設定
    fs.readdirSync('node_modules')
      .filter((x) =>
        ['.bin'].indexOf(x) is -1
        ).forEach((mod) =>
          @nodeModules[mod] = 'commonjs ' + mod
          )
  start: =>
    @init()
    @config()
    @electronCompiler = webpack(@electronOption).watch({}, (err, stats) => @callback(err,stats))
    @nodeCompiler = webpack(@nodeOption).watch({}, (err, stats) => @callback(err,stats))
    @browserCompiler = webpack(@browserOption).watch({}, (err, stats) => @callback(err,stats))
  config: => #am-devenでの設定
    @electronOption = _.clone(@baseOption)
    @electronOption.target = "atom"
    @electronOption.externals = @nodeModules
    @electronOption.entry =
      "browser/.build/start": "./browser/start.coffee"
      "app/.build/preload": "./app/preload.coffee"
      "app/.build/electron": "./app/electron.coffee"
    @nodeOption = _.clone(@baseOption)
    @nodeOption.target = "node"
    @nodeOption.externals = @nodeModules
    @nodeOption.entry =
      "app/.build/server": "./app/server.coffee"
    @browserOption = _.clone(@baseOption)
    @browserOption.target = "web"
    @browserOption.entry =
      "web/.build/client": "./web/client.coffee"
  electronStart: =>
    cmd = fse.readJsonSync("package.json").scripts.electron
    require("child_process").exec(cmd)
  callback: (err, stats) =>
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
    return if(jsonStats.errors.length > 0)
    @electronStart() if (++@checkNum is 3)

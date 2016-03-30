fs =require("fs")
fse = require("fs-extra")
path = require("path")
webpack = require("webpack")
_ = require("lodash")

module.exports = class Base
  nodeModules: {}
  checkNum: 0
  baseOption:
    output:
      path: path.resolve()
      filename: "[name].js"
    module:
      loaders: [
        {test: /\.coffee$/, loader: "coffee"}
        {test: /\.cson$/, loader: "cson-loader"}
        {test: /\.html$/, loader: "html"}
        {test: /\.json$/, loader: "json"}
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
  config: =>
    @electronOption = _.cloneDeep(@baseOption)
    @electronOption.target = "atom"
    @electronOption.externals = @nodeModules
    @electronOption.entry =
      "browser/.build/start": "./browser/test/start.coffee"
      "app/.build/preload": "./app/test/preload.coffee"
      "app/.build/electron": "./app/test/electron.coffee"
    @nodeOption = _.cloneDeep(@baseOption)
    @nodeOption.target = "node"
    @nodeOption.externals = @nodeModules
    @nodeOption.entry =
      "app/.build/server": "./app/test/server.coffee"
    @browserOption = _.cloneDeep(@baseOption)
    @browserOption.target = "web"
    @browserOption.module.preLoaders = []
    @browserOption.module.preLoaders.push({test: /\.tag$/, loader: "riotjs-loader", query: {type: 'none' }})
    @browserOption.module.loaders.push({test: /\.js$|\.tag$/, exclude: /node_modules/, loader: 'babel-loader' })
    @browserOption.plugins = [
      new webpack.ProvidePlugin(
        riot: 'riot'
      )
    ]
    @browserOption.entry =
      "web/.build/client": "./web/test/client.coffee"
  compile: =>
    @electronStart = =>
    @init()
    @config()
    @electronCompiler = webpack(@electronOption).run((err, stats) => @callback(err,stats))
    @nodeCompiler = webpack(@nodeOption).run((err, stats) => @callback(err,stats))
    @browserCompiler = webpack(@browserOption).run((err, stats) => @callback(err,stats))
  start: =>
    @init()
    @config()
    @electronCompiler = webpack(@electronOption).watch({}, (err, stats) => @callback(err,stats))
    @nodeCompiler = webpack(@nodeOption).watch({}, (err, stats) => @callback(err,stats))
    @browserCompiler = webpack(@browserOption).watch({}, (err, stats) => @callback(err,stats))
  compileModule: (dir, callback) => #am-devenでの設定
    @config()
    option = _.cloneDeep(@browserOption)
    moduleDir = "am_modules/#{dir}"
    option.resolve.modulesDirectories.unshift("#{moduleDir}/node_modules")
    files = fs.readdirSync("#{moduleDir}")
    option.entry = {}
    coffeeFiles = (file for file in files when file.match(/\.coffee$/))
    option.entry["#{moduleDir}/#{coffeFile.replace(/\.coffee/, '')}"] = "./#{moduleDir}/#{coffeFile}" for coffeFile in coffeeFiles
    delete option.devtool
    webpack(option).run(=> callback())
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

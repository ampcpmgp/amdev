fs =require("fs")
path = require("path")
webpack = require("webpack")
_ = require("lodash")

module.exports = class Base
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
  nodeModules: do =>
    retObj = {}
    fs.readdirSync('node_modules')
      .filter((x) =>
        ['.bin'].indexOf(x) is -1
        ).forEach((mod) =>
          retObj[mod] = 'commonjs ' + mod
          )
    retObj
  _config: =>
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
    @browserOption.module.loaders.push({test: /\.tag$/, loader: "riotjs-loader", query: {type: 'none' }})
  compile: =>
    webpack(@electronOption).run((err, stats) => @callback(err,stats)) if @electronOption.entry
    webpack(@nodeOption).run((err, stats) => @callback(err,stats)) if @nodeOption.entry
    webpack(@browserOption).run((err, stats) => @callback(err,stats)) if @browserOption.entry
  start: =>
    webpack(@electronOption).watch({}, (err, stats) => @callback(err,stats)) if @electronOption.entry
    webpack(@nodeOption).watch({}, (err, stats) => @callback(err,stats)) if @nodeOption.entry
    webpack(@browserOption).watch({}, (err, stats) => @callback(err,stats)) if @browserOption.entry
  compileModule: (dir, callback) => #am-devenでの設定
    option = _.cloneDeep(@browserOption)
    moduleDir = "am_modules/#{dir}"
    option.resolve.modulesDirectories.unshift("#{moduleDir}/node_modules")
    files = fs.readdirSync(moduleDir)
    option.entry = {}
    coffeeFiles = (file for file in files when file.match(/\.coffee$/))
    option.entry["#{moduleDir}/#{coffeeFile.replace(/\.coffee/, '')}"] = "./#{moduleDir}/#{coffeeFile}" for coffeeFile in coffeeFiles
    delete option.devtool
    webpack(option).run(=> callback())
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

  Base::_config()

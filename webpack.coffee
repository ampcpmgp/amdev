fs =require("fs")
path = require("path")
webpack = require("webpack")
_ = require("underscore")

#option
nodeModules = {}
fs.readdirSync('node_modules')
  .filter((x) =>
    ['.bin'].indexOf(x) is -1
  ).forEach((mod) =>
    nodeModules[mod] = 'commonjs ' + mod
  )

baseOption =
  output:
    path: path.resolve()
    filename: "[name].js"
  module:
    loaders: [
      {test: /\.coffee$/, loader: "coffee-loader"}
    ]
  devtool: "cheap-module-eval-source-map" #
  resolve:
    modulesDirectories: ["_node_modules", "node_modules"]
    extensions: ["", ".webpack.js", ".web.js", ".js", ".coffee"]

electronOption = _.clone(baseOption)
electronOption.target = "electron"
electronOption.externals = nodeModules
electronOption.entry =
  "browser/build/start": "./browser/src/start.coffee"
  "app/build/preload": "./app/src/preload.coffee"
nodeOption = _.clone(baseOption)
nodeOption.target = "electron"
nodeOption.externals = nodeModules
nodeOption.entry =
  "app/build/server": "./app/src/server.coffee"
webOption = _.clone(baseOption)
webOption.target = "electron"
webOption.entry =
  "web/build/client": "./web/src/client.coffee"

#compiler
callback = (err, stats) =>
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
  # if(jsonStats.warnings.length > 0)
module.exports = [
  compiler = webpack(electronOption)
  nodeCompiler = webpack(nodeOption)
  webOption = webpack(webOption)
]
compiler.watch({},callback)
nodeCompiler.watch({},callback)
webOption.watch({},callback)

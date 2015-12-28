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
    modulesDirectories: ["node_modules"]
    extensions: ["", ".js", ".coffee"]

electronOption = _.clone(baseOption)
electronOption.target = "atom"
electronOption.externals = nodeModules
# TODO: entryは外側から設定可能にする - Browser側とは連携する必要もある
electronOption.entry =
  "browser/.build/start": "./browser/start.coffee"
  "app/.build/preload": "./app/preload.coffee"
  "app/.build/init": "./app/init.coffee"
nodeOption = _.clone(baseOption)
nodeOption.target = "node"
nodeOption.externals = nodeModules
nodeOption.entry =
  "app/.build/server": "./app/server.coffee"
browserOption = _.clone(baseOption)
browserOption.target = "web"
browserOption.entry =
  "web/.build/client": "./web/client.coffee"

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
module.exports =
  _callback: callback
  electronCompiler: webpack(electronOption)
  nodeCompiler: webpack(nodeOption)
  browserCompiler: webpack(browserOption)

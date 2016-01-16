# TODO: templateと共通の部分は共有化する
fs =require("fs")
fse = require("fs-extra")
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
    extensions: ["", ".coffee", ".js"]

electronOption = _.clone(baseOption)
electronOption.target = "atom"
electronOption.externals = nodeModules
# TODO: entryは外側から設定可能にする - Browser側とは連携する必要もある
electronOption.entry =
  "browser/.build/start": "./browser/start.coffee"
  "app/.build/preload": "./app/preload.coffee"
  "app/.build/electron": "./app/electron.coffee"
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
# TODO: おいおい、全ファイルコンパイル済み後、実行に変える
start = () =>
  console.log 1
  cmd = fse.readJsonSync("package.json").scripts.electron
  require("child_process").exec(cmd)
checkNum = 0
check = =>
  start() if (++checkNum is 3)
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
  check()
module.exports =
  _callback: callback
  electronCompiler: webpack(electronOption)
  nodeCompiler: webpack(nodeOption)
  browserCompiler: webpack(browserOption)

webpack = require("webpack")
path = process.cwd()

compiler = webpack(
  entry:
    "browser/build/start": "./browser/start.coffee"
  output:
    path: path
    filename: "[name].js"
  module:
    loaders: [
      {test: /\.coffee$/, loader: "coffee-loader"}
      {test: /\.json$/, loader: "json-loader"}
      {test: /is_js/, loader: "imports?define=>undefined"}
    ]
  target: "electron",
  devtool: "inline-source-map"
  resolve:
    modulesDirectories: ["_node_modules", "node_modules"]
    extensions: ["", ".webpack.js", ".web.js", ".js", ".coffee"]
  plugins: [
    new webpack.IgnorePlugin(/bin\/coffee$/)
  ]
)
compiler.watch(
  aggregateTimeout: 300
  poll: true,
  (err, stats) =>
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
)

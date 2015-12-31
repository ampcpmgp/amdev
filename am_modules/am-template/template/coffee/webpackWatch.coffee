fse = require("fs-extra")
webpackObj = require("./webpack.base.coffee")

# TODO: おいおい、全ファイルコンパイル済み後、実行に変える
browserCompileCallback = (err, stats) =>
  webpackObj._callback(err, stats)
  cmd = fse.readJsonSync("package.json").scripts.electron
  require("child_process").exec(cmd)

webpackObj.electronCompiler.watch({}, webpackObj._callback)
webpackObj.nodeCompiler.watch({}, webpackObj._callback)
webpackObj.browserCompiler.watch({}, browserCompileCallback)

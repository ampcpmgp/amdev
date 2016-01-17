webpackObj = require("./webpack.base.coffee")

webpackObj.electronCompiler.watch({}, webpackObj._callback)
webpackObj.nodeCompiler.watch({}, webpackObj._callback)
webpackObj.browserCompiler.watch({}, webpackObj._callback)

webpackObj = require("./webpack.base.coffee")

webpackObj.electronCompiler.run(webpackObj._callback)
webpackObj.nodeCompiler.run(webpackObj._callback)
webpackObj.browserCompiler.run(webpackObj._callback)

_ = require("lodash")
webpack = require("webpack")

class Compiler extends require("./am_modules/am-compiler")
  start: =>
    #am-lunch-test
    @lunchOption = _.cloneDeep(@baseOption)
    @lunchOption.target = "web"
    @lunchOption.module.loaders.push({test: /\.tag$/, loader: "riotjs-loader", query: {type: 'none' }})
    @lunchOption.entry =
      "./am_modules/am-lunch-test/src/dev": "./am_modules/am-lunch-test/src/dev.coffee"
      "./am_modules/am-lunch-test/test/web/test": "./am_modules/am-lunch-test/test/test.coffee"
    delete @lunchOption.devtool
    super()
    webpack(@lunchOption).watch({}, (err, stats) => @callback(err,stats))
require("./am_modules/am-template/coffee/compile")(Compiler)

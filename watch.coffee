_ = require("lodash")
webpack = require("webpack")

# TODO: webpackビルド後に生jsを読み込んでいる。スマートなパイプラインを考えたい。
class Compiler extends require("./am_modules/am-compiler/Base.coffee")
  start: =>
    #am-lunch-test
    @lunchOption = _.cloneDeep(@browserOption)
    @lunchOption.entry =
      "./am_modules/am-lunch-test/browser/dev": "./am_modules/am-lunch-test/src/dev.coffee"
    delete @lunchOption.devtool
    super()
    webpack(@lunchOption).watch({}, (err, stats) => @callback(err,stats))
require("./am_modules/am-template/coffee/compile")(Compiler)

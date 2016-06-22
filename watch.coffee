class Compiler extends require("./am_modules/am-compiler/Base.coffee")
  start: =>
    @browserOption.entry["./am_modules/am-lunch-test/browser/dev"] = "./am_modules/am-lunch-test/browser/dev.coffee"
    super()
require("./am_modules/am-template/coffee/compile")(Compiler)

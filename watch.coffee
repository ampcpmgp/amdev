class Compiler extends require("./am_modules/am-compiler")
  start: =>
    #am-lunch-test
    @browserOption.entry["./am_modules/am-lunch-test/src/dev"] = "./am_modules/am-lunch-test/src/dev.coffee"
    @browserOption.entry["./am_modules/am-lunch-test/test/web/test"] = "./am_modules/am-lunch-test/test/test.coffee"
    super()
require("./am_modules/am-template/coffee/compile")(Compiler)

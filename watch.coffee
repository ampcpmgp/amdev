class Compiler extends require("./modules/am-compiler/Base.coffee")
  start: =>
    @browserOption.entry["./modules/am-lunch-test/browser/dev"] = "./modules/am-lunch-test/browser/dev.coffee"
    super()
require("./modules/am-template/coffee/compile")(Compiler)

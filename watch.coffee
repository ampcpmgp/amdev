class Compiler extends require("./modules/am-compiler/Base.coffee")
  start: =>
    @browserOption.entry["./modules/am-lunch-time/browser/dev"] = "./modules/am-lunch-time/browser/dev.coffee"
    super()
require("./modules/am-template/coffee/compile")(Compiler)

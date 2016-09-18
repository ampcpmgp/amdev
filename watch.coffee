class Compiler extends require("./modules/am-compiler/Base.coffee")
  start: =>
    @browserOption.entry["./modules/am-coffee-time/browser/dev"] = "./modules/am-coffee-time/browser/dev.coffee"
    super()
require("./modules/am-template/coffee/compile")(Compiler)

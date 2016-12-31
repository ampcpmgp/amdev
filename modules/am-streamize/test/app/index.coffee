fs = require("fs")

parser = require("am-streamize/parser")

require("am-coffee-time/browser/Test").start(
  simple: =>
    flow = require("raw!./simple.flow")
    json = require("./simple.json")
    result = parser(flow)
    console.assert(JSON.stringify(result) is JSON.stringify(json), "simple flow is not same")
)

console.info("finished")

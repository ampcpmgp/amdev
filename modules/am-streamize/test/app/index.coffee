fs = require("fs")

parser = require("am-streamize/parser")

require("am-coffee-time/browser/Test").start(
  simple: =>
    flow = require("raw!./simple.flow")
    parser(flow)
)

console.info("finished")

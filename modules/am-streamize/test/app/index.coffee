fs = require("fs")
assert = require("assert")

parser = require("am-streamize/parser")

require("am-coffee-time/browser/Test").start(
  simple: =>
    flow = require("raw-loader!./simple.flow")
    json = require("./simple.json")
    result = parser(flow)
    # console.log JSON.stringify(result, null, "  ") # test用のデータ取得用
    assert(JSON.stringify(result) is JSON.stringify(json), "simple flow is not same")
)

console.info("finished")

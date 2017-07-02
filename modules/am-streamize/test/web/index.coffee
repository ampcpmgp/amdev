window.riot = require("riot")
parser = require("am-streamize/parser")
require("am-streamize/browser/data-flow")

mount = (flow) =>
  riot.mount("data-flow", {flow})

require("am-coffee-time/browser/Test").start(
  simple: =>
    flow = parser(require("raw!../app/simple.flow"))
    mount(flow)
)

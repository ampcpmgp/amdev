NodeClient = require("am-deven/web/NodeClient")
nc = new NodeClient()
nc.start()
window.nc = nc

if nc.params["am-autoevent"] then require("am-autoevent/test")
else if nc.params["am-test"] then require("am-test/test/index")
else
  generate = require("am-test/generate")
  testcase = require("./testcase.cson")
  generate(testcase)

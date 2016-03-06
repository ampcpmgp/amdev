NodeClient = require("am-deven/web/NodeClient")
nc = new NodeClient()
nc.start()
window.nc = nc

if nc.params["am-autoevent"] then require("am-autoevent/test")
else if "/modules/am-test.html" then require("./modules/am-test")
else
  generate = require("am-test/generate")
  testcase = require("./testcase.cson")
  generate(testcase)

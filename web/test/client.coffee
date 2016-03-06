NodeClient = require("am-deven/web/NodeClient")
require("../client")

if NodeClient::params["am-autoevent"] then require("am-autoevent/test")
else if NodeClient::params["am-test"] then require("am-test/test/index")
else
  generate = require("am-test/generate")
  testcase = require("../testcase.cson")
  generate(testcase)

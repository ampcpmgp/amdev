NodeClient = require("am-deven/web/NodeClient")
require("../client")

if NodeClient::params["am-autoevent"] then require("am-autoevent/test")
else if NodeClient::params["am-lunch-test"] then require("am-lunch-test/test/index")
else
  generate = require("am-lunch-test/generate")
  testcase = require("../testcase.cson")
  generate(testcase)

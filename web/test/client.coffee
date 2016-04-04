NodeClient = require("am-deven/web/NodeClient")
require("../client")

if NodeClient::params["am-autoevent"] then require("am-autoevent/test")
else if NodeClient::params["am-lunch-test"] then require("am-lunch-test/test/index")
else
  generate = require("am-lunch-test/generate")
  testcases = require("../testcases.cson")
  generate(testcases)
  require("./pre-info.tag")
  riot.mount("pre-info")

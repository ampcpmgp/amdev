WSClient = require("am-simple-server/WSClient")
require("../client")

if WSClient::params["am-autoevent"] then require("am-autoevent/test")
else if WSClient::params["am-lunch-test"] then require("am-lunch-test/test/index")
else if WSClient::params["am-simple-server"] then require("am-simple-server/test/client")
else
  generate = require("am-lunch-test/generate")
  testcases = require("../testcases.cson")
  generate(testcases)
  require("./pre-info.tag")
  riot.mount("pre-info")

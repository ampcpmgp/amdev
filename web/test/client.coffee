WSClient = require("am-simple-server/WSClient")

if WSClient::params["am-autoevent"] then require("am-autoevent/test")
else if WSClient::params["am-coffee-time"] then require("am-coffee-time/test/index")
else if WSClient::params["am-simple-server"] then require("am-simple-server/test/client")
else
  generate = require("am-coffee-time/browser/generate")
  testcases = require("./testcases.cson")
  generate(testcases)
  require("./pre-info.tag")
  riot.mount("pre-info")

require("../client")

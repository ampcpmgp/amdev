WSClient = require("am-simple-server/WSClient")

if window is parent
  generate = require("am-coffee-time/browser/generate")
  testcases = require("./testcases.yml")
  generate(testcases)
  require("./pre-info.tag")
  riot.mount("pre-info")
else if location.hash.match("am-autoevent") then require("am-autoevent/test")
else if location.hash.match("am-coffee-time") then require("am-coffee-time/test/index")
else if location.hash.match("am-simple-server") then require("am-simple-server/test/client")

require("../client")

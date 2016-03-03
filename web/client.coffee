NodeClient = require("am-deven/web/NodeClient")
nc = new NodeClient()
nc.start()

switch location.pathname
  when "/modules/am-autoevent.html" then require("./modules/am-autoevent")
  when "/modules/am-test.html" then require("./modules/am-test")
  when "/"
    generate = require("am-test/generate")
    testcase = require("./testcase.cson")
    generate(testcase)

# window.ws = nc.ws

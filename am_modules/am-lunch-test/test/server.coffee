LunchServer = require("../Server")

class Test extends require("am-lunch-test")
  port: ([httpPort, wsPort]) =>
    LunchServer::start(httpPort, wsPort)

Test::preStart()

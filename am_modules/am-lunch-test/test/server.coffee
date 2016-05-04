LunchServer = require("../Server")

class Test extends require("am-lunch-test")
  port: ([httpPort, wsPort]) =>
    LunchServer::start(httpPort, wsPort)


LunchServer::webDir.push(
  "./am_modules/am-lunch-test/test/web/"
)

LunchServer::watchDir = [
  "./am_modules/am-lunch-test/test/web/"
]

LunchServer::watchObj = "./am_modules/am-lunch-test/test/web/case.cson"

Test::preStart()

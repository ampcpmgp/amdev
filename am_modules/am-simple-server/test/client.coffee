Test = require("am-lunch-test")
WSClient = require("../WSClient")

class NewTest extends Test
  port: (number) =>
    wsc = new WSClient
    wsc.start(8081)
    wsc.ws.on("connect", =>
      console.info("finished")
    )
    timeout = => console.assert(false, "websocket timeout")
    setTimeout(timeout, 5000)

NewTest::preStart()

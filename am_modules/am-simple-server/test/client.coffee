Test = require("am-lunch-test")
WSClient = require("../WSClient")

class NewTest extends Test
  port: (number) =>
    wsc = new WSClient
    connectFlag = false
    wsc.start(8081)
    wsc.ws.off("connect")
    wsc.ws.on("connect", =>
      connectFlag = true
      console.info("finished")
    )
    timeout = => console.assert(false, "websocket timeout") unless connectFlag
    setTimeout(timeout, 1500)

NewTest::preStart()

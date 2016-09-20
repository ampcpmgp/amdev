Test = require("am-coffee-time")
WSClient = require("../WSClient")

class NewTest extends Test
  @port: (number) =>
    wsc = new WSClient
    connectFlag = false
    wsc.start(number)
    wsc.ws.off("connect")
    wsc.ws.on("connect", =>
      connectFlag = true
      console.info("finished")
    )
    @timeout = => console.assert(false, "websocket timeout") unless connectFlag
    setTimeout(timeout, 1500)


NewTest.start(NewTest)

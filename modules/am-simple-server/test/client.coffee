assert = require("assert")
Test = require("am-coffee-time/browser/Test")
WSClient = require("../browser/WSClient")

test =
  port: (number) =>
    wsc = new WSClient
    connectFlag = false
    wsc.start(number)
    wsc.ws.off("connect")
    wsc.ws.on("connect", =>
      connectFlag = true
      console.info("finished")
    )
    timeout = => assert(false, "websocket timeout") unless connectFlag
    setTimeout(timeout, 1500)


Test.start(test)

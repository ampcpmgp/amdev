generate = require("../generate")

class Client extends require("am-simple-server/WSClient")
  domain: "{__DOMAIN__}"
  wsPort: "{__WSPORT__}"
  protocol: "ws"
  connectWebsocket: =>
    super()
    @ws
      .on("pattern", (obj) =>
        document.body.innerHTML = "<test-list></test-list>"
        generate(obj)
      )
      .off("reload")
      .on("reload", (obj) =>
        console.log 1
      )
Client::start(Client::wsPort)

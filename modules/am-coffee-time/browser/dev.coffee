generate = require("./generate")

location.href = "#"

class Client extends require("am-simple-server/browser/WSClient")
  domain: "{__DOMAIN__}"
  wsPort: "{__WSPORT__}"
  jsFile: "{__TESTJS__}"
  protocol: "ws"
  connectWebsocket: =>
    super()
    @ws
      .on("pattern", (obj) =>
        document.body.innerHTML = "<test-list></test-list>"
        @tags = generate(obj)
        @listTag = @tags.list[0]
        @listTag.WholeStatus.config.extFile = "#{@domain.replace(/^(?!http|\/\/)/, "//")}/#{@jsFile}"
      )
      .off("reload")
      .on("reload", =>
        @listTag.check()
      )
Client::start(Client::wsPort)

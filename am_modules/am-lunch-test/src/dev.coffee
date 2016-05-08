generate = require("am-lunch-test/browser/generate")

location.href = "#"

class Client extends require("am-simple-server/WSClient")
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
        @listTag.extFile = "#{@domain.replace(/^(?!http|\/\/)/, "//")}/#{@jsFile}"
      )
      .off("reload")
      .on("reload", =>
        @listTag.Model.check()
      )
Client::start(Client::wsPort)
1

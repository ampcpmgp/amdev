Common = require("am-common")
io = require("socket.io-client/socket.io.js")

module.exports = class WSClient
  ###modules###
  ws: null
  ###websocket required variables###
  params: Common::getParams(location.href)
  domain: location.hostname.replace(/:.*/, "")
  connectFlag: false
  constructor: ->
    @connectFlag = false
  start: (@wsPort = 8080) ->
    @connectWebsocket() unless @params._noWs
  connectWebsocket: ->
    if @wsPort is 8080
      @wsPort = 80 unless location.host.match(/^((192|172|10)\.|localhost)/)
    protocol = if location.protocol.match(/https:/) then "wss" else "ws"
    if @wsPort is 80
      @wsUrl = "#{protocol}://#{@domain}"
    else
      @wsUrl = "#{protocol}://#{@domain}:#{@wsPort}"
    @ws = io(@wsUrl)
    @ws.on "connect", =>
      return @reload() if @connectFlag
      @connectFlag = true
      console.info("websocket connected")
      if @params.g then @ws.emit("g", (if typeof(@params.g) is "object" then @params.g else [@params.g]))
      if @params.all then @ws.emit("all")
      @ws.on("reload", => @reload())
      @ws.on("css reload", (css) -> $("body").append("<style type=\"text/css\">#{css}</style>"))
      @ws.on("test", (msg) -> console.log msg)
      @ws.on("disconnect", -> console.info("websocket server disconnected"))
  reload: -> location.reload()

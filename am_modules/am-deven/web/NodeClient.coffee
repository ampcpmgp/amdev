Common = require("am-common")
io = require("socket.io-client/socket.io.js")

module.exports = class NodeClient extends Common
  ###modules###
  ws: null
  ###websocket required variables###
  domain: location.host.replace(/:.*/, "")
  params: null
  connectFlag: false
  constructor: ->
    @params = @get_params location.href
  start: ->
    if @params.ws then @connect_websocket()
  connect_websocket: ->
    if @ws_port is 8080
      @ws_port = 80 unless location.host.match(/^((192|172|10)\.|localhost)/)
    protocol = if location.href.match(/^https/) then "wss" else "ws"
    if @ws_port is 80
      @ws_url = "#{protocol}://#{@domain}"
    else
      @ws_url = "#{protocol}://#{@domain}:#{@ws_port}"
    @ws = io(@ws_url)
    @ws.on "connect", =>
      return @reload() if @connectFlag
      @connectFlag = true
      console.log("websocket connected")
      if @params.g then @ws.emit("g", (if typeof(@params.g) is "object" then @params.g else [@params.g]))
      if @params.all then @ws.emit("all")
      @ws.on("reload", => @reload())
      @ws.on("css reload", (css) -> $("body").append("<style type=\"text/css\">#{css}</style>"))
      @ws.on("test", (msg) -> console.log msg)
      @ws.on("disconnect", -> console.log("websocket server disconnected"))
  reload: -> location.reload()

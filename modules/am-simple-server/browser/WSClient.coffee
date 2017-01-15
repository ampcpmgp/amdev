Common = require("am-common")
io = require("socket.io-client")

module.exports = class WSClient
  ###modules###
  ws: null
  ###websocket required variables###
  params: Common::getParams()
  protocol: if location.protocol.match(/https:/) then "wss" else "ws"
  domain: location.hostname
  connectFlag: false
  constructor: ->
    @connectFlag = false
  start: (@wsPort = 8080) ->
    @connectWebsocket() unless @params._noWs
  connectWebsocket: ->
    if @wsPort is 8080
      @wsPort = 80 unless location.host.match(/^((192|172|10)\.|localhost)/)
    if @wsPort is 80
      @wsUrl = "#{@protocol}://#{@domain}"
    else
      @wsUrl = "#{@protocol}://#{@domain.replace(/:.*/, "")}:#{@wsPort}"
    @ws = io(@wsUrl)
    @ws.on "connect", =>
      return @reload() if @connectFlag
      @connectFlag = true
      console.info("websocket connected")
      @_reloadDate = Date.now()
    @ws.on("reload", =>
      # TODO: 連続リロード防止のためだが、リロードは1回限りにしたい。
      cur = Date.now()
      differ = cur - @_reloadDate
      @_reloadDate = cur
      @reload() if not @disconnectedFlg and (differ) > 400
    )
    @ws.on("css reload", (css) => $("body").append("<style type=\"text/css\">#{css}</style>"))
    @ws.on("test", (msg) => console.log msg)
    @ws.on("disconnect", =>
      @disconnectedFlg = true
      console.info("websocket server disconnected")
    )
  reload: => location.reload()

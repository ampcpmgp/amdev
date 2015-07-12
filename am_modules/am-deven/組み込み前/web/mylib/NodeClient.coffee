class @NodeClient extends @CommonJs
  ###modules###
  ws: null
  ###websocket required variables###
  domain: location.host.replace(/:.*/, "")
  params: null
  constructor: ->
    @params = @get_params location.href
    if @params.ws then @connect_websocket()
  connect_websocket: ->
    if @ws_port is 8080
      if not location.host.match(/[0-9].+[0-9]+.[0-9].+[0-9]+/) then @ws_port = 80
      unless location.host.match(/^192/) then @ws_port = 80
    protocol = if location.href.match(/^https/) then "wss" else "ws"
    if @ws_port is 80
      @ws_url = "#{protocol}://#{@domain}"
    else
      @ws_url = "#{protocol}://#{@domain}:#{@ws_port}"
    @ws = io @ws_url
    @ws.on "connect", =>
      console.log("websocket connected")
      if @params.g then @ws.emit("g", (if typeof(@params.g) is "object" then @params.g else [@params.g]))
      if @params.all then @ws.emit("all")
      @ws.on("reload", => @reload())
      @ws.on("css reload", (css) => $("body").append("<style type=\"text/css\">#{css}</style>"))
      @ws.on("disconnect", => setTimeout(@reload, 2500))
  reload: -> location.reload()

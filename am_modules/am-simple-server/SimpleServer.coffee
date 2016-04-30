Common = require("am-common")

fs = require("fs")
http = require("http")
sio = require('socket.io')
mime = require('mime')
chokidar = require('chokidar')

module.exports = class NodeParts
  #config
  webDir:  [
    "./web"
  ]
  watchDir: [
    "./web/index.html"
    "./web/.build/client.js"
  ]
  #module
  #info
  reloadList: []
  start: (@httpPort = 8080, @wsPort = @httpPort) ->
    @app = http.createServer((req, res) => @httpServerAction(req, res))
    listen = => @app.listen(@httpPort)
    # TODO: reload時に前プロセスが残りportエラーで引っかかったのを解消。よりスマートに
    setTimeout(listen, 0)
    @wsStart()
  _checkExistsFile: (file) ->
    for dir in @webDir
      path = "#{dir}#{file}"
      return path if fs.existsSync(path) and fs.lstatSync(path).isFile()
    return false
  httpServerAction: (req, res) ->
    #initial
    url = req.url.replace(/\/{2,}/, "/")
    params = Common::getParams(url)
    url = url.replace(/\?.*$/, "")
    if url[url.length-1] is "/" then url += "index.html"
    ###get file###
    path = @_checkExistsFile(url)
    if path
      data = fs.readFileSync(path)
      type = mime.lookup(path)
      res.writeHead(200, "Content-Type": type)
      res.end(data)
    else
      res.writeHead(404)
      res.end("404 - file not found")
    ###access log###
    if url[url.length-4..url.length-1] is "html"
      ip = req.connection.remoteAddress.replace(/.*[^\d](\d+\.\d+\.\d+\.\d+$)/, "$1")
      date = new Date().toLocaleTimeString()
      console.log "#{date} #{ip} #{path}"
  wsStart: ->
    if @wsPort is @httpPort
      @websocket = sio(@app)
    else
      @websocket = sio(@wsPort)
    @websocket.on("connection", (socket) =>
      @reloadList.push(socket)
      socket.on("test", (msg) => console.log msg)
    )
    @wsEventReload()
  wsEventReload: =>
    _watcherCallback = =>
      @checkReloadList()
      @sendReloadEvent(socket) for socket in @reloadList
    chokidar.watch(@watchDir).on("change", (path) ->
      _watcherCallback()
      )
  sendReloadEvent: (socket) -> socket.emit("reload")
  sendCssReloadEvent: (socket,filepath) -> socket.emit("css reload", fs.readFileSync(filepath, {encoding:"utf-8"}))
  checkReloadList: =>
    arr = []
    for socket, i in @reloadList
      if socket.disconnected then arr.unshift(i)
    for num in arr
      @reloadList.splice(num, 1)

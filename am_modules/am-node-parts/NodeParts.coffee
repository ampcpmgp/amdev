Common = require("am-common/Common")

fs = require("fs")
http = require("http")
sio = require('socket.io')
mime = require('mime')

module.exports = class NodeParts extends Common
  #config
  webDir:  [
    "./web"
    "./node_modules"
    "./node_modules/am-deven/web"
    "./node_modules/am-deven/node_modules"
  ]
  #module
  #info
  reload_list: []
  start: ->
    @app = http.createServer((req, res) => @httpServerAction(req, res))
    listen = => @app.listen(@http_port)
    # TODO: reload時に前プロセスが残りportエラーで引っかかったのを解消。よりスマートに
    setTimeout(listen, 0)
    @wsStart()
  _checkExistsFile: (file) ->
    for dir in @webDir
      path = "#{dir}#{file}"
      if  fs.existsSync(path)
        return path if fs.lstatSync(path).isFile()
        #node modules directory
        json = fs.readFileSync(path + "/package.json", {encoding: "utf-8"})
        obj = JSON.parse(json)
        file = obj.main
        file = file + "index.js" if file.match(/\/$/)
        file.replace(/^\.\//, "")
        file += ".js" unless file.match(/\.js$/)
        return path + "/" + file
    return false
  httpServerAction: (req, res) ->
    #initial
    url = req.url.replace(/\/{2,}/, "/")
    params = @getParams url
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
    if @ws_port is @http_port
      @websocket = sio(@app)
    else
      @websocket = sio(@ws_port)
    @websocket.on("connection", (socket) =>
      @reload_list.push(socket)
      socket.on("test", @wsEventTest)
    )
    @wsEventReload()
  wsEventTest: (msg) =>
    console.log msg
  wsEventReload: =>
    _watcherCallback = =>
      @checkReloadList()
      @sendReloadEvent(socket) for socket in @reload_list
    fs.watch("./web/index.html", (event, name) ->
      _watcherCallback()
      )
    fs.watch("./web/.build/client.js", (event, name) ->
      _watcherCallback()
      )
  sendReloadEvent: (socket) -> socket.emit("reload")
  sendCssReloadEvent: (socket,filepath) -> socket.emit("css reload", fs.readFileSync(filepath, {encoding:"utf-8"}))
  checkReloadList: =>
    arr = []
    for socket, i in @reload_list
      if socket.disconnected then arr.unshift(i)
    for num in arr
      @reload_list.splice(num, 1)

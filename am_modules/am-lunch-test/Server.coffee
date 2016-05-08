mime = require('mime')
chokidar = require('chokidar')
cson = require('cson')
SimpleServer = require("am-simple-server")
html = require("./src/index.html")
devJs = require("raw!./src/dev.js")

module.exports = class LunchServer extends SimpleServer
  patternFile:  "./web/case.cson"
  sioOption: {origins: "*:*"}
  start: (@httpPort = 8080, @wsPort = @httpPort) =>
    super(@httpPort, @wsPort, => console.log("server start, on port:#{@httpPort}"))
    devJs = devJs.replace("{__WSPORT__}", @wsPort)
    chokidar.watch(@patternFile).on("change", (path) =>
      @sendTestCase(socket) for socket in @reloadList
    )
    @websocket.on "connection", (socket) =>
      @sendTestCase(socket)
  httpServerAction: (req, res) =>
    url = req.url.replace(/\/{2,}/, "/").replace(/\?.*$/, "")
    res.setHeader('Access-Control-Allow-Origin', '*')
    if url is "/"
      res.writeHead(200, "Content-Type": "text/html")
      newHtml = html.replace("{TESTJS}", @watchPath.replace(@webDir, ""))
      return res.end(newHtml)
    else if url is "/dev.js"
      res.writeHead(200, "Content-Type": "text/javascript")
      return res.end(devJs.replace("{__DOMAIN__}", req.headers.host))
    super(req, res)
  sendTestCase: (socket, pattern) =>
    ext = @patternFile.match(/\.([^\.]+)$/)[1]
    obj = cson.parseFile(@patternFile, {format: ext})
    console.log socket, ext, obj
    socket.emit("pattern", obj)

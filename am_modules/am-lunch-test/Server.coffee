fs = require('fs')
mime = require('mime')
chokidar = require('chokidar')
cson = require('cson')
SimpleServer = require("am-simple-server")
html = require("./src/index.html")
devJs = require("raw!./browser/dev.js")

module.exports = class LunchServer extends SimpleServer
  watchPath: "./web/client.js"
  patternFile:  "./web/case.cson"
  sioOption: {origins: "*:*"}
  start: (@httpPort = 8080, @wsPort = @httpPort) =>
    super(@httpPort, @wsPort, => console.log("server start, on port:#{@httpPort}"))
    html = html.replace("{TESTJS}", @watchPath.replace(@webDir, ""))
    devJs = devJs.replace("{__WSPORT__}", @wsPort).replace("{__TESTJS__}", @watchPath.replace(@webDir, ""))
    chokidar.watch(@patternFile).on("change", (path) =>
      @sendTestCase(socket) for socket in @reloadList
    )
    @websocket.on "connection", (socket) =>
      @sendTestCase(socket)
  httpServerAction: (req, res) =>
    url = req.url.replace(/\/{2,}/, "/").replace(/\?.*$/, "")
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 'no-cache')
    if url is "/"
      res.writeHead(200, "Content-Type": "text/html")
      return res.end(html)
    else if url is "/dev.js"
      res.writeHead(200, "Content-Type": "text/javascript")
      return res.end(devJs.replace("{__DOMAIN__}", req.headers.host))
    super(req, res)
  sendTestCase: (socket, pattern) =>
    ext = @patternFile.match(/\.([^\.]+)$/)[1]
    obj = cson.parseFile(@patternFile, {format: ext})
    socket.emit("pattern", obj)

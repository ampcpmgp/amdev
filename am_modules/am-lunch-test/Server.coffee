SimpleServer = require("am-simple-server")

module.exports = class LunchServer extends SimpleServer
  watchObj:  "./web/case.cson"
  webDir: [
    "./am_modules/am-lunch-test/web/"
    "./node_modules/am-lunch-test/web/"
  ]
  start: (@httpPort = 8080, @wsPort = @httpPort) =>
    super(@httpPort, @wsPort, => console.log("server start: http://127.0.0.1:#{@httpPort}"))

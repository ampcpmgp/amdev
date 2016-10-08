fse = require("fs-extra")
LunchServer = require("../Server")

class TestLunch extends LunchServer
  webDir: "./modules/am-coffee-time/test/web/"
  watchPath: "./modules/am-coffee-time/test/web/test.js"
  patternFile:"./modules/am-coffee-time/test/web/case.cson"
  htmlPath: "#{process.cwd()}/modules/am-coffee-time/browser/index.html"
  devJsPath: "#{process.cwd()}/modules/am-coffee-time/browser/dev.js"

test =
  port: ([httpPort, wsPort]) =>
    TestLunch::start(httpPort, wsPort)

require("am-coffee-time/browser/Test").start(test)

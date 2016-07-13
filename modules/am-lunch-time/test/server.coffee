fse = require("fs-extra")
LunchServer = require("../Server")
#pipeline for reload
require("raw!../browser/dev.js")

class TestLunch extends LunchServer
  webDir: "./modules/am-lunch-time/test/web/"
  watchPath: "./modules/am-lunch-time/test/web/test.js"
  patternFile:"./modules/am-lunch-time/test/web/case.cson"
  htmlPath: "#{process.cwd()}/modules/am-lunch-time/browser/index.html"
  devJsPath: "#{process.cwd()}/modules/am-lunch-time/browser/dev.js"

class Test extends require("am-lunch-time/browser/Test")
  port: ([httpPort, wsPort]) =>
    TestLunch::start(httpPort, wsPort)

Test::start()

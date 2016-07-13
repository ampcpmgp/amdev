fse = require("fs-extra")
LunchServer = require("../Server")
#pipeline for reload
require("raw!../browser/dev.js")

class TestLunch extends LunchServer
  webDir: "./modules/am-lunch-test/test/web/"
  watchPath: "./modules/am-lunch-test/test/web/test.js"
  patternFile:"./modules/am-lunch-test/test/web/case.cson"
  htmlPath: "#{process.cwd()}/modules/am-lunch-test/browser/index.html"
  devJsPath: "#{process.cwd()}/modules/am-lunch-test/browser/dev.js"

class Test extends require("am-lunch-test/browser/Test")
  port: ([httpPort, wsPort]) =>
    TestLunch::start(httpPort, wsPort)

Test::start()

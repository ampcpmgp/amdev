fse = require("fs-extra")

module.exports = (Compiler) =>
  class AmCompiler extends Compiler
    checkNum: 0
    electronStart: =>
      cmd = fse.readJsonSync("package.json").scripts.electron
      require("child_process").exec(cmd)
    callback: (err, stats) =>
      super(err, stats)
      return console.log(err) if (err)
      @electronStart() if (++@checkNum is 3)
    start: =>
      @electronOption.entry =
        "browser/.build/start": "./browser/test/start.coffee"
        "app/.build/preload": "./app/test/preload.coffee"
        "app/.build/electron": "./app/test/electron.coffee"
      @nodeOption.entry =
        "app/.build/server": "./app/test/server.coffee"
      @browserOption.entry =
        "web/.build/client": "./web/test/client.coffee"
      super()

  AmCompiler::start()

```coffee
fse = require("fs-extra")
Compiler = require("am-compiler")

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
      "electron/start": "./electron/test/start.coffee"
      "app/preload": "./app/test/preload.coffee"
      "app/electron": "./app/test/electron.coffee"
    @nodeOption.entry =
      "node/server": "./node/test/server.coffee"
    @browserOption.entry =
      "web/client": "./web/test/client.coffee"
    super()

AmCompiler::start()

```

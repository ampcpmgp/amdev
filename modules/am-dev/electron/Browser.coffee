# require("crash-reporter").start(
#   productName: "*"
#   companyName: "Gozen To Gogo"
#   submitURL: "https://your-domain.com/url-to-submit"  # config
#   autoSubmit: true
# )
fse = require("fs-extra")
chokidar = require("chokidar")
cson = require("cson")

fs = require("fs")
exec = require("child_process").exec
# path = require("path")
{ipcMain, app, BrowserWindow} = require("electron")

mainWindow = null

class Watcher
  constructor: ->
  restart: =>
    unless @restartFlg
      cmd = fse.readJsonSync("package.json").scripts.electron
      exec(cmd)
    @restartFlg = true
    setTimeout(app.quit, 0)
  start: =>
    chokidar
      .watch(["./electron/"])
      .on("change", (path) =>
        return unless path.match(/\.js$/)
        @restart()
      )

class Browser
  configCson: ".config.cson"
  init: =>
    try
      @config = cson.load(@configCson)
    catch
      @config = require("./config.cson")
    @option = @config.browserWindow
    @
  start: =>
    @url = @config.browserWindow.webPreferences.url
    #同時起動防止
    #reload
    @watcher = new Watcher()
    @watcher.start()
    #ipc
    @ipcEvent()
    #renderer
    app.on("window-all-closed", () =>
      if process.platform isnt "darwin" then app.quit()
    )
    app.on("ready", () =>
      #make renderer
      option = JSON.parse(JSON.stringify(@option))
      option.webPreferences.preload = "#{process.cwd()}#{@option.webPreferences.preload}"
      mainWindow = @mainWindow = new BrowserWindow(option)
      mainWindow.setAlwaysOnTop(true)
      @url = "file://#{process.cwd()}#{@url}" unless @url.match(/^(http|\/\/)/)
      mainWindow.loadURL(@url)
      mainWindow.openDevTools()
      mainWindow.webContents.on("did-finish-load", =>
        mainWindow?.setAlwaysOnTop(false) unless @option["always-on-top"]
        )
      mainWindow.on("closed", =>
        mainWindow = null
      )
      mainWindow.on("close", () =>
        return unless mainWindow?.getPosition
        xy = mainWindow.getPosition()
        wh = mainWindow.getSize()
        @option.x = xy[0]
        @option.y = xy[1]
        @option.width = wh[0]
        @option.height = wh[1]
        csonString = cson.createCSONString(@config, {indent: "  "})
        fs.writeFileSync(@configCson, csonString)
        mainWindow = null
      )
      mainWindow.on("app-command", (e, cmd) =>
        if (cmd is "browser-backward" and mainWindow.webContents.canGoBack())
          mainWindow.webContents.goBack()
        else if (cmd is "browser-forward" and mainWindow.webContents.canGoForward())
          mainWindow.webContents.goForward()
        )
      # TODO: コンパイラはelectronに寄せたい
      # @startCompiler()
    )
  ipcEvent: =>
    ipcMain
      .on("inspect element", (e, arg, renderer) => @[renderer].inspectElement(arg.x, arg.y))
      .on("restart", @watcher.restart)
  startCompiler: ->
    exec(fse.readJsonSync("package.json").scripts.watch).stdout.on("data", @sendMsg)
  sendMsg: (msg) =>
    mainWindow?.webContents.send("electron send msg", msg)

module.exports = Browser

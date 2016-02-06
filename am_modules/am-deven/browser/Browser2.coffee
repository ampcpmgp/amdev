require('crash-reporter').start()
fse = require("fs-extra")
chokidar = require("chokidar")
cson = require("cson")

fs = require("fs")
exec = require("child_process").exec
fork = require("child_process").fork
# path = require("path")
app = require('app')
BrowserWindow = require('browser-window')
ipc = require('electron').ipcMain

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
      .watch(["./browser/.build/"])
      .on("change", (path) =>
        return unless path.match(/\.js$/)
        @restart()
      )

module.exports = class Browser
  configCson: ".config.cson"
  init: =>
    try
      @config = cson.load(@configCson)
    catch
      @config = cson.load(@configCson[1..])
    @option = @config["browser-window"]
    @
  start: (@url) =>
    #同時起動防止
    #reload
    @watcher = new Watcher()
    @watcher.start()
    #ipc
    @ipcEvent()
    #renderer
    app.on('window-all-closed', () =>
      if process.platform isnt 'darwin' then app.quit()
    )
    app.on('ready', () =>
      #make renderer
      option = JSON.parse(JSON.stringify(@option))
      option["web-preferences"].preload = "#{process.cwd()}#{@option["web-preferences"].preload}"
      mainWindow = @mainWindow = new BrowserWindow(option)
      mainWindow.setAlwaysOnTop(true)
      @url = "file://#{process.cwd()}#{@url}" unless @url.match(/^(http|\/\/)/)
      mainWindow.loadUrl(@url)
      mainWindow.openDevTools()
      mainWindow.webContents.on("did-finish-load", =>
        mainWindow?.setAlwaysOnTop(false) unless @option["always-on-top"]
        )
      mainWindow.on('closed', =>
        mainWindow = null
      )
      mainWindow.on("close", (e) =>
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
      # TODO: npm run watchで代用、工数かからないならelectronに寄せる
      #compiler
      # @startCompiler()
    )
  ipcEvent: =>
    ipc
      .on('inspect element', (e, arg, renderer) => @[renderer].inspectElement(arg.x, arg.y))
      .on("restart", @watcher.restart)
  startCompiler: ->
    exec(fse.readJsonSync("package.json").scripts.watch).stdout.on("data", @sendMsg)
  sendMsg: (msg) =>
    mainWindow?.webContents.send("browser send msg", msg)

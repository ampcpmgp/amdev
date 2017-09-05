ipcRenderer = require('electron').ipcRenderer

$ = require("jquery")
chokidar = require("chokidar")
glob = require("glob")

class ElectronApp
  _inspector: 1
  publishFlg: true
  constructor: ->
  start: ->
    @init()
    @liveReload()
    @serverStart()
  ### 信頼しているメソッドなるべくフロー順 ###
  init: ->
    if @_inspector then @autoInspector()
    ipcRenderer.on("electron send msg",(event, msg) ->
      console.log("%cfrom Browser, %c#{msg}", "color: gray", "color: blue")
    )
  autoInspector: ->
    $(document).on "mousedown", (e) ->
      if e.button is 2
        obj =
          x: e.clientX
          y: e.clientY
        ipcRenderer.send('inspect element', obj, "mainWindow")
  liveReload: ->
    chokidar
      .watch(glob.sync("./**/{,.*/**}/{app,node}/*.{html,js}", {ignore: "./**/{,.*/**}/node_modules/**"}),
        persistent: true
        awaitWriteFinish:
          stabilityThreshold: 10
          pollInterval: 10
      )
      .on("change", () =>
        return unless localStorage.liveReloadFlg is "true"
        location.reload()
      )
  serverStart: ->
    # TODO: ../electron/Browser.coffeeのコードと統一する。
    try
      @config = require("cson").load('.config.cson')
    catch
      @config = require("../electron/config.cson")
    @port = @config.server?.port || 8091
    require("am-simple-server").prototype.start(@port, @port)

module.exports = ElectronApp

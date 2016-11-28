ipcRenderer = require('electron').ipcRenderer
fs = require("fs")

$ = require("jquery")
chokidar = require("chokidar")
glob = require("glob")

module.exports = class ElectronApp
  _inspector: 1
  publishFlg: true
  liveReloadStopFlg: false
  constructor: ->
  start: ->
    @init()
    @liveReload()
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
      .watch(glob.sync("./**/@(app|node)/*.@(html|js)", {ignore: "./**/node_modules/**"}),
        persistent: true
        awaitWriteFinish:
          stabilityThreshold: 10
          pollInterval: 10
      )
      .on("change", (path) =>
        return if @liveReloadStopFlg
        location.reload()
      )

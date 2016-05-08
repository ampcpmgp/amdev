$ = require("jquery")
chokidar = require("chokidar")
fs = require("fs")
ipcRenderer = require('electron').ipcRenderer

module.exports = class ElectronApp
  _inspector: 1
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
      .watch(["./app/.build/", "./app/index.html"])
      .on("change", (path) =>
        location.reload()
      )

$ = require("jquery")
chokidar = require("chokidar")
fs = require("fs")
ipcRenderer = require('electron').ipcRenderer
np = new (require("am-node-parts"))

module.exports = class ElectronApp
  _inspector: 1
  constructor: ->
  start: ->
    @init()
    @live_reload()
  ### 信頼しているメソッドなるべくフロー順 ###
  init: ->
    if @_inspector then @auto_inspector()
    ipcRenderer.on("browser send msg",(event, msg) ->
      console.log("%cfrom Browser, %c#{msg}", "color: gray", "color: blue")
    )
  auto_inspector: ->
    $(document).on "mousedown", (e) ->
      if e.button is 2
        obj =
          x: e.clientX
          y: e.clientY
        ipcRenderer.send('inspect element', obj, "mainWindow")
  live_reload: ->
    # TODO: 初回起動時にリロードがかかる
    chokidar
      .watch(["./app/.build/", "./app/index.html"])
      .on("change", (path) =>
        location.reload()
      )

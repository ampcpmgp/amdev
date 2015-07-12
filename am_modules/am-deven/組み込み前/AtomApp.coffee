AutoEvent = require("../proj/web/mylib/am/AutoEvent.js")

class ExternalSite
  ###
    document: https://github.com/atom/atom-shell/blob/master/docs/api/web-view-tag.md
    how to use:
      @es = new @ExternalSite "#foo"
  ###
  webview: null
  ready_flag: 0
  constructor: (@selector, @dom, @src, which = "append", @width = "100%", @height = "640px") ->
    webview = """
      <webview id="#{@selector}" preload="./electron/WebView.js" src="#{@src}"
        style="width:#{@width}; height:#{@height}; display: block; overflow: hidden;" nodeintegration>
      </webview>
    """
    @$webview = $(webview)
    @webview = @$webview[0]
    $(@dom)[which](@webview)
    @webview_event()
    @$webview.on("did-finish-load", @finish)
    @$webview.on("new-window", (e) => @exejs("location.href = '#{e.url}'"))
  webview_event: ->
    @$webview.on("console-message", (e) => console.log "%c#{e.originalEvent.message}", "color: green")
    @$webview.on("ipc-message", (e) => console.log "%c#{e.channel} #{e.args}", "color: purple")
  #load終了後
  finish: =>
    ++@ready_flag
    console.log "webview ready"
  exejs: (code) ->
    @webview.executeJavaScript code

class @AtomApp
  inspector_: 1
  #module
  ipc: require("ipc")
  shell: require("shell")
  gaze: require("gaze")
  fs: require("fs")
  #class
  ExternalSite: ExternalSite
  AutoEvent: AutoEvent
  constructor: ->
    @init()
    @live_reload()
  ### 信頼しているメソッドなるべくフロー順 ###
  init: ->
    if @inspector_ then @auto_inspector()
    @ipc.on("browser send msg",(msg) => console.log(msg))
  auto_inspector: ->
    $(document).on "mousedown", (e) =>
      if e.button is 2
        obj =
          x: e.clientX
          y: e.clientY
        @ipc.send('inspect element', obj, "mainWindow")
  live_reload: ->
    me = @
    dir = [
      "contents/*.js"
      "contents/*.html"
      "contents/electron/**/*.js"
      "contents/nodejs/**/*.js"
      "contents/proj/node/**/*.js"
      "contents/proj/atom/**/*.js"
      "contents/proj/atom/**/*.html"
    ]
    @gaze(dir, (err, watcher) ->
      @on("changed", (filepath) =>
        location.reload()
      )
    )
    dir = [
      "contents/*.css"
      "contents/proj/atom/**/*.css"
    ]
    @gaze(dir, (err, watcher) ->
      @on("changed", (filepath) =>
        $("body").append("<style type=\"text/css\">#{me.fs.readFileSync(filepath, {encoding:"utf-8"})}</style>")
      )
    )

module.exports = @AtomApp

AtomApp = require("../../electron/AtomApp.js")
class @AtomProjApp extends AtomApp
  constructor: ->
    super()
    @start()
  start: ->
    console.log "atom proj start"


sample_code = ->
  ### atom app function ###
  #external site
  @renderer = new @ExternalSite("#foo", "body", "http://google.com", "prepend", "90%", "400px") #WebView.coffee
  @renderer.$webview.off("console-message")
  @renderer.$webview.on("console-message", (e) => console.log "%c#{e.originalEvent.message}", "color: purple")
  @renderer.$webview.on("did-finish-load", =>
    @renderer.webview.send("set val", "input[aria-label=検索]", "DragonBall ")
    @renderer.webview.send("keydown", "input[aria-label=検索]", 90)
    setTimeout( =>
      @renderer.webview.send("mouseclick", "button[aria-label='Google 検索']")
      @renderer.webview.send("css", "body", "transform", "scale(0.8, 0.8)")
    , 1500)
  )

  ### web app function ###
  # auto event

module.exports = @AtomProjApp

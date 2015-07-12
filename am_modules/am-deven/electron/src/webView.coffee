###
2015/02/11: goBackを使うと、wvが使えなくなる模様
###
$ = require("jquery")
class WebView
  ipc: require("ipc")
  fs: require("fs")
  shell: require("shell")
  constructor: ->
    1
  set_event: ->
    @ipc.on("keydown", (selector, keyCode) => @set_keydown_event(selector, keyCode))
    @ipc.on("mouseclick", (selector) => $(selector).click())
    @ipc.on("css", (selector, prop, val) => $(selector).css(prop, val))
    @ipc.on("set val", (selector, val) => $(selector).val(val))
  set_keydown_event: (selector, keyCode) ->
    $(selector).focus()
    e = $.Event("keypress")
    e.which = keyCode
    $(selector).val($(selector).val() + String.fromCharCode(e.which))
    $(selector).trigger(e)
  start: ->
    1

wv = new WebView()
wv.set_event()
console.log "new webview preload finished"

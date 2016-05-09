escapeRegexp = require("escape-string-regexp")
Common = require("am-common")

class TestWindow
  constructor: (@url, Test) ->
    @window = window.open(@url)
    @window.Test = Test
  setConsoleEvent: (callbackObj) =>
    @window.console.assert = (flg, msg) => callbackObj.assert(flg, msg)
    @window.console.info = (msg) => callbackObj.info(msg)
  close: =>
    @window.close()

module.exports = class Model
  check: =>
    @init()
    @deleteIframe()
    return unless @hashWord
    return setTimeout((=> @executeOnce(testCase)), 0) for testCase in @opts.testCases when testCase.value is @hashWord
    setTimeout((=> @execute()), 0)
  init: =>
    @params = Common::getParams()
    @hashWord = location.hash.replace(/^#+/, "")
    for testCase in @opts.testCases
      testCase.error = null
      testCase.success = null
      @me.update()
  executeOnce: (testCase) =>
    @init()
    @open(testCase)
  execute: () =>
    @init()
    @hashRegex = if @hashWord then "^#{escapeRegexp(@hashWord)}(\/|$)" else ""
    @currentNum = -1
    @openContinuously()
  open: (currentCase, callback = =>) =>
    @me.onExecute = true
    @curWindow = if @me.iframeMode
      @iframe.url = currentCase.value
      @me.update()
      @iframe
    else
      new TestWindow(currentCase.value, @me.config.Test)
    @curWindow.setConsoleEvent(
      assert: (flg, msg) =>
        unless flg
          # TODO: UIにも組み込む
          console.error(msg) if msg
          currentCase.error = true
          callback()
      info: (msg) =>
        if msg is "finished" and not currentCase.error
          console.info(msg)
          currentCase.success = true unless currentCase.error
          callback()
    )
  openContinuously: =>
    @deleteIframe()
    return @me.update() if @opts.testCases.length <= ++@currentNum
    currentCase = @opts.testCases[@currentNum]
    return @openContinuously() if not currentCase.value or not (new RegExp(@hashRegex)).test(currentCase.pageLink)
    @open(currentCase, => @openContinuously())
  deleteIframe: =>
    @curWindow?.close?()
    @me.onExecute = false
    @me.update()

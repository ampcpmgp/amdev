escapeRegexp = require("escape-string-regexp")
Common = require("am-common")

oneTimeExecutionSeparator = "?"

module.exports = class Model
  check: =>
    @init()
    @deleteIframe()
    return unless @hashWord
    return setTimeout((=> @executeOnce(testCase)), 0) for testCase in @opts.testCases when testCase.value is @hashWord
    return setTimeout((=> @open({value: @hashWord})), 0)  unless @hashWord.indexOf(oneTimeExecutionSeparator) is -1
    setTimeout((=> @execute()), 0)
  init: =>
    @me.successSum = 0
    @me.executeSum = 0
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
    @iframe.url = currentCase.value
    @me.update()
    @curWindow = @iframe
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
          currentCase.success = true
          ++@me.successSum
          callback()
    )
    console.clear()
    ++@me.executeSum
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

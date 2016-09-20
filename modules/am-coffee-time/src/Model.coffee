escapeRegexp = require("escape-string-regexp")

oneTimeExecutionSeparator = "?"

module.exports = class Model
  check: =>
    @init()
    @deleteIframe()
    return unless @hashWord
    return setTimeout((=> @executeOnce(testPattern)), 0) for testPattern in @opts.testPatterns when testPattern.value is @hashWord
    return setTimeout((=> @open({value: @hashWord})), 0)  unless @hashWord.indexOf(oneTimeExecutionSeparator) is -1
    setTimeout((=> @execute()), 0)
  init: =>
    @me.successSum = 0
    @me.executeSum = 0
    @hashWord = location.hash.replace(/^#+/, "")
    @me.update()
  executeOnce: (testPattern) =>
    @init()
    @open(testPattern)
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
    return @me.update() if @opts.testPatterns.length <= ++@currentNum
    currentCase = @opts.testPatterns[@currentNum]
    return @openContinuously() if not currentCase.value or not (new RegExp(@hashRegex)).test(currentCase.pageLink)
    @open(currentCase, => @openContinuously())
  deleteIframe: =>
    @curWindow?.close?()
    @me.onExecute = false
    @me.update()

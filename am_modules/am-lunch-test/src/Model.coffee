Common = require("am-common")

module.exports = class Model
  params: Common::getParams()
  check: =>
    execute = () => @execute()
    setTimeout(execute, 0) if @params.auto or location.hash
  execute: =>
    @hashRegex = location.hash.replace(/^#/, "")
    @hashRegex = "^#{@hashRegex}(\/|$)" if @hashRegex
    @currentNum = -1
    for testCase in @opts.testCases
      testCase.error = null
      testCase.success = null
    @openIframe()
  openIframe: (prevIframeWindow) =>
    if prevIframeWindow
      @me.onExecute = false
      @me.update()
    return @me.update() if @opts.testCases.length <= ++@currentNum
    currentCase = @opts.testCases[@currentNum]
    #
    url = currentCase.value
    return @openIframe() if not url or not (new RegExp(@hashRegex)).test(currentCase.pageLink)
    #execute
    @me.onExecute = true
    @iframe.url = url
    @me.update()
    currentIFrameWindow = @iframe.root.querySelector("iframe").contentWindow
    currentIFrameWindow.console.assert = (flg, msg) =>
      unless flg
        # TODO: UIに組み込む
        currentCase.error = true
        @openIframe(currentIFrameWindow)
    currentIFrameWindow.console.info = (msg) =>
      if msg is "finished"
        currentCase.success = true unless currentCase.error
        @openIframe(currentIFrameWindow)

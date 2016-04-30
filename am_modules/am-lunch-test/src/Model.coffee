Common = require("am-common")

module.exports = class Model
  params: Common::getParams()
  check: =>
    execute = () => @execute()
    setTimeout(execute, 0) if @params.auto or location.hash
  execute: =>
    @currentNum = -1
    @openIframe()
  openIframe: (prevIframeWindow) =>
    if prevIframeWindow
      @me.onExecute = false
      @me.update()
    return @me.update() if @opts.testCases.length <= ++@currentNum
    currentCase = @opts.testCases[@currentNum]
    #
    url = currentCase.value
    return @openIframe() unless url
    #init
    delete currentCase.error
    delete currentCase.success
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

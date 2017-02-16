module.exports = class Status
  @sumInit: =>
    @successSum = 0
    @executeSum = 0
  @init: =>
    #config
    @thisBasePath = "?"
    @basePath = "#"
    #item
    @itemStatuses = []
    @executeIframe = []
    @executablePath = {}
    @sumInit()
    #observable
    riot.observable(@)
  @firstTimeInit: =>
    @opts = {}
  @taskFinished: =>
    @executeSum > 0 and @executeIframe.length === 0
  @taskAllSuccess: =>
    @taskFinished() and @executeSum === @successSum


Status.init()
Status.firstTimeInit()

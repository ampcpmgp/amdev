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
    #status
    @hideParamMode = false
    @showParameter = false
    #observable
    riot.observable(@)
  @firstTimeInit: =>
    @opts = {}
  @taskFinished: =>
    @executeSum > 0 and @executeIframe.length is 0
  @taskAllSuccess: =>
    @taskFinished() and @executeSum is @successSum

Status.init()
Status.firstTimeInit()

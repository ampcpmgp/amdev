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

Status.init()
Status.firstTimeInit()

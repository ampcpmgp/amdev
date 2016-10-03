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
    @actions = null

Status.init()
Status.firstTimeInit()

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
    @lastExecutePath = ""
    @paramMode = false
    @showParameter = false
    #observable
    riot.observable(@)
  @firstTimeInit: =>
    @opts = {}
  @taskFinished: =>
    @executeSum > 0 and @executeIframe.length is 0
  @taskAllSuccess: =>
    @taskFinished() and @executeSum is @successSum
  @next: =>
    @trigger("finished")

Status.init()
Status.firstTimeInit()

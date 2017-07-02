riot = require("riot")

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
    @iframeListToExecute = []
    @executablePath = {}
    @sumInit()
    #status
    @lastExecutePath = ""
    @paramMode = false
    @showParameter = false
    #observable
    riot.observable(@)
  @isRunning: =>
    @iframeListToExecute.length isnt 0 and @itemStatuses.some((item) => item.onExecute)
  @firstTimeInit: =>
    @opts = {}
  @taskFinished: =>
    @executeSum > 0 and @iframeListToExecute.length is 0
  @taskAllSuccess: =>
    @taskFinished() and @executeSum is @successSum
  @next: =>
    @trigger("finished")
  @allApen: =>
    return if @isRunning()
    @trigger("all-open")
  @close: (depth) =>
    return if @isRunning()
    @allApen()
    @trigger("close-depth-#{depth}")

Status.init()
Status.firstTimeInit()

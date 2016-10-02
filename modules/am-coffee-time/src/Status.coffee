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
    #from browser/dev.coffee
    @config =
      extFile: null
    @sumInit()
    #observable
    riot.observable(@)

Status.init()

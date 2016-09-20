module.exports = class Status
  @init: =>
    #config
    @thisBasePath = "#"
    @basePath = "#"
    #settings
    @successSum = 0
    @executeSum = 0
    #item
    @itemStatuses = []
    @executeIframe = []
    @executablePath = {}
    #from browser/dev.coffee
    @config =
      extFile: null
      Test: class ListTest extends require("am-coffee-time/browser/Test")
    #observable
    riot.observable(@)

Status.init()

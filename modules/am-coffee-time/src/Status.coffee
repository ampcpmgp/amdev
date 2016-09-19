module.exports = class Status
  @init: =>
    #config
    @basePath = "#"
    #item
    @itemStatuses = []
    #from browser/dev.coffee
    @config =
      extFile: null
      Test: class ListTest extends require("am-coffee-time/browser/Test")
    #observable
    riot.observable(@)

Status.init()

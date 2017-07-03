class Status
  constructor: ->
    @publishFlg = true
    localStorage.liveReloadFlg = "true"
    riot.observable(@)
  toggleliveReloadFlg: =>
    localStorage.liveReloadFlg = not localStorage.liveReloadFlg
    @trigger("update")
  togglePublishFlg: =>
    @publishFlg = not @publishFlg
    @trigger("update")

module.exports = new Status()

class Status
  init: =>
    @liveReloadFlg = true
    @publishFlg = true
    @
    riot.observable(@)
  toggleliveReloadFlg: =>
    @liveReloadFlg = not @liveReloadFlg
    @trigger("update")
  togglePublishFlg: =>
    @publishFlg = not @publishFlg
    @trigger("update")

module.exports = new Status().init()

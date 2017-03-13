class Status
  init: =>
    @publishFlg = true
    @
    riot.observable(@)
  toggleliveReloadFlg: =>
    window.ea.liveReloadFlg = not window.ea.liveReloadFlg
    @trigger("update")
  togglePublishFlg: =>
    @publishFlg = not @publishFlg
    @trigger("update")

module.exports = new Status().init()

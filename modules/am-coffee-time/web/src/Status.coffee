module.exports = class Status
  @isLogin: false
  @init: => riot.observable(@)

Status.init()

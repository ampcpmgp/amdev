$ = require("jquery")

module.exports = class Test
  params: require("am-common")::getParams(location.search)
  AutoEvent: require("am-autoevent/AutoEvent-no-gen")
  preStart: =>
  start: =>

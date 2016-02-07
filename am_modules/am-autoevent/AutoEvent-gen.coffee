AutoEventBase = require("./AutoEvent")
module.exports = class AutoEvent extends AutoEventBase
  contoller: =>
    i = -1
    while (@funcs[++i])
      @innerFuncs[i].push( => @gen.next())
      yield @funcs[i]()
  start: =>
    @gen = @contoller()
    @gen.next()

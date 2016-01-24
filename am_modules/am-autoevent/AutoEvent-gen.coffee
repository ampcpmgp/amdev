AutoEventBase = require("./AutoEvent")
module.exports = class AutoEvent extends AutoEventBase
  contoller: =>
    i = -1
    while (@funcs[++i])
      @inner_funcs[i].push( => @gen.next())
      yield @funcs[i]()
  register: =>
    @gen = @contoller()
    super()
    @
  start: =>
    @gen.next()

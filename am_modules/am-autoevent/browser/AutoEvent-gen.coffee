AutoEventBase = require("./AutoEvent")
module.exports = class AutoEvent extends AutoEventBase
  contoller: (num, callback) =>
    i = -1
    while (@funcs[++i])
      @innerFuncs[i].push( => @gen.next())
    while num--
      i = -1
      while (@funcs[++i])
        yield @funcs[i]()
    callback()
  start: (loopNum = 1, callback) =>
    @gen = @contoller(loopNum, @setCallback(callback))
    @gen.next()

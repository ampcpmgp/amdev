AutoEventBase = require("./AutoEvent")
module.exports = class AutoEvent extends AutoEventBase
  controller: (num) =>
    i = -1
    while (@funcs[++i])
      @innerFuncs[i].push( => @gen.next())
    while num--
      i = -1
      while (@funcs[++i])
        yield @funcs[i]()
    @end()
  start: (loopNum = 1) =>
    @gen = @controller(loopNum)
    @gen.next()

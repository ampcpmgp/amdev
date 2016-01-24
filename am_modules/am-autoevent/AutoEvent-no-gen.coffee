AutoEventBase = require("./AutoEvent")
module.exports = class AutoEvent extends AutoEventBase
  contoller: =>
    i = -1
    curFuncNum = 0
    while (@funcs[++i])
      @inner_funcs[i].push(=> @funcs[++curFuncNum]?())
    @funcs[0](curFuncNum)
  start: =>
    @contoller()

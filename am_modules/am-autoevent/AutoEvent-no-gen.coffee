AutoEventBase = require("./AutoEvent")
module.exports = class AutoEvent extends AutoEventBase
  contoller: =>
    i = -1
    curFuncNum = 0
    while (@funcs[++i])
      @innerFuncs[i].push(=> @funcs[++curFuncNum]?())
    @funcs[0](curFuncNum)
  start: =>
    @contoller()

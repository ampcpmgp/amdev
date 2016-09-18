AutoEventBase = require("./AutoEvent")

module.exports = class AutoEvent extends AutoEventBase
  contoller:  (loopNum) =>
    curFuncNum = 0
    @innerFuncs[@funcs.length] = []
    @funcs.push(=>
      if --loopNum
        curFuncNum = 0
        @funcs[0]()
      else
        @end()
      )
    i = -1
    while (@funcs[++i])
      @innerFuncs[i].push(=> @funcs[++curFuncNum]?())
    @funcs[0]()
  start: (loopNum = 1) =>
    @contoller(loopNum)

AutoEventBase = require("./AutoEvent")

module.exports = class AutoEvent extends AutoEventBase
  contoller:  (loopNum, callback) =>
    curFuncNum = 0
    @innerFuncs[@funcs.length] = []
    @funcs.push(=>
      if --loopNum
        curFuncNum = 0
        @funcs[0]()
      else
        callback()
      )
    i = -1
    while (@funcs[++i])
      @innerFuncs[i].push(=> @funcs[++curFuncNum]?())
    @funcs[0]()
  start: (loopNum = 1, callback) =>
    @contoller(loopNum, @setCallback(callback))

AutoEventBase = require("./AutoEvent")

module.exports = class AutoEvent extends AutoEventBase
  controller:  (loopNum, callback) =>
    curFuncNum = 0
    @innerFuncs[@funcs.length] = []
    @funcs.push(=>
      if --loopNum
        curFuncNum = 0
        @funcs[0]()
      else
        if callback then callback() else @end()
      )
    i = -1
    while (@funcs[++i])
      @innerFuncs[i].push(=> @funcs[++curFuncNum]?())
    @funcs[0]()
  start: (loopNum = 1, callback) =>
    @controller(loopNum, callback)

$ = require("jquery")

module.exports = class AutoEvent
  register: =>
    @funcs = []
    @innerFuncs = []
    @funcNum = -1
    @
  addEvent: (callback) =>
    innerFunc = @innerFuncs[@funcNum]
    innerFunc.push(callback)
    @
  setValue: (selector, value) =>
    @addEvent(=> $(selector).val(value))
  setHtml: (selector, value) =>
    @addEvent(=> $(selector).html(value))
  click: (selector) =>
    @addEvent(=> $(selector).click())
  waitEvent: (callback) =>
    @funcs.push(callback)
    @
  wait: (msec) =>
    funcNum = ++@funcNum
    innerFunc = @innerFuncs[funcNum] = []
    func = =>
      func() for func in innerFunc
    @waitEvent( => setTimeout(func, msec))
  waitSelector: (selector, exists=true) =>
    funcNum = ++@funcNum
    innerFunc = @innerFuncs[funcNum] = []
    func = =>
      func() for func in innerFunc
    testTimer = null
    stopTimer = =>
      clearInterval(testTimer)
      func()
    @waitEvent( =>
      testTimer = setInterval( =>
        if $(selector)[0] and exists then stopTimer()
      , 100)
      )

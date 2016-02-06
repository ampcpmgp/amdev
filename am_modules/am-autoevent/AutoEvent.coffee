doc = document
doc.$ = doc.querySelector
$ = doc.$

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
    @addEvent(=> doc.$(selector)?.value = value)
  setHtml: (selector, value) =>
    @addEvent(=> doc.$(selector)?.innerHtml = value)
  click: (selector) =>
    @addEvent(=> doc.$(selector)?.click())
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
        if doc.$(selector)? and exists then stopTimer()
      , 100)
      )

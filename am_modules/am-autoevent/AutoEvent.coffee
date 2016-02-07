doc = document
doc.$ = doc.querySelector
$ = doc.$

module.exports = class AutoEvent
  register: =>
    @funcs = []
    @innerFuncs = []
    @funcNum = -1
    @wait(0)
    @
  addEvent: (callback) =>
    innerFunc = @innerFuncs[@funcNum]
    innerFunc.push(callback)
    @
  setValue: (selector, value) =>
    @addEvent(=> doc.$(selector)?.value = value)
  setHtml: (selector, value) =>
    @addEvent(=> doc.$(selector)?.innerHTML = value)
  click: (selector) =>
    @addEvent(=> doc.$(selector)?.click())
  waitEvent: (callback) =>
    @funcs.push(callback)
    @
  wait: (msec) =>
    func = @_createFuncInWait()
    @waitEvent( => setTimeout(func, msec))
  waitSelector: (selector, exists=true) =>
    func = @_createFuncInWait()
    testTimer = null
    stopTimer = =>
      clearInterval(testTimer)
      func()
    @waitEvent( =>
      testTimer = setInterval( =>
        if doc.$(selector)? and exists then stopTimer()
      , 100)
      )
  _createFuncInWait: () =>
    funcNum = ++@funcNum
    innerFunc = @innerFuncs[funcNum] = []
    => func() for func in innerFunc

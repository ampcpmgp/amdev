module.exports = class AutoEvent
  contoller: =>
    i = -1
    while (@funcs[++i])
      @innerFuncs[i].push( => @gen.next())
      yield @funcs[i]()
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
    @addEvent(=> document.querySelector(selector).value = value)
  setHtml: (selector, value) =>
    @addEvent(=> document.querySelector(selector).innerHTML = value)
  click: (selector) =>
    @addEvent(=> document.querySelector(selector).click())
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
        if document.querySelector(selector) and exists then stopTimer()
      , 100)
      )

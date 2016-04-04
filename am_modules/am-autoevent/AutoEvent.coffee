$ = (selector) => document.querySelector(selector)
trigger = ($dom, eventType) =>
  event = document.createEvent("HTMLEvents")
  event.initEvent(eventType, false, true)
  $dom.dispatchEvent(event)

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
  selectValue: (selector, value) => #未実装
  setValue: (selector, value) =>
    @addEvent(=>
      $this = $(selector)
      return unless $this
      $this.value = value
      trigger($this, "input")
    )
  setHtml: (selector, value) =>
    @addEvent(=> $(selector)?.innerHTML = value)
  click: (selector) =>
    @addEvent(=> $(selector)?.click())
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
        if exists
          if $(selector)? then stopTimer()
        else
          unless $(selector)? then stopTimer()
      , 100)
      )
  _createFuncInWait: () =>
    funcNum = ++@funcNum
    innerFunc = @innerFuncs[funcNum] = []
    => func() for func in innerFunc
  setCallback: (callback) =>
    func = =>
      callback() if typeof callback is "function"
      @end()
  end: =>
    console.info("finished")

$ = (selector) => document.querySelector(selector)
trigger = ($dom, eventType) =>
  event = document.createEvent("HTMLEvents")
  event.initEvent(eventType, false, true)
  $dom.dispatchEvent(event)

module.exports = class AutoEvent
  timeoutMsec: 10000
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
  addSelectorEvent: ($this, msg, callback) =>
    return console.assert($this, msg) unless $this
    @addEvent(callback)
  selectValue: (selector, value) => #未実装
  setValue: (selector, value) =>
    @addSelectorEvent($this = $(selector), "#{selector} can't set value", =>
      $this.value = value
      trigger($this, "input")
    )
  setHtml: (selector, html) =>
    @addSelectorEvent($this = $(selector), "#{selector} can't set html", => $this.innerHTML = html)
  click: (selector) =>
    @addSelectorEvent($this = $(selector), "#{selector} can't click", => $this.click())
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
    executeFunc = =>
      stopTimer()
      func()
    @waitEvent( =>
      now = Date.now()
      testTimer = setInterval( =>
        withInTimeFlg = Date.now() - now < @timeoutMsec
        console.assert(withInTimeFlg, """timeout for "#{selector}" selector""")
        return stopTimer() unless withInTimeFlg
        if exists
          if $(selector) then executeFunc()
        else
          unless $(selector) then executeFunc()
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

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
  addEvent: (callback, assert) =>
    assert() if typeof assert is "function"
    innerFunc = @innerFuncs[@funcNum]
    innerFunc.push(callback)
    @
  addSelectorEvent: ($this, assertionMsg, callback) =>
    @addEvent(
      () =>
        if assertionMsg
          callback()
        else
          () =>
            try
              callback()
            catch error
              console.error(error)
      ,
      (() => return console.assert($this, assertionMsg) unless $this) if assertionMsg
    )
  selectValue: (selector, value) => #未実装
  setValue: (selector, value, assertFlg = true) =>
    @addSelectorEvent(
      $this = $(selector),
      "#{selector} can't set value" if assertFlg,
      =>
        $this.value = value
        trigger($this, "input")
    )
  setHtml: (selector, html, assertFlg = true) =>
    @addSelectorEvent(
      $this = $(selector),
      "#{selector} can't set html" if assertFlg,
      => $this.innerHTML = html
    )
  click: (selector, assertFlg = true) =>
    @addSelectorEvent(
      $this = $(selector),
      "#{selector} can't click" if assertFlg is "true",
      => $this.click()
    )
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

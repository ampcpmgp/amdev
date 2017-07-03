$ = (selector) => document.querySelector(selector)
assert = require("assert")

click = ($dom) =>
  event = new MouseEvent("click")
  $dom.dispatchEvent(event)

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
  addSelectorEvent: ({selector, assertionMsg, notExists, callback = =>}) =>
    @addEvent(
      () =>
        $this = $(selector)
        if assertionMsg
          assert((if notExists then not $this else $this), "#{selector} #{assertionMsg}")
          callback($this)
        else
          try
            callback($this)
    )
  selectValue: (selector, value, assertFlg = true) =>
    @addSelectorEvent({
      selector: "#{selector} [value='#{value}']"
      assertionMsg: "can't select value" if assertFlg
      callback: =>
        $selector = $(selector)
        $selector.value = value
        trigger($selector, "change")
    })
  setValue: (selector, value, assertFlg = true) =>
    @addSelectorEvent({
      selector
      assertionMsg: "not find" if assertFlg
      callback: ($this) =>
        $this.value = value
        trigger($this, "input")
    })
  setHtml: (selector, html, assertFlg = true) =>
    @addSelectorEvent({
      selector
      assertionMsg: "can't set html" if assertFlg
      callback: ($this) =>
        $this.innerHTML = html
    })
  click: (selector, assertFlg = true) =>
    @addSelectorEvent({
      selector
      assertionMsg: "can't click" if assertFlg
      callback: ($this) =>
        click($this)
    })
  waitEvent: (callback) =>
    @funcs.push(callback)
    @
  wait: (msec) =>
    func = @_createFuncInWait()
    @waitEvent( => setTimeout(func, msec))
  exists: (selector) =>
    @addSelectorEvent({
      selector
      assertionMsg: "not exists"
    })
  notExists: (selector) =>
    @addSelectorEvent({
      selector
      notExists: true
      assertionMsg: "is exists"
    })
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
        stopTimer() unless withInTimeFlg
        assert(withInTimeFlg, """timeout for "#{selector}" selector""")
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
  end: => #扱い方を考える、現在未使用
    console.info("finished")

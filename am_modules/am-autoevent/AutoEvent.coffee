module.exports = class AutoEvent
  constructor: -> 1
  contoller: =>
    i = -1
    while (@funcs[++i])
      @inner_funcs[i].push( => @gen.next())
      yield @funcs[i]()
  register: =>
    @funcs = []
    @inner_funcs = []
    @func_num = -1
    @
  add_event: (callback) =>
    inner_func = @inner_funcs[@func_num]
    inner_func.push(callback)
    @
  set_value: (selector, value) =>
    @add_event( => document.querySelector(selector).value = value )
  set_html: (selector, value) =>
    @add_event( => document.querySelector(selector).innerHTML = value )
  click: (selector) =>
    @add_event( => document.querySelector(selector).click())
  wait_event: (callback) =>
    @funcs.push(callback)
    @
  wait: (msec) =>
    func_num = ++@func_num
    inner_func = @inner_funcs[func_num] = []
    func = =>
      func() for func in inner_func
    @wait_event( => setTimeout(func, msec))
  wait_selector: (selector, exists=true) =>
    func_num = ++@func_num
    inner_func = @inner_funcs[func_num] = []
    func = =>
      func() for func in inner_func
    testTimer = null
    stop_timer = =>
      clearInterval(testTimer)
      func()
    @wait_event( =>
      testTimer = setInterval( =>
        if document.querySelector(selector) and exists then stop_timer()
      , 100)
      )

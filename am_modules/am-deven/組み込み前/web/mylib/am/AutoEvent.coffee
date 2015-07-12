class @AutoEvent
  constructor: ->
    @funcs = []
    @gen = @auto_event()
  start: -> @gen.next()
  set_event: (callback, wait_msec) =>
    @funcs.push( =>
      setTimeout( =>
        callback()
        @gen.next()
      , wait_msec)
    )
  auto_event: ->
    num = 0
    while @funcs[num]
      yield @funcs[num++]()

### sample ###
code = =>
  @aae = new @AutoEvent()
  callback = => console.log(Date.now())
  for i in [1..10]
    @aae.set_event(callback,300)
  @aae.start()

module?.exports = @AutoEvent

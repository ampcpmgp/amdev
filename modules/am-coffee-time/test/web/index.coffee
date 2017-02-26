$ = require("jquery")

test =
  params1: (params1Val) =>
    console.assert(params1Val)
    setTimeout(=>
      $("body").scrollTop(100)
    , 100)
  _color: (selector) =>
    selector = if selector is true then "*" else selector
    $(selector).each(->
      $this = $(this)
      tagName =$this.prop("tagName")
      console.assert($this.css("background"), tagName)
    )
  _border: (selector) =>
    selector = if selector is true then "*" else selector
    $(selector).each(->
      $this = $(this)
      tagName =$this.prop("tagName")
      console.assert($this.css("border"), tagName)
    )
  test: (num) =>
    console.log "test", num
    console.assert(num)
  lang: (type) =>
    console.log(type)

require("am-coffee-time/browser/Test").start(test)

console.info("finished")

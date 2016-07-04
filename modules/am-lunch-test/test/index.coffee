$ = require("jquery")
$("body").append($(require("./tag.html")))

class SampleTest extends require("am-lunch-test")
  params1: (params1Val) =>
    console.assert(params1Val)
  _color: (selector) =>
    super(selector)
    selector = if selector is true then "*" else selector
    $(selector).each(->
      $this = $(this)
      tagName =$this.prop("tagName")
      console.assert($this.css("background"), tagName)
    )
  _border: (selector) =>
    super(selector)
    selector = if selector is true then "*" else selector
    $(selector).each(->
      $this = $(this)
      tagName =$this.prop("tagName")
      console.assert($this.css("border"), tagName)
    )
window.nt = new SampleTest()
nt.start()

console.info("finished")

$ = require("jquery")
AutoEvent = require("am-autoevent")

$("button").click( =>
  console.log 2
  )

ae = new AutoEvent()
ae.register()
  .wait(1000).click("#test").click("#test")
  .wait(1500).click("#test").set_value("#test",300)
  .wait_selector("#test").set_html("#test", 3000)
  .gen.next()

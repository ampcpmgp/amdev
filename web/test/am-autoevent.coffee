$ = require("jquery")
AutoEvent = require("am-autoevent/AutoEvent-gen")
AutoEventNoGen = require("am-autoevent/AutoEvent-no-gen")

func = (Klass) =>
  ae = new Klass()
  ae.register()
    .wait(1000).click("#test").click("#test")
    .wait(1500).click("#test").set_value("#test",300)
    .wait_selector("#test").set_html("#test", Date.now())
    .start()


$("button").click( =>
  console.log 2
  )

func(AutoEvent)
setTimeout( =>
  func(AutoEventNoGen)
, 4000)

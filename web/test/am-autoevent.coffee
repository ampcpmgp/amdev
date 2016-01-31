$ = require("jquery")
AutoEvent = require("am-autoevent/AutoEvent-gen")
AutoEventNoGen = require("am-autoevent/AutoEvent-no-gen")

func = (Klass) =>
  ae = new Klass()
  ae.register()
    .wait(1000).click("#test").click("#test")
    .wait(1500).click("#test").setValue("#input",Date.now())
    .waitSelector("#test").setHtml("#test", Date.now())
    .wait("300").addEvent(=> console.log("fin"))
    .start()


$("button").click( =>
  console.log 2
  )

func(AutoEvent)
setTimeout( =>
  func(AutoEventNoGen)
, 4000)

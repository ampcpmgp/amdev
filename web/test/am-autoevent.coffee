$ = require("jquery")
AutoEvent = require("am-autoevent")
AutoEventNoGen = require("am-autoevent/AutoEvent-no-gen")
Test = require("am-test")

do => #setup
  $("button").click( =>
    console.log 2
    )

class SampleTest extends Test
  test:  =>
    func = (Klass) =>
      ae = new Klass()
      ae.register()
        .wait(1000).click("#test").click("#test")
        .wait(1500).click("#test").setValue("#input",Date.now())
        .wait(200).click("#test2").setValue("#input2",Date.now())
        .waitSelector("#test").setHtml("#test", Date.now())
        .wait("300").addEvent(=> console.log("fin"))
        .start()
    func(AutoEvent)
    setTimeout( =>
      func(AutoEventNoGen)
    , 4000)
  global: =>
    require("am-autoevent/src/autoevent")
    console.log amAutoEvent

window.nt = new SampleTest()
nt.preStart()

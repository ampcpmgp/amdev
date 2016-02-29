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
        .click("#test").click("#test")
        .wait(1500).click("#test").setValue("#input",Date.now())
        .wait(200).click("#test2").setValue("#input2",Date.now())
        .wait("300").addEvent(=> console.log("hello"))
        .waitSelector("#test").setHtml("#test", Date.now())
        .start(3, =>
          console.log "finished!"
          func(AutoEventNoGen)
        )
    func(AutoEvent)
  global: =>
    require("am-autoevent/amAutoevent")
    console.log amAutoEvent

SampleTest::preStart()

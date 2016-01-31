```coffeescript
# generator
AutoEvent = require("am-autoevent")
# or no-generator
AutoEvent = require("am-autoevent/AutoEvent-no-gen")
ae = new AutoEvent()
ae.register()
  .wait(1000).click("#test").click("#test")
  .wait(1500).click("#test").setValue("#test",300)
  .waitSelector("#test2").setHtml("#test", 3000)
  .wait("300").addEvent(=> console.log("fin"))
  .start()
```

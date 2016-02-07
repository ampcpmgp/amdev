```coffeescript
# generator
AutoEvent = require("am-autoevent")
# or no-generator
AutoEvent = require("am-autoevent/AutoEvent-no-gen")
amAutoEvent = new AutoEvent()
# or cdn(bookmarklet)
# common
amAutoEvent.register()
  .click(selector = "#test").click("#test")
  .wait(ms = 1500).click("#test").setValue("#test",300)
  .wait("300").addEvent(() => console.log("hello"))
  .waitSelector("#test").setHtml("#test", 3000)
  .waitSelector("#test2", false).click("#test2")
  .start(num = 3, () => console.log("finished!"))
```

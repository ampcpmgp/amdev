```coffeescript
# generator
AutoEvent = require("am-autoevent")
# or no-generator
AutoEvent = require("am-autoevent/AutoEvent-no-gen")
ae = new AutoEvent()
ae.register()
  .wait(1000).click("#test").click("#test")
  .wait(1500).click("#test").set_value("#test",300)
  .wait_selector("#test2").set_html("#test", 3000)
  .start()
```

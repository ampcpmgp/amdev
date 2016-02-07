## sample code
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

## Methods
[register](#register)  
[click](#click)  
[setValue](#setValue)  
[setHtml](#setHtml)  
[addEvent](#addEvent)  
[wait](#wait)  
[waitSelector](#waitSelector)  
[start](#start)  


### #First
#### register()
initialize, and enable to set event

### #Synchronous processing

#### click(selector)
first selector clicked

#### setValue(selector, value)
first selector set value

#### setHtml(selector, value)
first selector set html

#### addEvent(callback)
add event callback function

### #Asynchronous processing, but behave synchronously
#### wait(msec)
wait millisecond

#### waitSelector(selector, existFlag = true)
if existFlag, wait dom appear, else wait dom disappear

### #Last
#### start(loopNum = 1, callback = null)
run loopNum times, and add finished event as callback

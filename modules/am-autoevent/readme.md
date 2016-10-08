# am-autoevent
The event operation of a web page, it can be little easily automated.

https://github.com/ampcpmgp/amdev/tree/master/modules/am-autoevent

## how to use
`npm i am-autoevent`

## sample code(coffeescript, or es2015 syntax)
```coffeescript
# generator
AutoEvent = require("am-autoevent")
autoEvent = new AutoEvent()

autoEvent.register()
  .click(selector = "#test").click("#test")
  .wait(ms = 1500).click("#test").setValue("#test",300)
  .wait("300").addEvent(() => console.log("hello"))
  .waitSelector("#test").setHtml("#test", 3000)
  .waitSelector("#test2", false).click("#test2")
  .start(num = 3)
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

#### click(selector, assertFlg = true)
first selector clicked, if assertFlg is true and not find selector, stop processing.

#### setValue(selector, value, assertFlg = true)
first selector set value.

#### setHtml(selector, value, assertFlg = true)
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

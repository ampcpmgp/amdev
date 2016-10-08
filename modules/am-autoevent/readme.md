# am-autoevent
The event operation of a web page, it can be little easily automated.

https://github.com/ampcpmgp/amdev/tree/master/modules/am-autoevent

## sample code(coffeescript, or es2015 syntax)
```coffeescript
# generator
AutoEvent = require("am-autoevent")
# or no-generator
AutoEvent = require("am-autoevent/browser/AutoEvent-no-gen")
autoEvent = new AutoEvent()
# or cdn(bookmarklet)
# common
autoEvent.register()
  .click(selector = "#test").click("#test")
  .wait(ms = 1500).click("#test").setValue("#test",300)
  .wait("300").addEvent(() => console.log("hello"))
  .waitSelector("#test").setHtml("#test", 3000)
  .waitSelector("#test2", false).click("#test2")
  .start(num = 3)
```


## how to use
### Preparation
#### as module
npm i am-autoevent

```js
autoEvent.register()
  .setValue("#lst-ib", "dragonball").wait(100).click("[aria-label='Google 検索']")
  .wait(2000).setValue("#lst-ib", "dragonball Z").wait(100).click("[aria-label='Google 検索']")
  .wait(2000).setValue("#lst-ib", "dragonball GT").wait(100).click("[aria-label='Google 検索']")
  .wait(2000).setHtml("h3.r + * .st", "↑↑↑をクリックし動作終了↑↑↑")
  .wait(3000).click("h3.r a")
  .start(1, () => console.log("sample completed"))
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

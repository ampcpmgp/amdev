# am-autoevent
The event operation of a web page, it can be little easily automated.

https://github.com/ampcpmgp/amdev/tree/master/modules/am-autoevent

## sample code(coffeescript, or es2015 syntax)
```coffeescript
# generator
AutoEvent = require("am-autoevent")
# or no-generator
AutoEvent = require("am-autoevent/browser/AutoEvent-no-gen")
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


## how to use
### Preparation
#### (pattern 1) as module
npm i am-autoevent

#### (pattern 2 - recommended) as bookmarklet with chrome
stability version
```js
javascript:(function()%7Bvar%20page%20%3D%20'https%3A%2F%2Fcdn.rawgit.com%2Fampcpmgp%2Famdev%2Fd827cc7dc96867580cd8b91cda3530a1ac6c3cf6%2Fmodules%2Fam-autoevent%2Fbuild%2Fautoevent.js'%3Bvar%20script%20%3D%20document.createElement('script')%3Bscript.src%20%3D%20page%3Bscript.type%3D'text%2Fjavascript'%3Bdocument.body.appendChild(script)%7D)()
```
or latest version
```js
javascript:(function()%7Bvar%20page%20%3D%20'https%3A%2F%2Frawgit.com%2Fampcpmgp%2Famdev%2Fmaster%2Fmodules%2Fam-autoevent%2Fbuild%2Fautoevent.js'%3Bvar%20script%20%3D%20document.createElement('script')%3Bscript.src%20%3D%20page%3Bscript.type%3D'text%2Fjavascript'%3Bdocument.body.appendChild(script)%7D)()
```

1. Copy the code adove
2. Ctrl+D->edit name->edit->delete URL: and paste->save
3. open target page and click
4. [to Execute](#Execute)

#### (pattern 3 - easy) as code in console
stability version
```js
var page = 'https://cdn.rawgit.com/ampcpmgp/amdev/d827cc7dc96867580cd8b91cda3530a1ac6c3cf6/modules/am-autoevent/build/autoevent.js'
var script = document.createElement('script')
script.src = page
script.type='text/javascript'
document.body.appendChild(script)
```
or latest version
```js
var page = 'https://rawgit.com/ampcpmgp/amdev/master/modules/am-autoevent/build/autoevent.js'
var script = document.createElement('script')
script.src = page
script.type='text/javascript'
document.body.appendChild(script)
```

### <p id="Execute">Execute<p>
sample with [google page](https://www.google.co.jp/webhp?hl=ja#hl=ja&q=test&btnK=Google+%E6%A4%9C%E7%B4%A2), execute the following code.

```js
amAutoEvent.register()
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

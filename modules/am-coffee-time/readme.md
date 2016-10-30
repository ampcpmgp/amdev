# am-coffee-time
Testing and development of the mock page using a router.  
this is renamed from am-lunch-time.

https://github.com/ampcpmgp/amdev/tree/master/modules/am-coffee-time

## sample code

testListPage.html
```html
<test-list></test-list>
<script src="./testListPage.js">
```

testListPage.coffee
```coffee
generate = require("am-coffee-time")
testcases =
  #event: url
  "click=.config": "/url.html"
  "click=.edit":
    "input=name,takasi": "/url.html"
    "input=age,94": "/url.html"
generate(testcases)
```

### link pages
This module watch event of console.assert.  
It will end result in an error at the time of console.assert() is false.  
All passed the test by putting the console.info after it was true ( "finished").

#### sample code
```coffee
Test = require("am-coffee-time/browser/Test")
Test.start(
  click: (type) =>
    el = document.querySelector(type)
    console.assert(el)
    el.click()
  update: ([type, value]) =>
    el = document.querySelector("input[name=#{type}]")
    console.assert(el)
    el.value = value
)

console.log(Test.actions); // action arr
console.log(Test.actionObj); // action object
console.info("finished")
```


#### sample code with autoevent
```coffee
AutoEvent = require("am-autoevent")
Test = require("am-coffee-time")

AutoEvent.register()
Test.start(
  click: (type) =>
    AutoEvent.click(type)
  update: ([type, value]) =>
    AutoEvent.setValue("input[name={type}]")
)

AutoEvent.start()
```

### Test Event has some default events.  
_color=.child   #selector set random background color   
_border=.child  #selector set random border color  
_hide=.child  # selector hide  

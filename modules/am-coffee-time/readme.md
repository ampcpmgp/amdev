# am-coffee-time
Testing and development of the mock page using a router.
this is renamed from am-lunch-time.

repository
https://github.com/ampcpmgp/amdev/tree/master/modules/am-coffee-time

sample page (Japanese)
https://ampcpmgp.github.io/amdev/modules/am-coffee-time/web/list.html


## Overview
This test tool is divided into two layers, a page displaying a list of test patterns and a page on which the test is executed, and they are executed in cooperation with each other.

### list page
This page displays the test pattern. Throwing events to mock pages and collaborating.

#### sample code

testListPage.html
```html
<test-list></test-list>
<script src="./testListPage.js">
```

testListPage.coffee
```coffee
generate = require("am-coffee-time").default
testcases =
  #event: url
  "click=.config": "/url.html"
  "click=.edit":
    "input=name,takasi": "/url.html"
    "input=age,94": "/url.html"
    "description(input=param)": "pageName(./index.html)"
  "langSwitch[ja | en | zh-cn | zh-tw]": "langPage(./lang.html)"
generate(testcases)
```

### mock pages
This module watch event of console.assert.
It will end result in an error at the time of console.assert() is false.
All passed the test by putting the console.info after it was true ("finished").

#### sample code
```coffee
Test = require("am-coffee-time/browser/Test")
assert = require("assert")

Test.start(
  click: (type) =>
    el = document.querySelector(type)
    assert(el)
    el.click()
  update: ([type, value]) =>
    el = document.querySelector("input[name=#{type}]")
    assert(el)
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
```coffee
_color=.child   #selector set random background color
_border=.child  #selector set random border color
_hide=.child  # selector hide
```

## API
### Parser
```
Parser = require("am-coffee-time/Parser")
```
#### Parser.getSingleTaskList(testPattern)
Get single task list.
example return code
```
[
  {
    "testName": "am-coffee-time/params1",
    "testUrl": "?path=am-coffee-time/params1",
    "mockName": "./index.html",
    "mockUrl": "./index.html#am-coffee-time/params1"
  },
  {
    "testName": "am-coffee-time/_color",
    "testUrl": "?path=am-coffee-time/_color",
    "mockName": "./index.html",
    "mockUrl": "./index.html#am-coffee-time/_color"
  },
  {
    "testName": "am-coffee-time/_color=.child",
    "testUrl": "?path=am-coffee-time/_color=.child",
    "mockName": "./index.html",
    "mockUrl": "./index.html#am-coffee-time/_color=.child"
  },
  ...
]
```

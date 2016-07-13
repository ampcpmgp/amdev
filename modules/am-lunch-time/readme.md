# am-lunch-time
Test development using parameters.  
this is renamed from am-lunch-test.

## sample code

testListPage.html
```html
<test-list></test-list>
<script src="./testListPage.js">
```

testListPage.coffee
```coffee
generate = require("am-lunch-time/browser/generate")
testcases =
  clickTest:
    click1: "?click1"
    click2: "?click2"
  apiTest:
    api1: "?api1"
    api2:
      newApi1: "?api2&newApi=0"
      newApi2: "?api2&newApi=1"
generate(testcases)
```

### link pages
This module watch event of console.assert.  
It will end result in an error at the time of console.assert() is false.  
All passed the test by putting the console.info after it was true ( "finished").

#### sample
```coffee
if location.search is "?click1"
  console.assert(1 + 1)
  console.assert(1 - 1, "error")
  console.info("finished")
else location.search is "?click2"
  console.assert(1 + 0)
  console.assert(1 - 0, "error")
  console.info("finished")
```

#### use Test class with am-autoevent
```coffee
Test = require("am-lunch-time")
class NewTest extends Test

newTest = new NewTest
autoEvent = Test::AutoEvent

newTest.start(
  init: =>
    @autoEvent = new @AutoEvent
    @autoEvent.register()
  click: (selector) =>
    @autoEvent.wait(100).click(selector)
  addEvent: (numStr) =>
    @autoEvent.wait(100).addEvent(=>
      num = parseInt(numStr)
      console.assert(num)
    )
)

autoEvent.start()
```

## API
TODO

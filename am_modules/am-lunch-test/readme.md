# am-lunch-test
Test development using the parameters

## sample code

testListPage.html
```html
<test-list></test-list>
<script src="./testListPage.js">
```

testListPage.coffee
```coffee
generate = require("am-lunch-test/browser/generate")
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

#### use am-autoevent
```coffee
Test = require("am-lunch-test")
class NewTest extends Test
  api2: =>
    console.assert("api successed")
  newApi: (numStr) =>
    num = parseInt(numStr)
    console.assert(num)
    console.info("finished")

NewTest::preStart()
```

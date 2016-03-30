# Test.js

## 工事中
## sample
```js
import Test from 'am-lunch-test';
class NewTest extends Test {
  params1(params1Val) {
    console.log(params1Val);
  }
}
window.nt = new NewTest();
nt.preStart();
```
```coffee
Test = require("am-lunch-test")
class SampleTest extends Test
  params1: (params1Val) =>
    console.log(params1Val)
window.nt = new SampleTest()
nt.preStart()
```

### test codeのサンプル
```coffee
console._log = console.log
console.log = (msg) =>
  console._log("new message" + msg)

console._error = console.error
console.error = (msg) =>
  console._error("new error #{msg}")
```

# Test.js

## 工事中
## sample
```
import Test from 'am-test';
class NewTest extends Test {
  params1(params1Val) {
    console.log(params1Val);
  }
}
window.nt = new NewTest();
nt.preStart();
```

### test codeのサンプル
```
console._log = console.log
console.log = (msg) =>
  console._log("new message" + msg)

console._error = console.error
console.error = (msg) =>
  console._error("new error #{msg}")
```

Test = require("am-test")
class SampleTest extends Test
  params1: (params1Val) =>
    console.log(params1Val)
window.nt = new SampleTest()
nt.preStart()

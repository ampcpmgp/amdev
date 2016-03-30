class SampleTest extends require("am-lunch-test")
  params1: (params1Val) =>
    console.log(params1Val)
window.nt = new SampleTest()
nt.preStart()

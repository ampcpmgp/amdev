class SampleTest extends require("am-test")
  params1: (params1Val) =>
    console.log(params1Val)
window.nt = new SampleTest()
nt.preStart()

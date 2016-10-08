if (true) {
  const Test = window["modules/am-coffee-time/browser/Test"]
  const AutoEvent = window["modules/am-autoevent/browser/AutoEvent-no-gen"]
  let autoEvent = new AutoEvent()
  let $ = (selector) => document.querySelector(selector)
  let actions = {
    動作フロー確認用() {
      console.log("動作フロー確認です")
    },
    結果(値) {
      if (値.match("成功")) console.assert(true)
      else if (値.match("失敗")) console.assert(false, "失敗です")
    },
    ID入力(value) {
      autoEvent
        .wait(400).setValue(`[name="id"]`, value)
    },
    PW入力(value) {
      autoEvent
        .wait(400).setValue(`[name="pw"]`, value)
        .wait(400).click('[name="check"]')
        .wait(400).addEvent(() => console.assert($("after-login"), `after-login not found`))
    }
  }
  autoEvent.register()
  Test.start(actions)
  autoEvent.start(1, () => console.info("finished"))
}

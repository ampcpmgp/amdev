if (true) {
  const Test = window["modules/am-coffee-time/browser/Test"]
  const AutoEvent = window["modules/am-autoevent/browser/AutoEvent-no-gen"]
  let actions = {
    動作フロー確認用(結果) {
      console.log("動作フロー確認です")
      if (結果.match("成功")) console.assert(true)
      else if (結果.match("失敗")) console.assert(false, "失敗です")
    },
    ログイン() {
    }
  }
  autoEvent = new AutoEvent()
  autoEvent.register()
  Test.start(actions)
  autoEvent.addEvent(() => console.info("finished")).start()
}

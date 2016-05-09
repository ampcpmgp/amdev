class SamplTest extends require("am-lunch-test")
  search: (word) =>
    console.log word
    num = word.match(/\d+/)[0] - 0.0
    console.assert(num < 3, "数値エラー")
    console.info("finished")

SamplTest::start()

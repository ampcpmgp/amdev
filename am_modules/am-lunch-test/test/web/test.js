Test.prototype.start({
  css_panic: () => {
    console.log("wonderful css panic!")
    console.info("finished");
  },
  チートプレイ: (score) => {
    console.log("cheat play after 2000ms");
    var allClick = () => {
      $enemys = document.querySelectorAll(".enemys")
      for (var i = 0; i < $enemys.length; i++) {
        $enemys[i].click()
      }
      setTimeout(finalCheck, 2000)
    }
    var finalCheck = () => {
      $scores = document.querySelectorAll(".score[name]")
      console.assert($scores.length === score-0.0, `実際のスコアは${$scores.length}、判定のスコアは${score}`)
      console.info("finished")
    }
    setTimeout(allClick, 2000)
  },
  適切な位置に来たワニを叩く: ([num, timeoutMsec]) => {
    num = num-0.0
    timeoutMsec = timeoutMsec-0.0
    var $enemys = document.querySelectorAll(".enemys")
    var timeout = () => console.assert(!num, `叩いたワニ数は${num}`)
    var test = () => {
      if (!num) return console.info("finished")
      var waniLocX = ""
      for (var i = 0; i < $enemys.length; i++) {
        var $enemy = $enemys[i];
        if ($enemy.checked) continue
        var protrudeFlg = Math.floor($enemy.getBoundingClientRect().bottom) > 330
        if (protrudeFlg) return $enemy.click(--num)
      }
    }
    setInterval(test, 50)
    setTimeout(timeout, timeoutMsec)
  }
})

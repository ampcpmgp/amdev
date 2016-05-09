var $ = (selector) => document.querySelectorAll(selector)

Test.prototype.start({
  css_panic: () => {
    console.log("wonderful css panic!")
    console.info("finished");
  },
  チートスコア: (score) => {
    console.log("cheat play after 2000ms");
    var allClick = () => {
      $enemy = $(".enemys")
      for (var i = 0; i < $enemy.length; i++) {
        $enemy[i].click()
      }
      setTimeout(finalCheck, 2000)
    }
    var finalCheck = () => {
      $scores = $(".score[name]")
      console.assert($scores.length === score-0.0, `実際のスコアは${$scores.length}、判定のスコアは${score}`)
      console.info("finished")
    }
    setTimeout(allClick, 2000)
  },
  真面目プレイ: () => {
    $enemy = $(".enemys")
    console.info("finished");
  }
})

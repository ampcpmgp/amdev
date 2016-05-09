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
      $scores = $(".score[name]")
      setTimeout(() => {
        console.assert($scores.length === score-0.0, `実際のスコアは${$scores.length}、判定のスコアは${score}`)
        console.info("finished")
      }, 2000)
    }
    setTimeout(allClick, 2000)
  }
})

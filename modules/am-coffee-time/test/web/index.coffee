$ = require("jquery")
Parser = require("am-coffee-time/Parser")
assert = require("assert")

test =
  params1: (params1Val) =>
    assert(params1Val)
    setTimeout(=>
      $("body").scrollTop(100)
    , 100)
  _color: (selector) =>
    selector = if selector is true then "*" else selector
    $(selector).each(->
      $this = $(this)
      tagName =$this.prop("tagName")
      assert($this.css("background"), tagName)
    )
  _border: (selector) =>
    selector = if selector is true then "*" else selector
    $(selector).each(->
      $this = $(this)
      tagName =$this.prop("tagName")
      assert($this.css("border"), tagName)
    )
  test: (num) =>
    console.log "test", num
    assert(num)
  lang: (type) =>
    console.log(type)
  タスクリスト一覧: =>
    testPattern = require("./test-cases.yml")
    list = Parser.getSingleTaskList(testPattern)
    answerPattern = require("./test-cases.json")
    assert(JSON.stringify(list) is JSON.stringify(answerPattern))
  int: (value) =>
    assert typeof value is "number"
  bool: (value) =>
    assert value is false
  types: ([key, value]) =>
    assert (typeof key) is "number"
    assert (typeof value) is "boolean"
  typecheck: ([string, int]) =>
    assert (typeof string) is "string"
    assert (typeof int) is "number"
  nullcheck: (data) =>
    assert data is null
  undefinedCheck: (data) =>
    assert data is undefined


require("am-coffee-time/browser/Test").start(test)

console.info("finished")

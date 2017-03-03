$ = require("jquery")
jquery_stylesheet = require("jquery-stylesheet")
jquery_stylesheet($)

getRandomColor = (opacity = 1) =>
  getRandomNum = => Math.floor(Math.random() * 256)
  "rgba(#{getRandomNum()},#{getRandomNum()},#{getRandomNum()}, #{opacity})"

actionFuncs =
  _border: (selector) =>
    selector = if selector is true or not selector then "*" else selector
    selector = selector.join(",") if typeof selector is "object"
    # TODO: ほんとは!importantを使いたい
    $.stylesheet(selector).css("box-shadow", "0px 0px 0px 1px #{getRandomColor()}")
  _color:  (selector) =>
    selector = if selector is true or not selector then "*" else selector
    selector = selector.join(",") if typeof selector is "object"
    $.stylesheet(selector).css("background", "#{getRandomColor(0.1)}")
  _hide: (selector) =>
    selector = selector.join(",") if typeof selector is "object"
    $.stylesheet(selector).css("display", "none")
  _auto: =>
    # TODO: autoevent連携
    AutoEvent: require("am-autoevent")

getValue = (arg) =>
  return arg if typeof arg isnt "object"
  arg = arg.map((val) =>
    if val.match(/^(true|false)$/)
      Boolean(val)
    else if val.match(/^\d+$/)
      Number(val)
    else
      val
    )
  if arg.length is 1 then arg[0] else arg

module.exports = class Test
  @start: (testObj = @) =>
    @actions = decodeURIComponent(location.hash.replace(/^#+/, "")).split("/")
    @actionObj = {}
    for action in @actions
      [key, value] = action.split("=")
      func = testObj[key] or @[key]
      arg = !value or value.split(",")
      func?(getValue(arg))
      actionFuncs[key]?(value)
      @actionObj[key] = value

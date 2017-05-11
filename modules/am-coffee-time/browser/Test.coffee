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

  arg = arg.map parseValue

  if arg.length is 1 then arg[0] else arg

# Regexp for double quoted values
RE_STR = /^"(.*)"$/

# Parses the single value
parseValue = (val) =>
  if RE_STR.test val
    val.match(RE_STR)[1]
  else if val is "true" then true else if val is "false" then false
  else if val is "null" then null else if val is "undefined" then undefined
  else if val.match(/^\d+$/)
    Number(val)
  else
    val

module.exports = class Test
  @start: (testObj = @) =>
    @actions = decodeURIComponent(location.hash.replace(/^#+/, "")).split("/")
    @actionObj = {}
    for action in @actions
      [key, value] = action.split("=")
      arg = !value or value.split(",")
      testObj[key]?(getValue(arg))
      actionFuncs[key]?(value)
      @actionObj[key] = value

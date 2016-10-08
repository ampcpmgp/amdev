$ = require("jquery")
jquery_stylesheet = require("jquery-stylesheet")
jquery_stylesheet($)

getRandomColor = (opacity = 1) =>
  getRandomNum = => Math.floor(Math.random() * 256)
  "rgba(#{getRandomNum()},#{getRandomNum()},#{getRandomNum()}, #{opacity})"

module.exports = class Test
  @start: (testObj = @) =>
    @actions = decodeURI(location.hash.replace(/^#+/, "")).split("/")
    @._color(@actions._color) if @actions._color?
    @._hide(@actions._hide) if @actions._hide?
    @._border(@actions._border) if @actions._border?
    @._auto(@actions._auto) if @actions._auto?
    for action in @actions
      [key, value] = action.split("=")
      func = testObj[key] or @[key]
      arg = !value or value.split(",")
      func?(if arg.length is 1 then arg[0] else arg)
  @_border: (selector) =>
    selector = if selector is true or not selector then "*" else selector
    selector = selector.join(",") if typeof selector is "object"
    # TODO: ほんとは!importantを使いたい
    $.stylesheet(selector).css("box-shadow", "0px 0px 0px 1px #{getRandomColor()}")
  @_color:  (selector) =>
    opacity = if @actions.opacity then (@actions.opacity - 0.0) else 0.1
    selector = if selector is true then "*" else selector
    selector = selector.join(",") if typeof selector is "object"
    $.stylesheet(selector).css("background", "#{getRandomColor(opacity)}")
  @_hide: (selector) =>
    selector = selector.join(",") if typeof selector is "object"
    $.stylesheet(selector).css("display", "none")
  @_auto: =>
    # TODO: autoevent連携
    AutoEvent: require("am-autoevent/browser/AutoEvent-no-gen")

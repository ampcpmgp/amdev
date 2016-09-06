$ = require("jquery")
jquery_stylesheet = require("jquery-stylesheet")
jquery_stylesheet($)

getRandomColor = (opacity = 1) =>
  getRandomNum = => Math.floor(Math.random() * 256)
  "rgba(#{getRandomNum()},#{getRandomNum()},#{getRandomNum()}, #{opacity})"

module.exports = class Test
  params: require("am-common")::getParams(location.href)
  AutoEvent: require("am-autoevent/browser/AutoEvent-no-gen")
  start: (testObj = @) =>
    testObj[key](@params[key]) for key, value of @params when typeof testObj[key] is "function"
    @._color(@params._color) if @params._color?
    @._hide(@params._hide) if @params._hide?
    @._border(@params._border) if @params._border?
    @._auto(@params._auto) if @params._auto?
  _border: (selector) =>
    selector = if selector is true or not selector then "*" else selector
    selector = selector.join(",") if (typeof selector is "object")
    $(selector).each(->
      $(this).css("box-shadow", "0px 0px 0px 1px #{getRandomColor()}")
    )
  _color:  (selector) =>
    opacity = if @params.opacity then (@params.opacity - 0.0) else 0.4
    selector = if selector is true then "*" else selector
    selector = selector.join(",") if (typeof selector is "object")
    $(selector).each(->
      $(this).css("background", "#{getRandomColor(opacity)}")
    )
  _hide: (selector) =>
    selector = selector.join(",") if typeof selector is "object"
    $ss = $.stylesheet(selector)
    $ss.css('display', 'none !important')
  _auto: =>
    # TODO: autoevent連携

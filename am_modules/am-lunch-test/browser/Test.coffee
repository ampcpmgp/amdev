$ = require("jquery")

module.exports = class Test
  params: require("am-common")::getParams(location.href)
  AutoEvent: require("am-autoevent/browser/AutoEvent-no-gen")
  start: =>
    @[key](@params[key]) for key, value of @params when typeof @[key] is "function"
    @_color(@params._color) if @params._color?
    @_hide(@params._hide) if @params._hide?
    @_border(@params._border) if @params._border?
    @_auto(@params._auto) if @params._auto?
  _getRandomColor: (opacity = 1) =>
    getRandomNum = => Math.floor(Math.random() * 256)
    "rgba(#{getRandomNum()},#{getRandomNum()},#{getRandomNum()}, #{opacity})"
  _border: (selector) =>
    selector = if selector is true or not selector then "*" else selector
    selector = selector.join(",") if (typeof selector is "object")
    getColor = @_getRandomColor
    $(selector).each(->
      $(this).css("border", "solid 1px #{getColor()}")
    )
  _color:  (selector) =>
    opacity = if @params.opacity then (@params.opacity - 0.0) else 0.4
    selector = if selector is true then "*" else selector
    selector = selector.join(",") if (typeof selector is "object")
    getColor = @_getRandomColor
    $(selector).each(->
      $(this).css("background", "#{getColor(opacity)}")
    )
  _hide: (selector) =>
    selector = selector.join(",") if typeof selector is "object"
    $(selector).hide()
  _auto: =>
    # TODO: autoevent連携

$ = unless @jQuery then require("jquery") else @jQuery

class @Test
  constructor: ->
  preStart: =>
  start: =>


module?.exports = @Test

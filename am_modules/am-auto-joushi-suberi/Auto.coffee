###
app/preload.coffee
#Test
require("am-auto-joushi-suberi")

.config.json
webPreferences:
  url: "http://cachacacha.com/GAME/JoushiSuberi/"
###
canvas = null
start = =>
  canvas = document.querySelector("canvas")
  console.log canvas
  canvas.click()

setTimeout(start, 2000)

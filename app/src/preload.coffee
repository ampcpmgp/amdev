start = ->
  #Electron
  window.ea = new (require("am-deven/app/src/electron"))
  ea.start()

document.addEventListener("DOMContentLoaded", start)

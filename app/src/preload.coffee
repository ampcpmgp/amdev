start = ->
  #Electron
  window.ea = new (require("am-deven/app/electron"))
  ea.start()

document.addEventListener("DOMContentLoaded", start)

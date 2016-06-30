start = ->
  #Electron
  window.ea = new (require("am-dev/app/ElectronApp"))
  ea.start()

document.addEventListener("DOMContentLoaded", start)

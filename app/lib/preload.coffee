start = ->
  #Electron
  window.ea = new (require("am-deven/app/ElectronApp"))
  ea.start()

document.addEventListener("DOMContentLoaded", start)

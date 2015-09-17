start = =>
  #Server
  window.np = new (require("am-deven/app/lib/NodeApp"))
  np.start()
  #Electron
  window.ea = new (require("am-deven/app/lib/ElectronApp"))
  ea.start()

document.addEventListener("DOMContentLoaded", start)

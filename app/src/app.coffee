window.na = new (require("am-node-parts"))
na.start()
#Compiler
fork = require("child_process").fork
fork("./node_modules/am-deven/app/lib/compiler").on("message",(msg) => console.log msg)
#Server
#Electron
window.ea = new (require("am-deven/app/lib/ElectronApp"))
ea.start()

#Compiler
fork = require("child_process").fork
fork("./node_modules/am-deven/app/lib/compiler").on("message",(msg) => console.log msg)

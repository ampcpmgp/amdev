fork = require("child_process").fork
fork("./test/am-compiler/compiler").on("message",(msg) => console.log msg)

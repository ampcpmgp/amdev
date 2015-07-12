fork = require("child_process").fork
fork("./lib/compiler").on("message",(msg) => console.log msg)

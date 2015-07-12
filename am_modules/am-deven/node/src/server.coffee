#Compiler
fork = require("child_process").fork
fork("#{__dirname}/compiler").on("message",(msg) => console.log msg)

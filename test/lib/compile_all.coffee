window.compile_all = =>
  exec = require("child_process").exec
  command = "coffee ./node_modules/am-deven/app/src/compile_all.coffee"
  exec(command, (e, out, err) =>
    console.log out
    )

console.log "if want to compile all, input %ccompile_all() %cin console", "color: red", "color:inherit"

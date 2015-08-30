fs = require("fs")
dirs = fs.readdirSync("./node_modules/")
window.npm_publish = (modules = dirs) =>
  exec = require("child_process").exec
  command = "npm version patch && npm publish"

  func = (command) =>
    exec(command, (e, out, err) =>
      console.log out
      )

  for module in modules
    func("cd ./node_modules/#{module} && #{command}")

console.log "if publish all modules, input %cnpm_publish() or npm_publish(#{JSON.stringify(dirs)}) %cin console", "color: red", "color:inherit"

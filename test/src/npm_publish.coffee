modules = [
  "am-deven"
  "am-common"
  "am-compiler"
  "am-node-parts"
  "am-autoevent"
]
window.npm_publish = (modules = modules) =>
  exec = require("child_process").exec
  command = "npm version patch && npm publish"

  func = (command) =>
    exec(command, (e, out, err) =>
      console.log out
      )

  for module in modules
    func("cd ./node_modules/#{module} && #{command}")

console.log "if publish all modules, input %cnpm_publish() or npm_publish(['am-deven']) %cin console", "color: red", "color:inherit"

window.npm_publish = =>
  exec = require("child_process").exec
  modules = [
    "am-deven"
    "am-common"
    "am-compiler"
    "am-node-parts"
    "am-autoevent"
  ]
  command = "npm version patch && npm publish"

  func = (command) =>
    exec(command, (e, out, err) =>
      console.log out
      )

  for module in modules
    func("cd ./node_modules/#{module} && #{command}")

console.log "if publish modules, input %cnpm_publish() %cin console", "color: red", "color:inherit"

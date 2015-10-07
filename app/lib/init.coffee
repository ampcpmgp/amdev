fs = require("fs")
exec = require("child_process").exec
#reload button
browserRestart = (e) -> require("ipc").send("restart")
$(restart).on("click", browserRestart)

#upload npm
modules = fs.readdirSync("./node_modules/")
window.npm_publish = (uploadModules = modules) ->
  command = "npm version patch && npm publish"
  console.log "npm upload start - #{uploadModules}"
  for module in uploadModules
    exec("cd ./node_modules/#{module} && #{command}", (e, out, err) -> console.log out)
$box = $(".npm-update-box")
$button = $(npmUpdateButton.content).find("button")
for module in modules
  $fragment = $(document.createDocumentFragment())
  do($button) ->
    $button = $button.clone().text(module).attr("onclick", $button.attr("onclick").replace(/!val!/, module))
    $fragment.append($button)
  $box.append($fragment)

#Compile all
window.compile_all = ->
  command = "npm run compileAll"
  exec(command)

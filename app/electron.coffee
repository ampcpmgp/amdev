$ = require("jquery")
fs = require("fs")
exec = require("child_process").exec
$(restart).on("click", (e) -> require("ipc").send("restart"))
do -> #upload npm
  modules = fs.readdirSync("./am_modules/")
  $box = $(".npm-update-box")
  $button = $(npmUpdateButton.content).find("button")
  for module in modules
    $fragment = $(document.createDocumentFragment())
    do($button) ->
      $button = $button.clone().text(module).attr("onclick", $button.attr("onclick").replace(/!val!/, module))
      $fragment.append($button)
    $box.append($fragment)
  window.npmPublish = (uploadModules = modules) ->
    command = "coffee -c ./ && npm version patch && npm publish"
    console.log "npm upload start - #{uploadModules}"
    for module in uploadModules
      exec("cd ./am_modules/#{module} && #{command}", (e, out, err) -> console.log out)

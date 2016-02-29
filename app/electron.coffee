$ = require("jquery")
fs = require("fs")
Compiler = require("am-compiler")
exec = require("child_process").exec

class ModuleCompiler extends Compiler

$(restart).on("click", (e) -> require("ipc").send("restart"))
do -> #upload npm
  browserModules =
    "am-autoevent": true
    "am-test": true
  modules = fs.readdirSync("./am_modules/")
  $box = $(".npm-update-box")
  $button = $(npmUpdateButton.content).find("button")
  for module in modules
    $fragment = $(document.createDocumentFragment())
    do($button) ->
      $button = $button
        .clone().text(module).attr("onclick", $button.attr("onclick").replace(/!val!/, module))
        .addClass(module)
      $button.addClass("browser") if browserModules[module]
      $fragment.append($button)
    $box.append($fragment)
  window.npmPublish = (uploadModules = modules) ->
    command = "coffee -c ./ &&"
    console.log "npm upload start - #{uploadModules}"
    for module in uploadModules
      dir = "./am_modules/#{module}"
      browserModuleFlg = $box.find(".#{module}").hasClass("browser")
      if browserModuleFlg
        callback = =>
          exec("cd #{dir} && npm version patch && npm publish",
            (e, out, err) -> console.log out
          )
        ModuleCompiler::compileModule(module, callback)
        console.log module
      else
        return
        exec("cd #{dir} && #{command} && npm version patch && npm publish",
          (e, out, err) -> console.log out
        )

$("button:contains(am-autoevent)").click()

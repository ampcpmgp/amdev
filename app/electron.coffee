$ = require("jquery")
webpack = require("webpack")
_ = require("lodash")

#
fs = require("fs")
#
Compiler = require("am-compiler")
exec = require("child_process").exec

# TODO: コンパイラの順番前後対策/保障をしたい。
window.electonReadFlg = true

class ModuleCompiler extends Compiler
  compile: (baseOption, moduleDir, callback) =>
    option = _.cloneDeep(baseOption)
    option.resolve.root = process.cwd()
    try
      files = fs.readdirSync(moduleDir)
      coffeeFiles = (file for file in files when file.match(/.coffee$/))
      delete option.devtool
      for coffeeFile in coffeeFiles
        option.entry = {}
        option.entry["#{moduleDir}/#{coffeeFile.replace(/\.coffee/, '')}"] = "./#{moduleDir}/#{coffeeFile}"
        yield webpack(option).run(=>
          @compileGen.next()
        )
      callback()
    catch error
      console.log error
      callback()
  compileModules: (dir, callback) =>
    compileNodeModule = => #node or electron
      @compileGen = @compile(@electronOption, "am_modules/#{dir}", callback)
      @compileGen.next()
    compileBrowserModule = => #browser
      @compileGen = @compile(@browserOption, "am_modules/#{dir}/browser", compileNodeModule)
      @compileGen.next()
    compileBrowserModule()
  _config: =>
    #minified
    @browserOption.plugins = [
      new webpack.optimize.OccurenceOrderPlugin(true)
      new webpack.optimize.DedupePlugin()
      new webpack.optimize.UglifyJsPlugin()
    ]
ModuleCompiler::_config()

$(restart).on("click", (e) -> require('electron').ipcRenderer.send("restart"))
do -> #upload npm
  modules = fs.readdirSync("./am_modules/")
  $box = $(".npm-update-box")
  $button = $(npmUpdateButton.content).find("button")
  for module in modules
    $fragment = $(document.createDocumentFragment())
    do($button) ->
      $button = $button
        .clone().text(module).attr("onclick", $button.attr("onclick").replace(/!val!/, module))
        .addClass(module)
      $fragment.append($button)
    $box.append($fragment)
  window.npmPublish = (uploadModules = modules) ->
    console.log "npm upload start - #{uploadModules}"
    ea.liveReloadStopFlg = true
    for module in uploadModules
      dir = "./am_modules/#{module}"
      callback = =>
        exec("cd #{dir} && npm version patch && npm publish",
          (e, out, err) ->
            console.log out
            ea.liveReloadStopFlg = false
        )
      ModuleCompiler::compileModules(module, callback)
  window.browserChangeReloadFlg = (e) =>
    e.target.querySelector("span").innerHTML =
      ea.liveReloadStopFlg = not ea.liveReloadStopFlg
# test caseにうつす
# $("button:contains(am-autoevent)").click()

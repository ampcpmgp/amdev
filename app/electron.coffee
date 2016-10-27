fs = require("fs")
exec = require("child_process").exec
$ = require("jquery")
webpack = require("webpack")
_ = require("lodash")
Compiler = require("../Compiler")

window.electonReadFlg = true

class ModuleCompiler extends Compiler
  @compile: (baseOption, moduleDir, callback) =>
    option = _.cloneDeep(baseOption)
    option.resolve.root = process.cwd()
    try
      files = fs.readdirSync(moduleDir)
    catch error
      return callback()
    try
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
  @compileModules: (dir, callback) =>
    compileNodeModule = => #node or electron
      @compileGen = @compile(@electronOption, "modules/#{dir}", callback)
      @compileGen.next()
    compileBrowserModule = => #browser
      @compileGen = @compile(@browserOption, "modules/#{dir}/browser", compileNodeModule)
      @compileGen.next()
    compileBrowserModule()
  @config: =>
    #minified
    @browserOption.plugins = [
      new webpack.optimize.OccurenceOrderPlugin(true)
      new webpack.optimize.DedupePlugin()
      # new webpack.optimize.UglifyJsPlugin()
    ]

ModuleCompiler.config()

$(restart).on("click", (e) -> require('electron').ipcRenderer.send("restart"))
do -> #upload npm
  modules = fs.readdirSync("./modules/")
  $box = $(".npm-update-box")
  $content = $(npmUpdateButton.content)
  for module in modules
    $fragment = $(document.createDocumentFragment())
    do($content) ->
      $content = $content.clone()
      $buttons = $content.find("button")
        .each(-> $(this).attr("onclick", $(this).attr("onclick").replace(/!val!/, module)))
        .addClass(module)
      $buttons.filter(".patch").text(module)
      $fragment.append($content)
    $box.append($fragment)
  window.npmPublish = (uploadModules, version) ->
    console.log "npm upload start - #{uploadModules}"
    ea.liveReloadStopFlg is true or toggleReloadFlgButton.click()
    for module in uploadModules
      dir = "./modules/#{module}"
      callback = =>
        return console.log "compile finished" unless ea.publishFlg
        exec("cd #{dir} && npm version #{version} && npm publish",
          (e, out, err) ->
            return console.log err if err
            console.log out
        )
      ModuleCompiler.compileModules(module, callback)
  window.browserChangeReloadFlg = (e) =>
    e.currentTarget.querySelector("span").innerHTML = ea.liveReloadStopFlg = not ea.liveReloadStopFlg
  window.browserPublishFlg = (e) =>
    e.currentTarget.querySelector("span").innerHTML = ea.publishFlg = not ea.publishFlg

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
  callback: (callback) =>
    callback() unless --@compileNum
  compile: (baseOption, moduleDir, callback) =>
    option = _._.cloneDeep(baseOption)
    option.resolve.root = process.cwd()
    try
      files = fs.readdirSync(moduleDir)
      option.entry = {}
      coffeeFiles = (file for file in files when file.match(/\.coffee$/))
      option.entry["#{moduleDir}/#{coffeeFile.replace(/\.coffee/, '')}"] = "./#{moduleDir}/#{coffeeFile}" for coffeeFile in coffeeFiles
      delete option.devtool
      webpack(option).run(=> @callback(callback))
    catch error
      @callback(callback)
  compileModules: (dir, callback) =>
    # TODO: コンパイル数チェックをもう少しスマートにしたい
    @compileNum = 2
    @compile(@browserOption, "am_modules/#{dir}/browser", callback) #browser
    @compile(@nodeOption, "am_modules/#{dir}", callback) #node
  _config: =>
    #minified
    false and @browserOption.plugins = @nodeOption.plugins = [
      new webpack.optimize.OccurenceOrderPlugin(true)
      new webpack.optimize.DedupePlugin()
      new webpack.optimize.UglifyJsPlugin()
    ]
    # external modules
    fs.readdirSync('am_modules')
      .filter((x) =>
        ['.bin'].indexOf(x) is -1
        ).forEach((mod) =>
          @nodeOption.externals[mod] = 'commonjs ' + mod
          )
ModuleCompiler::_config()

$(restart).on("click", (e) -> require("ipc").send("restart"))
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
    command = "coffee -c ./"
    console.log "npm upload start - #{uploadModules}"
    for module in uploadModules
      dir = "./am_modules/#{module}"
      callback = =>
        exec("cd #{dir} && npm version patch && npm publish",
          (e, out, err) -> console.log out
        )
      ModuleCompiler::compileModules(module, callback)
# test caseにうつす
# $("button:contains(am-autoevent)").click()

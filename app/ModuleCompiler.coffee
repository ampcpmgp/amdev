_ = require("lodash")
webpack = require("webpack")
fs = require("fs")

module.exports = class ModuleCompiler extends require("../Compiler")
  @compile: ({baseOption, moduleDir, preExt = "", callback}) =>
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
        option.entry["#{moduleDir}/#{coffeeFile.replace(/\.coffee/, preExt)}"] = "./#{moduleDir}/#{coffeeFile}"
        yield webpack(option).run(=>
          @compileGen.next()
        )
      callback()
    catch error
      console.log error
      callback()
  @compileModules: (dir, callback) =>
    compileNodeModule = => #node or electron
      baseOption = @electronOption
      moduleDir = "modules/#{dir}"
      @compileGen = @compile({baseOption, moduleDir, callback: =>
        moduleDir = "modules/#{dir}/browser"
        @compileGen = @compile({baseOption, moduleDir, callback})
        @compileGen.next()
      })
      @compileGen.next()
    compileBrowserModule = => #browser
      baseOption = @browserOption
      moduleDir = "modules/#{dir}/browser"
      preExt = ".bundle"
      @compileGen = @compile({baseOption, moduleDir, preExt, callback: compileNodeModule})
      @compileGen.next()
    compileBrowserModule()
  @config: =>
    #minified
    @browserOption.plugins = [
      new webpack.optimize.OccurrenceOrderPlugin(true)
      new webpack.optimize.DedupePlugin()
      # new webpack.optimize.UglifyJsPlugin()
    ]

ModuleCompiler.config()

CompilerSrc = require("./CompilerSrc")

fs = require("fs")
gaze = require("gaze")
babel = require("babel")
exec = require('child_process').exec

class Compiler extends CompilerSrc
  constructor: ->
    @flg =
      es6: false
      coffee: false
      sass: false
    @watch()
  check_babel: =>
    @flg.es6 = true
    @log("Compiler, babel#{babel.version}")
  check_coffee: =>
    exec("coffee -v",(e,stdout,stderr) =>
      if e then return delete @flg.coffee
      @flg.coffee = true
      @log "Compiler, #{stdout}"
    )
  check_sass: =>
    exec("sass -v",(e,stdout,stderr) =>
      if e then return delete @flg.sass
      @flg.sass = true
      @log "Compiler, #{stdout}"
    )
  check_compile: (me, filepath) ->
    for key, val of me.flg
      if not val then continue
      regex = new RegExp("\\.#{key}$")
      if filepath.match(regex)
        return me["compile_#{key}"](filepath)
  watch: =>
    me = @
    gaze(["./**/src/*.coffee", "./**/src/*.es6", "./**/src/*.sass"], (err, watcher) ->
      @on("changed", (filepath) ->
        me.check_compile(me, filepath)
      )
    )
    @check_coffee()
    @check_sass()
    @check_babel()

module.exports = Compiler

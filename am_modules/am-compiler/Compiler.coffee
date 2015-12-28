CompilerSrc = require("./CompilerSrc")

fs = require("fs")
exec = require('child_process').exec
np = new (require("am-node-parts"))

module.exports = class Compiler extends CompilerSrc
  constructor: ->
    @flg =
      coffee: false
      sass: false
  start: ->
    @watch()
  check_coffee: =>
    cmd = "./"
    exec("#{@coffee_cmd} -v",(e,stdout,stderr) =>
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
    np.watch_dir_tree("./", /\/lib\//, (loc, eventname, filename) =>
      if eventname isnt "change" then return
      if filename.match(/\.(js|map|css)$/) then return
      @check_compile(me, "#{loc}#{filename}")
    )
    @check_coffee()
    @check_sass()
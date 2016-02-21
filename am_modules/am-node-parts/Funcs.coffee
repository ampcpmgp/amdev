fs = require("fs")
isjs = require("is_js")

module.exports = class Funcs
  #about dir tree event
  ignore_regexp: /(\/node_modules\/(?!am-).+\/node_modules\/)|(\/\.[^\/]+\/)/
  check_dir_tree: (dir, pattern, callback) =>
    files = fs.readdirSync(dir)
    for file in files
      loc = "#{dir}#{file}"
      if loc.match(@ignore_regexp) then continue
      if fs.lstatSync(loc).isDirectory()
        @check_dir_tree("#{loc}/", pattern, callback)
      else
        unless loc.match(pattern) then continue
        callback(loc, file)
  watch_dir_tree: (dir, pattern, callback) =>
    files = fs.readdirSync(dir)
    for file in files
      loc = "#{dir}#{file}"
      if loc.match(@ignore_regexp) then continue
      if fs.lstatSync(loc).isDirectory()
        do (dir = "#{loc}/" ) =>
          @watch_dir_tree(dir, pattern, callback)
          if @_pattern_check(dir, pattern)
            __eventname = ""
            __filename = ""
            __time = 0
            fs.watch(dir, (eventname, filename) ->
              time = Date.now()
              # TODO: なぜfs.watchが大量イベント発行するか、確認する→仕様っぽい、chokidarあたりに寄せたい
              return if __eventname is eventname and (time - __time) < 400 and __filename is filename
              __eventname = eventname
              __time = time
              __filename = filename
              callback(dir, eventname, filename)
              )
  _pattern_check: (word, pattern) ->
    if isjs.array(pattern)
      return true for regex in pattern when word.match(regex)
    else
      return true if word.match(pattern)
    return false
  #mkdirp

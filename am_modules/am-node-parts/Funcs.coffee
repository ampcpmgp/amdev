fs = require("fs")
isjs = require("is_js")

module.exports = class Funcs
  #about dir tree event
  ignoreRegexp: /(\/node_modules\/(?!am-).+\/node_modules\/)|(\/\.[^\/]+\/)/
  checkDirTree: (dir, pattern, callback) =>
    files = fs.readdirSync(dir)
    for file in files
      loc = "#{dir}#{file}"
      if loc.match(@ignoreRegexp) then continue
      if fs.lstatSync(loc).isDirectory()
        @checkDirTree("#{loc}/", pattern, callback)
      else
        unless loc.match(pattern) then continue
        callback(loc, file)
  watchDirTree: (dir, pattern, callback) =>
    files = fs.readdirSync(dir)
    for file in files
      loc = "#{dir}#{file}"
      if loc.match(@ignoreRegexp) then continue
      if fs.lstatSync(loc).isDirectory()
        do (dir = "#{loc}/" ) =>
          @watchDirTree(dir, pattern, callback)
          if @_patternCheck(dir, pattern)
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
  _patternCheck: (word, pattern) ->
    if isjs.array(pattern)
      return true for regex in pattern when word.match(regex)
    else
      return true if word.match(pattern)
    return false
  #mkdirp

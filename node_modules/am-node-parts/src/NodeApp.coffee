Server = require("./Server")

http = require("http")
https = require("https")
fs = require("fs")
Client = require('ftp')
readline = require("readline")

class @NodeApp
  ### class ###
  Server: Server
  ### confing ###
  ignore_regexp: /(\/node_modules\/)|(\/\.[^\/]+\/)/
  constructor: (start=true)->
    if start then @init()
  init: ->
    @server = new @Server()
    @server.start() #http server, and websocket reload server, default sart
  ### library ###
  csv_to_json: (columns, csv_file, callback) =>
    require("csv-to-array")(
      file: csv_file
      columns: columns
    , callback)
  ftp_downloader: (user, pass, file, host, filepath) =>
    c = new Client()
    c.on "ready", =>
      c.get "#{file}", (err, stream) =>
        throw err if err
        stream.once "close", =>
          c.end()
        stream.pipe fs.createWriteStream(filepath)
    c.connect
      host: host
      user: user
      password: pass
  readline_func: (path, callback) =>
    rs = fs.ReadStream(path)
    rl = readline.createInterface({'input': rs, 'output': {}})
    rl.on("line", callback)
    rl.resume()
  ftp_downloader_fullpath: (url, filepath) =>
    name = url.replace(/.*\/\/([^:]+).*/, "$1")
    pass = url.replace(/.*\/\/[^:]+:([^@]+).*/, "$1")
    file = url.replace(/.*\/([^/]+$)/, "$1")
    host = url.replace(/.*@([^/]+).*/, "$1")
    @ftp_downloader(name, pass, file, host, filepath)
  downloader: (url, filepath) => #http, httpsに対応
    file = fs.createWriteStream(filepath)
    protocol = if url.match(/^https/) then https else http
    request = protocol.get(url, (response) => response.pipe(file))
  check_dir_tree: (dir, pattern, callback) =>
    files = fs.readdirSync(dir)
    for file in files
      loc = "#{dir}#{file}"
      if loc.match(@ignore_regexp) then continue
      if fs.lstatSync(loc).isDirectory()
        @check_dir_tree("#{loc}/", pattern, callback)
      else
        unless file.match(pattern) then continue
        callback(loc, file)
  watch_dir_tree: (dir, pattern, callback) =>
    files = fs.readdirSync(dir)
    for file in files
      loc = "#{dir}#{file}"
      if loc.match(@ignore_regexp) then continue
      if fs.lstatSync(loc).isDirectory()
        do (dir = "#{loc}/" ) ->
          @watch_dir_tree(dir, pattern, callback)
          if dir.match(pattern) then fs.watch(dir, callback(loc, file))


module.exports = @NodeApp

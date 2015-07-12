Common = require("am-common")

http = require("http")
https = require("https")
mime = require('mime')
sio = require('socket.io')
fs = require("fs")
gaze = require("gaze")
Client = require('ftp')
readline = require("readline")

class Server extends Common
  #config
  proj_path: "contents/proj/web"
  #module
  #info
  reload_list: []
  start: (@http_port = @http_port, @ws_port = @ws_port)->
    @app = @http.createServer((req, res) => @http_server_action(req, res))
    @ws_start()
  http_server_action: (req, res) ->
    #initial
    url = req.url.replace(/\/{2,}/, "/")
    params = @get_params url
    #modify
    url = url.replace(/\?.*$/, "")
    if url[url.length-1] is "/" then url += "index.html"
    ###get file###
    # set path
    path = "#{@proj_path}#{url}"
    # send data
    exists_flag = fs.existsSync(path)
    if exists_flag
      data = fs.readFileSync(path)
      type = mime.lookup path
      res.writeHead(200, "Content-Type": type)
      res.end(data)
    else
      res.writeHead(404)
      res.end("404 - file not found")
    ###access log###
    if url[url.length-4..url.length-1] is "html"
      ip = req.connection.remoteAddress.replace(/.*[^\d](\d+\.\d+\.\d+\.\d+$)/, "$1")
      date = new Date().toLocaleTimeString()
      console.log "#{date} #{ip} #{path}"
  ws_start: ->
    if @ws_port is @http_port
      @websocket = sio(@app)
    else
      @websocket = sio(@ws_port)
    @app.listen(@http_port)
    @websocket.on("connection", (socket) =>
      socket.on("all",=>@reload_list.push(socket))
    )
    @ws_event_reload()
  ws_event_reload: ->
    me = @
    dir = [
      "#{@proj_path}/**/*.js"
      "#{@proj_path}/**/*.html"
    ]
    gaze(dir, (err, watcher) ->
      @on("changed", (filepath) =>
        me.check_reload_list()
        me.send_reload_event(socket) for socket in me.reload_list
      )
    )
    css_dir = [
      "#{@proj_path}**/*.css"
    ]
    gaze(css_dir, (err, watcher) ->
      @on("changed", (filepath) =>
        me.check_reload_list()
        me.send_css_reload_event(socket, filepath) for socket in me.reload_list
      )
    )
  send_reload_event: (socket) => socket.emit("reload")
  send_css_reload_event: (socket,filepath) => socket.emit("css reload", fs.readFileSync(filepath, {encoding:"utf-8"}))
  check_reload_list: =>
    arr = []
    for socket, i in @reload_list
      if socket.disconnected then arr.unshift(i)
    for num in arr
      @reload_list.splice(num, 1)

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

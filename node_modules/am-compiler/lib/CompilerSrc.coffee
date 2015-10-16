exec = require("child_process").exec
execSync = require("child_process").execSync
fs = require("fs")
#vars
coffee_path = =>
  paths = [
    "./node_modules/coffee-script/bin/coffee"
    "./node_modules/am-compiler/node_modules/coffee-script/bin/coffee"
  ]
  for path in paths
    continue unless fs.existsSync(path)
    cmd = "node #{path}"
    return cmd

module.exports = class CompilerSrc
  coffee_cmd: coffee_path()
  log: (msg) ->
    try
      process.send(msg)
    catch e
      console.log(msg)
  compile_coffee: (filepath) =>
    command = "#{@coffee_cmd} -cm #{filepath}"
    exec(command, (e, stdout, stderr) =>
      if e then return @log(stderr.replace(/.*:([0-9]+:[0-9]+.*)/, "$1"))
      @log("compile #{filepath}")
    )
  compile_sass: (filepath) =>
    command = "sass #{filepath} #{filepath.replace(/sass$/, 'css')}"
    try
      exec(command, (e, stdout, stderr) =>
        if(e) then return @log(stderr)
        @log("compile #{filepath}")
        )
    catch e
      @log(e.message)

###
@compile_coffee("./src/main.coffee")
@compile_sass("./src/default.sass")
###

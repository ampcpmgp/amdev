fs = require("fs")
exec = require('child_process').exec
cmd = ""

# TODO: npm installとコンパイルを分ける
# TODO: フローはnpm install -> mix compiler
addList = (err, files) ->
  cmd += "cd node_modules/#{file}/ && npm install && cd ../../ && " for file in files
  cmd += "exit"
  console.log cmd
  console.log "child process start"
  child = exec(cmd, initFin)
initFin = (error, stdout, stderr) ->
  return console.log error if error
  return console.log stderr if stderr
  console.log stdout
  console.log "ended"
fs.readdir("./node_modules/", addList)

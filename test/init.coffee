fs = require("fs")
exec = require('child_process').exec
cmd = ""

addList = (err, files) ->
  cmd += "cd am_modules/#{file}/ && npm install --msvs_version=2013 && cd ../../ && " for file in files
  cmd += "exit"
  console.log cmd
  console.log "child process start"
  child = exec(cmd, initFin)
  child.on("data", (data) ->
    console.log data
    )
initFin = (error, stdout, stderr) ->
  return console.log error if error
  return console.log stderr if stderr
  console.log stdout
  console.log "ended"
fs.readdir("./am_modules/", addList)

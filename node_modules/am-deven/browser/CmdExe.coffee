exec = require("child_process").exec
module.exports = class CmdExe
  constructor: (@directory, @path = "browser") ->
  start: ->
    command = "start #{@directory}\\electron.exe #{@path}"
    proc = exec(command, (e, out, err) =>
      console.log e, out, err
    )
    console.log "command - \n#{command}"

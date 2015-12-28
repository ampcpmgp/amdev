# windows, process test

windowsProcessTest = ->
  #以下は順番通り
  exec = require("child_process").exec
  callback = (null)
  check = exec("SET /p confirm=test? && echo finished", callback)
  check.stdout.on("data", (data) ->
    console.log data
    check.stdin.write("ok")
    )
  check.stdin.on("error", (a,b,c) -> console.log a,b,c)
  check.stdout.on("readable", () -> console.log "stdout: readable")
  check.stdout.on("end", () -> console.log "stdout: end")
  callback = (err, stdout, stdin) -> console.log err, stdout, stdin

  #順番は入れ替わる
  check.on("close", (a,b,c) -> console.log a,b,c)
  check.stdout.on("close", (a,b,c) -> console.log a,b,c)

  #謎のタイミング
  check.stdin.on("finish", () -> console.log "%cfin", "color: red")

  #発火しない
  check.on("disconnect", (a,b,c) -> console.log a,b,c)
  check.on("message", (a,b,c) -> console.log a,b,c)
  check.stdin.on("drain", (a,b,c) -> console.log a,b,c)
  check.stdin.on("pipe", (a,b,c) -> console.log a,b,c)
  check.stdin.on("unpipe", (a,b,c) -> console.log a,b,c)
  check.stdout.on("error", (a,b,c) -> console.log a,b,c)

#windowsProcessTest()

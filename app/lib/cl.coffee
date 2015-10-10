#config
interval = 5 * 60000 / 60
#vars
exec = require("child_process").exec
check = -> do(check) ->
  check = exec("git pull origin")
  check.stdout.on("data", (data) ->
    console.log data
    unless data.match("Already up-to-date")
      exec("npm i && npm run restart", (e,o,i) -> console.log(e,o,i))
    cl()
  )
cl = -> setTimeout(check, interval)
#exe
cl()

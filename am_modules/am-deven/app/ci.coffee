cson = require("cson")
config = cson.load(".config.cson")
#config
console.log new Date(), "process start"
interval = config.ci * 60000# / 60  # テスト時は５秒に１回
#vars
execSync = require("child_process").execSync
exec = require("child_process").exec
proc = null
#commands
json = require("fs").readFileSync("./package.json", {encoding: "utf-8"})
commands = JSON.parse(json).scripts
start = ->
  preproc = execSync(commands.compile, {encoding:"utf-8"})
  console.log preproc
  proc = exec(commands["start:server"])
    .once("close", => start())
    .stdout.on("data", (data) ->
      console.log data
    )
check = ->
  try
    reply = execSync("git pull origin", {encoding:"utf-8"})
  catch error
    console.log error
    return
  console.log new Date(), reply
  unless reply.match("Already up-to-date")# or false #強制稼働
    console.log new Date(), "process exit"
    proc.kill()
cl = -> setInterval(check, interval)
#exe
cl()
start()

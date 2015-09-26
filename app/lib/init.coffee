### TODO: vanillajsを使いやすい名前に変えたい
on = addEventListener
off = removeEventListner
####

browserRestart = (e) -> require("ipc").send("restart")
restart.addEventListener("click", browserRestart)

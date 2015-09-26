browserRestart = (e) -> require("ipc").send("restart")
$(restart).on("click", browserRestart)

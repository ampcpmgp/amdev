$ = require("jquery")
global.riot = require("riot")

require("./npm-modules.tag")
window.APP =
  liveReloadStopFlg: false
  publishFlg: true

$(restart).on("click", (e) -> require('electron').ipcRenderer.send("restart"))
window.browserChangeReloadFlg = (e) =>
  e.currentTarget.querySelector("span").innerHTML = APP.liveReloadStopFlg = not APP.liveReloadStopFlg
window.browserPublishFlg = (e) =>
  e.currentTarget.querySelector("span").innerHTML = APP.publishFlg = not APP.publishFlg

riot.mount('*')

fs = require("fs")
fse = require("fs-extra")
dir = "template"
fs.renameSync("electron", "node_modules/am-dev/template/electron/")
fs.renameSync("app", "node_modules/am-dev/template/app/")
fs.renameSync("web", "node_modules/am-dev/template/web/")
fs.renameSync("#{dir}/electron", "electron")
fs.renameSync("#{dir}/app", "app")
fs.renameSync("#{dir}/web", "web")
fse.removeSync(dir)
console.log "fin"

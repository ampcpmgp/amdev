fs = require("fs")
fse = require("fs-extra")
dir = "template"
fs.renameSync("browser", "node_modules/am-deven/template/browser/")
fs.renameSync("app", "node_modules/am-deven/template/app/")
fs.renameSync("web", "node_modules/am-deven/template/web/")
fs.renameSync("#{dir}/browser", "browser")
fs.renameSync("#{dir}/app", "app")
fs.renameSync("#{dir}/web", "web")
fse.removeSync(dir)
console.log "fin"

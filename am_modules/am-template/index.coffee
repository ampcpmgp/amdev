# TODO: yo検討。gitignoreが強引すぎ。
f = require("fs")
fs = require('fs-extra')
path = process.cwd()
templatePath = path + "/node_modules/am-template/template/"
module.exports = (_path) =>
  templatePath += _path + "/"
  fs.copySync(templatePath, path)
  f.renameSync(path+"/.gitignoresrc", path+"/.gitignore")

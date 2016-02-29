template = require("./src/template.html")

html = ""

recursive = (key, value) =>
  if typeof value is "object"
    # recursive(key, value)
  else
    generateHtml(key, value)
generateHtml = (key, value, depth = 0) =>
  html += template
    .replace("{marginLeft}", depth * 8)
    .replace("{type}", key)
    .replace(/\{link\}/g, value)


module.exports = (obj) =>
  recursive(key, value)  for key, value of obj
  box = document.createElement("div")
  box.innerHTML = html
  document.querySelector("body").appendChild(box)

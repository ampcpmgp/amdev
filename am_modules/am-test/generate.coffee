template = require("./src/template.html")

html = ""

recursive = (key, value, depth) =>
  if typeof value is "object"
    for key2, value2 of value
      recursive(key2, "", depth) if typeof value2 is "object"
      recursive(key2, value2, depth + 1)
  else
    generateHtml(key, value, depth)
generateHtml = (key, value, depth) =>
  html += template
    .replace("{marginLeft}", depth * 8)
    .replace("{type}", key)
    .replace(/\{link\}/g, value)


module.exports = (obj) =>
  recursive(key, value, 0)  for key, value of obj
  box = document.createElement("div")
  box.innerHTML = html
  document.querySelector("body").appendChild(box)

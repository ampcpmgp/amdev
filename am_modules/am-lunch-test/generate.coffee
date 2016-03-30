template = require("./src/template.html")
escape = require("escape-html")

html = ""

recursive = (key, value, depth) =>
  if typeof value is "object"
    recursive(key, "", depth)
    recursive(key2, value2, depth + 1) for key2, value2 of value
  else
    generateHtml(key, value, depth)
generateHtml = (key, value, depth) =>
  html += template
    .replace("{marginLeft}", depth * 8)
    .replace("{type}", key)
    .replace(/\{link\}/g, escape(value))


module.exports = (obj) =>
  recursive(key, value, 0)  for key, value of obj
  box = document.createElement("div")
  box.innerHTML = html
  document.querySelector("body").appendChild(box)

start = =>
  global.riot = require("riot")
  require("./index.tag")
  riot.mount('*')

document.addEventListener("DOMContentLoaded", start)

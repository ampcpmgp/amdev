start = =>
  global.riot = require("riot")
  require("./index")
  riot.mount('*')

document.addEventListener("DOMContentLoaded", start)

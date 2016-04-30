window.riot = require("riot")
escape = require("escape-html")
require("./src/test-list.tag")
require("./src/test-iframe.tag")
testCases = []
html = ""

recursive = (key, value, pageLink, depth) =>
  if typeof value is "object"
    recursive(key, "", key, depth)
    recursive(key2, value2, "#{key}/#{key2}", depth + 1) for key2, value2 of value
  else
    testCases.push({key, value, pageLink, depth})

module.exports = (obj) =>
  recursive(key, value, key, 0)  for key, value of obj
  riot.mount("test-list", {testCases})
  riot.mount("test-iframe")

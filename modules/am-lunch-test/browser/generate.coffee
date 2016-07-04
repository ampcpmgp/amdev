window.riot = require("riot")
escape = require("escape-html")
require("../src/test-list.tag")
require("../src/test-iframe.tag")
testCases = null
iframeObj = {}

recursive = (key, value, pageLink, depth) =>
  if typeof value is "object"
    recursive(key, "", pageLink, depth)
    recursive(key2, value2, "#{pageLink}/#{key2}", depth + 1) for key2, value2 of value
  else
    testCases.push({key, value, pageLink, depth})

module.exports = (obj) =>
  testCases = []
  recursive(key, value, key, 0)  for key, value of obj
  {
    list: riot.mount("test-list", {testCases})
    iframe: riot.mount("test-iframe", iframeObj)
  }

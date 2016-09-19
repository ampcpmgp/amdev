window.riot = require("riot")
escape = require("escape-html")
require("../src/test-list.tag")

module.exports = (testPatterns) =>
  {
    list: riot.mount("test-list", {testPatterns})
  }

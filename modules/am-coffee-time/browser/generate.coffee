window.riot = require("riot")
WholeStatus = require("../src/Status")
require("../src/test-list.tag")

module.exports = (testPatterns, actions = null) =>
  WholeStatus.actions = actions if actions
  {
    list: riot.mount("test-list", {testPatterns})
  }

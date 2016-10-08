window.riot = require("riot")
WholeStatus = require("../src/Status")
require("../src/test-list.tag")

module.exports = (testPatterns, opts = {}) =>
  WholeStatus.opts = opts
  {
    list: riot.mount("test-list", {testPatterns})
  }

window.riot = require("riot")
Status = require("../src/Status")
require("../src/test-list.tag")

module.exports = (testPatterns, opts = {}) =>
  Status.opts = opts
  {
    list: riot.mount("test-list", {testPatterns})
  }

require("../electron")
root.riot = require("riot")

Common = require("am-common")
params = Common::getParams(location.href)
do =>
  if params["am-simple-server"] then require("am-simple-server/test/server")
  else
    generate = require("am-lunch-test/generate")
    testcases = require("./case.cson")
    generate(testcases)

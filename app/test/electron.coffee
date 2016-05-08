require("../electron")
root.riot = require("riot")

Common = require("am-common")
params = Common::getParams(location.href)

do =>
  # TODO: サーバー側はrequireを動的に扱いたい
  if params["am-simple-server"] then require("am-simple-server/test/server")
  else if params["am-lunch-test"] then require("am-lunch-test/test/server")
  else
    generate = require("am-lunch-test/browser/generate")
    testcases = require("./case.cson")
    generate(testcases)

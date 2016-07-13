require("../electron")
global.riot = require("riot")

Common = require("am-common")
params = Common::getParams(location.href)

do =>
  # TODO: サーバー側はrequireを動的に扱いたい
  if params["am-simple-server"] then require("am-simple-server/test/server")
  else if params["am-lunch-time"] then require("am-lunch-time/test/server")
  else
    generate = require("am-lunch-time/browser/generate")
    testcases = require("./case.cson")
    generate(testcases)

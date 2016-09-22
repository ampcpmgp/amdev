require("../electron")
global.riot = require("riot")

Common = require("am-common")
params = Common::getParams(location.href)

do =>
  # TODO: サーバー側はrequireを動的に扱いたい
  if params["am-simple-server"] then require("am-simple-server/test/server")
  else if params["am-coffee-time"] then require("am-coffee-time/test/server")
  else
    generate = require("am-coffee-time/browser/generate")
    testcases = require("./case.yml")
    generate(testcases)

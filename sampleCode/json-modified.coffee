fs = require("fs")
Funcs = require("am-node-parts/Funcs").prototype
Funcs.checkDirTree("./api/", /.*/,
  (loc, file) ->
    try
      json = JSON.parse(fs.readFileSync(loc))
      throw Error(1) unless json.results
    catch error
      return
    newJson =
      dto: json.results.resultsData
      results:
        code: json.results.returnCode
        message: json.results.errMsg
    console.log file, json, newJson

    # fs.writeFile(loc, JSON.stringify(newJson, null, "  ") + "\n", {encoding: "utf-8"})
)

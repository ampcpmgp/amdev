fs = require("fs")
np = new (require("am-node-parts"))

sampleCode = ->
  #server
  np.server.start()
  #readline
  np.readline_func("./package.json", (line) -> console.log(line))
  #check dir
  np.check_dir_tree("./", /coffee$/, (loc, file) -> console.log(loc))
  #watch dir tree
  np.watch_dir_tree("./", /\/src\//, (loc, eventname, filename) ->
    return if eventname isnt "change" # else rename
    console.log(loc, eventname, filename))
  watch_sample_code = ->
    setTimeout( ->
      fs.writeFileSync("./test/src/1.txt")
      fs.unlinkSync("test/src/1.txt")
    , 1500)

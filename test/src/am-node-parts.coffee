fs = require("fs")
np = new (require("am-node-parts"))

sampleCode = =>
  #server
  np.server.start()
  # csv to array
  np.csv_to_json([1,2,3,4,5], "./test/data/test.csv", (err, arr) => console.log(arr))
  #readline
  np.readline_func("./package.json", (line) => console.log(line))
  #check
  #np.ignore_regexp =  /(\/node_modules\/)|(\/\.[^\/]+\/)/
  #check dir
  np.check_dir_tree("./", /coffee$/, (loc, file) => console.log(loc))
  #watch dir tree
  np.watch_dir_tree("./", /\/src\//, (loc, eventname, filename) =>
    return if eventname isnt "change" # else rename
    console.log(loc, eventname, filename))
  watch_sample_code = =>
    setTimeout( =>
      fs.writeFileSync("./test/src/1.txt")
      fs.unlinkSync("test/src/1.txt")
    , 1500)

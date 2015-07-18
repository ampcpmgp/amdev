fs = require("fs")
window.na = new (require("am-node-parts"))


sampleCode = =>
  #server
  na.server.start()
  # csv to array
  na.csv_to_json([1,2,3,4,5], "./test/data/test.csv", (err, arr) => console.log(arr))
  #readline
  na.readline_func("./package.json", (line) => console.log(line))
  #check
  #na.ignore_regexp =  /(\/node_modules\/)|(\/\.[^\/]+\/)/
  #check dir
  na.check_dir_tree("./", /coffee$/, (loc, file) => console.log(loc))
  #watch dir tree
  na.watch_dir_tree("./", /\/src\//, (loc, eventname, filename) => console.log(loc, eventname, filename))
  setTimeout( =>
    fs.writeFileSync("./test/src/1.txt")
    fs.unlinkSync("test/src/1.txt")
  , 1500)

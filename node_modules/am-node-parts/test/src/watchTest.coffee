NodeApp = require("./lib/NodeApp")

na = new NodeApp()

na.server.start()
na.csv_to_json([1,2,3,4,5], "./data/test.csv", (err, arr) => console.log(arr))
na.readline_func("./contents/index.html", (line) => console.log(line))
na.jsdom_check("./contents/index.html", (errors, _window) => {
  if(errors) throw errors
  dom = _window.$("title")
  word = ""
  dom.each( function(e) {word += $(this).text() + "\n"} )
  console.log(word)
  # _window.close() # error
  })
  this.check_dir_tree("./", /coffee$/, (loc, file) => console.log(loc))

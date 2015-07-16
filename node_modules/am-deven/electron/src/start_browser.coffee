Browser = new require("./Browser")
cson = require("cson")
config = cson.load('config.cson')
new Browser(config.electron_indexfile).start()

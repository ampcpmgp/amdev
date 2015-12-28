Browser = require("am-deven/browser/Browser2")
browser = new Browser()
browser.init().start("/app/index.html")

#prev ver
# browser = new (require("am-deven/browser/Browser"))
# browser.start() #execute app/index.html
# new Browser("https://google.co.jp").start() #preload path, display homepage

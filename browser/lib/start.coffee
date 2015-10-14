Browser = require("am-deven/browser/lib/Browser2")
browser = new Browser()
browser.init().start("/app/index.html")

#prev ver
# browser = new (require("am-deven/browser/lib/Browser"))
# browser.start() #execute app/index.html
# new Browser("https://google.co.jp").start() #preload path, display homepage

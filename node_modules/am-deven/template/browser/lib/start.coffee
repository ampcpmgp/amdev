Browser = new require("am-deven/browser/lib/Browser")
# new Browser("app/index.html").start() #execute app/index.html
new Browser("app/index.html", "/app/lib/app.js").start("https://google.co.jp") #preload path, display homepage

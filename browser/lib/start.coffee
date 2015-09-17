Browser = new require("am-deven/browser/lib/Browser")
# new Browser("app/index.html").start() #execute app/index.html
new Browser("app/index.html", "/app/lib/external_app.js").start("https://google.co.jp") #preload path, display homepage

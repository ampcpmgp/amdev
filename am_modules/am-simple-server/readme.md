```coffee
SimpleServer = require("../SimpleServer")
# set server web dir
SimpleServer::webDir = [ #default is "./web"
  "./web"
  "./test"
]
SimpleServer::watchDir = [ #default is "./web/index.html, ./web/.build/client.js"
  "./web/*.html"
  "./test/"
]
SimpleServer::start(httpPort = 8080, webSocketPort = 8081) # default is 8080
```

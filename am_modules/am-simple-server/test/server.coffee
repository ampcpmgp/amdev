SimpleServer = require("../SimpleServer")
# TODO: clientにつながることを確認する必要がある。e2eか連携
SimpleServer::webDir = [
  "./web"
  "./test"
]
SimpleServer::watchPath = [
  "./package.json"
]
SimpleServer::start()
SimpleServer::start(8081)

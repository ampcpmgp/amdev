np = new (require("am-node-parts"))
np.server.http_port = 8081 # http(s) port, default 8080
np.server.ws_port = 8081 # websocket port, default 8080
np.start()

NodeClient = require("am-deven/web/NodeClient")
console.log "client start"
nc = new NodeClient()
# TODO: portは可能であればサーバーと共通なので外から設定したい。
nc.ws_port = 8081 # default 8080
nc.start()

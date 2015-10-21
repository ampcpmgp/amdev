@nc = new @NodeClient()
# TODO: portは可能であれば外から設定したい。
@nc.ws_port = 8081 # default 8080
@nc.start()
console.log "client start"

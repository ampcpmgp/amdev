module.exports = class Server
  NodeParts: require("am-node-parts").prototype
  GitHubAPI: require("./GitHubAPI").prototype
  start: =>
    @NodeParts.start()

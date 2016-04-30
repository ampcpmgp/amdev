module.exports = class Common
  params: null
  hashs: null
  hashSeparator: "/"
  getParams: (url = location.search) =>
    return @params if @params
    url = decodeURI(url) if decodeURI
    query = url.replace(/.*\?([^#]*)$/, "$1")
    @params = {}
    unless url is query
      for val in query.split("&")
        param = val.split("=")
        val = param[1]
        if val?
          if val.match "," then val = val.split ","
        else
          val = true
        @params[param[0]] = val
    @params
  getHash: (url = location.hash) =>
    hash = url.replace(/.*\#(.*)$/, "$1")
    @hashs = []
    unless url is hash
      @hashs.push(val) for val in hash.split(@hashSeparator)
    @hashs

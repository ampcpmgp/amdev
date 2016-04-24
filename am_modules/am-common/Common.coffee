module.exports = class Common
  params: null
  getParams: (url = location.href) =>
    return @params if @params
    url = decodeURI(url) if decodeURI
    query = url.replace(/.*\?(.*)$/, "$1")
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

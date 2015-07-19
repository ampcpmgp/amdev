class @CommonJs
  http_port: 8080
  ws_port: 8080 #50000
  get_params: (url) ->
    params = {}
    query = url.replace(/.*\?(.*)$/, "$1")
    if url is query then return params
    else
      for val in query.split("&")
        param = val.split("=")
        val = param[1]
        if val
          if val.match "," then val = val.split ","
        else
          val = 1
        params[param[0]] = val
      params

module?.exports = @CommonJs

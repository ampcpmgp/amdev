$ = require("jquery")
NodeClient = require("am-deven/web/NodeClient")
nc = new NodeClient()
nc.start()

switch location.pathname
  when "/test/am-autoevent.html" then require("./test/am-autoevent")
  when "/"
    #generate link
    for a in $("a")
      $a = $(a)
      href = "#{$(a).attr("href")}?ws"
      $a.attr("href", href).text(href)

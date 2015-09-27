ac = new (require("am-common"))
#check params
check_params = ->
  params = ac.get_params("http://localhost:8080/?a%E3%81%82=i%E3%81%84&%E9%AD%9A=%E9%AF%9B%E9%B1%97%E9%B0%88&%E6%B5%B7")
  console.log params

check_params()

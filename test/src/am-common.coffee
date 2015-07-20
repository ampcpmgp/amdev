ac = new (require("am-common"))
#check params
check_params = =>
  params = ac.get_params("http://localhost:8080/?a%E3%81%82%E3%81%82%E3%81%82=aaaaaa%E3%81%82%E3%81%B5%E3%81%81%E3%81%B5%E3%81%81%EF%BD%97%E3%81%B5%E3%81%81%EF%BD%97&a3423o4%EF%BD%97%E3%81%98%E3%82%87%E3%81%B5%E3%81%81%EF%BD%86%EF%BD%86%EF%BD%8C%EF%BD%8B%EF%BD%83%EF%BD%8C%EF%BC%9B%E3%81%88%EF%BD%86&a%E3%81%82%E9%AD%9A%E9%AF%9B%E9%B1%97%E9%B0%88")
  console.log params

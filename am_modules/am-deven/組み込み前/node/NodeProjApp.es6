import NodeApp from "../../nodejs/NodeApp.js"
export default class NodeProjApp extends NodeApp {
  constructor(){
    super()
    console.log("node proj start");
  }
}

let sample_code = () => {
  this.server.start()
  this.csv_to_json([1,2,3,4,5], "./data/test.csv", (err, arr) => console.log(arr))
  this.readline_func("./contents/index.html", (line) => console.log(line))
  // this.jsdom_check("./contents/index.html", (errors, _window) => {
  this.jsdom_check("http://www.homes.co.jp/chintai/tokyo/akihabara_00592-st/list/?page=1", (errors, _window) => {
    if(errors) throw errors
    let dom = _window.$("title")
    let word = ""
    dom.each( function(e) {word += $(this).text() + "\n"} )
    console.log(word)
    // _window.close() // error
  })
  this.check_dir_tree("./", /coffee$/, (loc, file) => console.log(loc))
}

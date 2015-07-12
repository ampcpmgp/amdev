import NodeApp from "am-node-parts"
import CompilerSrc from "./CompilerSrc"

export default class CompileAll extends CompilerSrc {
  constructor(){
    super(false)
    NodeApp.prototype.check_dir_tree("./", /\.(es6|coffee|sass)$/, (loc, file) => {
      if(file.match(/es6$/))          this.compile_es6(loc)
      else if (file.match(/coffee$/)) this.compile_coffee(loc)
      else if (file.match(/sass$/))   this.compile_sass(loc)
    })
  }
}

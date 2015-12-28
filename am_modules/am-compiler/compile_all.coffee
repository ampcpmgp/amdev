NodeApp = require("am-node-parts/NodeApp")
CompilerSrc = require("./CompilerSrc")
np = new NodeApp

class CompileAll extends CompilerSrc
  constructor: ->
    super(false)
  start: ->
    # TODO: compile前ファイルは一括でどこかで登録する
    np.check_dir_tree("./", /.*\.(coffee|sass)$/, (loc, file) =>
      if file.match(/coffee$/) then @compile_coffee(loc)
      else if file.match(/sass$/)  then @compile_sass(loc)
      )

ca = new CompileAll()
ca.start()

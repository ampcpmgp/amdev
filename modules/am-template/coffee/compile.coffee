fse = require("fs-extra")

module.exports = (Compiler) =>
  class AmCompiler extends Compiler
    checkNum: 0
    electronStart: =>
      cmd = fse.readJsonSync("package.json").scripts.electron
      require("child_process").exec(cmd)
    callback: (err, stats) =>
      super(err, stats)
      return console.log(err) if (err)
      # TODO: コンパイル数をチェックする以外の方法にしたい
      @electronStart() if (++@checkNum is 3)
    start: =>
      @electronOption.entry = {}
      @nodeOption.entry = {}
      @browserOption.entry = {}
      require("glob").sync(
        "./**/@(electron|app)/test/*.coffee"
        , {ignore: "**/node_modules/**"}
      ).forEach((filepath) => @electronOption.entry[filepath.replace(/\.coffee$/, "").replace(/^\.\//, "")] = filepath)
      require("glob").sync(
        "./**/node/test/*.coffee"
        , {ignore: "**/node_modules/**"}
      ).forEach((filepath) => @nodeOption.entry[filepath.replace(/\.coffee$/, "").replace(/^\.\//, "")] = filepath)
      require("glob").sync(
        "./**/web/test/*.coffee"
        , {ignore: "**/node_modules/**"}
      ).forEach((filepath) => @browserOption.entry[filepath.replace(/\.coffee$/, "").replace(/^\.\//, "")] = filepath)
      super()

  AmCompiler::start()

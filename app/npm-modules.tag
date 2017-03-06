<npm-modules>
  <div class="">
    npm modules:
  </div>
  <div class="module" each={moduleName in modules}>
    <div class="name-box">
      <span class="name">{moduleName}</span>
      <button type="button" name="button" data-name={moduleName} onclick={yarn}>yarn</button>
    </div>
    <div class="update">
      version update:
      <button type="button" data-type="patch" data-name={moduleName} onclick={npmPublish}>patch</button>
      <button type="button" data-type="minor" data-name={moduleName} onclick={npmPublish}>minor</button>
      <button type="button" data-type="major" data-name={moduleName} onclick={npmPublish}>major</button>
    </div>
  </div>
  <style type="less">
    > .module {
      border: 1px solid #ccc;
      > .name-box {
        .name {
          display: inline-block;
          padding: 0 6px;
          border: 1px solid deepskyblue;
          border-radius: 20px;
        }
      }
    }
  </style>
  <script type="coffee">
    exec = require("child_process").exec
    fs = require("fs")
    ModuleCompiler = require("./ModuleCompiler")
    Status = require("./Status")
    getDirName = (moduleName) => "./modules/#{moduleName}"
    @modules = fs.readdirSync("./modules/")
    @yarn = (e) =>
      exec(
        "cd #{getDirName(e.currentTarget.dataset.name)} && yarn",
        (e, out, err) =>
          return console.log err if err
          console.log out
      )
    @npmPublish = (e) =>
      moduleName = e.currentTarget.dataset.name
      type = e.currentTarget.dataset.type
      Status.liveReloadFlg is true and Status.toggleliveReloadFlg()
      callback = =>
        return console.log "compile finished. and not publish." unless Status.publishFlg
        exec("cd #{getDirName(moduleName)} && npm version #{version} && npm publish",
          (e, out, err) =>
            return console.log err if err
            console.log out
        )
      ModuleCompiler.compileModules(moduleName, callback)
  </script>
</npm-modules>

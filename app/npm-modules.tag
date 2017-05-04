<npm-modules>
  <div class="">
    npm modules:
  </div>
  <div class="module" each={moduleName in modules}>
    <div class="name-box">
      <span class="name">{moduleName}</span>
      <button if={exsitsGhPage(moduleName)} class="gh-pages" data-name={moduleName} onclick={openBrowserForGhPage}>
        gh-page
      </button>
      <button if={false} type="button" name="button" data-name={moduleName} onclick={yarn}>yarn</button>
    </div>
    <section class="test">
      test:
      <button class="browser" if={exsitsBrowserModule(moduleName)} data-name={moduleName} onclick={openBrowser}>
        browser
      </button>
      <a class="browser" if={exsitsAppModule(moduleName)} href={getAppTestLinkPage(moduleName)}>
        app
      </a>
    </section>
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
        > .name {
          display: inline-block;
          padding: 0 6px;
          border: 1px solid deepskyblue;
          border-radius: 20px;
        }
      }
      > section.test {
        > button.browser {
          background: rgba(255, 255, 0, 0.4);
        }

      }
    }
  </style>
  <script type="coffee">
    fs = require("fs")
    {shell} = require("electron")
    exec = require("child_process").exec
    ModuleCompiler = require("./ModuleCompiler")
    Status = require("./Status")
    getBrowserTestPage = (moduleName) => "#{@getDirName(moduleName)}/test/web/list.html"
    getAppTestPage = (moduleName) => "#{@getDirName(moduleName)}/test/app/list.html"
    getGhPage = (moduleName) => "#{@getDirName(moduleName)}/web/index.html"
    @getDirName = (moduleName) => "./modules/#{moduleName}"
    @exsitsBrowserModule = (moduleName) => fs.existsSync(getBrowserTestPage(moduleName))
    @exsitsGhPage = (moduleName) => fs.existsSync(getBrowserTestPage(moduleName))
    @exsitsAppModule = (moduleName) => fs.existsSync(getAppTestPage(moduleName))
    @getAppTestLinkPage = (moduleName) => ".#{getAppTestPage(moduleName)}"
    @openBrowser = (e) =>
      shell.openExternal("http://localhost:#{ea.config.server.port}/#{getBrowserTestPage(e.currentTarget.dataset.name)}")
    @openBrowserForGhPage = (e) =>
      shell.openExternal("http://localhost:#{ea.config.server.port}/#{getGhPage(e.currentTarget.dataset.name)}")
    @modules = fs.readdirSync("./modules/")
    @yarn = (e) =>
      exec(
        "cd #{@getDirName(e.currentTarget.dataset.name)} && yarn",
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
        exec("cd #{@getDirName(moduleName)} && npm version #{type} && npm publish",
          (e, out, err) =>
            return console.log err if err
            console.log out
        )
      ModuleCompiler.compileModules(moduleName, callback)
  </script>
</npm-modules>

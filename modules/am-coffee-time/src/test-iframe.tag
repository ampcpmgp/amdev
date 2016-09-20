<test-iframe>
  <span class={isIos ? 'ios' : 'no-ios'}>
    <iframe if={!isElectron} src={opts.url}></iframe>
    <webview if={isElectron} src={opts.url} nodeintegration></webview>
  </span>
  <style scoped>
    .ios {
      display: block;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    iframe, webview {
      background-color: white;
      border: none;
      width: 100%;
      height: 100%;
    }
    .no-ios iframe, .no-ios webview {
      position: fixed;
      left: 0px;
      top: 0px;
    }
  </style>
  <script type="coffee">
    @isIos = require("is_js").ios()
    @isElectron = process?.versions?.electron
    @addScript = =>
    @setConsoleEvent = (callbackObj) =>
      if @isElectron
        webview = @root.querySelector("webview")
        webview.removeEventListener("console-message", @_tmp_Function)
        @_tmp_Function = (e) =>
          if e.level is 2 then callbackObj.assert(false, e.message)
          if e.level is 0 then callbackObj.info(e.message)
        webview.addEventListener("console-message", @_tmp_Function)
        # TODO: electronでもjs更新イベント設定
        #webview.addEventListener("did-finish-load", @_tmp_Function)
      else # browser
        iframeWindow = @root.querySelector("iframe").contentWindow
        iframeWindow.console.assert = (flg, msg) => callbackObj.assert(flg, msg)
        iframeWindow.console.info = (msg) => callbackObj.info(msg)
        return unless @opts.config.extFile
        iframeWindow.addEventListener("load", =>
          script = iframeWindow.document.createElement('script')
          script.src = "#{@opts.config.extFile}?#{Date.now()}"
          Test = iframeWindow.Test = @opts.config.Test
          Test::params = require("am-common")::getParams(iframeWindow.location.href)
          iframeWindow.document.body.appendChild(script)
        )
  </script>
</test-iframe>

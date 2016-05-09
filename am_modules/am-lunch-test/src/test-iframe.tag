<test-iframe>
  <iframe if={!isElectron} src={url}></iframe>
  <webview if={isElectron} src={url} nodeintegration></webview>
  <style scoped>
    iframe, webview {
      background-color: white;
      border: none;
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
    }
  </style>
  <script type="coffee">
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
          iframeWindow.Test = @opts.config.Test
          script = iframeWindow.document.createElement('script')
          script.src = "#{@opts.config.extFile}?#{Date.now()}"
          iframeWindow.document.body.appendChild(script)
        )
  </script>
</test-iframe>

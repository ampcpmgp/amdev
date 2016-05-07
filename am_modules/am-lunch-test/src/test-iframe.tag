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
    @setConsoleEvent = (callbackObj) =>
      if @isElectron
        webview = @root.querySelector("webview")
        webview.removeEventListener("console-message", @_tmp_Function)
        @_tmp_Function = (e) =>
          if e.level is 2 then callbackObj.assert(false, e.message)
          if e.level is 0 then callbackObj.info(e.message)
        webview.addEventListener("console-message", @_tmp_Function)
      else # browser
        iframeWindow = @root.querySelector("iframe").contentWindow
        iframeWindow.console.assert = (flg, msg) => callbackObj.assert(flg, msg)
        iframeWindow.console.info = (msg) => callbackObj.info(msg)
  </script>
</test-iframe>

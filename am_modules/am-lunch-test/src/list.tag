<list>
  <div class="button" onclick={execute}>
    test
  </div>
  <div each={opts.testCases}>
    <span class="step {bold: !depth}" style="margin-left: {depth * 8}px;">
      <span class="bold {success: success, error: error}" if={success||error}>
        {success ? "〇" : error ? "×" : ""}
      </span>
      {key}:
    </span>
    <a if={value} href={value}>{value}</a>
  </div>
  <test-iframe if={onExecute}></test-iframe>
  <style scoped>
    .button {
      border: 1px #333 solid;
      border-radius: 2px;
      background-color: #eee;
      display: inline-block;
      cursor: pointer;
    }
    .success { color: blue; }
    .error { color: red; }
    .bold { font-weight: bold; }
    .step { margin-right: 10px; }
  </style>
  <script type="coffee">
    common = require("am-common")
    @onExecute = false
    testIFrame = this.tags["test-iframe"]
    params = common::getParams()
    currentNum = -1
    finished = =>
      @update()
    openIframe = (prevIframeWindow) =>
      if prevIframeWindow
        @onExecute = false
        @update()
      return finished() if opts.testCases.length <= ++currentNum
      currentCase = opts.testCases[currentNum]
      url = currentCase.value
      return openIframe() unless url
      #init
      delete currentCase.error
      delete currentCase.success
      #execute
      @onExecute = true
      testIFrame.url = url
      @update()
      currentIFrameWindow = testIFrame.root.querySelector("iframe").contentWindow
      currentIFrameWindow.console.assert = (flg, msg) =>
        unless flg
          # TODO: UIに組み込む
          openIframe(currentIFrameWindow)
          currentCase.error = true
      currentIFrameWindow.console.info = (msg) =>
        if msg is "finished"
          currentCase.success = true unless currentCase.error
          openIframe(currentIFrameWindow)
    @execute = =>
      currentNum = -1
      openIframe()
    setTimeout(@execute, 0) if params.test
  </script>
</list>

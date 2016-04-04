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
  <style scoped>
    .button {
      border: 1px #333 solid;
      border-radius: 2px;
      background-color: #eee;
      display: inline-block;
    }
    .success { color: blue; }
    .error { color: red; }
    .bold { font-weight: bold; }
    .step { margin-right: 10px; }
  </style>
  <script type="coffee">
    common = require("am-common")
    params = common::getParams()
    currentNum = -1
    finished = =>
      @update()
    openWindow = (prevWindow) =>
      prevWindow.close() if prevWindow
      return finished() if opts.testCases.length <= ++currentNum
      currentCase = opts.testCases[currentNum]
      url = currentCase.value
      return openWindow() unless url
      #init
      delete currentCase.error
      delete currentCase.success
      #execute
      currentWindow = window.open(url)
      currentWindow.console.assert = (flg, msg) =>
        unless flg
          openWindow(currentWindow)
          currentCase.error = true
      currentWindow.console.info = (msg) =>
        if msg is "finished"
          currentCase.success = true unless currentCase.error
          openWindow(currentWindow)
    @execute = => openWindow()
    setTimeout(@execute, 0) if params.test
  </script>
</list>

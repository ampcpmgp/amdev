<list>
  <div class="button" onclick={execute}>
    test
  </div>
  <div each={opts.testCases}>
    <span class="bold" style="color: {_passedNum/_sum === 1 ? 'blue': 'red'}" if={_passedNum&&_sum}>
      {_passedNum}/{_sum}
    </span>
    <span class="step {bold: !depth}" style="margin-left: {depth * 8}px;">
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
    .bold {
      font-weight: bold;
    }
    .step {
      margin-right: 10px;
    }
  </style>
  <script type="coffee">
    currentNum = -1
    @openWindow = (prevWindow) =>
      prevWindow.close() if prevWindow
      return if opts.testCases.length <= ++currentNum
      currentCase = opts.testCases[currentNum]
      url = currentCase.value
      return @openWindow() unless url
      currentWindow = window.open(url)
      currentWindow.console.assert = (flg, msg) =>
        @openWindow(currentWindow) unless flg
      currentWindow.console.info = (msg) =>
        @openWindow(currentWindow) if msg is "finished"
    @execute = => @openWindow()
  </script>
</list>

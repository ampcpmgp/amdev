<list>
  <div class="button" onclick="{execute}">
    test
  </div>
  <div each={opts.testCases}>
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
    openWindow = ($$a, prevWindow) =>
      prevWindow.close() if prevWindow
      url = $$a[++currentNum].href
      return unless url
      currentWindow = window.open(url)
      currentWindow.console.assert = (flg, msg) =>
        openWindow($$a, currentWindow) unless flg
      currentWindow.console.info = (msg) =>
        openWindow($$a, currentWindow) if msg is "finished"
    @execute = (e) =>
      $$a = @root.querySelectorAll("a")
      openWindow($$a)
  </script>
</list>

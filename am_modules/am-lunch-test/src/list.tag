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
    openWindowAndTest = ($$a, num) =>
      url = $$a[num].href
      testWindow = window.open(url)
      testWindow.console.assert = (flg, msg) =>
        console.log flg, msg
    @execute = (e) =>
      $$a = @root.querySelectorAll("a")
      openWindowAndTest($$a, 0)
  </script>
</list>

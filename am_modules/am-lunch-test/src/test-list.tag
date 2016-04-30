<test-list>
  <button onclick={execute}>
    test
  </button>
  <a href="?">root</a>
  <a href="?auto">auto</a>
  <div each={opts.testCases}>
    <a href={"#"+ pageLink} class="step {bold: !depth}" style="margin-left: {depth * 8}px;">
      <span class="bold {success: success, error: error}" if={success||error}>
        {success ? "〇" : error ? "×" : ""}
      </span>
      {key}:
    </a>
    <a if={value} href={value}>{value}</a>
  </div>
  <test-iframe if={onExecute}></test-iframe>
  <style scoped>
    a { color: blue; text-decoration: none; }
    a:hover { opacity: 0.6;}
    .success { color: blue; }
    .error { color: red; }
    .bold { font-weight: bold; }
    .step { color: #333; margin-right: 10px; }
  </style>
  <script type="coffee">
    @Model = require("./Model").prototype
    @onExecute = false
    #init Model
    @Model.me = @
    @Model.iframe = @tags["test-iframe"]
    @Model.opts = opts
    #me
    @execute = => @Model.execute()
    #mount
    @on("mount", => @Model.check())
    riot.route("..", => @Model.execute())
    riot.route.start()
  </script>
</test-list>

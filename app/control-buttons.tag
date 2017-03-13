<control-buttons>
  <button type="button" onclick={restart}>Browser restart</button>
  <button type="button" onclick={Status.toggleliveReloadFlg}>
    livereload:
    <span>{ea.liveReloadFlg ? "on": "off"}</span>
  </button>
  <button type="button" onclick={Status.togglePublishFlg}>
    publish:
    <span>{Status.publishFlg ? "on": "off"}</span>
  </button>
  <style type="less">
    > button:first-child {
      display: block;
    }
  </style>
  <script type="coffee">
    Status = @Status = require("./Status")
    @restart = => require("electron").ipcRenderer.send("restart")
    Status.on("update", () => @update())
  </script>
</control-buttons>

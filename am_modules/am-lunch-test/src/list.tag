<list>
  <div class="button" onclick="{execute}">
    test
  </div>
  <div each={opts.testCases}>
    <span class="step {bold: !depth}" style="margin-left: {depth * 8}px;">
      {key}:
    </span>
    <a href={value}>{value}</a>
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
    @execute = (e) =>
      console.log(e)
  </script>
</list>

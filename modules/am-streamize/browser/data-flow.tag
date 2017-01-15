<data-flow>
  <div class="box" each={opts.flow}>
    <div class="title">
      {name}
    </div>
  </div>
  <style type="less">
    .box > .title {
      color: red;
    }
    :scope {
      > .box {
        > .title {
          border: 1px solid black;
        }
      }
    }
  </style>
  <script type="coffee">
    @.on("mount", =>
      console.log opts.flow[0]
    )
  </script>
</data-flow>

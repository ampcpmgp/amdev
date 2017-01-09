<data-flow>
  <a-scene>
    <a-box color="#6173F4" opacity="0.8" depth="2"></a-box>
    <a-sphere radius="2" src="texture.png" position="1 1 0"></a-sphere>
    <a-sky color="#ECECEC"></a-sky>
  </a-scene>
  <script type="coffee">
    @mount = =>
      console.log opts.flow
      require("aframe")
  </script>
</data-flow>

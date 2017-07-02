<open-close-icon>
  <svg xmlns="http://www.w3.org/2000/svg" onclick={clickHandler}
    riot-width={opts.length || length}
    riot-height={opts.length || length}
    viewBox="0 0 24 24" fill="none" riot-stroke={opts.stroke || stroke}
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <g if={minus}>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </g>
    <g if={!minus}>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </g>
  </svg>
  <style scoped type="less">
    :scope {
      > svg {
        background: white;
        cursor: pointer;
      }
    }
  </style>
  <script type="coffee">
    this.length = 24
    this.stroke = "#000"
    this.minus = true
    this.setStatus = (minusFlg) =>
      currentMinusStatus = this.minus
      nextMinusStatus = this.minus = minusFlg
      currentMinusStatus isnt nextMinusStatus and opts.callback?()
      this.update()
    this.clickHandler = () =>
      this.minus = not this.minus
      opts.callback?()
  </script>
</open-close-icon>

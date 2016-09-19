require("./test-iframe.tag")

<test-list>
  <span>{successSum}/{executeSum}</span>
  <a onclick={toRouteHash}>base</a>
  <recursive-item data={opts.testPatterns} routing="" />
  <style scoped>
    :scope {
      display: block;
      background-color: white;
      font-size: 14px;
    }
    a {
      color: blue;
      text-decoration: none;
      cursor: pointer;
      display: inline-block;
    }
    a:hover {
      opacity: 0.4;
    }
  </style>
  <script type="coffee">
    WholeStatus = require("./Status")
    bodyStyle = document.body.style
    @init = =>
      @successSum = 0
      @executeSum = 0
      @hash = location.hash
    @check = =>
      @init()
      return unless @hash
      element = document.querySelector("[href='#{@hash}']")
      return unless element
      # element.click()
    @toRouteHash = => location.href = "#"
    WholeStatus.on("item-update", =>
      for itemStatus in WholeStatus.itemStatuses
        if itemStatus.onExecute
          onExecute = true
          break
      bodyStyle.overflowY = if onExecute then "hidden" else ""
    )
    @on("mount", () =>
      @check()
    )
    riot.route("..", @check)
    @init()
    riot.route.start()
  </script>
</test-list>

<recursive-item>
  <list-line each={key, data in list} list={this} routing={this.parent.opts.routing} />
  <script type="coffee">
    @list = if typeof opts.data is "object"
      opts.data
     else
      {}
  </script>
</recursive-item>

<list-line>
  <div class="line">
    <span class="bold {success: success, error: error}">
      {success ? "〇" : error ? "×" : ""}
    </span>
    <a class="multi" href={WholeStatus.basePath + routing} data-type="multi">{key}</a>
    <recursive-item data={data} routing={routing} />
    <a class="single" if={url} href={href} data-type="single">{url}</a>
  </div>
  <test-iframe if={status.onExecute} config={WholeStatus.config}></test-iframe>
  <style scope>
    .bold {
      font-weight: bold;
    }
    .multi {
      color: #333;
    }
    .single {
      padding-left: 6px;
    }
    .line {
      margin-left: 10px;
    }
    .success {
      color: blue;
    }
    .error {
      color: red;
    }
    .step {
      color: #333; margin-right: 10px;
    }
  </style>
  <script type="coffee">
    WholeStatus = @WholeStatus = require("./Status")
    @key = opts.list.key
    @data = opts.list.data
    @routing = "#{opts.routing}/#{@key}"
    @url = if typeof @data is "object" then "" else @data
    @href = WholeStatus.basePath + @url + "#" + @routing
    @status = {onExecute: false}
    @init = =>
      @error = null
      @success = null
      @status.onExecute = false
      @update()
    @execute = (href) =>
      console.log e.target.getAttribute("href")
      return true
    WholeStatus.on("init", => @init())
    WholeStatus.itemStatuses.push(@status)
    @on("update", => WholeStatus.trigger("item-update"))
    @init()
  </script>
</list-line>

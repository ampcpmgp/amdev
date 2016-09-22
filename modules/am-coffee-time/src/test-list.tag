require("./test-iframe.tag")

<test-list>
  <span>{WholeStatus.successSum}/{WholeStatus.executeSum}</span>
  <a onclick={toRouteHash}>base</a>
  <recursive-item data={opts.testPatterns} routing="" />
  <test-iframe name="testFrame" if={instanceUrl} url={instanceUrl} config={WholeStatus.config}></test-iframe>
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
    @WholeStatus = WholeStatus = require("./Status")
    bodyStyle = document.body.style
    @init = =>
      @instanceUrl = null
      try
        @routerStr = location.href.match(new RegExp("\\#{WholeStatus.thisBasePath}(.*)"))[1]
      catch error
        return @routerStr = ""
      WholeStatus.trigger("init")
    @check = =>
      @init()
      WholeStatus.sumInit()
      executePath = @routerStr.replace(WholeStatus.thisBasePath, "")
      return unless executePath
      executePath = decodeURI(executePath)
      unless WholeStatus.executablePath[executePath]
        @instanceUrl = executePath
        @update()
        return
      WholeStatus.trigger("router-event-#{executePath}")
      # element.click()
    @toRouteHash = => riot.route("")
    WholeStatus.on("item-update", =>
      for itemStatus in WholeStatus.itemStatuses
        if itemStatus.onExecute
          onExecute = true
          break
      bodyStyle.overflowY = if onExecute then "hidden" else ""
      this.update()
    )
    @on("mount", () =>
      @check()
      riot.route.start()
    )
    riot.route.base(WholeStatus.thisBasePath)
    riot.route("..", @check)
  </script>
</test-list>

<recursive-item>
  <list-line name="lines" each={key, data in list} list={this} routing={this.parent.opts.routing} />
  <style scope>
    :scope {
      display: block;
    }
  </style>
  <script type="coffee">
    @list = if typeof opts.data is "object"
      opts.data
     else
      {}
  </script>
</recursive-item>

<list-line>
  <div class="line{isHover && ' hover'}">
    <div class="" onclick={router} onmouseover={mouseOn} onmouseout={mouseOut}>
      <span class="bold {success: success, error: error}">
        {success ? "〇" : error ? "×" : ""}
      </span>
      <a class="tree" href={routing} name="treeTask" onclick={router}>{key}</a>
      <a class="single" if={url} href={routerExecutionPath} name="singleTask" onclick={router}>{url}</a>
    </div>
    <recursive-item name="item" if={!url} data={data} routing={routing} />
  </div>
  <test-iframe name="testFrame" if={url && status.onExecute} url={routerExecutionPath} config={WholeStatus.config}></test-iframe>
  <style scope>
    .bold {
      font-weight: bold;
    }
    .tree {
      color: #333;
    }
    .single {
      padding-left: 6px;
    }
    .line {
      margin-left: 10px;
    }
    .line.hover {
      background: rgba(0, 0, 255, 0.05);
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
    executeIframe = =>
      WholeStatus.executeIframe.shift()?()
    @key = opts.list.key
    @data = opts.list.data
    @routing = if opts.routing then "#{opts.routing}/#{@key}" else @key
    @url = if typeof @data is "object" then "" else @data
    @routerExecutionPath = @url + WholeStatus.basePath + @routing
    @status = {onExecute: false}
    @deleteIframe = =>
      @status.onExecute = false
      @update()
    @init = =>
      @error = null
      @success = null
      @deleteIframe()
    @recursivelyExecuteTask = =>
      lines = @tags.item.tags.lines
      if lines.length
        for line in lines
          trueLine = line.tags.lines
          trueLine.recursivelyExecuteTask()
      else
        WholeStatus.executeIframe.push(=> @executeTask( =>
          @deleteIframe()
          executeIframe()
        ))
    @multiExecuteTask = =>
      WholeStatus.executeIframe.length = 0
      @recursivelyExecuteTask()
      executeIframe()
    @executeTask = (callback) =>
      @status.onExecute = true
      this.update()
      console.clear()
      ++WholeStatus.executeSum
      WholeStatus.trigger("item-update")
      @tags.testFrame.setConsoleEvent(
        assert: (flg, msg) =>
          unless flg
            # TODO: UIにも組み込む
            console.error(msg) if msg
            @error = true
            WholeStatus.trigger("item-update")
            @update()
            callback and callback()
        info: (msg) =>
          if msg is "finished" and not @error
            console.info(msg)
            @success = true
            ++WholeStatus.successSum
            WholeStatus.trigger("item-update")
            @update()
            callback and callback()
      )
    @router = (e) => riot.route(e.target.getAttribute("href"))
    @mouseOn = => @isHover = true
    @mouseOut = => @isHover = false
    WholeStatus.on("init", => @init())
    WholeStatus.itemStatuses.push(@status)
    WholeStatus.on("router-event-#{@routing}", () => @multiExecuteTask())
    WholeStatus.on("router-event-#{@routerExecutionPath}", @executeTask) if @url
    WholeStatus.executablePath[@routing] = true
    WholeStatus.executablePath[@routerExecutionPath] = true
    @on("update", => WholeStatus.trigger("item-update"))
    @init()
  </script>
</list-line>

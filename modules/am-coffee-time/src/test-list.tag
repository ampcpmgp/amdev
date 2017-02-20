require("./test-iframe.tag")

<test-list>
  <test-status />
  <a onclick={toRouteHash}>base</a>
  <a if={Status.hideParamMode} onclick={toggleParameterMode}>toggle params</a>
  <recursive-item data={opts.testPatterns} routing="" />
  <test-iframe ref="testFrame" if={instanceUrl} url={instanceUrl} config={Status.config}></test-iframe>
  <style type="less">
    :scope {
      display: block;
      width: 100%;
      background-color: white;
      font-size: 14px;
      > a {
        border: 1px solid #ccc;
      }
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
    Status = @Status = require("./Status")
    route = require("riot-route")
    bodyStyle = document.body.style
    @init = =>
      @instanceUrl = null
      Status.trigger("init")
    @check = =>
      @init()
      Status.sumInit()
      executePath = route.query().path
      return @update() unless executePath
      executePath = decodeURIComponent(executePath)
      executePath = encodeURIComponent(executePath)
      unless Status.executablePath[executePath]
        @instanceUrl = decodeURIComponent(executePath)
        @update()
        @refs.testFrame.setConsoleEvent()
        return
      Status.executablePath[executePath]()
    @toRouteHash = => route("")
    @toggleParameterMode = =>
      @showParameter = not @showParameter
      Status.trigger("toggle-mode")
    Status.on("item-update", () =>
      for itemStatus in Status.itemStatuses
        if itemStatus.onExecute
          onExecute = true
          break
      bodyStyle.overflowY = if onExecute or @instanceUrl then "hidden" else ""
    )
    @on("mount", () =>
      @check()
      route.start()
    )
    route.base(Status.thisBasePath)
    route("..", @check)
    # route機能はpathがないと動かないため無いときはつける必要がある
    window.addEventListener("popstate", =>
      unless location.href.match("\\" + Status.thisBasePath)
        history.replaceState("", null, Status.thisBasePath)
    )
  </script>
</test-list>

<test-status>
  <span class="test-count">{Status.successSum}/{Status.executeSum}</span>
  <span if={Status.taskFinished()} class="finished">✔︎</span>
  <span if={Status.taskAllSuccess()} class="all-success">💯</span>
  <style>
    .finished {
      color: #17e017;
    }
  </style>
  <script type="coffee">
    @Status = require("./Status").on("item-update", => this.update())
  </script>
</test-status>

<recursive-item>
  <list-line ref="lines" each={data, key in list} list={this} routing={this.parent.opts.routing} />
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
    <div class="" onmouseover={mouseOn} onmouseout={mouseOut}>
      <span class="bold {success: success, error: error, warn: warn}"></span>
      <a class="tree" href={routing} onclick={router}>{treeName}</a>
      <a class="single" if={url} href={routerExecutionPath} onclick={router}>{linkName}</a>
    </div>
    <recursive-item ref="item" if={!url} data={data} routing={routing} />
  </div>
  <test-iframe ref="testFrame" if={url && status.onExecute} url={routerExecutionPath} config={Status.config}></test-iframe>
  <style scoped type="less">
    .bold {
      font-weight: bold;
    }
    .tree {
      color: #333;
      word-break: break-all;
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
      &:after {
        content: "〇";
      }
    }
    .warn {
      color: gold;
      &:after {
        content: "△";
      }
    }
    .error {
      color: red;
      &:after {
        content: "×";
      }
    }
    .step {
      color: #333; margin-right: 10px;
    }
  </style>
  <script type="coffee">
    Status = Status = @Status = require("./Status")
    route = require("riot-route")
    executeIframe = =>
      Status.executeIframe.shift()?()
    [@hideParamMode, @treeName, @path] = @key.match(/^(.+)\((.+)\)$/) or [null, @key, @key]
    @routing = if opts.routing then "#{opts.routing}/#{@path}" else @path
    [_, @linkName, @url] =
      if typeof @data is "object"
        []
      else
        @data.match(/^(.+)\((.+)\)$/) or ["", @data, @data]
    @routerExecutionPath = @url + Status.basePath + @routing
    @status = {onExecute: false}
    @deleteIframe = =>
      @status.onExecute = false
      @update()
    @init = =>
      @error = null
      @warn = null
      @success = null
      @deleteIframe()
    @recursivelyExecuteTask = =>
      item = @refs.item
      if item
        lines = item.refs.lines
        unless lines.length
          lines.recursivelyExecuteTask()
        else
          for line in lines
            line.recursivelyExecuteTask()
      else
        Status.executeIframe.push(=> @executeTask( =>
          @deleteIframe()
          executeIframe()
        ))
    @multiExecuteTask = =>
      Status.executeIframe.length = 0
      @recursivelyExecuteTask()
      executeIframe()
    @executeTask = (callback) =>
      @status.onExecute = true
      this.update()
      console.clear()
      ++Status.executeSum
      @refs.testFrame.setConsoleEvent(
        assert: (flg, msg) =>
          if msg
            console.assert(flg, msg)
          else
            console.assert(flg)
          unless flg
            @error = true
            @update()
            callback and callback()
        info: (msg) =>
          if msg is "finished" and not @error
            console.info(msg)
            @success = true unless @warn
            ++Status.successSum
            @update()
            callback and callback()
        error: (msg) =>
          @warn = true
      )
    @router = (e) =>
      route("path=" + e.target.getAttribute("href"))
      e.preventDefault()
    @mouseOn = => @isHover = true
    @mouseOut = => @isHover = false
    Status.on("init", => @init())
    @hideParamMode and Status.on("toggle-mode", =>
      @treeName =
        if @key is @treeName
          @treeName = @_treeName or @treeName
        else
          @_treeName = @treeName
          @treeName = @key
      @linkName =
        if @data is @linkName
          @linkName = @_linkName or @linkName
        else
          @_linkName = @linkName
          @linkName = @data
      @update()
    )
    Status.itemStatuses.push(@status)
    Status.executablePath[encodeURIComponent(@routing)] =  () =>
      @multiExecuteTask()
    Status.executablePath[encodeURIComponent(@routerExecutionPath)] = () => @executeTask() if @url
    Status.hideParamMode = @hideParamMode or Status.hideParamMode
    @on("update", => Status.trigger("item-update"))
  </script>
</list-line>

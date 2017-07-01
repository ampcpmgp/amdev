require("./test-iframe.tag")
require("./open-close-icon.tag")

<test-list>
  <test-status />
  <a onclick={toRouteHash}>base</a>
  <a if={Status.paramMode} onclick={toggleParameterMode}>toggle params</a>
  <recursive-item ref="item" data={opts.testPatterns} routing="" />
  <test-iframe ref="testFrame" if={instanceUrl} url={instanceUrl} config={Status.config}></test-iframe>
  <style type="less">
    :scope {
      display: block;
      width: 100%;
      background-color: white;
      font-size: 14px;
      padding-left: 12px;
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
      executePath = decodeURIComponent(encodeURIComponent(decodeURIComponent(executePath)))
      unless Status.executablePath[executePath]
        regex = /^[^#]+#/
        paramStr = executePath.replace(regex, "")
        @refs.item.recursivelyCheck(paramStr)
        Status.executablePath[executePath]?()
        return
        # TODO: 以下処理今後検討
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
  <style scope type="less">
    :scope {
      display: block;
      border-left: 1px solid #ccc;
    }
  </style>
  <script type="coffee">
    objectAssign = require("object-assign")
    getLines = =>
      lines = @refs.lines
      unless lines.length then [lines] else lines
    @recursivelyCheck = (paramStr) =>
      getLines().forEach((line) =>
        line.recursivelyCheckItem(paramStr)
        )
    @recursivelyUpdate = (routing) =>
      getLines().forEach((line) =>
        line.recursivelyUpdate(routing)
      )
    @list = if typeof opts.data is "object"
      opts.data
     else
      {}
  </script>
</recursive-item>

<list-line>
  <open-close-icon length="16" stroke="#333" if={!url} callback={toggleItem} />
  <section class="{line: 1,hover: isHover, last-execute: routerExecutionPath === Status.lastExecutePath}">
    <div class="" onmouseover={mouseOn} onmouseout={mouseOut}>
      <span class="bold {success: success, error: error}"></span>
      <a class="tree" href={routing} onclick={router}>{treeName}</a>
      <label each={pattern, i in patterns} class={focus: pattern.focus} data-id={i} onclick={changePatternEvent}>
        {pattern.name}
      </label>
      <a class="single" if={url} href={routerExecutionPath} onclick={router}>{linkName}</a>
    </div>
    <recursive-item ref="item" style="display: {isItemOpen ? 'block' : 'none'}" if={!url} data={data} routing={routing} />
  </section>
  <test-iframe ref="testFrame" if={url && status.onExecute} url={routerExecutionPath} config={Status.config}></test-iframe>
  <style type="less">
    :scope {
      display: block;
      position: relative;
    }
    > open-close-icon {
      position: absolute;
      top: 0;
      left: -8px;
    }
     > .line > {
      display: inline-block;
      &.last-execute {
        border: solid 1px;
        display: inline-block;
        padding: 0px 8px;
      }
      div > label {
        cursor: pointer;
        border: 1px solid rgba(255,128,0,0.6);
        padding: 0 6px;
        text-align: center;
        display: inline-block;
        &.focus {
          background: rgba(255, 255, 0, 1);
        }
        &:not(.focus) {
        }
        &:hover {
          opacity: 0.6;
        }
      }
    }
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
      margin-left: 14px;
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
    Status = @Status = require("./Status")
    Parser = require("../Parser")
    route = require("riot-route")
    setObservableEvent = =>
      Status.executablePath[@routing] =  () => @multiExecuteTask()
      Status.executablePath[@routerExecutionPath] = () => @executeTask() if @url
    setRouter = (path) =>
      @routing = if @initialRouting then "#{@initialRouting}/#{path}" else path
      @routerExecutionPath = @url + Status.basePath + @routing
    checkLastExecute = =>
      Status.one('finished', () =>
        if Status.lastExecutePath is @routerExecutionPath
          checkLastExecute()
        else
          @update()
      )
    executeIframe = =>
      Status.executeIframe.shift()?()
    {toggleMode, paramMode, name, path, patterns} = Parser.getStrInfo(@key)
    @initialRouting = opts.routing
    @treeName = name
    if toggleMode
      initialPattern = patterns[0]
      initialPattern.focus = true
      @path = initialPattern.path
      @patterns = patterns
    else
      @path = path
    {name, path} = if typeof @data is "object" then {} else Parser.getStrInfo(@data)
    @linkName = name
    @url = path
    @isItemOpen = true
    setRouter(@path)
    @status = {onExecute: false}
    @toggleItem = =>
      @isItemOpen = not @isItemOpen
      @update()
    @getRouting = => @initialRouting
    @recursivelyUpdate = (routing) =>
      @initialRouting = routing
      setRouter(@path)
      @refs.item?.recursivelyUpdate(@routing)
      setObservableEvent()
    @deleteIframe = =>
      @status.onExecute = false
      @update()
    @init = =>
      @error = null
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
      Status.lastExecutePath = @routerExecutionPath
      Status.next()
      checkLastExecute()
      this.update()
      console.clear()
      ++Status.executeSum
      @refs.testFrame.setConsoleEvent(
        info: (msg) =>
          if msg is "finished" and not @error
            @success = true
            ++Status.successSum
            @update()
            callback and callback()
        error: (msg) =>
          @error = true
          @update()
          callback and callback()
      )
    @router = (e) =>
      route("path=" + e.target.getAttribute("href"))
      e.preventDefault()
    @mouseOn = (e) =>
      if e.target.tagName is "LABEL"
        @isHover = false
      else
        @isHover = true
    @mouseOut = => @isHover = false
    @changePattern = (nextId) =>
      @patterns.forEach((pattern) => pattern.focus = false)
      nextPattern = @patterns[nextId]
      nextPattern.focus = true
      @path = nextPattern.path
      setRouter(@path)
      @refs.item?.recursivelyUpdate(@routing)
      setObservableEvent()
    @changePatternEvent = (e) => @changePattern(e.currentTarget.dataset.id)
    @recursivelyCheckItem = (paramStr) =>
      matchedPattern = @patterns?.filter((pattern, i) =>
        paramStr.indexOf(pattern.path) is 0
      )?[0]
      if matchedPattern
        paramStr = paramStr.replace(matchedPattern.path, "").replace(/^\//, "")
        @patterns.forEach((pattern, i) =>
          pattern.focus = false
          if matchedPattern is pattern
            @changePattern(i)
          )
        @update()
        if paramStr
          @refs.item?.recursivelyCheck(paramStr)
        else
          setObservableEvent()
      else if paramStr.indexOf(@path) is 0
        @refs.item?.recursivelyCheck(paramStr.replace(@path, "").replace(/^\//, ""))
    Status.on("init", => @init())
    paramMode and Status.on("toggle-mode", =>
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
    setObservableEvent()
    Status.paramMode = paramMode or Status.paramMode
    @on("update", => Status.trigger("item-update"))
  </script>
</list-line>

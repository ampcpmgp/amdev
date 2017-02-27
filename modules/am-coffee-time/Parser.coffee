module.exports = class Parser
  @patternForPathName: /^(.+)\((.+)\)$/
  @parseStr: (str) =>
    [paramMode, name, path] = str.match(@patternForPathName) or [false, str, str]
    {paramMode, name, path}
  @getStrInfo: (str) =>
    [toggleMode, name, patternStr] = str.match(/(.*)\[(.+)\]$/) or []
    if toggleMode
      patterns =patternStr
        .split(/\s*,\s*/)
        .map((str) =>
          strInfo = @parseStr(str)
          paramMode = paramMode or strInfo.paramMode
          strInfo
        )
    else
      {paramMode, name, path} = @parseStr(str)
    {toggleMode, paramMode, name, path, patterns}
  @getSingleTaskList: (patterns, {patternLoop} = {}) =>
    taskList = []
    recursiveFunc = (patterns, testName = "", testUrl = "") =>
      for key, value of patterns
        do (testName, testUrl) =>
          if typeof value is "object"
            testName += "/"
            testUrl += "/"
            info = @getStrInfo(key)
            if info.patterns and not patternLoop
              testName += info.patterns[0].name
              testUrl += info.patterns[0].path
            else
              testName += info.name
              testUrl += info.path
            recursiveFunc(value, testName, testUrl)
          else
            keyInfo = @getStrInfo(key)
            valueInfo = @getStrInfo(value)
            testUrl = testUrl.replace(/^\//, "") + "/#{keyInfo.path}"
            testName = testName.replace(/^\//, "") + "/#{keyInfo.name}"
            mockUrl = "#{valueInfo.path}##{testUrl}"
            mockName = valueInfo.name
            testUrl = "?path=#{testUrl}"
            taskList.push({testName, testUrl, mockName, mockUrl})
    recursiveFunc(patterns)
    taskList

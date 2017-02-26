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

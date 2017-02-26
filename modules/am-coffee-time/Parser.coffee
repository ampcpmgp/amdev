module.exports = class Parser
  @getStrInfo: (str) =>
    [paramMode, name, path] = str.match(/^(.+)\((.+)\)$/) or [false, str, str]
    {paramMode, name, path}

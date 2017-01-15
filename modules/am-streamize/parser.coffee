expressions =
  # 全体
  blank: /(\r?\n){2,}/g
  section: "["
  # 各section
  name: /^\[(.+)\]\r?\n/g
  splitter: /\-\-\r?\n/g
  # 各block
  block: /\r?\n/
  line: /([^=]+)=?([^=>]*)=?>?(.*)$/

class Sections
  constructor: ->
    @data = []
  add: (string) =>
    stringWithoutName = string.replace(expressions.name, "")
    name = RegExp.$1
    blocks = stringWithoutName
      .split(expressions.splitter)
      .map((block) => @_getStatus(block))
    @data.push({name, blocks})
  _getStatus: (block) =>
    {
      lines: [
        block
          .split(expressions.block)
          .filter((section) => section if section)
          .map((line) =>
            [_, func, action, name] = line.split(expressions.line)
            name = name.trim()
            {func, action, name}
        )
      ]
    }

module.exports = (flow) =>
  sections = new Sections()
  flow
    .replace(expressions.blank, "\n")
    .split(expressions.section)
    .filter((section) => section if section)
    .forEach((section) => sections.add("#{expressions.section}#{section}"))
  sections.data

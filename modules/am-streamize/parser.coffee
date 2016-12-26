expressions =
  # 全体
  blank: /(\r?\n){2,}/g
  section: "["
  # 各section
  name: /^\[(.+)\]\r?\n/g
  splitter: /\-\-\r?\n/g

class Sections
  constructor: ->
    @data = []
  add: (string) =>
    console.log "---"
    stringWithoutName = string.replace(expressions.name, "")
    name = RegExp.$1
    blocks = stringWithoutName
      .split(expressions.splitter)
      .map((block) => @_getStatus(block))
    @data.push(
      "#{name}": blocks
    )
  _getStatus: (block) =>
    console.log block

module.exports = (flow) =>
  sections = new Sections()
  flow
    .replace(expressions.blank, "\n")
    .split(expressions.section)
    .filter((section) => section if section)
    .forEach((section) => sections.add("#{expressions.section}#{section}"))

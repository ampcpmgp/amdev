expressions =
  # 全体
  blank: /(\r?\n){2,}/g
  section: "["
  # 各section
  name: /^\[(.+)\]\r?\n/g


class Sections
  constructor: ->
    @data = []
  add: (string) =>
    stringWithoutName = string.replace(expressions.name)
    name = RegExp.$1
    @data.push(
      "#{name}":
        {}
    )

module.exports = (flow) =>
  sections = new Sections()
  flow
    .replace(expressions.blank, "\n")
    .split(expressions.section)
    .filter((section) => section if section)
    .forEach((section) => sections.add("#{expressions.section}#{section}"))

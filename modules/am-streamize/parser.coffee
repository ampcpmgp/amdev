regex =
  # 全体
  blank: /(\r?\n){2,}/g
  section: /\[/g
  # 各section
  name: /^\[(.+)\]\r?\n/g


class Sections
  @data: []
  @add: (string) =>
    string = string.replace(regex.name)
    name = RegExp.$1
    @data.push(
      "#{name}":
        {}
    )

module.exports = (flow) =>
  flow
    .replace(regex.blank, "\n")
    .split(regex.section)
    .filter((section) => section if section)
    .forEach((section) => Sections.add("[#{section}"))

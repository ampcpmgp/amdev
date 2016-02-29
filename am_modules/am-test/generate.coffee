recursive = (key, value) =>
  if typeof value is "object"
    # recursive(key, value)
  else
    generateHtml(key, value)
generateHtml = (key, value) =>
  console.log key, value


module.exports = (obj) =>
  recursive(key, value)  for key, value of obj

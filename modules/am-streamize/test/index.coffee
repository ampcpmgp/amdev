uiflow = require("uiflow")
fs = require("fs")
testCode = [
  fs.readFileSync("#{__dirname}/simple.flow", {encoding: "utf-8"})
]

console.log testCode
json = uiflow.json("[テスト]\nユーザーが見るもの\nユーザがすること\n")
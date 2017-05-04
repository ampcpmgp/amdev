generate = require("am-coffee-time").default
testcases = require("./cases.yml")
generate(testcases, {prefix: ["日本語(lang=ja)", "英語(lang=en)", "lang=zh-cn", "lang=zh-tw"]})

generate = require("am-coffee-time/browser/generate")
patterns =
  全パターン:
    動作フロー確認用:
      "結果=成功": "./index.html"
      "結果=失敗": "./index.html"
    "ID入力=melon":
      "PW入力=google": "./index.html"
      "PW入力=apple": "./index.html"
    "スイッチ[日本語(lang=ja), 英語(lang=en), 中国語(lang=ch)]": "多言語化(./index.html)"
generate(patterns)

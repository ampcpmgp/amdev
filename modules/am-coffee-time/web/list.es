import generate from 'am-coffee-time/browser/generate'
const patterns = {
  '全パターン': {
    '動作フロー確認用': {
      '結果=成功': './app.html',
      '結果=失敗': './app.html'
    },
    'ID入力=melon': {
      'PW入力=google': './app.html',
      'PW入力=apple': './app.html'
    },
    'スイッチ[日本語(lang=ja) | 英語(lang=en) | 中国語(lang=ch)]': '多言語化(./app.html)'
  }
}
generate(patterns)

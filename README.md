# 工事中
```coffee
TODO: [
  am_modulesのnpm向けビルド方法、要考慮:
    要点1:
      内部的にrequireしているpackageのコンパイルについて:
        自分以外知らない: coffeeのまま
        解決案1: browserとnodeで使うもので、全結合かrequire無視か分ける
        解決案2: 全てのmoduleでrequire無視
    要点2:
      es6とcoffeeでの、ビルドあるなしの差について:
        要考慮: uglifyも絡むことがあり、altES*もあり得るため必要なし?
  開発環境として: [
    chrome extenstions
    atom package
    raspberry pi - raspbian
  ]
]
```

# amdeven?
* AM development environment
* 午前の開発環境

## how to use (作成途中)
```
#requirement
node.js(v4 over), npm (v3 over), electron (always latest) (download to ../), ???
now only support windows 7, 10

npm install am-template
node -e require('am-template')('coffee')
npm install
npm start

TODO: electronを自動ダウンロードする
```

### CIサーバー側に必要なもの
npm install -g forever

### my build environment

```
# install chocolatey
choco install -yf ruby nodejs python2 visualstudio2015community
choco install -yf githubforwindows atom
choco install -yf skype line lhaplus cmder notepadplusplus googlechrome firefox clover autoit crystaldiskinfo greenshot crystaldiskmark libreoffice googlechrome.canarcy
#TODO: chromeがapngに対応したらそっちを探して対応する
choco install -yf screentogif
# download
TODO: cliborを含んだ開発環境を作る
clibor - http://www.amunsnet.com/

# atom package
apm install pigments highlight-selected highlight-column save-session editorconfig linter linter-coffeelint script atom-terminal file-icons atom-beautify pretty-json quantum-shell autocomplete-python language-haskell  autocomplete-haskell haskell-ghc-mod ide-haskell
## styesheet
atom-text-editor {
    font-family: "Avenir Next",Verdana, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "游ゴシック", "Yu Gothic", "メイリオ", Meiryo, Osaka, sans-serif;
}

# clone後
# (windows 10 + VS2015)でエラー。0になると良いが、一旦動くので気にしない。
npm run init

#
```

### 開発環境に実装したいもの
サーバー（すべてをコンパイルした固定のものだけを返すシンプルなクラスタサーバー）
websocketも同様に。

### プロジェクトを使い作りたいもの
ウィンドウ配置管理ツール
マウス座標のカラー情報＋x,y情報+pixel定規を簡単に測れるツール
オンライン2.5Dマップ

# 大規模工事中なため以下ただのメモ


# amdev?
* AM development environment
* 午前の開発環境

![](data/Animation.gif)

## how to use
### development
now only windows 7, 10
```
npm install am-template
node -e require('am-template')('coffee')
npm install
npm start
```

### Inspection server(例、ubuntu server 14.04 on さくらのVPS)
```
sudo apt-get update
sudo apt-get install git curl
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
# if npm v2, enter [sudo npm install -g npm]
git clone {https://github.com/ampcpmgp/amdev}
sudo npm install -g forever coffee-script
```


## this project environment
### this build environment
```
git clone github.com/ampcpmgp/amdev

npm i -g coffee-script
npm run init
(download electron to ../)
npm start
```

### my environment

```
# install chocolatey
choco install -yf githubforwindows
choco install -yf atom
choco install -yf skype line lhaplus cmder notepadplusplus googlechrome firefox clover autoit crystaldiskinfo greenshot crystaldiskmark gitkraken libreoffice googlechrome.canarcy win32diskimager.install
#TODO: chromeがapngに対応したらそっちを探して対応する
choco install -yf screentogif -version 1.3
# download
TODO: cliborを含んだ開発環境を作る
clibor - http://www.amunsnet.com/
gapdebug - ios debug

# atom package
apm install pigments highlight-selected highlight-column editorconfig linter script atom-terminal file-icons atom-beautify pretty-json quantum-shell language-riot-tag linter-eslint
## styesheet
atom-text-editor {
    font-family: "Avenir Next",Verdana, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "游ゴシック", "Yu Gothic", "メイリオ", Meiryo, Osaka, sans-serif;
}

# clone後
# (windows 10 + VS2015)
npm run init
```

## やりたいこと
```coffee
やりたいリスト: [
  modulesのnpm向けビルド方法、要考慮:
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

### 開発環境に実装したいもの
サーバー（すべてをコンパイルした固定のものだけを返すシンプルなクラスタサーバー）
websocketも同様に。

### プロジェクトを使い作りたいもの
ウィンドウ配置管理ツール
マウス座標のカラー情報＋x,y情報+pixel定規を簡単に測れるツール
オンライン2.5Dマップ

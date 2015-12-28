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

TODO: electronのバージョンを外部から指定する（portのように）、最新を探したりする
# edit electron version (run.bat)
start ../electron-v0.30.4-win32-x64/electron.exe ./
```

### CIサーバー側に必要なもの
npm install -g forever

### my build environment

```
# install chocolatey
choco install -yf ruby nodejs python2 visualstudio2015community
choco install -yf githubforwindows atom
choco install -yf skype line lhaplus cmder  notepadplusplus googlechrome firefox clover autoit crystaldiskinfo crystaldiskmark libreoffice googlechrome.canary

# download
TODO: cliborを含んだ開発環境を作る
clibor - http://www.amunsnet.com/

# atom package
apm install pigments highlight-selected highlight-column save-session editorconfig linter linter-coffeelint script atom-terminal file-icons atom-beatify pretty-json quantum-shell
## styesheet
atom-text-editor {
    font-family: "Avenir Next",Verdana, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "游ゴシック", "Yu Gothic", "メイリオ", Meiryo, Osaka, sans-serif;
}

# compiler
gem source -a http://rubygems.org/ &&
gem install sass

# if npm version below 3
npm install -g npm


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

### 過去ログ

```
###実行時フロー###
  run.bat (electron->Browser.js)
  index.html(on node)
    app.js
      electron app
        ?
      node
        compiler
        server

  nvm install v1.* #node

###(配置)
  /electron-version/
  /this_sample/
    run.bat(execute)
    /contents/
      /nodejs/
        NodeApp.coffee
      /proj/
        /atom/ # atom project
        /node/ # node
        /web/ #
          /myCommonJs.coffee # クライアント、サーバー共通ポート設定
#

###(初回実行)
  bat_npm.bat
  compiler.bat
  run.bat

###(設定)
port設定
  /contents/proj/CommonJs.coffee


###reload server
* http://localhost:8081/?ws&all # all file
* http://localhost:8081/?ws&g=index.html,main.js # specified file

---
####as node.js application
そのままcloneし、`node server`で起動。


---
###package
配置を参考に、elecronがあるフォルダと同じフォルダに入れrun.batを起動する
```

# amdeven?
* AM development environment
* 午前の開発環境

## how to use (作成途中)
```
#必要環境
node.js, electron (download to ../), ???

npm install am-deven
node ./node_modules/am-deven/app/lib/copy_template.js
npm install

# edit electron version (run.bat)
start ../electron-v0.30.4-win32-x64/electron.exe ./
```


#### my build environment

```
# install chocolatey
choco install -yf ruby nodejs python2 visualstudio2015community
choco install -yf githubforwindows atom
choco install -yf skype line lhaplus cmder  notepadplusplus googlechrome firefox clover autoit crystaldiskinfo libreoffice googlechrome.canary

# download
clibor - http://www.amunsnet.com/

# atom package
apm install pigments highlight-selected highlight-column save-session tabs-to-spaces minimap minimap-git-diff minimap-pigments editorconfig linter linter-coffeelint script pretty-json
## styesheet
atom-text-editor {
    font-family: "Avenir Next",Verdana, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "游ゴシック", "Yu Gothic", "メイリオ", Meiryo, Osaka, sans-serif;
}

# compiler
npm install -g coffee-script
gem source -a http://rubygems.org/
gem install sass


# clone後
coffee ./test/lib/init.coffee
# TODO 1: windows 7 & VS2015 でエラーが出る
# TODO 1: windows 10で確認する

#
```

### TODO: やりたいこと
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
          /mylib/CommonJs.coffee # クライアント、サーバー共通ポート設定
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

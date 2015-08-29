##### 取扱説明書
```coffee-script
amdeven?
  AM development enviroment
  午前の開発環境

deploy
  npm install amdeven


this project delevelopment environment
  windows7
    #要インストール
    node.js
    coffee-script
    ruby
      sass

my build environment
  choco install -yf ruby nodejs python2 skype line lhaplus cmder atom notepadplusplus googlechrome firefox clover autoit crystaldiskinfo githubforwindows libreoffice googlechrome.canary
  windows7?
    #動作確認したような
    choco install -yf visualstudio2012wdx
    #動作未確認
    choco install -yf visualstudio2015community # window 10
  # download
  clibor - http://www.amunsnet.com/
  apm install pigments highlight-selected save-session tabs-to-spaces minimap minimap-git-diff minimap-pigments
  apm install editorconfig
  #if use
  if use coffee-script
    npm install -g coffee-script
  if use sass
    choco install -yf ruby
    gem source -a http://rubygems.org/
    gem install sass


cloud9 setup
  git clone
  fin?


development
  git clone
  各モジュールでのnpm install
  全終了後
  coffee "./node_modules/am-deven/app/src/compile_all.coffee"


```
#過去ログ
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

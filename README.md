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
choco install -yf visualstudio2015community
choco install -yf githubforwindows atom
choco install -yf ruby nodejs python2 skype line lhaplus cmder  notepadplusplus googlechrome firefox clover autoit crystaldiskinfo libreoffice googlechrome.canary

# download
clibor - http://www.amunsnet.com/

# atom package
apm install pigments highlight-selected save-session tabs-to-spaces minimap minimap-git-diff minimap-pigments editorconfig linter-coffeelint

# compiler
npm install -g coffee-script
gem source -a http://rubygems.org/
gem install sass


# todo - nodeから起動させる
# command
git clone https://github.com/ampcpmgp/amdeven/
cd node_modules/am-autoevent/ && npm install && coffee -cm ./
cd ../../node_modules/am-common/ && npm install && coffee -cm ./
cd ../../node_modules/am-compiler/ && npm install && coffee -cm ./
cd ../../node_modules/am-node-parts/ && npm install && coffee -cm ./
cd  ../../node_modules/am-deven/ && npm install && coffee -cm ./
cd ../../ && coffee -cm ./

#
```


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

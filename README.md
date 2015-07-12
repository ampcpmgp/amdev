#amdeven
AM-development enviroment

##my develop
windows7


###configuration
	if use coffee-script
		npm install -g coffee-script
	if use sass
		choco install -yf ruby
		gem source -a http://rubygems.org/
		gem install sass

###my enviroment
	### atom
		apm install pigments highlight-selected save-session tabs-to-spaces

my atom enviroment
	apm install pigments highlight-selected save-session tabs-to-spaces minimap minimap-git-diff

###(動作確認)
windows7

###(開発環境)
#### ruby(if use sass)
	gem source -a http://rubygems.org/
	gem install sass

###(自分の開発環境)
#### my package
	choco install -yf io.js nodejs skype line lhaplus cmder atom notepadplusplus ruby googlechrome clover dexpot autoit crystaldiskinfo githubforwindows libreoffice googlechrome.canary
	choco install -yf firefox-dev -pre
#### download
	clibor - http://www.amunsnet.com/

#### cloud9
	git clone
	nvm install v1.* #iojs

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

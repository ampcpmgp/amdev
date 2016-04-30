cronJob = require("cron")
PouchDB = require("pouchdb/dist/pouchdb.js")
db = new PouchDB('dbname')

module.exports = class GitHubAPI

# TODO: PouchDBの動作確認(DBのセット、ゲット、idbとleveldbで同様に動くか確認)
# TODO: cronの動作確認

### Flow
#Github Trends
githubtrendsを月1頭に取得
各star数を見る
月ごとにグラフ化する（top30くらいで良いかな）

#Github API
週に1回　star top 1000の推移を取る
その言語の割合を見る
その名前での仕事を見る→不要なものは削除する

###

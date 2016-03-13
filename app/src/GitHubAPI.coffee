cronJob = require("cron")
PouchDB = require("pouchdb/dist/pouchdb.js")
db = new PouchDB('dbname')

module.exports = class GitHubAPI

# TODO: PouchDBの動作確認(DBのセット、ゲット、idbとleveldbで同様に動くか確認)
# TODO: cronの動作確認

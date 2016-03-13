cronJob = require("cron")
PouchDB = require("pouchdb/dist/pouchdb.js")
db = new PouchDB('dbname')

module.exports = class GitHubAPI

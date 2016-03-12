request = require("superagent")
cronJob = require("cron")
PouchDB = root.PouchDB
PouchDB = require("pouchdb") unless PouchDB

module.exports = class GitHubAPI

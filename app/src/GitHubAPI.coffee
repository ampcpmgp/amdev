request = require("superagent")
cronJob = require("cron")
PouchDB = require("pouchdb") unless PouchDB

module.exports = class GitHubAPI

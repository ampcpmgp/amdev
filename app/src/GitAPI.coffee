request = require("superagent")
cronJob = require("cron")
PouchDB = PouchDB
PouchDB = require("pouchdb") unless PouchDB

module.exports = class GitAPI

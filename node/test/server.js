module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var NodeParts;

	NodeParts = __webpack_require__(4).prototype;

	NodeParts.start(8091, 8091);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var SimpleServer, chokidar, fs, glob, http, lodash, mime, sio,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	fs = __webpack_require__(5);

	http = __webpack_require__(6);

	chokidar = __webpack_require__(7);

	mime = __webpack_require__(8);

	sio = __webpack_require__(9);

	glob = __webpack_require__(10);

	lodash = __webpack_require__(11);

	module.exports = SimpleServer = (function() {
	  function SimpleServer() {
	    this.checkReloadList = bind(this.checkReloadList, this);
	    this.wsEventReload = bind(this.wsEventReload, this);
	    this.wsStart = bind(this.wsStart, this);
	  }

	  SimpleServer.prototype.livereloadJs = __dirname + "/browser/livereload.js";

	  SimpleServer.prototype.livereloadPath = "/__livereload.js";

	  SimpleServer.prototype.webDir = ["./"];

	  SimpleServer.prototype.watchPath = glob.sync("./**/web/**/*.@(html|js)", {
	    ignore: "./**/node_modules/**"
	  });

	  SimpleServer.prototype.sioOption = {};

	  SimpleServer.prototype.reloadList = [];

	  SimpleServer.prototype.start = function(httpPort, wsPort) {
	    var error, error1, lastArg, listen, path;
	    this.httpPort = httpPort != null ? httpPort : 8080;
	    this.wsPort = wsPort != null ? wsPort : this.httpPort;
	    try {
	      path = "./modules/am-simple-server/browser/livereload.js";
	      fs.statSync(path);
	      this.livereloadJs = path;
	    } catch (error1) {
	      error = error1;
	      0;
	    }
	    this.app = http.createServer((function(_this) {
	      return function(req, res) {
	        return _this.httpServerAction(req, res);
	      };
	    })(this));
	    lastArg = arguments[arguments.length - 1];
	    listen = (function(_this) {
	      return function() {
	        return _this.app.listen(_this.httpPort, typeof lastArg === "function" ? lastArg : void 0);
	      };
	    })(this);
	    setTimeout(listen, 0);
	    return this.wsStart();
	  };

	  SimpleServer.prototype._checkExistsFile = function(file) {
	    var dir, j, len, path, webDir;
	    webDir = typeof this.webDir !== "object" ? [this.webDir] : this.webDir;
	    for (j = 0, len = webDir.length; j < len; j++) {
	      dir = webDir[j];
	      path = "" + dir + file;
	      if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
	        return path;
	      }
	    }
	    return false;
	  };

	  SimpleServer.prototype.httpServerAction = function(req, res) {
	    var data, date, ip, path, type, url;
	    url = req.url.replace(/\/{2,}/, "/").replace(/\?.*$/, "");
	    if (url[url.length - 1] === "/") {
	      url += "index.html";
	    }

	    /*get file */
	    path = this._checkExistsFile(url);
	    if (path) {
	      data = fs.readFileSync(path);
	      type = mime.lookup(path);
	      res.writeHead(200, {
	        "Content-Type": type
	      });
	      if (type === "text/html") {
	        data = data.toString("utf8") + ("<script src='" + this.livereloadPath + "'></script>");
	        data = Buffer.from(data);
	      }
	      res.end(data);
	    } else if (url === this.livereloadPath) {
	      data = fs.readFileSync(this.livereloadJs);
	      type = mime.lookup(this.livereloadJs);
	      res.writeHead(200, {
	        "Content-Type": type
	      });
	      res.end(data);
	    } else {
	      res.writeHead(404);
	      res.end("404 - file not found");
	    }

	    /*access log */
	    if (url.slice(url.length - 4, +(url.length - 1) + 1 || 9e9) === "html") {
	      ip = req.connection.remoteAddress.replace(/.*[^\d](\d+\.\d+\.\d+\.\d+$)/, "$1");
	      date = new Date().toLocaleTimeString();
	      return console.log(date + " " + ip + " " + path);
	    }
	  };

	  SimpleServer.prototype.wsStart = function() {
	    var server;
	    server = this.wsPort === this.httpPort ? this.app : this.wsPort;
	    this.websocket = sio(server, this.sioOption);
	    this.websocket.on("connection", (function(_this) {
	      return function(socket) {
	        _this.reloadList.push(socket);
	        return socket.on("test", function(msg) {
	          return console.log(msg);
	        });
	      };
	    })(this));
	    return this.wsEventReload();
	  };

	  SimpleServer.prototype.wsEventReload = function() {
	    return chokidar.watch(this.watchPath, {
	      persistent: true,
	      awaitWriteFinish: {
	        stabilityThreshold: 10,
	        pollInterval: 10
	      }
	    }).on("change", (function(_this) {
	      return function(path, stat) {
	        var j, len, ref, results, socket;
	        _this.checkReloadList();
	        ref = _this.reloadList;
	        results = [];
	        for (j = 0, len = ref.length; j < len; j++) {
	          socket = ref[j];
	          results.push(_this.sendReloadEvent(socket));
	        }
	        return results;
	      };
	    })(this));
	  };

	  SimpleServer.prototype.sendReloadEvent = function(socket) {
	    return socket.emit("reload");
	  };

	  SimpleServer.prototype.sendCssReloadEvent = function(socket, filepath) {
	    return socket.emit("css reload", fs.readFileSync(filepath, {
	      encoding: "utf-8"
	    }));
	  };

	  SimpleServer.prototype.checkReloadList = function() {
	    var arr, i, j, k, len, len1, num, ref, results, socket;
	    arr = [];
	    ref = this.reloadList;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      socket = ref[i];
	      if (socket.disconnected) {
	        arr.unshift(i);
	      }
	    }
	    results = [];
	    for (k = 0, len1 = arr.length; k < len1; k++) {
	      num = arr[k];
	      results.push(this.reloadList.splice(num, 1));
	    }
	    return results;
	  };

	  return SimpleServer;

	})();

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("chokidar");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("mime");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("glob");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ }
/******/ ]);
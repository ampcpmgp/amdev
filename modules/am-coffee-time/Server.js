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

	/* WEBPACK VAR INJECTION */(function(__dirname) {var LunchServer, SimpleServer, chokidar, cson, devJs, fs, html, mime,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	fs = __webpack_require__(1);

	mime = __webpack_require__(2);

	chokidar = __webpack_require__(3);

	cson = __webpack_require__(4);

	SimpleServer = __webpack_require__(5);

	html = null;

	devJs = null;

	module.exports = LunchServer = (function(superClass) {
	  extend(LunchServer, superClass);

	  function LunchServer() {
	    this.sendTestCase = bind(this.sendTestCase, this);
	    this.httpServerAction = bind(this.httpServerAction, this);
	    this.start = bind(this.start, this);
	    return LunchServer.__super__.constructor.apply(this, arguments);
	  }

	  LunchServer.prototype.watchPath = "./web/test.js";

	  LunchServer.prototype.patternFile = "./web/case.cson";

	  LunchServer.prototype.htmlPath = __dirname + "/browser/index.html";

	  LunchServer.prototype.devJsPath = __dirname + "/browser/dev.js";

	  LunchServer.prototype.sioOption = {
	    origins: "*:*"
	  };

	  LunchServer.prototype.start = function(httpPort, wsPort) {
	    this.httpPort = httpPort != null ? httpPort : 8080;
	    this.wsPort = wsPort != null ? wsPort : this.httpPort;
	    LunchServer.__super__.start.call(this, this.httpPort, this.wsPort, (function(_this) {
	      return function() {
	        return console.log("server start, on port:" + _this.httpPort);
	      };
	    })(this));
	    html = fs.readFileSync(this.htmlPath, {
	      encoding: "utf-8"
	    });
	    devJs = fs.readFileSync(this.devJsPath, {
	      encoding: "utf-8"
	    }).replace("{__WSPORT__}", this.wsPort).replace("{__TESTJS__}", this.watchPath.replace(this.webDir, ""));
	    chokidar.watch(this.patternFile).on("change", (function(_this) {
	      return function(path) {
	        var i, len, ref, results, socket;
	        ref = _this.reloadList;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          socket = ref[i];
	          results.push(_this.sendTestCase(socket));
	        }
	        return results;
	      };
	    })(this));
	    return this.websocket.on("connection", (function(_this) {
	      return function(socket) {
	        return _this.sendTestCase(socket);
	      };
	    })(this));
	  };

	  LunchServer.prototype.httpServerAction = function(req, res) {
	    var url;
	    url = req.url.replace(/\/{2,}/, "/").replace(/\?.*$/, "");
	    res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Cache-Control', 'no-cache');
	    if (url === "/") {
	      res.writeHead(200, {
	        "Content-Type": "text/html"
	      });
	      return res.end(html);
	    } else if (url === "/dev.js") {
	      res.writeHead(200, {
	        "Content-Type": "text/javascript"
	      });
	      return res.end(devJs.replace("{__DOMAIN__}", req.headers.host));
	    }
	    return LunchServer.__super__.httpServerAction.call(this, req, res);
	  };

	  LunchServer.prototype.sendTestCase = function(socket, pattern) {
	    var ext, obj;
	    ext = this.patternFile.match(/\.([^\.]+)$/)[1];
	    obj = cson.parseFile(this.patternFile, {
	      format: ext
	    });
	    return socket.emit("pattern", obj);
	  };

	  return LunchServer;

	})(SimpleServer);

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("mime");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("chokidar");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("cson");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var SimpleServer, chokidar, fs, glob, http, mime, sio,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	fs = __webpack_require__(1);

	http = __webpack_require__(6);

	chokidar = __webpack_require__(3);

	mime = __webpack_require__(2);

	sio = __webpack_require__(7);

	glob = __webpack_require__(8);

	module.exports = SimpleServer = (function() {
	  function SimpleServer() {
	    this.checkReloadList = bind(this.checkReloadList, this);
	    this.wsEventReload = bind(this.wsEventReload, this);
	    this.wsStart = bind(this.wsStart, this);
	  }

	  SimpleServer.prototype.webDir = ["./"];

	  SimpleServer.prototype.watchPath = glob.sync("./web/*.@(html|js)", {
	    ignore: "**/node_modules/**"
	  });

	  SimpleServer.prototype.sioOption = {};

	  SimpleServer.prototype.reloadList = [];

	  SimpleServer.prototype.start = function(httpPort, wsPort) {
	    var lastArg, listen;
	    this.httpPort = httpPort != null ? httpPort : 8080;
	    this.wsPort = wsPort != null ? wsPort : this.httpPort;
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
	    return chokidar.watch(this.watchPath).on("change", (function(_this) {
	      return function(path) {
	        var j, len, ref, results, socket;
	        if (!fs.lstatSync(path).size) {
	          return;
	        }
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


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("glob");

/***/ }
/******/ ]);
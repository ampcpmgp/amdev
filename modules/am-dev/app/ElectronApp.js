module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("cson");

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = {"browserWindow":{"x":0,"y":0,"width":1027,"height":968,"icon":"./web/favicon.ico","webPreferences":{"url":"/app/index.html","preload":"/app/preload.js"}},"cl":{"intervalMin":5},"server":{"port":8091}}

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

var $, ElectronApp, chokidar, glob, ipcRenderer;

ipcRenderer = __webpack_require__(8).ipcRenderer;

$ = __webpack_require__(6);

chokidar = __webpack_require__(9);

glob = __webpack_require__(5);

ElectronApp = (function() {
  ElectronApp.prototype._inspector = 1;

  ElectronApp.prototype.publishFlg = true;

  function ElectronApp() {}

  ElectronApp.prototype.start = function() {
    this.init();
    this.liveReload();
    return this.serverStart();
  };


  /* 信頼しているメソッドなるべくフロー順 */

  ElectronApp.prototype.init = function() {
    if (this._inspector) {
      this.autoInspector();
    }
    return ipcRenderer.on("electron send msg", function(event, msg) {
      return console.log("%cfrom Browser, %c" + msg, "color: gray", "color: blue");
    });
  };

  ElectronApp.prototype.autoInspector = function() {
    return $(document).on("mousedown", function(e) {
      var obj;
      if (e.button === 2) {
        obj = {
          x: e.clientX,
          y: e.clientY
        };
        return ipcRenderer.send('inspect element', obj, "mainWindow");
      }
    });
  };

  ElectronApp.prototype.liveReload = function() {
    return chokidar.watch(glob.sync("./**/{,.*/**}/{app,node}/*.{html,js}", {
      ignore: "./**/{,.*/**}/node_modules/**"
    }), {
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 10,
        pollInterval: 10
      }
    }).on("change", (function(_this) {
      return function() {
        if (localStorage.liveReloadFlg !== "true") {
          return;
        }
        return location.reload();
      };
    })(this));
  };

  ElectronApp.prototype.serverStart = function() {
    var ref;
    try {
      this.config = __webpack_require__(10).load('.config.cson');
    } catch (error) {
      this.config = __webpack_require__(17);
    }
    this.port = ((ref = this.config.server) != null ? ref.port : void 0) || 8091;
    return __webpack_require__(34).prototype.start(this.port, this.port);
  };

  return ElectronApp;

})();

module.exports = ElectronApp;


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var SimpleServer, chokidar, fs, glob, http, lodash, mime, sio,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

fs = __webpack_require__(2);

http = __webpack_require__(35);

chokidar = __webpack_require__(9);

mime = __webpack_require__(37);

sio = __webpack_require__(39);

glob = __webpack_require__(5);

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

  SimpleServer.prototype.watchPath = glob.sync("./**/web/*.@(html|js)", {
    ignore: "./**/node_modules/**"
  });

  SimpleServer.prototype.sioOption = {};

  SimpleServer.prototype.reloadList = [];

  SimpleServer.prototype.start = function(httpPort, wsPort) {
    var error, lastArg, listen, path;
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
      if (!data.length) {
        setTimeout(((function(_this) {
          return function() {
            return _this.httpServerAction(req, res);
          };
        })(this)), 500);
        return;
      }
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
        var curDate, diff;
        curDate = Date.now();
        diff = curDate - _this.wsEventReload_prevDate;
        _this.wsEventReload_prevDate = curDate;
        if (diff < 2000) {
          return;
        }
        return setTimeout(function() {
          var j, len, ref, results, socket;
          _this.checkReloadList();
          ref = _this.reloadList;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            socket = ref[j];
            results.push(_this.sendReloadEvent(socket));
          }
          return results;
        }, 200);
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

/***/ }),

/***/ 35:
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = require("mime");

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(30);


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("chokidar");

/***/ })

/******/ });
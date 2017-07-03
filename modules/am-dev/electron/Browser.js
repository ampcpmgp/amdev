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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("fs");

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("fs-extra");

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("child_process");

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("electron");

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports) {

	module.exports = require("chokidar");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = {"browserWindow":{"x":0,"y":0,"width":1027,"height":968,"icon":"./web/favicon.ico","webPreferences":{"url":"/app/index.html","preload":"/app/preload.js"}},"cl":{"intervalMin":5},"server":{"port":8091}}

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var Browser, BrowserWindow, Watcher, app, chokidar, cson, exec, fork, fs, fse, ipcMain, mainWindow, ref,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	fse = __webpack_require__(6);

	chokidar = __webpack_require__(20);

	cson = __webpack_require__(28);

	fs = __webpack_require__(4);

	exec = __webpack_require__(9).exec;

	fork = __webpack_require__(9).fork;

	ref = __webpack_require__(15), ipcMain = ref.ipcMain, app = ref.app, BrowserWindow = ref.BrowserWindow;

	mainWindow = null;

	Watcher = (function() {
	  function Watcher() {
	    this.start = bind(this.start, this);
	    this.restart = bind(this.restart, this);
	  }

	  Watcher.prototype.restart = function() {
	    var cmd;
	    if (!this.restartFlg) {
	      cmd = fse.readJsonSync("package.json").scripts.electron;
	      exec(cmd);
	    }
	    this.restartFlg = true;
	    return setTimeout(app.quit, 0);
	  };

	  Watcher.prototype.start = function() {
	    return chokidar.watch(["./electron/"]).on("change", (function(_this) {
	      return function(path) {
	        if (!path.match(/\.js$/)) {
	          return;
	        }
	        return _this.restart();
	      };
	    })(this));
	  };

	  return Watcher;

	})();

	module.exports = Browser = (function() {
	  function Browser() {
	    this.sendMsg = bind(this.sendMsg, this);
	    this.ipcEvent = bind(this.ipcEvent, this);
	    this.start = bind(this.start, this);
	    this.init = bind(this.init, this);
	  }

	  Browser.prototype.configCson = ".config.cson";

	  Browser.prototype.init = function() {
	    try {
	      this.config = cson.load(this.configCson);
	    } catch (error) {
	      this.config = __webpack_require__(21);
	    }
	    this.option = this.config.browserWindow;
	    return this;
	  };

	  Browser.prototype.start = function() {
	    this.url = this.config.browserWindow.webPreferences.url;
	    this.watcher = new Watcher();
	    this.watcher.start();
	    this.ipcEvent();
	    app.on("window-all-closed", (function(_this) {
	      return function() {
	        if (process.platform !== "darwin") {
	          return app.quit();
	        }
	      };
	    })(this));
	    return app.on("ready", (function(_this) {
	      return function() {
	        var option;
	        option = JSON.parse(JSON.stringify(_this.option));
	        option.webPreferences.preload = "" + (process.cwd()) + _this.option.webPreferences.preload;
	        mainWindow = _this.mainWindow = new BrowserWindow(option);
	        mainWindow.setAlwaysOnTop(true);
	        if (!_this.url.match(/^(http|\/\/)/)) {
	          _this.url = "file://" + (process.cwd()) + _this.url;
	        }
	        mainWindow.loadURL(_this.url);
	        mainWindow.openDevTools();
	        mainWindow.webContents.on("did-finish-load", function() {
	          if (!_this.option["always-on-top"]) {
	            return mainWindow != null ? mainWindow.setAlwaysOnTop(false) : void 0;
	          }
	        });
	        mainWindow.on("closed", function() {
	          return mainWindow = null;
	        });
	        mainWindow.on("close", function(e) {
	          var csonString, wh, xy;
	          if (!(mainWindow != null ? mainWindow.getPosition : void 0)) {
	            return;
	          }
	          xy = mainWindow.getPosition();
	          wh = mainWindow.getSize();
	          _this.option.x = xy[0];
	          _this.option.y = xy[1];
	          _this.option.width = wh[0];
	          _this.option.height = wh[1];
	          csonString = cson.createCSONString(_this.config, {
	            indent: "  "
	          });
	          fs.writeFileSync(_this.configCson, csonString);
	          return mainWindow = null;
	        });
	        return mainWindow.on("app-command", function(e, cmd) {
	          if (cmd === "browser-backward" && mainWindow.webContents.canGoBack()) {
	            return mainWindow.webContents.goBack();
	          } else if (cmd === "browser-forward" && mainWindow.webContents.canGoForward()) {
	            return mainWindow.webContents.goForward();
	          }
	        });
	      };
	    })(this));
	  };

	  Browser.prototype.ipcEvent = function() {
	    return ipcMain.on("inspect element", (function(_this) {
	      return function(e, arg, renderer) {
	        return _this[renderer].inspectElement(arg.x, arg.y);
	      };
	    })(this)).on("restart", this.watcher.restart);
	  };

	  Browser.prototype.startCompiler = function() {
	    return exec(fse.readJsonSync("package.json").scripts.watch).stdout.on("data", this.sendMsg);
	  };

	  Browser.prototype.sendMsg = function(msg) {
	    return mainWindow != null ? mainWindow.webContents.send("electron send msg", msg) : void 0;
	  };

	  return Browser;

	})();


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = require("cson");

/***/ })
/******/ ]);
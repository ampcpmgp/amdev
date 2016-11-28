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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(34);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },

/***/ 4:
/***/ function(module, exports) {

	module.exports = require("jquery");

/***/ },

/***/ 11:
/***/ function(module, exports) {

	module.exports = require("glob");

/***/ },

/***/ 13:
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ },

/***/ 17:
/***/ function(module, exports) {

	module.exports = require("chokidar");

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	var $, ElectronApp, chokidar, fs, glob, ipcRenderer;

	ipcRenderer = __webpack_require__(13).ipcRenderer;

	fs = __webpack_require__(2);

	$ = __webpack_require__(4);

	chokidar = __webpack_require__(17);

	glob = __webpack_require__(11);

	module.exports = ElectronApp = (function() {
	  ElectronApp.prototype._inspector = 1;

	  ElectronApp.prototype.publishFlg = true;

	  ElectronApp.prototype.liveReloadStopFlg = false;

	  function ElectronApp() {}

	  ElectronApp.prototype.start = function() {
	    this.init();
	    return this.liveReload();
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
	    return chokidar.watch(glob.sync("./**/@(app|node)/**/*.@(html|js)", {
	      ignore: "./**/node_modules/**"
	    }), {
	      persistent: true,
	      awaitWriteFinish: {
	        stabilityThreshold: 10,
	        pollInterval: 10
	      }
	    }).on("change", (function(_this) {
	      return function(path) {
	        if (_this.liveReloadStopFlg) {
	          return;
	        }
	        return location.reload();
	      };
	    })(this));
	  };

	  return ElectronApp;

	})();


/***/ }

/******/ });
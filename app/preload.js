
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

	eval("var start;\n\nstart = function() {\n  window.ea = new (__webpack_require__(9));\n  return ea.start();\n};\n\ndocument.addEventListener(\"DOMContentLoaded\", start);\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9wcmVsb2FkLmNvZmZlZT9kY2NmIl0sInNvdXJjZXNDb250ZW50IjpbInN0YXJ0ID0gLT5cclxuICAjRWxlY3Ryb25cclxuICB3aW5kb3cuZWEgPSBuZXcgKHJlcXVpcmUoXCJhbS1kZXYvYXBwL0VsZWN0cm9uQXBwXCIpKVxyXG4gIGVhLnN0YXJ0KClcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHN0YXJ0KVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FwcC9wcmVsb2FkLmNvZmZlZVxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUhBO0FBQ0E7QUFJQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = require(\"jquery\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImpxdWVyeVwiPzBiNzYiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJqcXVlcnlcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	eval("module.exports = require(\"fs\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImZzXCI/MmUwOSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZnNcIlxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	eval("module.exports = require(\"electron\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImVsZWN0cm9uXCI/NjkyOCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZWxlY3Ryb25cIlxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDJcbiAqKi8iXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("var $, ElectronApp, chokidar, fs, glob, ipcRenderer;\n\nipcRenderer = __webpack_require__(8).ipcRenderer;\n\nfs = __webpack_require__(4);\n\n$ = __webpack_require__(1);\n\nchokidar = __webpack_require__(10);\n\nglob = __webpack_require__(11);\n\nmodule.exports = ElectronApp = (function() {\n  ElectronApp.prototype._inspector = 1;\n\n  function ElectronApp() {}\n\n  ElectronApp.prototype.start = function() {\n    this.init();\n    return this.liveReload();\n  };\n\n\n  /* 信頼しているメソッドなるべくフロー順 */\n\n  ElectronApp.prototype.init = function() {\n    if (this._inspector) {\n      this.autoInspector();\n    }\n    return ipcRenderer.on(\"electron send msg\", function(event, msg) {\n      return console.log(\"%cfrom Browser, %c\" + msg, \"color: gray\", \"color: blue\");\n    });\n  };\n\n  ElectronApp.prototype.autoInspector = function() {\n    return $(document).on(\"mousedown\", function(e) {\n      var obj;\n      if (e.button === 2) {\n        obj = {\n          x: e.clientX,\n          y: e.clientY\n        };\n        return ipcRenderer.send('inspect element', obj, \"mainWindow\");\n      }\n    });\n  };\n\n  ElectronApp.prototype.liveReload = function() {\n    return chokidar.watch(glob.sync(\"./@(app|node)/*.@(html|js)\", {\n      ignore: \"**/node_modules/**\"\n    })).on(\"change\", (function(_this) {\n      return function(path) {\n        if (_this.liveReloadStopFlg) {\n          return;\n        }\n        return location.reload();\n      };\n    })(this));\n  };\n\n  return ElectronApp;\n\n})();\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL21vZHVsZXMvYW0tZGV2L2FwcC9FbGVjdHJvbkFwcC5jb2ZmZWU/ODlkYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpcGNSZW5kZXJlciA9IHJlcXVpcmUoJ2VsZWN0cm9uJykuaXBjUmVuZGVyZXJcclxuZnMgPSByZXF1aXJlKFwiZnNcIilcclxuXHJcbiQgPSByZXF1aXJlKFwianF1ZXJ5XCIpXHJcbmNob2tpZGFyID0gcmVxdWlyZShcImNob2tpZGFyXCIpXHJcbmdsb2IgPSByZXF1aXJlKFwiZ2xvYlwiKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBFbGVjdHJvbkFwcFxyXG4gIF9pbnNwZWN0b3I6IDFcclxuICBjb25zdHJ1Y3RvcjogLT5cclxuICBzdGFydDogLT5cclxuICAgIEBpbml0KClcclxuICAgIEBsaXZlUmVsb2FkKClcclxuICAjIyMg5L+h6aC844GX44Gm44GE44KL44Oh44K944OD44OJ44Gq44KL44G544GP44OV44Ot44O86aCGICMjI1xyXG4gIGluaXQ6IC0+XHJcbiAgICBpZiBAX2luc3BlY3RvciB0aGVuIEBhdXRvSW5zcGVjdG9yKClcclxuICAgIGlwY1JlbmRlcmVyLm9uKFwiZWxlY3Ryb24gc2VuZCBtc2dcIiwoZXZlbnQsIG1zZykgLT5cclxuICAgICAgY29uc29sZS5sb2coXCIlY2Zyb20gQnJvd3NlciwgJWMje21zZ31cIiwgXCJjb2xvcjogZ3JheVwiLCBcImNvbG9yOiBibHVlXCIpXHJcbiAgICApXHJcbiAgYXV0b0luc3BlY3RvcjogLT5cclxuICAgICQoZG9jdW1lbnQpLm9uIFwibW91c2Vkb3duXCIsIChlKSAtPlxyXG4gICAgICBpZiBlLmJ1dHRvbiBpcyAyXHJcbiAgICAgICAgb2JqID1cclxuICAgICAgICAgIHg6IGUuY2xpZW50WFxyXG4gICAgICAgICAgeTogZS5jbGllbnRZXHJcbiAgICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnaW5zcGVjdCBlbGVtZW50Jywgb2JqLCBcIm1haW5XaW5kb3dcIilcclxuICBsaXZlUmVsb2FkOiAtPlxyXG4gICAgY2hva2lkYXJcclxuICAgICAgLndhdGNoKGdsb2Iuc3luYyhcIi4vQChhcHB8bm9kZSkvKi5AKGh0bWx8anMpXCIsIHtpZ25vcmU6IFwiKiovbm9kZV9tb2R1bGVzLyoqXCJ9KSlcclxuICAgICAgLm9uKFwiY2hhbmdlXCIsIChwYXRoKSA9PlxyXG4gICAgICAgIHJldHVybiBpZiBAbGl2ZVJlbG9hZFN0b3BGbGdcclxuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxyXG4gICAgICApXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbW9kdWxlcy9hbS1kZXYvYXBwL0VsZWN0cm9uQXBwLmNvZmZlZVxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUxBO0FBREE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBOztBQUNBO0FBRkE7QUFBQTtBQUhBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 10 */
/***/ function(module, exports) {

	eval("module.exports = require(\"chokidar\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTAuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaG9raWRhclwiPzhmZmUiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hva2lkYXJcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImNob2tpZGFyXCJcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDJcbiAqKi8iXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("module.exports = require(\"glob\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJnbG9iXCI/NTljYSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnbG9iXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJnbG9iXCJcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);
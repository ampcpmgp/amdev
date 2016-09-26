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

	eval("__webpack_require__(40);\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL21vZHVsZXMvYW0tdGVtcGxhdGUvY29mZmVlL2FwcC90ZXN0L3ByZWxvYWQuY29mZmVlP2UyZmIiXSwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZShcIi4uL3ByZWxvYWRcIilcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9tb2R1bGVzL2FtLXRlbXBsYXRlL2NvZmZlZS9hcHAvdGVzdC9wcmVsb2FkLmNvZmZlZVxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUE7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },

/***/ 2:
/***/ function(module, exports) {

	eval("module.exports = require(\"jquery\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImpxdWVyeVwiPzBiNzYiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJqcXVlcnlcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDRcbiAqKi8iXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },

/***/ 5:
/***/ function(module, exports) {

	eval("module.exports = require(\"fs\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImZzXCI/MmUwOSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZnNcIlxuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNCA1XG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },

/***/ 9:
/***/ function(module, exports) {

	eval("module.exports = require(\"electron\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImVsZWN0cm9uXCI/NjkyOCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZWxlY3Ryb25cIlxuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNCA1XG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },

/***/ 15:
/***/ function(module, exports) {

	eval("module.exports = require(\"chokidar\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaG9raWRhclwiPzhmZmUiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hva2lkYXJcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImNob2tpZGFyXCJcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiA0IDVcbiAqKi8iXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },

/***/ 18:
/***/ function(module, exports) {

	eval("module.exports = require(\"glob\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJnbG9iXCI/NTljYSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnbG9iXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJnbG9iXCJcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgNFxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	eval("var $, ElectronApp, chokidar, fs, glob, ipcRenderer;\n\nipcRenderer = __webpack_require__(9).ipcRenderer;\n\nfs = __webpack_require__(5);\n\n$ = __webpack_require__(2);\n\nchokidar = __webpack_require__(15);\n\nglob = __webpack_require__(18);\n\nmodule.exports = ElectronApp = (function() {\n  ElectronApp.prototype._inspector = 1;\n\n  function ElectronApp() {}\n\n  ElectronApp.prototype.start = function() {\n    this.init();\n    return this.liveReload();\n  };\n\n\n  /* 信頼しているメソッドなるべくフロー順 */\n\n  ElectronApp.prototype.init = function() {\n    if (this._inspector) {\n      this.autoInspector();\n    }\n    return ipcRenderer.on(\"electron send msg\", function(event, msg) {\n      return console.log(\"%cfrom Browser, %c\" + msg, \"color: gray\", \"color: blue\");\n    });\n  };\n\n  ElectronApp.prototype.autoInspector = function() {\n    return $(document).on(\"mousedown\", function(e) {\n      var obj;\n      if (e.button === 2) {\n        obj = {\n          x: e.clientX,\n          y: e.clientY\n        };\n        return ipcRenderer.send('inspect element', obj, \"mainWindow\");\n      }\n    });\n  };\n\n  ElectronApp.prototype.liveReload = function() {\n    return chokidar.watch(glob.sync(\"./@(app|node)/**.@(html|js)\", {\n      ignore: \"**/node_modules/**\"\n    })).on(\"change\", (function(_this) {\n      return function(path) {\n        if (_this.liveReloadStopFlg) {\n          return;\n        }\n        return location.reload();\n      };\n    })(this));\n  };\n\n  return ElectronApp;\n\n})();\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2FtLWRldi9hcHAvRWxlY3Ryb25BcHAuY29mZmVlPzg5ZGMiXSwic291cmNlc0NvbnRlbnQiOlsiaXBjUmVuZGVyZXIgPSByZXF1aXJlKCdlbGVjdHJvbicpLmlwY1JlbmRlcmVyXHJcbmZzID0gcmVxdWlyZShcImZzXCIpXHJcblxyXG4kID0gcmVxdWlyZShcImpxdWVyeVwiKVxyXG5jaG9raWRhciA9IHJlcXVpcmUoXCJjaG9raWRhclwiKVxyXG5nbG9iID0gcmVxdWlyZShcImdsb2JcIilcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgRWxlY3Ryb25BcHBcclxuICBfaW5zcGVjdG9yOiAxXHJcbiAgY29uc3RydWN0b3I6IC0+XHJcbiAgc3RhcnQ6IC0+XHJcbiAgICBAaW5pdCgpXHJcbiAgICBAbGl2ZVJlbG9hZCgpXHJcbiAgIyMjIOS/oemgvOOBl+OBpuOBhOOCi+ODoeOCveODg+ODieOBquOCi+OBueOBj+ODleODreODvOmghiAjIyNcclxuICBpbml0OiAtPlxyXG4gICAgaWYgQF9pbnNwZWN0b3IgdGhlbiBAYXV0b0luc3BlY3RvcigpXHJcbiAgICBpcGNSZW5kZXJlci5vbihcImVsZWN0cm9uIHNlbmQgbXNnXCIsKGV2ZW50LCBtc2cpIC0+XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiJWNmcm9tIEJyb3dzZXIsICVjI3ttc2d9XCIsIFwiY29sb3I6IGdyYXlcIiwgXCJjb2xvcjogYmx1ZVwiKVxyXG4gICAgKVxyXG4gIGF1dG9JbnNwZWN0b3I6IC0+XHJcbiAgICAkKGRvY3VtZW50KS5vbiBcIm1vdXNlZG93blwiLCAoZSkgLT5cclxuICAgICAgaWYgZS5idXR0b24gaXMgMlxyXG4gICAgICAgIG9iaiA9XHJcbiAgICAgICAgICB4OiBlLmNsaWVudFhcclxuICAgICAgICAgIHk6IGUuY2xpZW50WVxyXG4gICAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ2luc3BlY3QgZWxlbWVudCcsIG9iaiwgXCJtYWluV2luZG93XCIpXHJcbiAgbGl2ZVJlbG9hZDogLT5cclxuICAgIGNob2tpZGFyXHJcbiAgICAgIC53YXRjaChnbG9iLnN5bmMoXCIuL0AoYXBwfG5vZGUpLyoqLkAoaHRtbHxqcylcIiwge2lnbm9yZTogXCIqKi9ub2RlX21vZHVsZXMvKipcIn0pKVxyXG4gICAgICAub24oXCJjaGFuZ2VcIiwgKHBhdGgpID0+XHJcbiAgICAgICAgcmV0dXJuIGlmIEBsaXZlUmVsb2FkU3RvcEZsZ1xyXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXHJcbiAgICAgIClcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9tb2R1bGVzL2FtLWRldi9hcHAvRWxlY3Ryb25BcHAuY29mZmVlXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBTEE7QUFEQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7O0FBQ0E7QUFGQTtBQUFBO0FBSEE7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	eval("var start;\n\nstart = function() {\n\n  /*Electron */\n  window.ea = new (__webpack_require__(35));\n  return ea.start();\n};\n\ndocument.addEventListener(\"DOMContentLoaded\", start);\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDAuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2FtLXRlbXBsYXRlL2NvZmZlZS9hcHAvcHJlbG9hZC5jb2ZmZWU/NDRkMyJdLCJzb3VyY2VzQ29udGVudCI6WyJzdGFydCA9IC0+XHJcbiAgIyMjRWxlY3Ryb24jIyNcclxuICB3aW5kb3cuZWEgPSBuZXcgKHJlcXVpcmUoXCJhbS1kZXYvYXBwL0VsZWN0cm9uQXBwXCIpKVxyXG4gIGVhLnN0YXJ0KClcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHN0YXJ0KVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL21vZHVsZXMvYW0tdGVtcGxhdGUvY29mZmVlL2FwcC9wcmVsb2FkLmNvZmZlZVxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBSUE7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }

/******/ });
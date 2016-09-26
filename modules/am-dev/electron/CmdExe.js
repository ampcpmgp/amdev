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

	eval("var CmdExe, exec;\n\nexec = __webpack_require__(7).exec;\n\nmodule.exports = CmdExe = (function() {\n  function CmdExe(directory, path) {\n    this.directory = directory;\n    this.path = path != null ? path : \"electron\";\n  }\n\n  CmdExe.prototype.start = function() {\n    var command, proc;\n    command = \"start \" + this.directory + \"\\\\electron.exe \" + this.path;\n    proc = exec(command, (function(_this) {\n      return function(e, out, err) {\n        return console.log(e, out, err);\n      };\n    })(this));\n    return console.log(\"command - \\n\" + command);\n  };\n\n  return CmdExe;\n\n})();\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL21vZHVsZXMvYW0tZGV2L2VsZWN0cm9uL0NtZEV4ZS5jb2ZmZWU/YThhYiJdLCJzb3VyY2VzQ29udGVudCI6WyJleGVjID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIikuZXhlY1xyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIENtZEV4ZVxyXG4gIGNvbnN0cnVjdG9yOiAoQGRpcmVjdG9yeSwgQHBhdGggPSBcImVsZWN0cm9uXCIpIC0+XHJcbiAgc3RhcnQ6IC0+XHJcbiAgICBjb21tYW5kID0gXCJzdGFydCAje0BkaXJlY3Rvcnl9XFxcXGVsZWN0cm9uLmV4ZSAje0BwYXRofVwiXHJcbiAgICBwcm9jID0gZXhlYyhjb21tYW5kLCAoZSwgb3V0LCBlcnIpID0+XHJcbiAgICAgIGNvbnNvbGUubG9nIGUsIG91dCwgZXJyXHJcbiAgICApXHJcbiAgICBjb25zb2xlLmxvZyBcImNvbW1hbmQgLSBcXG4je2NvbW1hbmR9XCJcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9tb2R1bGVzL2FtLWRldi9lbGVjdHJvbi9DbWRFeGUuY29mZmVlXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFHQTtBQUxBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },

/***/ 7:
/***/ function(module, exports) {

	eval("module.exports = require(\"child_process\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIj80MzA4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCA0IDUgNlxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }

/******/ });
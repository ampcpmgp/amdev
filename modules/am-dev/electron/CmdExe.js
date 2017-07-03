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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(52);


/***/ }),

/***/ 9:
/***/ (function(module, exports) {

	module.exports = require("child_process");

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

	var CmdExe, exec;

	exec = __webpack_require__(9).exec;

	module.exports = CmdExe = (function() {
	  function CmdExe(directory, path) {
	    this.directory = directory;
	    this.path = path != null ? path : "electron";
	  }

	  CmdExe.prototype.start = function() {
	    var command, proc;
	    command = "start " + this.directory + "\\electron.exe " + this.path;
	    proc = exec(command, (function(_this) {
	      return function(e, out, err) {
	        return console.log(e, out, err);
	      };
	    })(this));
	    return console.log("command - \n" + command);
	  };

	  return CmdExe;

	})();


/***/ })

/******/ });
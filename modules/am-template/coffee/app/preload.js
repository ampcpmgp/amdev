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

	eval("var start;\n\nstart = function() {\n\n  /*Electron */\n  window.ea = new (__webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"am-dev/app/ElectronApp\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\n  return ea.start();\n};\n\ndocument.addEventListener(\"DOMContentLoaded\", start);\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL21vZHVsZXMvYW0tdGVtcGxhdGUvY29mZmVlL2FwcC9wcmVsb2FkLmNvZmZlZT80NGQzIl0sInNvdXJjZXNDb250ZW50IjpbInN0YXJ0ID0gLT5cclxuICAjIyNFbGVjdHJvbiMjI1xyXG4gIHdpbmRvdy5lYSA9IG5ldyAocmVxdWlyZShcImFtLWRldi9hcHAvRWxlY3Ryb25BcHBcIikpXHJcbiAgZWEuc3RhcnQoKVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgc3RhcnQpXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbW9kdWxlcy9hbS10ZW1wbGF0ZS9jb2ZmZWUvYXBwL3ByZWxvYWQuY29mZmVlXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFJQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);
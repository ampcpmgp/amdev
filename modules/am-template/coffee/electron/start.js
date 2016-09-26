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

	eval("var Browser, browser;\n\nBrowser = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"am-dev/electron/Browser\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nbrowser = new Browser();\n\nbrowser.init().start();\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL21vZHVsZXMvYW0tdGVtcGxhdGUvY29mZmVlL2VsZWN0cm9uL3N0YXJ0LmNvZmZlZT80NGJmIl0sInNvdXJjZXNDb250ZW50IjpbIkJyb3dzZXIgPSByZXF1aXJlKFwiYW0tZGV2L2VsZWN0cm9uL0Jyb3dzZXJcIilcclxuYnJvd3NlciA9IG5ldyBCcm93c2VyKClcclxuYnJvd3Nlci5pbml0KCkuc3RhcnQoKVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL21vZHVsZXMvYW0tdGVtcGxhdGUvY29mZmVlL2VsZWN0cm9uL3N0YXJ0LmNvZmZlZVxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);
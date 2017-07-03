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

	module.exports = __webpack_require__(10);


/***/ }),

/***/ 10:
/***/ (function(module, exports) {

	var Status,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Status = (function() {
	  function Status() {
	    this.togglePublishFlg = bind(this.togglePublishFlg, this);
	    this.toggleliveReloadFlg = bind(this.toggleliveReloadFlg, this);
	    this.publishFlg = true;
	    localStorage.liveReloadFlg = "true";
	    riot.observable(this);
	  }

	  Status.prototype.toggleliveReloadFlg = function() {
	    localStorage.liveReloadFlg = !localStorage.liveReloadFlg;
	    return this.trigger("update");
	  };

	  Status.prototype.togglePublishFlg = function() {
	    this.publishFlg = !this.publishFlg;
	    return this.trigger("update");
	  };

	  return Status;

	})();

	module.exports = new Status();


/***/ })

/******/ });
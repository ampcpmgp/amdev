(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["modules/am-common/browser/Common.bundle"] = factory();
	else
		root["modules/am-common/browser/Common.bundle"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports) {

	var Common,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	module.exports = Common = (function() {
	  function Common() {
	    this.getHash = bind(this.getHash, this);
	    this.getParams = bind(this.getParams, this);
	  }

	  Common.prototype.params = null;

	  Common.prototype.hashs = null;

	  Common.prototype.hashSeparator = "/";

	  Common.prototype.getParams = function(url) {
	    var i, len, param, query, ref, val;
	    if (url == null) {
	      url = location.search;
	    }
	    if (decodeURI) {
	      url = decodeURI(url);
	    }
	    query = url.replace(/.*\?([^#]*)$/, "$1");
	    this.params = {};
	    if (url !== query) {
	      ref = query.split("&");
	      for (i = 0, len = ref.length; i < len; i++) {
	        val = ref[i];
	        param = val.split("=");
	        val = param[1];
	        if (val != null) {
	          if (val.match(",")) {
	            val = val.split(",");
	          }
	        } else {
	          val = true;
	        }
	        this.params[param[0]] = val;
	      }
	    }
	    return this.params;
	  };

	  Common.prototype.getHash = function(url) {
	    var hash, i, len, ref, val;
	    if (url == null) {
	      url = location.hash;
	    }
	    hash = url.replace(/.*\#(.*)$/, "$1");
	    this.hashs = [];
	    if (url !== hash) {
	      ref = hash.split(this.hashSeparator);
	      for (i = 0, len = ref.length; i < len; i++) {
	        val = ref[i];
	        this.hashs.push(val);
	      }
	    }
	    return this.hashs;
	  };

	  return Common;

	})();


/***/ }
/******/ ])
});
;
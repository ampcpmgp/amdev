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

	var Common, WSClient, io,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Common = __webpack_require__(1);

	io = __webpack_require__(2);

	module.exports = WSClient = (function() {

	  /*modules */
	  WSClient.prototype.ws = null;


	  /*websocket required variables */

	  WSClient.prototype.params = Common.prototype.getParams();

	  WSClient.prototype.protocol = location.protocol.match(/https:/) ? "wss" : "ws";

	  WSClient.prototype.domain = location.hostname;

	  WSClient.prototype.connectFlag = false;

	  function WSClient() {
	    this.reload = bind(this.reload, this);
	    this.connectFlag = false;
	  }

	  WSClient.prototype.start = function(wsPort) {
	    this.wsPort = wsPort != null ? wsPort : 8080;
	    if (!this.params._noWs) {
	      return this.connectWebsocket();
	    }
	  };

	  WSClient.prototype.connectWebsocket = function() {
	    if (this.wsPort === 8080) {
	      if (!location.host.match(/^((192|172|10)\.|localhost)/)) {
	        this.wsPort = 80;
	      }
	    }
	    if (this.wsPort === 80) {
	      this.wsUrl = this.protocol + "://" + this.domain;
	    } else {
	      this.wsUrl = this.protocol + "://" + (this.domain.replace(/:.*/, "")) + ":" + this.wsPort;
	    }
	    this.ws = io(this.wsUrl);
	    this.ws.on("connect", (function(_this) {
	      return function() {
	        if (_this.connectFlag) {
	          return _this.reload();
	        }
	        _this.connectFlag = true;
	        return console.info("websocket connected");
	      };
	    })(this));
	    this.ws.on("reload", (function(_this) {
	      return function() {
	        if (!_this.disconnectedFlg) {
	          return _this.reload();
	        }
	      };
	    })(this));
	    this.ws.on("css reload", (function(_this) {
	      return function(css) {
	        return $("body").append("<style type=\"text/css\">" + css + "</style>");
	      };
	    })(this));
	    this.ws.on("test", (function(_this) {
	      return function(msg) {
	        return console.log(msg);
	      };
	    })(this));
	    return this.ws.on("disconnect", (function(_this) {
	      return function() {
	        _this.disconnectedFlg = true;
	        return console.info("websocket server disconnected");
	      };
	    })(this));
	  };

	  WSClient.prototype.reload = function() {
	    return location.reload();
	  };

	  return WSClient;

	})();


/***/ },
/* 1 */
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("socket.io-client");

/***/ }
/******/ ]);
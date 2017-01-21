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

	module.exports = __webpack_require__(35);


/***/ },

/***/ 5:
/***/ function(module, exports) {

	module.exports = require("riot");

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	var generate, testcases;

	generate = __webpack_require__(36);

	testcases = __webpack_require__(42);

	generate(testcases);


/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	var WholeStatus;

	window.riot = __webpack_require__(5);

	WholeStatus = __webpack_require__(37);

	__webpack_require__(38);

	module.exports = (function(_this) {
	  return function(testPatterns, opts) {
	    if (opts == null) {
	      opts = {};
	    }
	    WholeStatus.opts = opts;
	    return {
	      list: riot.mount("test-list", {
	        testPatterns: testPatterns
	      })
	    };
	  };
	})(this);


/***/ },

/***/ 37:
/***/ function(module, exports) {

	var Status;

	module.exports = Status = (function() {
	  function Status() {}

	  Status.sumInit = function() {
	    Status.successSum = 0;
	    return Status.executeSum = 0;
	  };

	  Status.init = function() {
	    Status.thisBasePath = "?";
	    Status.basePath = "#";
	    Status.itemStatuses = [];
	    Status.executeIframe = [];
	    Status.executablePath = {};
	    Status.sumInit();
	    return riot.observable(Status);
	  };

	  Status.firstTimeInit = function() {
	    return Status.opts = {};
	  };

	  return Status;

	})();

	Status.init();

	Status.firstTimeInit();


/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(5);

	__webpack_require__(39)

	riot.tag2('test-list', '<test-list-count></test-list-count> <a onclick="{toRouteHash}">base</a> <recursive-item data="{opts.testPatterns}" routing=""></recursive-item> <test-iframe ref="testFrame" if="{instanceUrl}" url="{instanceUrl}" config="{WholeStatus.config}"></test-iframe>', 'test-list,[data-is="test-list"]{ display: block; width: 100%; background-color: white; font-size: 14px; } test-list a,[data-is="test-list"] a{ color: blue; text-decoration: none; cursor: pointer; display: inline-block; } test-list a:hover,[data-is="test-list"] a:hover{ opacity: 0.4; }', '', function(opts) {
	var WholeStatus, bodyStyle, route;

	this.WholeStatus = WholeStatus = __webpack_require__(37);

	route = __webpack_require__(41);

	bodyStyle = document.body.style;

	this.init = (function(_this) {
	  return function() {
	    _this.instanceUrl = null;
	    return WholeStatus.trigger("init");
	  };
	})(this);

	this.check = (function(_this) {
	  return function() {
	    var executePath;
	    _this.init();
	    WholeStatus.sumInit();
	    executePath = route.query().path;
	    if (!executePath) {
	      return _this.update();
	    }
	    executePath = decodeURIComponent(executePath);
	    executePath = encodeURIComponent(executePath);
	    if (!WholeStatus.executablePath[executePath]) {
	      _this.instanceUrl = executePath;
	      _this.update();
	      _this.refs.testFrame.setConsoleEvent();
	      return;
	    }
	    return WholeStatus.executablePath[executePath]();
	  };
	})(this);

	this.toRouteHash = (function(_this) {
	  return function() {
	    return route("");
	  };
	})(this);

	WholeStatus.on("item-update", (function(_this) {
	  return function() {
	    var i, itemStatus, len, onExecute, ref;
	    ref = WholeStatus.itemStatuses;
	    for (i = 0, len = ref.length; i < len; i++) {
	      itemStatus = ref[i];
	      if (itemStatus.onExecute) {
	        onExecute = true;
	        break;
	      }
	    }
	    return bodyStyle.overflowY = onExecute || _this.instanceUrl ? "hidden" : "";
	  };
	})(this));

	this.on("mount", (function(_this) {
	  return function() {
	    _this.check();
	    return route.start();
	  };
	})(this));

	route.base(WholeStatus.thisBasePath);

	route("..", this.check);

	window.addEventListener("popstate", (function(_this) {
	  return function() {
	    if (!location.href.match("\\" + WholeStatus.thisBasePath)) {
	      return history.replaceState("", null, WholeStatus.thisBasePath);
	    }
	  };
	})(this));
	});

	riot.tag2('test-list-count', '<span>{WholeStatus.successSum}/{WholeStatus.executeSum}</span>', '', '', function(opts) {
	this.WholeStatus = __webpack_require__(37);

	this.WholeStatus.on("item-update", (function(_this) {
	  return function() {
	    return _this.update();
	  };
	})(this));
	});

	riot.tag2('recursive-item', '<list-line ref="lines" each="{data, key in list}" list="{this}" routing="{this.parent.opts.routing}"></list-line>', 'recursive-item,[data-is="recursive-item"]{ display: block; }', '', function(opts) {
	this.list = typeof opts.data === "object" ? opts.data : {};
	});

	riot.tag2('list-line', '<div class="line{isHover && \' hover\'}"> <div class="" onmouseover="{mouseOn}" onmouseout="{mouseOut}"> <span class="bold {success: success, error: error, warn: warn}"></span> <a class="tree" href="{routing}" onclick="{router}">{key}</a> <a class="single" if="{url}" href="{routerExecutionPath}" onclick="{router}">{url}</a> </div> <recursive-item ref="item" if="{!url}" data="{data}" routing="{routing}"></recursive-item> </div> <test-iframe ref="testFrame" if="{url && status.onExecute}" url="{routerExecutionPath}" config="{WholeStatus.config}"></test-iframe>', 'list-line .bold,[data-is="list-line"] .bold{font-weight:bold} list-line .tree,[data-is="list-line"] .tree{color:#333;word-break:break-all} list-line .single,[data-is="list-line"] .single{padding-left:6px} list-line .line,[data-is="list-line"] .line{margin-left:10px} list-line .line.hover,[data-is="list-line"] .line.hover{background:rgba(0,0,255,0.05)} list-line .success,[data-is="list-line"] .success{color:blue} list-line .success:after,[data-is="list-line"] .success:after{content:"〇"} list-line .warn,[data-is="list-line"] .warn{color:gold} list-line .warn:after,[data-is="list-line"] .warn:after{content:"△"} list-line .error,[data-is="list-line"] .error{color:red} list-line .error:after,[data-is="list-line"] .error:after{content:"×"} list-line .step,[data-is="list-line"] .step{color:#333;margin-right:10px}', '', function(opts) {
	var WholeStatus, executeIframe, route;

	WholeStatus = this.WholeStatus = __webpack_require__(37);

	route = __webpack_require__(41);

	executeIframe = (function(_this) {
	  return function() {
	    var base;
	    return typeof (base = WholeStatus.executeIframe.shift()) === "function" ? base() : void 0;
	  };
	})(this);

	this.key = opts.list.key;

	this.data = opts.list.data;

	this.routing = opts.routing ? opts.routing + "/" + this.key : this.key;

	this.url = typeof this.data === "object" ? "" : this.data;

	this.routerExecutionPath = this.url + WholeStatus.basePath + this.routing;

	this.status = {
	  onExecute: false
	};

	this.deleteIframe = (function(_this) {
	  return function() {
	    _this.status.onExecute = false;
	    return _this.update();
	  };
	})(this);

	this.init = (function(_this) {
	  return function() {
	    _this.error = null;
	    _this.warn = null;
	    _this.success = null;
	    return _this.deleteIframe();
	  };
	})(this);

	this.recursivelyExecuteTask = (function(_this) {
	  return function() {
	    var i, item, len, line, lines, results;
	    item = _this.refs.item;
	    if (item) {
	      lines = item.refs.lines;
	      if (!lines.length) {
	        return lines.recursivelyExecuteTask();
	      } else {
	        results = [];
	        for (i = 0, len = lines.length; i < len; i++) {
	          line = lines[i];
	          results.push(line.recursivelyExecuteTask());
	        }
	        return results;
	      }
	    } else {
	      return WholeStatus.executeIframe.push(function() {
	        return _this.executeTask(function() {
	          _this.deleteIframe();
	          return executeIframe();
	        });
	      });
	    }
	  };
	})(this);

	this.multiExecuteTask = (function(_this) {
	  return function() {
	    WholeStatus.executeIframe.length = 0;
	    _this.recursivelyExecuteTask();
	    return executeIframe();
	  };
	})(this);

	this.executeTask = (function(_this) {
	  return function(callback) {
	    _this.status.onExecute = true;
	    _this.update();
	    console.clear();
	    ++WholeStatus.executeSum;
	    return _this.refs.testFrame.setConsoleEvent({
	      assert: function(flg, msg) {
	        if (msg) {
	          console.assert(flg, msg);
	        } else {
	          console.assert(flg);
	        }
	        if (!flg) {
	          _this.error = true;
	          _this.update();
	          return callback && callback();
	        }
	      },
	      info: function(msg) {
	        if (msg === "finished" && !_this.error) {
	          console.info(msg);
	          if (!_this.warn) {
	            _this.success = true;
	          }
	          ++WholeStatus.successSum;
	          _this.update();
	          return callback && callback();
	        }
	      },
	      error: function(msg) {
	        return _this.warn = true;
	      }
	    });
	  };
	})(this);

	this.router = (function(_this) {
	  return function(e) {
	    route("path=" + e.target.getAttribute("href"));
	    return e.preventDefault();
	  };
	})(this);

	this.mouseOn = (function(_this) {
	  return function() {
	    return _this.isHover = true;
	  };
	})(this);

	this.mouseOut = (function(_this) {
	  return function() {
	    return _this.isHover = false;
	  };
	})(this);

	WholeStatus.on("init", (function(_this) {
	  return function() {
	    return _this.init();
	  };
	})(this));

	WholeStatus.itemStatuses.push(this.status);

	WholeStatus.executablePath[encodeURIComponent(this.routing)] = (function(_this) {
	  return function() {
	    return _this.multiExecuteTask();
	  };
	})(this);

	WholeStatus.executablePath[encodeURIComponent(this.routerExecutionPath)] = (function(_this) {
	  return function() {
	    if (_this.url) {
	      return _this.executeTask();
	    }
	  };
	})(this);

	this.on("update", (function(_this) {
	  return function() {
	    return WholeStatus.trigger("item-update");
	  };
	})(this));

	this.init();
	});


/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(5);

	riot.tag2('test-iframe', '<span class="{isIos ? \'ios\' : \'no-ios\'}"> <iframe if="{!isElectron}" riot-src="{opts.url}"></iframe> <webview if="{isElectron}" riot-src="{opts.url}" nodeintegration></webview> </span>', 'test-iframe .ios,[data-is="test-iframe"] .ios{ display: block; -webkit-overflow-scrolling: touch; overflow: auto; position: fixed; top: 0; left: 0; width: 100%; height: 100%; } test-iframe iframe,[data-is="test-iframe"] iframe,test-iframe webview,[data-is="test-iframe"] webview{ background-color: white; border: none; width: 100%; height: 100%; } test-iframe .no-ios iframe,[data-is="test-iframe"] .no-ios iframe,test-iframe .no-ios webview,[data-is="test-iframe"] .no-ios webview{ position: fixed; left: 0px; top: 0px; }', '', function(opts) {
	var WholeStatus, ref;

	WholeStatus = __webpack_require__(37);

	this.isIos = __webpack_require__(40).ios();

	this.isElectron = typeof process !== "undefined" && process !== null ? (ref = process.versions) != null ? ref.electron : void 0 : void 0;

	this.addScript = (function(_this) {
	  return function() {};
	})(this);

	this.setConsoleEvent = (function(_this) {
	  return function(callbackObj) {
	    var iframeWindow, webview;
	    if (_this.isElectron) {
	      webview = _this.root.querySelector("webview");
	      webview.removeEventListener("console-message", _this._tmp_Function);
	      _this._tmp_Function = function(e) {
	        if (e.level === 2) {
	          webview.openDevTools();
	          callbackObj.assert(false, e.message);
	        }
	        if (e.level === 0) {
	          webview.openDevTools();
	          return callbackObj.info(e.message);
	        }
	      };
	      return webview.addEventListener("console-message", _this._tmp_Function);
	    } else {
	      iframeWindow = _this.root.querySelector("iframe").contentWindow;
	      if (callbackObj) {
	        iframeWindow.console.assert = function(flg, msg) {
	          return callbackObj.assert(flg, msg);
	        };
	        iframeWindow.onerror = function(msg) {
	          callbackObj.error(msg);
	          return false;
	        };
	        iframeWindow.console.info = function(msg) {
	          return callbackObj.info(msg);
	        };
	      }
	      if (!WholeStatus.opts.files) {
	        return;
	      }
	      return iframeWindow.addEventListener("load", function() {
	        var file, i, len, ref1, results, script;
	        ref1 = WholeStatus.opts.files;
	        results = [];
	        for (i = 0, len = ref1.length; i < len; i++) {
	          file = ref1[i];
	          script = iframeWindow.document.createElement("script");
	          script.src = file;
	          script.type = "text/javascript";
	          script.async = false;
	          results.push(iframeWindow.document.head.appendChild(script));
	        }
	        return results;
	      });
	    }
	  };
	})(this);
	});


/***/ },

/***/ 40:
/***/ function(module, exports) {

	module.exports = require("is_js");

/***/ },

/***/ 41:
/***/ function(module, exports) {

	module.exports = require("riot-route");

/***/ },

/***/ 42:
/***/ function(module, exports) {

	module.exports = {
		"node-streamize": {
			"parser": {
				"simple": "./index.html"
			}
		}
	};

/***/ }

/******/ });
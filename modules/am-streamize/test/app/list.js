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

	testcases = __webpack_require__(43);

	generate(testcases);


/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	var Status;

	window.riot = __webpack_require__(5);

	Status = __webpack_require__(37);

	__webpack_require__(38);

	module.exports = (function(_this) {
	  return function(testPatterns, opts) {
	    if (opts == null) {
	      opts = {};
	    }
	    Status.opts = opts;
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
	    Status.paramMode = false;
	    Status.showParameter = false;
	    return riot.observable(Status);
	  };

	  Status.firstTimeInit = function() {
	    return Status.opts = {};
	  };

	  Status.taskFinished = function() {
	    return Status.executeSum > 0 && Status.executeIframe.length === 0;
	  };

	  Status.taskAllSuccess = function() {
	    return Status.taskFinished() && Status.executeSum === Status.successSum;
	  };

	  return Status;

	})();

	Status.init();

	Status.firstTimeInit();


/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	
	    var riot = __webpack_require__(5)
	    __webpack_require__(39)

	riot.tag2('test-list', '<test-status></test-status> <a onclick="{toRouteHash}">base</a> <a if="{Status.paramMode}" onclick="{toggleParameterMode}">toggle params</a> <recursive-item ref="item" data="{opts.testPatterns}" routing=""></recursive-item> <test-iframe ref="testFrame" if="{instanceUrl}" url="{instanceUrl}" config="{Status.config}"></test-iframe>', 'test-list,[data-is="test-list"]{display:block;width:100%;background-color:white;font-size:14px} test-list>a,[data-is="test-list"]>a{border:1px solid #ccc} test-list a,[data-is="test-list"] a{color:blue;text-decoration:none;cursor:pointer;display:inline-block} test-list a:hover,[data-is="test-list"] a:hover{opacity:.4}', '', function(opts) {
	var Status, bodyStyle, route;

	Status = this.Status = __webpack_require__(37);

	route = __webpack_require__(41);

	bodyStyle = document.body.style;

	this.init = (function(_this) {
	  return function() {
	    _this.instanceUrl = null;
	    return Status.trigger("init");
	  };
	})(this);

	this.check = (function(_this) {
	  return function() {
	    var executePath, params;
	    _this.init();
	    Status.sumInit();
	    executePath = route.query().path;
	    if (!executePath) {
	      return _this.update();
	    }
	    executePath = decodeURIComponent(encodeURIComponent(decodeURIComponent(executePath)));
	    if (!Status.executablePath[executePath]) {
	      params = executePath.replace(/^[^#]+#/, "").split("/");
	      _this.refs.item.recursivelyCheck(params);
	      Status.executablePath[executePath]();
	      return;
	      _this.instanceUrl = decodeURIComponent(executePath);
	      _this.update();
	      _this.refs.testFrame.setConsoleEvent();
	      return;
	    }
	    return Status.executablePath[executePath]();
	  };
	})(this);

	this.toRouteHash = (function(_this) {
	  return function() {
	    return route("");
	  };
	})(this);

	this.toggleParameterMode = (function(_this) {
	  return function() {
	    _this.showParameter = !_this.showParameter;
	    return Status.trigger("toggle-mode");
	  };
	})(this);

	Status.on("item-update", (function(_this) {
	  return function() {
	    var i, itemStatus, len, onExecute, ref;
	    ref = Status.itemStatuses;
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

	route.base(Status.thisBasePath);

	route("..", this.check);

	window.addEventListener("popstate", (function(_this) {
	  return function() {
	    if (!location.href.match("\\" + Status.thisBasePath)) {
	      return history.replaceState("", null, Status.thisBasePath);
	    }
	  };
	})(this));
	});

	riot.tag2('test-status', '<span class="test-count">{Status.successSum}/{Status.executeSum}</span> <span if="{Status.taskFinished()}" class="finished">✔︎</span> <span if="{Status.taskAllSuccess()}" class="all-success">💯</span>', 'test-status .finished,[data-is="test-status"] .finished{ color: #17e017; }', '', function(opts) {
	this.Status = __webpack_require__(37).on("item-update", (function(_this) {
	  return function() {
	    return _this.update();
	  };
	})(this));
	});

	riot.tag2('recursive-item', '<list-line ref="lines" each="{data, key in list}" list="{this}" routing="{this.parent.opts.routing}"></list-line>', 'recursive-item,[data-is="recursive-item"]{ display: block; }', '', function(opts) {
	var getLines;

	getLines = (function(_this) {
	  return function() {
	    var lines;
	    lines = _this.refs.lines;
	    if (!lines.length) {
	      return [lines];
	    } else {
	      return lines;
	    }
	  };
	})(this);

	this.recursivelyCheck = (function(_this) {
	  return function(params) {
	    var lines;
	    lines = getLines();
	    return lines.forEach(function(line) {
	      var copyParams;
	      copyParams = [];
	      Object.assign(copyParams, params);
	      return line.recursivelyCheckItem(copyParams);
	    });
	  };
	})(this);

	this.recursivelyUpdate = (function(_this) {
	  return function(routing) {
	    getLines().forEach(function(line) {
	      return line.recursivelyUpdate(routing);
	    });
	    return _this.update();
	  };
	})(this);

	this.list = typeof opts.data === "object" ? opts.data : {};
	});

	riot.tag2('list-line', '<div class="line{isHover && \' hover\'}"> <div class="" onmouseover="{mouseOn}" onmouseout="{mouseOut}"> <span class="bold {success: success, error: error, warn: warn}"></span> <a class="tree" href="{routing}" onclick="{router}">{treeName}</a> <label each="{pattern, i in patterns}" class="{focus: pattern.focus}" data-id="{i}" onclick="{changePatternEvent}"> {pattern.name} </label> <a class="single" if="{url}" href="{routerExecutionPath}" onclick="{router}">{linkName}</a> </div> <recursive-item ref="item" if="{!url}" data="{data}" routing="{routing}"></recursive-item> </div> <test-iframe ref="testFrame" if="{url && status.onExecute}" url="{routerExecutionPath}" config="{Status.config}"></test-iframe>', 'list-line .line>div>label,[data-is="list-line"] .line>div>label{cursor:pointer;border:1px solid rgba(255,128,0,0.6);padding:0 6px;text-align:center;display:inline-block} list-line .line>div>label.focus,[data-is="list-line"] .line>div>label.focus{background:#ff0} list-line .line>div>label:hover,[data-is="list-line"] .line>div>label:hover{opacity:.6} list-line .bold,[data-is="list-line"] .bold{font-weight:bold} list-line .tree,[data-is="list-line"] .tree{color:#333;word-break:break-all} list-line .single,[data-is="list-line"] .single{padding-left:6px} list-line .line,[data-is="list-line"] .line{margin-left:10px} list-line .line.hover,[data-is="list-line"] .line.hover{background:rgba(0,0,255,0.05)} list-line .success,[data-is="list-line"] .success{color:blue} list-line .success:after,[data-is="list-line"] .success:after{content:"〇"} list-line .warn,[data-is="list-line"] .warn{color:gold} list-line .warn:after,[data-is="list-line"] .warn:after{content:"△"} list-line .error,[data-is="list-line"] .error{color:red} list-line .error:after,[data-is="list-line"] .error:after{content:"×"} list-line .step,[data-is="list-line"] .step{color:#333;margin-right:10px}', '', function(opts) {
	var Parser, Status, executeIframe, initialPattern, name, paramMode, path, patterns, ref, ref1, route, setObservableEvent, setRouter, toggleMode;

	Status = this.Status = __webpack_require__(37);

	Parser = __webpack_require__(42);

	route = __webpack_require__(41);

	setObservableEvent = (function(_this) {
	  return function() {
	    Status.executablePath[_this.routing] = function() {
	      return _this.multiExecuteTask();
	    };
	    return Status.executablePath[_this.routerExecutionPath] = function() {
	      if (_this.url) {
	        return _this.executeTask();
	      }
	    };
	  };
	})(this);

	setRouter = (function(_this) {
	  return function(path) {
	    _this.routing = _this.initialRouting ? _this.initialRouting + "/" + path : path;
	    return _this.routerExecutionPath = _this.url + Status.basePath + _this.routing;
	  };
	})(this);

	executeIframe = (function(_this) {
	  return function() {
	    var base;
	    return typeof (base = Status.executeIframe.shift()) === "function" ? base() : void 0;
	  };
	})(this);

	ref = Parser.getStrInfo(this.key), toggleMode = ref.toggleMode, paramMode = ref.paramMode, name = ref.name, path = ref.path, patterns = ref.patterns;

	this.initialRouting = opts.routing;

	this.treeName = name;

	if (toggleMode) {
	  initialPattern = patterns[0];
	  initialPattern.focus = true;
	  this.path = initialPattern.path;
	  this.patterns = patterns;
	} else {
	  this.path = path;
	}

	ref1 = typeof this.data === "object" ? {} : Parser.getStrInfo(this.data), name = ref1.name, path = ref1.path;

	this.linkName = name;

	this.url = path;

	setRouter(this.path);

	this.status = {
	  onExecute: false
	};

	this.recursivelyUpdate = (function(_this) {
	  return function(routing) {
	    var ref2;
	    _this.initialRouting = routing;
	    setRouter(_this.path);
	    if ((ref2 = _this.refs.item) != null) {
	      ref2.recursivelyUpdate(_this.routing);
	    }
	    setObservableEvent();
	    return _this.update();
	  };
	})(this);

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
	    var item, j, len, line, lines, results;
	    item = _this.refs.item;
	    if (item) {
	      lines = item.refs.lines;
	      if (!lines.length) {
	        return lines.recursivelyExecuteTask();
	      } else {
	        results = [];
	        for (j = 0, len = lines.length; j < len; j++) {
	          line = lines[j];
	          results.push(line.recursivelyExecuteTask());
	        }
	        return results;
	      }
	    } else {
	      return Status.executeIframe.push(function() {
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
	    Status.executeIframe.length = 0;
	    _this.recursivelyExecuteTask();
	    return executeIframe();
	  };
	})(this);

	this.executeTask = (function(_this) {
	  return function(callback) {
	    _this.status.onExecute = true;
	    _this.update();
	    console.clear();
	    ++Status.executeSum;
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
	          ++Status.successSum;
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
	  return function(e) {
	    if (e.target.tagName === "LABEL") {
	      return _this.isHover = false;
	    } else {
	      return _this.isHover = true;
	    }
	  };
	})(this);

	this.mouseOut = (function(_this) {
	  return function() {
	    return _this.isHover = false;
	  };
	})(this);

	this.changePattern = (function(_this) {
	  return function(nextId) {
	    var nextPattern, ref2;
	    _this.patterns.forEach(function(pattern) {
	      return pattern.focus = false;
	    });
	    nextPattern = _this.patterns[nextId];
	    nextPattern.focus = true;
	    _this.path = nextPattern.path;
	    setRouter(_this.path);
	    if ((ref2 = _this.refs.item) != null) {
	      ref2.recursivelyUpdate(_this.routing);
	    }
	    return setObservableEvent();
	  };
	})(this);

	this.changePatternEvent = (function(_this) {
	  return function(e) {
	    return _this.changePattern(e.currentTarget.dataset.id);
	  };
	})(this);

	this.recursivelyCheckItem = (function(_this) {
	  return function(params) {
	    var matchedPattern, param, ref2, ref3, ref4;
	    param = params.shift();
	    matchedPattern = (ref2 = _this.patterns) != null ? (ref3 = ref2.filter(function(pattern, i) {
	      return param === pattern.path;
	    })) != null ? ref3[0] : void 0 : void 0;
	    if (matchedPattern) {
	      _this.patterns.forEach(function(pattern, i) {
	        pattern.focus = false;
	        if (matchedPattern === pattern) {
	          return _this.changePattern(i);
	        }
	      });
	      _this.update();
	    }
	    if (param === _this.path || matchedPattern) {
	      if (params) {
	        return (ref4 = _this.refs.item) != null ? ref4.recursivelyCheck(params) : void 0;
	      } else {
	        return setObservableEvent();
	      }
	    }
	  };
	})(this);

	Status.on("init", (function(_this) {
	  return function() {
	    return _this.init();
	  };
	})(this));

	paramMode && Status.on("toggle-mode", (function(_this) {
	  return function() {
	    _this.treeName = _this.key === _this.treeName ? _this.treeName = _this._treeName || _this.treeName : (_this._treeName = _this.treeName, _this.treeName = _this.key);
	    _this.linkName = _this.data === _this.linkName ? _this.linkName = _this._linkName || _this.linkName : (_this._linkName = _this.linkName, _this.linkName = _this.data);
	    return _this.update();
	  };
	})(this));

	Status.itemStatuses.push(this.status);

	setObservableEvent();

	Status.paramMode = paramMode || Status.paramMode;

	this.on("update", (function(_this) {
	  return function() {
	    return Status.trigger("item-update");
	  };
	})(this));
	});

	    
	  

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	
	    var riot = __webpack_require__(5)
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

	var Parser;

	module.exports = Parser = (function() {
	  function Parser() {}

	  Parser.patternForPathName = /^(.+)\((.+)\)$/;

	  Parser.parseStr = function(str) {
	    var name, paramMode, path, ref;
	    ref = str.match(Parser.patternForPathName) || [false, str, str], paramMode = ref[0], name = ref[1], path = ref[2];
	    return {
	      paramMode: paramMode,
	      name: name,
	      path: path
	    };
	  };

	  Parser.getStrInfo = function(str) {
	    var name, paramMode, path, patternStr, patterns, ref, ref1, toggleMode;
	    ref = str.match(/(.*)\[(.+)\]$/) || [], toggleMode = ref[0], name = ref[1], patternStr = ref[2];
	    if (toggleMode) {
	      patterns = patternStr.split(/\s*,\s*/).map(function(str) {
	        var paramMode, strInfo;
	        strInfo = Parser.parseStr(str);
	        paramMode = paramMode || strInfo.paramMode;
	        return strInfo;
	      });
	    } else {
	      ref1 = Parser.parseStr(str), paramMode = ref1.paramMode, name = ref1.name, path = ref1.path;
	    }
	    return {
	      toggleMode: toggleMode,
	      paramMode: paramMode,
	      name: name,
	      path: path,
	      patterns: patterns
	    };
	  };

	  Parser.getSingleTaskList = function(patterns, arg) {
	    var patternLoop, recursiveFunc, taskList;
	    patternLoop = (arg != null ? arg : {}).patternLoop;
	    taskList = [];
	    recursiveFunc = function(patterns, testName, testUrl) {
	      var key, results, value;
	      if (testName == null) {
	        testName = "";
	      }
	      if (testUrl == null) {
	        testUrl = "";
	      }
	      results = [];
	      for (key in patterns) {
	        value = patterns[key];
	        results.push((function(testName, testUrl) {
	          var info, keyInfo, mockName, mockUrl, valueInfo;
	          if (typeof value === "object") {
	            testName += "/";
	            testUrl += "/";
	            info = Parser.getStrInfo(key);
	            if (info.patterns && !patternLoop) {
	              testName += info.patterns[0].name;
	              testUrl += info.patterns[0].path;
	            } else {
	              testName += info.name;
	              testUrl += info.path;
	            }
	            return recursiveFunc(value, testName, testUrl);
	          } else {
	            keyInfo = Parser.getStrInfo(key);
	            valueInfo = Parser.getStrInfo(value);
	            testUrl = testUrl.replace(/^\//, "") + ("/" + keyInfo.path);
	            testName = testName.replace(/^\//, "") + ("/" + keyInfo.name);
	            mockUrl = "?path=" + valueInfo.path + "#" + testUrl;
	            mockName = valueInfo.name;
	            testUrl = "?path=" + testUrl;
	            return taskList.push({
	              testName: testName,
	              testUrl: testUrl,
	              mockName: mockName,
	              mockUrl: mockUrl
	            });
	          }
	        })(testName, testUrl));
	      }
	      return results;
	    };
	    recursiveFunc(patterns);
	    return taskList;
	  };

	  return Parser;

	})();


/***/ },

/***/ 43:
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
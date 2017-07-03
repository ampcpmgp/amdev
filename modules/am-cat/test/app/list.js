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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(35);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("riot");

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var generate, testcases;

	generate = __webpack_require__(36)["default"];

	testcases = __webpack_require__(46);

	generate(testcases);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Status = __webpack_require__(37);

	var _Status2 = _interopRequireDefault(_Status);

	__webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.riot = __webpack_require__(12);

	var generate = function generate(testPatterns) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  _Status2.default.opts = opts;
	  return {
	    list: window.riot.mount('test-list', { testPatterns: testPatterns })
	  };
	};

	exports.default = generate;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var Status, riot;

	riot = __webpack_require__(12);

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
	    Status.iframeListToExecute = [];
	    Status.executablePath = {};
	    Status.sumInit();
	    Status.lastExecutePath = "";
	    Status.showParameter = false;
	    return riot.observable(Status);
	  };

	  Status.isRunning = function() {
	    return Status.iframeListToExecute.length !== 0 && Status.itemStatuses.some(function(item) {
	      return item.onExecute;
	    });
	  };

	  Status.firstTimeInit = function() {
	    return Status.opts = {};
	  };

	  Status.taskFinished = function() {
	    return Status.executeSum > 0 && Status.iframeListToExecute.length === 0;
	  };

	  Status.taskAllSuccess = function() {
	    return Status.taskFinished() && Status.executeSum === Status.successSum;
	  };

	  Status.next = function() {
	    return Status.trigger("finished");
	  };

	  Status.allApen = function() {
	    if (Status.isRunning()) {
	      return;
	    }
	    return Status.trigger("all-open");
	  };

	  Status.close = function(depth) {
	    if (Status.isRunning()) {
	      return;
	    }
	    Status.allApen();
	    return Status.trigger("close-depth-" + depth);
	  };

	  return Status;

	})();

	Status.init();

	Status.firstTimeInit();


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	
	    var riot = __webpack_require__(12)
	    __webpack_require__(39)
	__webpack_require__(40)
	__webpack_require__(41)

	riot.tag2('test-list', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="width:0;height:0;position:absolute;overflow:hidden;"> <defs> <symbol viewbox="0 0 1024 1024" aria-labelledby="fmsi-ant-question-circle-title" id="si-ant-question-circle"> <title id="fmsi-ant-question-circle-title">icon question-circle</title> <path d="M512 0Q373 0 255 68.5T68.5 255 0 512t68.5 257T255 955.5t257 68.5 257-68.5T955.5 769t68.5-257-68.5-257T769 68.5 512 0zm30 802q0 13-9 22.5t-23 9.5q-13 0-22.5-9.5T478 802t9.5-22.5T510 770q14 0 23 9.5t9 22.5zm66-220q-36 19-51 35t-15 46v11q0 13-9 22.5t-23 9.5q-13 0-22.5-9.5T478 674v-11q0-48 24.5-79.5T578 525q35-18 55.5-52.5T654 398q0-60-42-102t-102-42q-62 0-103 37-30 28-38 68-2 11-11 18.5t-20 7.5q-16 0-25.5-11.5T306 347q12-62 59-104 59-53 145-53 87 0 147.5 61T718 398q0 58-29.5 107.5T608 582z"></path> </symbol> </defs> </svg> <div class="header"> <svg class="logo"> <text x="0" y="16" font-size="18" fill="white">AM: coffee time ☕</text> </svg> <svg class="question" onclick="{showHelp}"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#si-ant-question-circle" fill="white"></use> </svg> </div> <div class="phantom-header"></div> <help ref="help"></help> <test-status></test-status> <a onclick="{toRouteHash}">base</a> <a onclick="{toggleParameterMode}">show all parameters</a> <recursive-item ref="item" data="{opts.testPatterns}" routing="" depth="1"></recursive-item> <test-iframe ref="testFrame" if="{instanceUrl}" url="{instanceUrl}" config="{Status.config}"></test-iframe>', 'test-list,[data-is="test-list"]{display:block;width:100%;background-color:white;font-size:14px;padding-left:12px;box-sizing:border-box} test-list>.header,[data-is="test-list"]>.header{width:100%;height:30px;background:#333;position:fixed;top:0;left:0;display:flex;align-items:center;justify-content:space-between;z-index:10} test-list>.header>svg,[data-is="test-list"]>.header>svg{height:20px;padding:4px} test-list>.header>svg.logo>text,[data-is="test-list"]>.header>svg.logo>text{font-family:"Playfair Display","Georgia",serif} test-list>.header>svg.question,[data-is="test-list"]>.header>svg.question{width:20px;margin-right:6px;cursor:pointer} test-list>.phantom-header,[data-is="test-list"]>.phantom-header{height:30px;content:" ";width:100%} test-list>a,[data-is="test-list"]>a{border:1px solid #ccc} test-list a,[data-is="test-list"] a{color:blue;text-decoration:none;cursor:pointer;display:inline-block} test-list a:hover,[data-is="test-list"] a:hover{opacity:.4}', '', function(opts) {
	var Status, bodyStyle, depth, fn, i, keyboardjs, route;

	Status = this.Status = __webpack_require__(37);

	route = __webpack_require__(43);

	keyboardjs = __webpack_require__(44);

	bodyStyle = document.body.style;

	this.init = (function(_this) {
	  return function() {
	    _this.instanceUrl = null;
	    return Status.trigger("init");
	  };
	})(this);

	this.check = (function(_this) {
	  return function() {
	    var base, executePath, paramStr, regex;
	    _this.init();
	    Status.sumInit();
	    executePath = route.query().path;
	    if (!executePath) {
	      return _this.update();
	    }
	    executePath = decodeURIComponent(encodeURIComponent(decodeURIComponent(executePath)));
	    if (!Status.executablePath[executePath]) {
	      regex = /^[^#]+#/;
	      paramStr = executePath.replace(regex, "");
	      _this.refs.item.recursivelyCheck(paramStr);
	      if (typeof (base = Status.executablePath)[executePath] === "function") {
	        base[executePath]();
	      }
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

	this.showHelp = (function(_this) {
	  return function() {
	    return _this.refs.help.open();
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

	keyboardjs.bind("?", (function(_this) {
	  return function() {
	    return _this.showHelp();
	  };
	})(this));

	keyboardjs.bind("esc", (function(_this) {
	  return function() {
	    return _this.refs.help.close();
	  };
	})(this));

	keyboardjs.bind("0", (function(_this) {
	  return function() {
	    return Status.allApen();
	  };
	})(this));

	fn = (function(_this) {
	  return function(depth) {
	    return keyboardjs.bind("" + depth, function() {
	      return Status.close(depth);
	    });
	  };
	})(this);
	for (depth = i = 1; i <= 9; depth = ++i) {
	  fn(depth);
	}
	});

	riot.tag2('test-status', '<span class="test-count">{Status.successSum}/{Status.executeSum}</span> <span if="{Status.taskFinished()}" class="finished">✔︎</span> <span if="{Status.taskAllSuccess()}" class="all-success">💯</span>', 'test-status .finished,[data-is="test-status"] .finished{ color: #17e017; }', '', function(opts) {
	this.Status = __webpack_require__(37).on("item-update", (function(_this) {
	  return function() {
	    return _this.update();
	  };
	})(this));
	});

	riot.tag2('recursive-item', '<list-line ref="lines" if="{getStrInfo(key).name !== \'default\'}" depth="{parent.opts.depth}" routing="{parent.opts.routing}" each="{data, key in opts.data}"></list-line>', 'recursive-item,[data-is="recursive-item"]{display:block;border-left:1px solid #ccc}', '', function(opts) {
	var getLines;

	this.getStrInfo = __webpack_require__(45).getStrInfo;

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
	  return function(paramStr) {
	    return getLines().forEach(function(line) {
	      return line.recursivelyCheckItem(paramStr);
	    });
	  };
	})(this);

	this.recursivelyUpdate = (function(_this) {
	  return function(routing) {
	    return getLines().forEach(function(line) {
	      return line.recursivelyUpdate(routing);
	    });
	  };
	})(this);
	});

	riot.tag2('list-line', '<open-close-icon ref="icon" length="16" stroke="#333" if="{!singleTaskUrl}" callback="{toggleItem}"></open-close-icon> <section class="{line: 1,hover: isHover, last-execute: singleTaskExecutionPath === Status.lastExecutePath}"> <div class="" onmouseover="{mouseOn}" onmouseout="{mouseOut}"> <span class="bold {success: success, error: error}"></span> <a class="tree" href="{routing}" onclick="{router}">{treeName}</a> <label each="{pattern, i in patterns}" class="{focus: pattern.focus}" data-id="{i}" onclick="{changePatternEvent}"> {pattern.name} </label> <a class="single" if="{singleTaskUrl}" href="{singleTaskExecutionPath}" onclick="{router}">{singleTaskName}</a> </div> <recursive-item depth="{opts.depth - 0 + 1}" ref="item" if="{typeof data === \'object\'}" data="{data}" routing="{routing}" riot-style="display: {isItemOpen ? \'block\' : \'none\'}"></recursive-item> </section> <test-iframe ref="testFrame" if="{singleTaskUrl && status.onExecute}" url="{singleTaskExecutionPath}" config="{Status.config}"></test-iframe>', 'list-line,[data-is="list-line"]{display:block;position:relative} list-line >open-close-icon,[data-is="list-line"] >open-close-icon{position:absolute;top:0;left:-8px} list-line >.line,[data-is="list-line"] >.line{display:inline-block} list-line >.line.last-execute,[data-is="list-line"] >.line.last-execute{border:solid 1px;display:inline-block;padding:0 8px} list-line >.line div>label,[data-is="list-line"] >.line div>label{cursor:pointer;border:1px solid rgba(255,128,0,0.6);padding:0 6px;text-align:center;display:inline-block} list-line >.line div>label.focus,[data-is="list-line"] >.line div>label.focus{background:#ff0} list-line >.line div>label:hover,[data-is="list-line"] >.line div>label:hover{opacity:.6} list-line .bold,[data-is="list-line"] .bold{font-weight:bold} list-line .tree,[data-is="list-line"] .tree{color:#333;word-break:break-all} list-line .single,[data-is="list-line"] .single{padding-left:6px} list-line .line,[data-is="list-line"] .line{margin-left:14px} list-line .line.hover,[data-is="list-line"] .line.hover{background:rgba(0,0,255,0.05)} list-line .success,[data-is="list-line"] .success{color:blue} list-line .success:after,[data-is="list-line"] .success:after{content:"〇"} list-line .error,[data-is="list-line"] .error{color:red} list-line .error:after,[data-is="list-line"] .error:after{content:"×"} list-line .step,[data-is="list-line"] .step{color:#333;margin-right:10px}', '', function(opts) {
	var Parser, Status, checkLastExecute, executeIframe, initialPattern, keyStrInfo, route, setObservableEvent, setRouter, valStrInfo;

	Status = this.Status = __webpack_require__(37);

	Parser = __webpack_require__(45);

	route = __webpack_require__(43);

	setObservableEvent = (function(_this) {
	  return function() {
	    Status.executablePath[_this.routing] = function() {
	      return _this.multiExecuteTask();
	    };
	    return Status.executablePath[_this.singleTaskExecutionPath] = function() {
	      if (_this.singleTaskUrl) {
	        return _this.executeTask();
	      }
	    };
	  };
	})(this);

	setRouter = (function(_this) {
	  return function(path) {
	    _this.routing = _this.initialRouting ? _this.initialRouting + "/" + path : path;
	    return _this.singleTaskExecutionPath = _this.singleTaskUrl + Status.basePath + _this.routing;
	  };
	})(this);

	checkLastExecute = (function(_this) {
	  return function() {
	    return Status.one('finished', function() {
	      if (Status.lastExecutePath === _this.singleTaskExecutionPath) {
	        return checkLastExecute();
	      } else {
	        return _this.update();
	      }
	    });
	  };
	})(this);

	executeIframe = (function(_this) {
	  return function() {
	    var base;
	    return typeof (base = Status.iframeListToExecute.shift()) === "function" ? base() : void 0;
	  };
	})(this);

	keyStrInfo = Parser.getStrInfo(this.key);

	this.initialRouting = opts.routing;

	this.treeName = keyStrInfo.name;

	if (keyStrInfo.toggleMode) {
	  initialPattern = keyStrInfo.patterns[0];
	  initialPattern.focus = true;
	  this.path = initialPattern.path;
	  this.patterns = keyStrInfo.patterns;
	} else {
	  this.path = keyStrInfo.path;
	}

	valStrInfo = typeof this.data === "object" ? this.data["default"] ? Parser.getStrInfo(this.data["default"]) : {} : Parser.getStrInfo(this.data);

	this.singleTaskName = valStrInfo.name;

	this.singleTaskUrl = valStrInfo.path;

	this.isItemOpen = true;

	setRouter(this.path);

	this.status = {
	  onExecute: false
	};

	this.toggleItem = (function(_this) {
	  return function() {
	    _this.isItemOpen = !_this.isItemOpen;
	    return _this.update();
	  };
	})(this);

	this.recursivelyUpdate = (function(_this) {
	  return function(routing) {
	    var ref;
	    _this.initialRouting = routing;
	    setRouter(_this.path);
	    if ((ref = _this.refs.item) != null) {
	      ref.recursivelyUpdate(_this.routing);
	    }
	    return setObservableEvent();
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
	      return Status.iframeListToExecute.push(function() {
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
	    Status.iframeListToExecute.length = 0;
	    _this.recursivelyExecuteTask();
	    return executeIframe();
	  };
	})(this);

	this.executeTask = (function(_this) {
	  return function(callback) {
	    _this.status.onExecute = true;
	    Status.lastExecutePath = _this.singleTaskExecutionPath;
	    Status.next();
	    checkLastExecute();
	    _this.update();
	    console.clear();
	    ++Status.executeSum;
	    return _this.refs.testFrame.setConsoleEvent({
	      info: function(msg) {
	        if (msg === "finished" && !_this.error) {
	          _this.success = true;
	          ++Status.successSum;
	          _this.update();
	          return callback && callback();
	        }
	      },
	      error: function(msg) {
	        _this.error = true;
	        _this.update();
	        return callback && callback();
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
	    var nextPattern, ref;
	    _this.patterns.forEach(function(pattern) {
	      return pattern.focus = false;
	    });
	    nextPattern = _this.patterns[nextId];
	    nextPattern.focus = true;
	    _this.path = nextPattern.path;
	    setRouter(_this.path);
	    if ((ref = _this.refs.item) != null) {
	      ref.recursivelyUpdate(_this.routing);
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
	  return function(paramStr) {
	    var matchedPattern, ref, ref1, ref2, ref3;
	    matchedPattern = (ref = _this.patterns) != null ? (ref1 = ref.filter(function(pattern, i) {
	      return paramStr.indexOf(pattern.path) === 0;
	    })) != null ? ref1[0] : void 0 : void 0;
	    if (matchedPattern) {
	      paramStr = paramStr.replace(matchedPattern.path, "").replace(/^\//, "");
	      _this.patterns.forEach(function(pattern, i) {
	        pattern.focus = false;
	        if (matchedPattern === pattern) {
	          return _this.changePattern(i);
	        }
	      });
	      _this.update();
	      if (paramStr) {
	        return (ref2 = _this.refs.item) != null ? ref2.recursivelyCheck(paramStr) : void 0;
	      } else {
	        return setObservableEvent();
	      }
	    } else if (paramStr.indexOf(_this.path) === 0) {
	      return (ref3 = _this.refs.item) != null ? ref3.recursivelyCheck(paramStr.replace(_this.path, "").replace(/^\//, "")) : void 0;
	    }
	  };
	})(this);

	Status.on("init", (function(_this) {
	  return function() {
	    return _this.init();
	  };
	})(this));

	Status.on("all-open", (function(_this) {
	  return function() {
	    var ref;
	    return (ref = _this.refs.icon) != null ? ref.setStatus(true) : void 0;
	  };
	})(this));

	Status.on("close-depth-" + opts.depth, (function(_this) {
	  return function() {
	    var ref;
	    return (ref = _this.refs.icon) != null ? ref.setStatus(false) : void 0;
	  };
	})(this));

	keyStrInfo.paramMode && Status.on("toggle-mode", (function(_this) {
	  return function() {
	    _this.treeName = _this.key === _this.treeName ? _this.treeName = _this._treeName || _this.treeName : (_this._treeName = _this.treeName, _this.treeName = _this.key);
	    _this.singleTaskName = _this.data === _this.singleTaskName ? _this.singleTaskName = _this._singleTaskName || _this.singleTaskName : (_this._singleTaskName = _this.singleTaskName, _this.singleTaskName = _this.data);
	    return _this.update();
	  };
	})(this));

	Status.itemStatuses.push(this.status);

	setObservableEvent();

	this.on("update", (function(_this) {
	  return function() {
	    return Status.trigger("item-update");
	  };
	})(this));
	});

	    
	  

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	
	    var riot = __webpack_require__(12)
	    riot.tag2('open-close-icon', '<svg xmlns="http://www.w3.org/2000/svg" onclick="{clickHandler}" riot-width="{opts.length || length}" riot-height="{opts.length || length}" viewbox="0 0 24 24" fill="none" riot-stroke="{opts.stroke || stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect> <g if="{minus}"> <line x1="8" y1="12" x2="16" y2="12"></line> </g> <g if="{!minus}"> <line x1="12" y1="8" x2="12" y2="16"></line> <line x1="8" y1="12" x2="16" y2="12"></line> </g> </svg>', 'open-close-icon>svg,[data-is="open-close-icon"]>svg{background:white;cursor:pointer}', '', function(opts) {
	this.length = 24;

	this.stroke = "#000";

	this.minus = true;

	this.setStatus = (function(_this) {
	  return function(minusFlg) {
	    var currentMinusStatus, nextMinusStatus;
	    currentMinusStatus = _this.minus;
	    nextMinusStatus = _this.minus = minusFlg;
	    currentMinusStatus !== nextMinusStatus && (typeof opts.callback === "function" ? opts.callback() : void 0);
	    return _this.update();
	  };
	})(this);

	this.clickHandler = (function(_this) {
	  return function() {
	    _this.minus = !_this.minus;
	    return typeof opts.callback === "function" ? opts.callback() : void 0;
	  };
	})(this);
	});

	    
	  

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	
	    var riot = __webpack_require__(12)
	    riot.tag2('help', '<section class="inner {isOpen ? \'show\' : \'hide\'}"> <header> Keyboard Shortcuts </header> <div> <kbd>1</kbd>-<kbd>9</kbd><span class="detail">Fold [1 - 9] depth tree node.</span> </div> <div> <kbd>0</kbd><span class="detail">Unfold all tree node.</span> </div> </section> <section class="background {isOpen ? \'show\' : \'hide\'}" onclick="{close}"></section>', 'help>section.show,[data-is="help"]>section.show{display:block} help>section.hide,[data-is="help"]>section.hide{display:none} help>.inner,[data-is="help"]>.inner{position:fixed;top:40px;left:50%;transform:translate(-50%, 0);width:80%;min-height:40%;background:white;z-index:30;padding:16px;border-radius:10px;transition:1s} help>.inner>header,[data-is="help"]>.inner>header{padding:16px;margin:-16px -16px 16px;border-bottom:1px solid #ccc} help>.inner>div>kbd,[data-is="help"]>.inner>div>kbd{display:inline-block;padding:3px 5px;font:11px "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;line-height:10px;color:#444d56;vertical-align:middle;background-color:#fafbfc;border:solid 1px #d1d5da;border-bottom-color:#c6cbd1;border-radius:3px;box-shadow:inset 0 -1px 0 #c6cbd1} help>.inner>div>.detail,[data-is="help"]>.inner>div>.detail{margin-left:10px;font-size:12px;color:#333} help>.background,[data-is="help"]>.background{background:rgba(0,0,0,0.4);width:100%;height:100%;position:fixed;top:0;left:0;z-index:20}', '', function(opts) {
	this.isOpen = false;

	this.open = (function(_this) {
	  return function() {
	    _this.isOpen = true;
	    return _this.update();
	  };
	})(this);

	this.close = (function(_this) {
	  return function() {
	    _this.isOpen = false;
	    return _this.update();
	  };
	})(this);
	});

	    
	  

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	
	    var riot = __webpack_require__(12)
	    riot.tag2('test-iframe', '<span class="{isIos ? \'ios\' : \'no-ios\'}"> <iframe if="{!isElectron}" riot-src="{opts.url}"></iframe> <webview if="{isElectron}" riot-src="{opts.url}" nodeintegration></webview> </span>', 'test-iframe,[data-is="test-iframe"]{ z-index: 100000; position: relative; } test-iframe .ios,[data-is="test-iframe"] .ios{ display: block; -webkit-overflow-scrolling: touch; overflow: auto; position: fixed; top: 0; left: 0; width: 100%; height: 100%; } test-iframe iframe,[data-is="test-iframe"] iframe,test-iframe webview,[data-is="test-iframe"] webview{ background-color: white; border: none; width: 100%; height: 100%; } test-iframe .no-ios iframe,[data-is="test-iframe"] .no-ios iframe,test-iframe .no-ios webview,[data-is="test-iframe"] .no-ios webview{ position: fixed; left: 0px; top: 0px; }', '', function(opts) {
	var WholeStatus, ref,
	  slice = [].slice;

	WholeStatus = __webpack_require__(37);

	this.isIos = __webpack_require__(42).ios();

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
	        iframeWindow.addEventListener("error", function(event) {
	          callbackObj.error();
	          return false;
	        });
	        iframeWindow.console.__info = iframeWindow.console.info;
	        iframeWindow.console.info = function() {
	          var args, ref1;
	          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          (ref1 = iframeWindow.console).__info.apply(ref1, args);
	          return callbackObj.info(args[0]);
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

	    
	  

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	module.exports = require("is_js");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	module.exports = require("riot-route");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	module.exports = require("keyboardjs");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

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


	  /**
	   * getStrInfo 第一引数で指定されたkey stringの情報を得る
	   * @param  {string} str testPatternのkey string
	   * @return info.toggleMode 2個以上の選択可能な切り替えが出来るkey stringである。 - [ja | en | ch]
	   * @return info.paramMode 表示用のテキストの他に、パラメーターを渡すkey stringである。 - dispString(param=kakarotto)
	   * @return name 表示用のテキスト
	   * @return path parameterに使われるパス
	   * @return patterns toggleMode時に使われる、選択可能なパターン配列。
	   */

	  Parser.getStrInfo = function(str) {
	    var name, paramMode, path, patternStr, patterns, ref, ref1, toggleMode;
	    ref = str.match(/(.*)\[(.+)\]$/) || [], toggleMode = ref[0], name = ref[1], patternStr = ref[2];
	    if (toggleMode) {
	      patterns = patternStr.split(/\s*\|\s*/).map(function(str) {
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
	            testUrl = (testUrl + ("/" + keyInfo.path)).replace(/^\//, "");
	            testName = (testName + ("/" + keyInfo.name)).replace(/^\//, "");
	            mockUrl = valueInfo.path + "#" + testUrl;
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


/***/ }),
/* 46 */
/***/ (function(module, exports) {

	module.exports = {
		"am-module": {
			"param": "./index.html"
		}
	};

/***/ })
/******/ ]);
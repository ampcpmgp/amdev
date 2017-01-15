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

	module.exports = __webpack_require__(43);


/***/ },

/***/ 4:
/***/ function(module, exports) {

	module.exports = require("jquery");

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	var $, Test, actionFuncs, getRandomColor, jquery_stylesheet;

	$ = __webpack_require__(4);

	jquery_stylesheet = __webpack_require__(30);

	jquery_stylesheet($);

	getRandomColor = (function(_this) {
	  return function(opacity) {
	    var getRandomNum;
	    if (opacity == null) {
	      opacity = 1;
	    }
	    getRandomNum = function() {
	      return Math.floor(Math.random() * 256);
	    };
	    return "rgba(" + (getRandomNum()) + "," + (getRandomNum()) + "," + (getRandomNum()) + ", " + opacity + ")";
	  };
	})(this);

	actionFuncs = {
	  _border: (function(_this) {
	    return function(selector) {
	      selector = selector === true || !selector ? "*" : selector;
	      if (typeof selector === "object") {
	        selector = selector.join(",");
	      }
	      return $.stylesheet(selector).css("box-shadow", "0px 0px 0px 1px " + (getRandomColor()));
	    };
	  })(this),
	  _color: (function(_this) {
	    return function(selector) {
	      selector = selector === true || !selector ? "*" : selector;
	      if (typeof selector === "object") {
	        selector = selector.join(",");
	      }
	      return $.stylesheet(selector).css("background", "" + (getRandomColor(0.1)));
	    };
	  })(this),
	  _hide: (function(_this) {
	    return function(selector) {
	      if (typeof selector === "object") {
	        selector = selector.join(",");
	      }
	      return $.stylesheet(selector).css("display", "none");
	    };
	  })(this),
	  _auto: (function(_this) {
	    return function() {
	      return {
	        AutoEvent: __webpack_require__(31)
	      };
	    };
	  })(this)
	};

	module.exports = Test = (function() {
	  function Test() {}

	  Test.start = function(testObj) {
	    var action, arg, func, i, key, len, ref, ref1, results, value;
	    if (testObj == null) {
	      testObj = Test;
	    }
	    Test.actions = decodeURI(location.hash.replace(/^#+/, "")).split("/");
	    Test.actionObj = {};
	    ref = Test.actions;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      action = ref[i];
	      ref1 = action.split("="), key = ref1[0], value = ref1[1];
	      func = testObj[key] || Test[key];
	      arg = !value || value.split(",");
	      if (typeof func === "function") {
	        func(arg.length === 1 ? arg[0] : arg);
	      }
	      if (typeof actionFuncs[key] === "function") {
	        actionFuncs[key](value);
	      }
	      results.push(Test.actionObj[key] = value);
	    }
	    return results;
	  };

	  return Test;

	})();


/***/ },

/***/ 30:
/***/ function(module, exports) {

	module.exports = require("jquery-stylesheet");

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	var AutoEvent, AutoEventBase,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	AutoEventBase = __webpack_require__(32);

	module.exports = AutoEvent = (function(superClass) {
	  extend(AutoEvent, superClass);

	  function AutoEvent() {
	    this.start = bind(this.start, this);
	    this.contoller = bind(this.contoller, this);
	    return AutoEvent.__super__.constructor.apply(this, arguments);
	  }

	  AutoEvent.prototype.contoller = function(loopNum, callback) {
	    var curFuncNum, i;
	    curFuncNum = 0;
	    this.innerFuncs[this.funcs.length] = [];
	    this.funcs.push((function(_this) {
	      return function() {
	        if (--loopNum) {
	          curFuncNum = 0;
	          return _this.funcs[0]();
	        } else {
	          if (callback) {
	            return callback();
	          } else {
	            return _this.end();
	          }
	        }
	      };
	    })(this));
	    i = -1;
	    while (this.funcs[++i]) {
	      this.innerFuncs[i].push((function(_this) {
	        return function() {
	          var base, name;
	          return typeof (base = _this.funcs)[name = ++curFuncNum] === "function" ? base[name]() : void 0;
	        };
	      })(this));
	    }
	    return this.funcs[0]();
	  };

	  AutoEvent.prototype.start = function(loopNum, callback) {
	    if (loopNum == null) {
	      loopNum = 1;
	    }
	    return this.contoller(loopNum, callback);
	  };

	  return AutoEvent;

	})(AutoEventBase);


/***/ },

/***/ 32:
/***/ function(module, exports) {

	var $, AutoEvent, trigger,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	$ = (function(_this) {
	  return function(selector) {
	    return document.querySelector(selector);
	  };
	})(this);

	trigger = (function(_this) {
	  return function($dom, eventType) {
	    var event;
	    event = document.createEvent("HTMLEvents");
	    event.initEvent(eventType, false, true);
	    return $dom.dispatchEvent(event);
	  };
	})(this);

	module.exports = AutoEvent = (function() {
	  function AutoEvent() {
	    this.end = bind(this.end, this);
	    this._createFuncInWait = bind(this._createFuncInWait, this);
	    this.waitSelector = bind(this.waitSelector, this);
	    this.wait = bind(this.wait, this);
	    this.waitEvent = bind(this.waitEvent, this);
	    this.click = bind(this.click, this);
	    this.setHtml = bind(this.setHtml, this);
	    this.setValue = bind(this.setValue, this);
	    this.selectValue = bind(this.selectValue, this);
	    this.addSelectorEvent = bind(this.addSelectorEvent, this);
	    this.addEvent = bind(this.addEvent, this);
	    this.register = bind(this.register, this);
	  }

	  AutoEvent.prototype.timeoutMsec = 10000;

	  AutoEvent.prototype.register = function() {
	    this.funcs = [];
	    this.innerFuncs = [];
	    this.funcNum = -1;
	    this.wait(0);
	    return this;
	  };

	  AutoEvent.prototype.addEvent = function(callback) {
	    var innerFunc;
	    innerFunc = this.innerFuncs[this.funcNum];
	    innerFunc.push(callback);
	    return this;
	  };

	  AutoEvent.prototype.addSelectorEvent = function(arg) {
	    var assertionMsg, callback, selector;
	    selector = arg.selector, assertionMsg = arg.assertionMsg, callback = arg.callback;
	    return this.addEvent((function(_this) {
	      return function() {
	        var $this;
	        $this = $(selector);
	        if (assertionMsg) {
	          console.assert($this, selector + " " + assertionMsg);
	          return callback($this);
	        } else {
	          try {
	            return callback($this);
	          } catch (error) {}
	        }
	      };
	    })(this));
	  };

	  AutoEvent.prototype.selectValue = function(selector, value, assertFlg) {
	    if (assertFlg == null) {
	      assertFlg = true;
	    }
	    return this.addSelectorEvent({
	      selector: selector + " [value='" + value + "']",
	      assertionMsg: assertFlg ? "can't select value" : void 0,
	      callback: (function(_this) {
	        return function() {
	          var $selector;
	          $selector = $(selector);
	          $selector.value = value;
	          return trigger($selector, "change");
	        };
	      })(this)
	    });
	  };

	  AutoEvent.prototype.setValue = function(selector, value, assertFlg) {
	    if (assertFlg == null) {
	      assertFlg = true;
	    }
	    return this.addSelectorEvent({
	      selector: selector,
	      assertionMsg: assertFlg ? "not find" : void 0,
	      callback: (function(_this) {
	        return function($this) {
	          $this.value = value;
	          return trigger($this, "input");
	        };
	      })(this)
	    });
	  };

	  AutoEvent.prototype.setHtml = function(selector, html, assertFlg) {
	    if (assertFlg == null) {
	      assertFlg = true;
	    }
	    return this.addSelectorEvent({
	      selector: selector,
	      assertionMsg: assertFlg ? "can't set html" : void 0,
	      callback: (function(_this) {
	        return function($this) {
	          return $this.innerHTML = html;
	        };
	      })(this)
	    });
	  };

	  AutoEvent.prototype.click = function(selector, assertFlg) {
	    if (assertFlg == null) {
	      assertFlg = true;
	    }
	    return this.addSelectorEvent({
	      selector: selector,
	      assertionMsg: assertFlg ? "can't click" : void 0,
	      callback: (function(_this) {
	        return function($this) {
	          return $this.click();
	        };
	      })(this)
	    });
	  };

	  AutoEvent.prototype.waitEvent = function(callback) {
	    this.funcs.push(callback);
	    return this;
	  };

	  AutoEvent.prototype.wait = function(msec) {
	    var func;
	    func = this._createFuncInWait();
	    return this.waitEvent((function(_this) {
	      return function() {
	        return setTimeout(func, msec);
	      };
	    })(this));
	  };

	  AutoEvent.prototype.waitSelector = function(selector, exists) {
	    var executeFunc, func, stopTimer, testTimer;
	    if (exists == null) {
	      exists = true;
	    }
	    func = this._createFuncInWait();
	    testTimer = null;
	    stopTimer = (function(_this) {
	      return function() {
	        return clearInterval(testTimer);
	      };
	    })(this);
	    executeFunc = (function(_this) {
	      return function() {
	        stopTimer();
	        return func();
	      };
	    })(this);
	    return this.waitEvent((function(_this) {
	      return function() {
	        var now;
	        now = Date.now();
	        return testTimer = setInterval(function() {
	          var withInTimeFlg;
	          withInTimeFlg = Date.now() - now < _this.timeoutMsec;
	          console.assert(withInTimeFlg, "timeout for \"" + selector + "\" selector");
	          if (!withInTimeFlg) {
	            return stopTimer();
	          }
	          if (exists) {
	            if ($(selector)) {
	              return executeFunc();
	            }
	          } else {
	            if (!$(selector)) {
	              return executeFunc();
	            }
	          }
	        }, 100);
	      };
	    })(this));
	  };

	  AutoEvent.prototype._createFuncInWait = function() {
	    var funcNum, innerFunc;
	    funcNum = ++this.funcNum;
	    innerFunc = this.innerFuncs[funcNum] = [];
	    return (function(_this) {
	      return function() {
	        var func, i, len, results;
	        results = [];
	        for (i = 0, len = innerFunc.length; i < len; i++) {
	          func = innerFunc[i];
	          results.push(func());
	        }
	        return results;
	      };
	    })(this);
	  };

	  AutoEvent.prototype.end = function() {
	    return console.info("finished");
	  };

	  return AutoEvent;

	})();


/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(29).start({
	  params: (function(_this) {
	    return function(arg) {};
	  })(this)
	});


/***/ }

/******/ });
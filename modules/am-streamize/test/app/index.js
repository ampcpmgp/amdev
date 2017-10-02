module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

var AutoEvent, AutoEventBase,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AutoEventBase = __webpack_require__(15);

module.exports = AutoEvent = (function(superClass) {
  extend(AutoEvent, superClass);

  function AutoEvent() {
    this.start = bind(this.start, this);
    this.controller = bind(this.controller, this);
    return AutoEvent.__super__.constructor.apply(this, arguments);
  }

  AutoEvent.prototype.controller = function(loopNum, callback) {
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
    return this.controller(loopNum, callback);
  };

  return AutoEvent;

})(AutoEventBase);


/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var $, AutoEvent, assert, click, trigger,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$ = (function(_this) {
  return function(selector) {
    return document.querySelector(selector);
  };
})(this);

assert = __webpack_require__(12);

click = (function(_this) {
  return function($dom) {
    var event;
    event = new MouseEvent("click");
    return $dom.dispatchEvent(event);
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
    this.notExists = bind(this.notExists, this);
    this.exists = bind(this.exists, this);
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
    var assertionMsg, callback, notExists, ref, selector;
    selector = arg.selector, assertionMsg = arg.assertionMsg, notExists = arg.notExists, callback = (ref = arg.callback) != null ? ref : (function(_this) {
      return function() {};
    })(this);
    return this.addEvent((function(_this) {
      return function() {
        var $this;
        $this = $(selector);
        if (assertionMsg) {
          assert((notExists ? !$this : $this), selector + " " + assertionMsg);
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
          return click($this);
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

  AutoEvent.prototype.exists = function(selector) {
    return this.addSelectorEvent({
      selector: selector,
      assertionMsg: "not exists"
    });
  };

  AutoEvent.prototype.notExists = function(selector) {
    return this.addSelectorEvent({
      selector: selector,
      notExists: true,
      assertionMsg: "is exists"
    });
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
          if (!withInTimeFlg) {
            stopTimer();
          }
          assert(withInTimeFlg, "timeout for \"" + selector + "\" selector");
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


/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

var $, RE_STR, Test, actionFuncs, getRandomColor, getValue, jquery_stylesheet, parseValue;

$ = __webpack_require__(6);

jquery_stylesheet = __webpack_require__(25);

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
        AutoEvent: __webpack_require__(14)
      };
    };
  })(this)
};

getValue = (function(_this) {
  return function(arg) {
    if (typeof arg !== "object") {
      return arg;
    }
    arg = arg.map(parseValue);
    if (arg.length === 1) {
      return arg[0];
    } else {
      return arg;
    }
  };
})(this);

RE_STR = /^"(.*)"$/;

parseValue = (function(_this) {
  return function(val) {
    if (RE_STR.test(val)) {
      return val.match(RE_STR)[1];
    } else if (val === "true") {
      return true;
    } else if (val === "false") {
      return false;
    } else if (val === "null") {
      return null;
    } else if (val === "undefined") {
      return void 0;
    } else if (val.match(/^\d+$/)) {
      return Number(val);
    } else {
      return val;
    }
  };
})(this);

module.exports = Test = (function() {
  function Test() {}

  Test.start = function(testObj) {
    var action, arg, i, key, len, ref, ref1, results, value;
    if (testObj == null) {
      testObj = {};
    }
    Test.actions = decodeURIComponent(location.hash.replace(/^#+/, "")).split("/");
    Test.actionObj = {};
    ref = Test.actions;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      action = ref[i];
      ref1 = action.split("="), key = ref1[0], value = ref1[1];
      arg = !value || value.split(",");
      if (typeof testObj[key] === "function") {
        testObj[key](getValue(arg));
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


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = require("jquery-stylesheet");

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

var assert, fs, parser;

fs = __webpack_require__(2);

assert = __webpack_require__(12);

parser = __webpack_require__(53);

__webpack_require__(16).start({
  simple: (function(_this) {
    return function() {
      var flow, json, result;
      flow = __webpack_require__(55);
      json = __webpack_require__(54);
      result = parser(flow);
      return assert(JSON.stringify(result) === JSON.stringify(json), "simple flow is not same");
    };
  })(this)
});

console.info("finished");


/***/ }),

/***/ 53:
/***/ (function(module, exports) {

var Sections, expressions,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

expressions = {
  blank: /(\r?\n){2,}/g,
  section: "[",
  name: /^\[(.+)\]\r?\n/g,
  splitter: /\-\-\r?\n/g,
  block: /\r?\n/,
  line: /([^=]+)=?([^=>]*)=?>?(.*)$/
};

Sections = (function() {
  function Sections() {
    this._getStatus = bind(this._getStatus, this);
    this.add = bind(this.add, this);
    this.data = [];
  }

  Sections.prototype.add = function(string) {
    var blocks, name, stringWithoutName;
    stringWithoutName = string.replace(expressions.name, "");
    name = RegExp.$1;
    blocks = stringWithoutName.split(expressions.splitter).map((function(_this) {
      return function(block) {
        return _this._getStatus(block);
      };
    })(this));
    return this.data.push({
      name: name,
      blocks: blocks
    });
  };

  Sections.prototype._getStatus = function(block) {
    return {
      lines: [
        block.split(expressions.block).filter((function(_this) {
          return function(section) {
            if (section) {
              return section;
            }
          };
        })(this)).map((function(_this) {
          return function(line) {
            var _, action, func, name, ref;
            ref = line.split(expressions.line), _ = ref[0], func = ref[1], action = ref[2], name = ref[3];
            name = name.trim();
            return {
              func: func,
              action: action,
              name: name
            };
          };
        })(this))
      ]
    };
  };

  return Sections;

})();

module.exports = (function(_this) {
  return function(flow) {
    var sections;
    sections = new Sections();
    flow.replace(expressions.blank, "\n").split(expressions.section).filter(function(section) {
      if (section) {
        return section;
      }
    }).forEach(function(section) {
      return sections.add("" + expressions.section + section);
    });
    return sections.data;
  };
})(this);


/***/ }),

/***/ 54:
/***/ (function(module, exports) {

module.exports = [
	{
		"name": "プロモーション画面",
		"blocks": [
			{
				"lines": [
					[
						{
							"func": "ユーザーが見るものを書きます。",
							"action": "",
							"name": ""
						},
						{
							"func": "ユーザーがする行動を書きます。",
							"action": "",
							"name": ""
						}
					]
				]
			}
		]
	},
	{
		"name": "ようこそ画面",
		"blocks": [
			{
				"lines": [
					[
						{
							"func": "ユーザー情報を取得",
							"action": "",
							"name": ""
						},
						{
							"func": "if ログインユーザー or ゲストユーザー",
							"action": "",
							"name": ""
						},
						{
							"func": "  if ゲストユーザー",
							"action": "",
							"name": ""
						},
						{
							"func": "    ゲスト機能を表示",
							"action": "",
							"name": "チャット画面"
						},
						{
							"func": "else if 管理者",
							"action": "",
							"name": ""
						},
						{
							"func": "  ",
							"action": "2段階認証",
							"name": "管理画面"
						},
						{
							"func": "else",
							"action": "",
							"name": ""
						},
						{
							"func": "  ",
							"action": "",
							"name": "ログイン画面"
						}
					]
				]
			},
			{
				"lines": [
					[
						{
							"func": "ユーザーがすること１ ",
							"action": "",
							"name": "その結果１"
						},
						{
							"func": "ユーザーがすること２ ",
							"action": "",
							"name": "その結果２"
						}
					]
				]
			}
		]
	},
	{
		"name": "その結果１",
		"blocks": [
			{
				"lines": [
					[
						{
							"func": "結果",
							"action": "",
							"name": ""
						}
					]
				]
			}
		]
	},
	{
		"name": "その結果２",
		"blocks": [
			{
				"lines": [
					[
						{
							"func": "結果",
							"action": "",
							"name": ""
						}
					]
				]
			}
		]
	},
	{
		"name": "ログイン画面",
		"blocks": [
			{
				"lines": [
					[
						{
							"func": "ログイン機能",
							"action": "",
							"name": ""
						},
						{
							"func": "ゲスト機能",
							"action": "",
							"name": ""
						}
					]
				]
			}
		]
	},
	{
		"name": "チャット画面",
		"blocks": [
			{
				"lines": [
					[
						{
							"func": "チャット機能",
							"action": "",
							"name": ""
						}
					]
				]
			}
		]
	}
];

/***/ }),

/***/ 55:
/***/ (function(module, exports) {

module.exports = "[プロモーション画面]\r\nユーザーが見るものを書きます。\r\nユーザーがする行動を書きます。\r\n\r\n[ようこそ画面]\r\nユーザー情報を取得\r\nif ログインユーザー or ゲストユーザー\r\n  if ゲストユーザー\r\n    ゲスト機能を表示=>チャット画面\r\nelse if 管理者\r\n  =2段階認証=>管理画面\r\nelse\r\n  =>ログイン画面\r\n--\r\nユーザーがすること１ => その結果１\r\nユーザーがすること２ => その結果２\r\n\r\n[その結果１]\r\n結果\r\n\r\n[その結果２]\r\n結果\r\n\r\n[ログイン画面]\r\nログイン機能\r\nゲスト機能\r\n\r\n[チャット画面]\r\nチャット機能\r\n"

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(51);


/***/ })

/******/ });
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["modules/am-coffee-time/test/web/list"] = factory();
	else
		root["modules/am-coffee-time/test/web/list"] = factory();
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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(73);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var $, AutoEvent, assert, click, trigger,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	$ = (function(_this) {
	  return function(selector) {
	    return document.querySelector(selector);
	  };
	})(this);

	assert = __webpack_require__(2);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }

	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}

	// based on node assert, original notice:

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	var util = __webpack_require__(3);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })

	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }

	      this.stack = out;
	    }
	  }
	};

	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);

	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}

	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.

	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.

	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);

	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);

	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};

	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};

	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;

	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();

	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;

	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;

	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;

	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};

	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }

	    memos.actual.push(actual);
	    memos.expected.push(expected);

	    return objEquiv(actual, expected, strict, memos);
	  }
	}

	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}

	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}

	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);

	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}


	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);

	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }

	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }

	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }

	  return expected.call({}, actual) === true;
	}

	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }

	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }

	  actual = _tryBlock(block);

	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;

	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);

	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};

	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};

	assert.ifError = function(err) { if (err) throw err; };

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(5);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(6);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var AutoEvent, AutoEventBase,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	AutoEventBase = __webpack_require__(1);

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
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v3.2.1
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright JS Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2017-03-20T18:59Z
	 */
	( function( global, factory ) {

		"use strict";

		if ( typeof module === "object" && typeof module.exports === "object" ) {

			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call( Object );

	var support = {};



		function DOMEval( code, doc ) {
			doc = doc || document;

			var script = doc.createElement( "script" );

			script.text = code;
			doc.head.appendChild( script ).parentNode.removeChild( script );
		}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module



	var
		version = "3.2.1",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android <=4.0 only
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {

			// Return all the elements in a clean array
			if ( num == null ) {
				return slice.call( this );
			}

			// Return just the one element from the set
			return num < 0 ? this[ num + this.length ] : this[ num ];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = Array.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && Array.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type( obj );
			return ( type === "number" || type === "string" ) &&

				// parseFloat NaNs numeric-cast false positives ("")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				!isNaN( obj - parseFloat( obj ) );
		},

		isPlainObject: function( obj ) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}

			proto = getProto( obj );

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
		},

		isEmptyObject: function( obj ) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			DOMEval( code );
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.3.3
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-08-08
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,

		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		fcssescape = function( ch, asCodePoint ) {
			if ( asCodePoint ) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if ( ch === "\0" ) {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		},

		disabledAncestor = addCombinator(
			function( elem ) {
				return elem.disabled === true && ("form" in elem || "label" in elem);
			},
			{ dir: "parentNode", next: "legend" }
		);

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						while ( i-- ) {
							groups[i] = "#" + nid + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created element and returns a boolean result
	 */
	function assert( fn ) {
		var el = document.createElement("fieldset");

		try {
			return !!fn( el );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( el.parentNode ) {
				el.parentNode.removeChild( el );
			}
			// release memory in IE
			el = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				a.sourceIndex - b.sourceIndex;

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for :enabled/:disabled
	 * @param {Boolean} disabled true for :disabled; false for :enabled
	 */
	function createDisabledPseudo( disabled ) {

		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function( elem ) {

			// Only certain elements can match :enabled or :disabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
			if ( "form" in elem ) {

				// Check for inherited disabledness on relevant non-disabled elements:
				// * listed form-associated elements in a disabled fieldset
				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
				// * option elements in a disabled optgroup
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
				// All such elements have a "form" property.
				if ( elem.parentNode && elem.disabled === false ) {

					// Option elements defer to a parent optgroup if present
					if ( "label" in elem ) {
						if ( "label" in elem.parentNode ) {
							return elem.parentNode.disabled === disabled;
						} else {
							return elem.disabled === disabled;
						}
					}

					// Support: IE 6 - 11
					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
					return elem.isDisabled === disabled ||

						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled &&
							disabledAncestor( elem ) === disabled;
				}

				return elem.disabled === disabled;

			// Try to winnow out elements that can't be disabled before trusting the disabled property.
			// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
			// even exist on them, let alone have a boolean value.
			} else if ( "label" in elem ) {
				return elem.disabled === disabled;
			}

			// Remaining elements are neither :enabled nor :disabled
			return false;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, subWindow,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( preferredDoc !== document &&
			(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

			// Support: IE 11, Edge
			if ( subWindow.addEventListener ) {
				subWindow.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( subWindow.attachEvent ) {
				subWindow.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( el ) {
			el.className = "i";
			return !el.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( el ) {
			el.appendChild( document.createComment("") );
			return !el.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( el ) {
			docElem.appendChild( el ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID filter and find
		if ( support.getById ) {
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var elem = context.getElementById( id );
					return elem ? [ elem ] : [];
				}
			};
		} else {
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};

			// Support: IE 6 - 7 only
			// getElementById is not reliable as a find shortcut
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var node, i, elems,
						elem = context.getElementById( id );

					if ( elem ) {

						// Verify the id attribute
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}

						// Fall back on getElementsByName
						elems = context.getElementsByName( id );
						i = 0;
						while ( (elem = elems[i++]) ) {
							node = elem.getAttributeNode("id");
							if ( node && node.value === id ) {
								return [ elem ];
							}
						}
					}

					return [];
				}
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( el ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( el.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !el.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !el.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( el ) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" +
					"<select disabled='disabled'><option/></select>";

				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				el.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( el.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( el.querySelectorAll(":enabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild( el ).disabled = true;
				if ( el.querySelectorAll(":disabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( el ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( el, "*" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( el, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.escape = function( sel ) {
		return (sel + "").replace( rcssescape, fcssescape );
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": createDisabledPseudo( false ),
			"disabled": createDisabledPseudo( true ),

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			skip = combinator.next,
			key = skip || dir,
			checkNonElements = base && key === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
				return false;
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( skip && skip === elem.nodeName.toLowerCase() ) {
								elem = elem[ dir ] || elem;
							} else if ( (oldCache = uniqueCache[ key ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ key ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( el ) {
		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( el ) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( el ) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute( "value", "" );
		return el.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( el ) {
		return el.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;




	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;



	function nodeName( elem, name ) {

	  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

	};
	var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
		}

		// Single element
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if ( typeof qualifier !== "string" ) {
			return jQuery.grep( elements, function( elem ) {
				return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
			} );
		}

		// Simple selector that can be filtered directly, removing non-Elements
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter( qualifier, elements );
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		if ( elems.length === 1 && elem.nodeType === 1 ) {
			return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
		}

		return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			ret = this.pushStack( [] );

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			return len > 1 ? jQuery.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						if ( elem ) {

							// Inject the element directly into the jQuery object
							this[ 0 ] = elem;
							this.length = 1;
						}
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery( selectors );

			// Positional selectors never match, since there's no _selection_ context
			if ( !rneedsContext.test( selectors ) ) {
				for ( ; i < l; i++ ) {
					for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

						// Always skip document fragments
						if ( cur.nodeType < 11 && ( targets ?
							targets.index( cur ) > -1 :

							// Don't pass non-elements to Sizzle
							cur.nodeType === 1 &&
								jQuery.find.matchesSelector( cur, selectors ) ) ) {

							matched.push( cur );
							break;
						}
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
	        if ( nodeName( elem, "iframe" ) ) {
	            return elem.contentDocument;
	        }

	        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
	        // Treat the template element as a regular one in browsers that
	        // don't support it.
	        if ( nodeName( elem, "template" ) ) {
	            elem = elem.content || elem;
	        }

	        return jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = locked || options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory && !firing ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	function Identity( v ) {
		return v;
	}
	function Thrower( ex ) {
		throw ex;
	}

	function adoptValue( value, resolve, reject, noValue ) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
				method.call( value ).done( resolve ).fail( reject );

			// Other thenables
			} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
				method.call( value, resolve, reject );

			// Other non-thenables
			} else {

				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply( undefined, [ value ].slice( noValue ) );
			}

		// For Promises/A+, convert exceptions into rejections
		// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
		// Deferred#then to conditionally suppress rejection.
		} catch ( value ) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply( undefined, [ value ] );
		}
	}

	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					[ "notify", "progress", jQuery.Callbacks( "memory" ),
						jQuery.Callbacks( "memory" ), 2 ],
					[ "resolve", "done", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 0, "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 1, "rejected" ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					"catch": function( fn ) {
						return promise.then( null, fn );
					},

					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;

						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {

								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
					then: function( onFulfilled, onRejected, onProgress ) {
						var maxDepth = 0;
						function resolve( depth, deferred, handler, special ) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;

										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if ( depth < maxDepth ) {
											return;
										}

										returned = handler.apply( that, args );

										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if ( returned === deferred.promise() ) {
											throw new TypeError( "Thenable self-resolution" );
										}

										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&

											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											( typeof returned === "object" ||
												typeof returned === "function" ) &&
											returned.then;

										// Handle a returned thenable
										if ( jQuery.isFunction( then ) ) {

											// Special processors (notify) just wait for resolution
											if ( special ) {
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special )
												);

											// Normal processors (resolve) also hook into progress
											} else {

												// ...and disregard older resolution values
												maxDepth++;

												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special ),
													resolve( maxDepth, deferred, Identity,
														deferred.notifyWith )
												);
											}

										// Handle all other returned values
										} else {

											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if ( handler !== Identity ) {
												that = undefined;
												args = [ returned ];
											}

											// Process the value(s)
											// Default process is resolve
											( special || deferred.resolveWith )( that, args );
										}
									},

									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
										mightThrow :
										function() {
											try {
												mightThrow();
											} catch ( e ) {

												if ( jQuery.Deferred.exceptionHook ) {
													jQuery.Deferred.exceptionHook( e,
														process.stackTrace );
												}

												// Support: Promises/A+ section 2.3.3.3.4.1
												// https://promisesaplus.com/#point-61
												// Ignore post-resolution exceptions
												if ( depth + 1 >= maxDepth ) {

													// Only substitute handlers pass on context
													// and multiple values (non-spec behavior)
													if ( handler !== Thrower ) {
														that = undefined;
														args = [ e ];
													}

													deferred.rejectWith( that, args );
												}
											}
										};

								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if ( depth ) {
									process();
								} else {

									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if ( jQuery.Deferred.getStackHook ) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout( process );
								}
							};
						}

						return jQuery.Deferred( function( newDefer ) {

							// progress_handlers.add( ... )
							tuples[ 0 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onProgress ) ?
										onProgress :
										Identity,
									newDefer.notifyWith
								)
							);

							// fulfilled_handlers.add( ... )
							tuples[ 1 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onFulfilled ) ?
										onFulfilled :
										Identity
								)
							);

							// rejected_handlers.add( ... )
							tuples[ 2 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onRejected ) ?
										onRejected :
										Thrower
								)
							);
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 5 ];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(
						function() {

							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},

						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[ 3 - i ][ 2 ].disable,

						// progress_callbacks.lock
						tuples[ 0 ][ 2 ].lock
					);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add( tuple[ 3 ].fire );

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( singleValue ) {
			var

				// count of uncompleted subordinates
				remaining = arguments.length,

				// count of unprocessed arguments
				i = remaining,

				// subordinate fulfillment data
				resolveContexts = Array( i ),
				resolveValues = slice.call( arguments ),

				// the master Deferred
				master = jQuery.Deferred(),

				// subordinate callback factory
				updateFunc = function( i ) {
					return function( value ) {
						resolveContexts[ i ] = this;
						resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( !( --remaining ) ) {
							master.resolveWith( resolveContexts, resolveValues );
						}
					};
				};

			// Single- and empty arguments are adopted like Promise.resolve
			if ( remaining <= 1 ) {
				adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
					!remaining );

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if ( master.state() === "pending" ||
					jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while ( i-- ) {
				adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
			}

			return master.promise();
		}
	} );


	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function( error, stack ) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
			window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
		}
	};




	jQuery.readyException = function( error ) {
		window.setTimeout( function() {
			throw error;
		} );
	};




	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function( fn ) {

		readyList
			.then( fn )

			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch( function( error ) {
				jQuery.readyException( error );
			} );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
		}
	} );

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if ( document.readyState === "complete" ||
		( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout( jQuery.ready );

	} else {

		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", completed );

		// A fallback to window.onload, that will always work
		window.addEventListener( "load", completed );
	}




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		if ( chainable ) {
			return elems;
		}

		// Gets
		if ( bulk ) {
			return fn.call( elems );
		}

		return len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function( owner ) {

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if ( typeof data === "string" ) {
				cache[ jQuery.camelCase( data ) ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ jQuery.camelCase( prop ) ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :

				// Always use camelCase key (gh-2257)
				owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
		},
		access: function( owner, key, value ) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				return this.get( owner, key );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key !== undefined ) {

				// Support array or space separated string of keys
				if ( Array.isArray( key ) ) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map( jQuery.camelCase );
				} else {
					key = jQuery.camelCase( key );

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ?
						[ key ] :
						( key.match( rnothtmlwhite ) || [] );
				}

				i = key.length;

				while ( i-- ) {
					delete cache[ key[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function getData( data ) {
		if ( data === "true" ) {
			return true;
		}

		if ( data === "false" ) {
			return false;
		}

		if ( data === "null" ) {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if ( data === +data + "" ) {
			return +data;
		}

		if ( rbrace.test( data ) ) {
			return JSON.parse( data );
		}

		return data;
	}

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = getData( data );
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each( function() {

					// We always store the camelCased key
					dataUser.set( this, key, value );
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || Array.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHiddenWithinTree = function( elem, el ) {

			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;

			// Inline style trumps all
			return elem.style.display === "none" ||
				elem.style.display === "" &&

				// Otherwise, check computed style
				// Support: Firefox <=43 - 45
				// Disconnected elements can have computed display: none, so first confirm that elem is
				// in the document.
				jQuery.contains( elem.ownerDocument, elem ) &&

				jQuery.css( elem, "display" ) === "none";
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};




	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() {
					return tween.cur();
				} :
				function() {
					return jQuery.css( elem, prop, "" );
				},
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}


	var defaultDisplayMap = {};

	function getDefaultDisplay( elem ) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[ nodeName ];

		if ( display ) {
			return display;
		}

		temp = doc.body.appendChild( doc.createElement( nodeName ) );
		display = jQuery.css( temp, "display" );

		temp.parentNode.removeChild( temp );

		if ( display === "none" ) {
			display = "block";
		}
		defaultDisplayMap[ nodeName ] = display;

		return display;
	}

	function showHide( elements, show ) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;

		// Determine new display value for elements that need to change
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			display = elem.style.display;
			if ( show ) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if ( display === "none" ) {
					values[ index ] = dataPriv.get( elem, "display" ) || null;
					if ( !values[ index ] ) {
						elem.style.display = "";
					}
				}
				if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
					values[ index ] = getDefaultDisplay( elem );
				}
			} else {
				if ( display !== "none" ) {
					values[ index ] = "none";

					// Remember what we're overwriting
					dataPriv.set( elem, "display", display );
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for ( index = 0; index < length; index++ ) {
			if ( values[ index ] != null ) {
				elements[ index ].style.display = values[ index ];
			}
		}

		return elements;
	}

	jQuery.fn.extend( {
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHiddenWithinTree( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE <=9 only
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;

		if ( typeof context.getElementsByTagName !== "undefined" ) {
			ret = context.getElementsByTagName( tag || "*" );

		} else if ( typeof context.querySelectorAll !== "undefined" ) {
			ret = context.querySelectorAll( tag || "*" );

		} else {
			ret = [];
		}

		if ( tag === undefined || tag && nodeName( context, tag ) ) {
			return jQuery.merge( [ context ], ret );
		}

		return ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	var documentElement = document.documentElement;



	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if ( selector ) {
				jQuery.find.matchesSelector( documentElement, selector );
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( nativeEvent ) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix( nativeEvent );

			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array( arguments.length ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;

			for ( i = 1; i < arguments.length; i++ ) {
				args[ i ] = arguments[ i ];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, handleObj, sel, matchedHandlers, matchedSelectors,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			if ( delegateCount &&

				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&

				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
				!( event.type === "click" && event.button >= 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
						matchedHandlers = [];
						matchedSelectors = {};
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matchedSelectors[ sel ] === undefined ) {
								matchedSelectors[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matchedSelectors[ sel ] ) {
								matchedHandlers.push( handleObj );
							}
						}
						if ( matchedHandlers.length ) {
							handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		addProp: function( name, hook ) {
			Object.defineProperty( jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction( hook ) ?
					function() {
						if ( this.originalEvent ) {
								return hook( this.originalEvent );
						}
					} :
					function() {
						if ( this.originalEvent ) {
								return this.originalEvent[ name ];
						}
					},

				set: function( value ) {
					Object.defineProperty( this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					} );
				}
			} );
		},

		fix: function( originalEvent ) {
			return originalEvent[ jQuery.expando ] ?
				originalEvent :
				new jQuery.Event( originalEvent );
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android <=2.3 only
					src.returnValue === false ?
				returnTrue :
				returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = ( src.target && src.target.nodeType === 3 ) ?
				src.target.parentNode :
				src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each( {
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function( event ) {
			var button = event.button;

			// Add which for key events
			if ( event.which == null && rkeyEvent.test( event.type ) ) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
				if ( button & 1 ) {
					return 1;
				}

				if ( button & 2 ) {
					return 3;
				}

				if ( button & 4 ) {
					return 2;
				}

				return 0;
			}

			return event.which;
		}
	}, jQuery.event.addProp );

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {

		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var

		/* eslint-disable max-len */

		// See https://github.com/eslint/eslint/issues/3229
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

		/* eslint-enable */

		// Support: IE <=10 - 11, Edge 12 - 13
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget( elem, content ) {
		if ( nodeName( elem, "table" ) &&
			nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

			return jQuery( ">tbody", elem )[ 0 ] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {
		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};



	( function() {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if ( !div ) {
				return;
			}

			div.style.cssText =
				"box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		jQuery.extend( support, {
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,

			// Support: Firefox 51+
			// Retrieving style before computed somehow
			// fixes an issue with getting wrong values
			// on detached elements
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rcustomProp = /^--/,
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	// Return a property mapped along what jQuery.cssProps suggests or to
	// a vendor prefixed property.
	function finalPropName( name ) {
		var ret = jQuery.cssProps[ name ];
		if ( !ret ) {
			ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
		}
		return ret;
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i,
			val = 0;

		// If we already have the right measurement, avoid augmentation
		if ( extra === ( isBorderBox ? "border" : "content" ) ) {
			i = 4;

		// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with computed style
		var valueIsBorderBox,
			styles = getStyles( elem ),
			val = curCSS( elem, name, styles ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Fall back to offsetWidth/Height when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		if ( val === "auto" ) {
			val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
		}

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				isCustomProp = rcustomProp.test( name ),
				style = elem.style;

			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if ( !isCustomProp ) {
				name = finalPropName( origName );
			}

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					if ( isCustomProp ) {
						style.setProperty( name, value );
					} else {
						style[ name ] = value;
					}
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name ),
				isCustomProp = rcustomProp.test( name );

			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if ( !isCustomProp ) {
				name = finalPropName( origName );
			}

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}

			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( Array.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, inProgress,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	function schedule() {
		if ( inProgress ) {
			if ( document.hidden === false && window.requestAnimationFrame ) {
				window.requestAnimationFrame( schedule );
			} else {
				window.setTimeout( schedule, jQuery.fx.interval );
			}

			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Queue-skipping animations hijack the fx hooks
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Detect show/hide animations
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.test( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;

					// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject( props );
		if ( !propTween && jQuery.isEmptyObject( orig ) ) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if ( isBox && elem.nodeType === 1 ) {

			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if ( restoreDisplay == null ) {
				restoreDisplay = dataPriv.get( elem, "display" );
			}
			display = jQuery.css( elem, "display" );
			if ( display === "none" ) {
				if ( restoreDisplay ) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide( [ elem ], true );
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css( elem, "display" );
					showHide( [ elem ] );
				}
			}

			// Animate inline elements as inline-block
			if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
				if ( jQuery.css( elem, "float" ) === "none" ) {

					// Restore the original display value at the end of pure show/hide animations
					if ( !propTween ) {
						anim.done( function() {
							style.display = restoreDisplay;
						} );
						if ( restoreDisplay == null ) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// Implement show/hide animations
		propTween = false;
		for ( prop in orig ) {

			// General show/hide setup for this element animation
			if ( !propTween ) {
				if ( dataShow ) {
					if ( "hidden" in dataShow ) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if ( toggle ) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if ( hidden ) {
					showHide( [ elem ], true );
				}

				/* eslint-disable no-loop-func */

				anim.done( function() {

				/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if ( !hidden ) {
						showHide( [ elem ] );
					}
					dataPriv.remove( elem, "fxshow" );
					for ( prop in orig ) {
						jQuery.style( elem, prop, orig[ prop ] );
					}
				} );
			}

			// Per-property setup
			propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = propTween.start;
				if ( hidden ) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( Array.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				// If there's more to do, yield
				if ( percent < 1 && length ) {
					return remaining;
				}

				// If this was an empty animation, synthesize a final progress notification
				if ( !length ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
				}

				// Resolve the animation and report its conclusion
				deferred.resolveWith( elem, [ animation ] );
				return false;
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		// Attach callbacks from options
		animation
			.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		return animation;
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnothtmlwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		// Go to the end state if fx are off
		if ( jQuery.fx.off ) {
			opt.duration = 0;

		} else {
			if ( typeof opt.duration !== "number" ) {
				if ( opt.duration in jQuery.fx.speeds ) {
					opt.duration = jQuery.fx.speeds[ opt.duration ];

				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Run the timer and safely remove it when done (allowing for external removal)
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		jQuery.fx.start();
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( inProgress ) {
			return;
		}

		inProgress = true;
		schedule();
	};

	jQuery.fx.stop = function() {
		inProgress = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name,
				i = 0,

				// Attribute names can contain non-HTML whitespace characters
				// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				attrNames = value && value.match( rnothtmlwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};

	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle,
				lowercaseName = name.toLowerCase();

			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ lowercaseName ];
				attrHandle[ lowercaseName ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					lowercaseName :
					null;
				attrHandle[ lowercaseName ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					if ( tabindex ) {
						return parseInt( tabindex, 10 );
					}

					if (
						rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) &&
						elem.href
					) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




		// Strip and collapse whitespace according to HTML spec
		// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
		function stripAndCollapse( value ) {
			var tokens = value.match( rnothtmlwhite ) || [];
			return tokens.join( " " );
		}


	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnothtmlwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
						return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if ( typeof ret === "string" ) {
						return ret.replace( rreturn, "" );
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( Array.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						stripAndCollapse( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option, i,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length;

					if ( index < 0 ) {
						i = max;

					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								!option.disabled &&
								( !option.parentNode.disabled ||
									!nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];

						/* eslint-disable no-cond-assign */

						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( Array.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( Array.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, valueOrFunction ) {

				// If value is a function, invoke it and use its return value
				var value = jQuery.isFunction( valueOrFunction ) ?
					valueOrFunction() :
					valueOrFunction;

				s[ s.length ] = encodeURIComponent( key ) + "=" +
					encodeURIComponent( value == null ? "" : value );
			};

		// If an array was passed in, assume that it is an array of form elements.
		if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				if ( val == null ) {
					return null;
				}

				if ( Array.isArray( val ) ) {
					return jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} );
				}

				return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rantiCache = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// Request state (becomes false upon send and true upon completion)
				completed,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// uncached part of the url
				uncached,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( completed ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( completed == null ) {
							name = requestHeadersNames[ name.toLowerCase() ] =
								requestHeadersNames[ name.toLowerCase() ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( completed == null ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( completed ) {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							} else {

								// Lazy-add the new callbacks in a way that preserves old ones
								for ( code in map ) {
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR );

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( completed ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace( rhash, "" );

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// Remember the hash so we can put it back
				uncached = s.url.slice( cacheURL.length );

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if ( s.cache === false ) {
					cacheURL = cacheURL.replace( rantiCache, "$1" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if ( s.data && s.processData &&
				( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				s.data = s.data.replace( r20, "+" );
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add( s.complete );
			jqXHR.done( s.success );
			jqXHR.fail( s.error );

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( completed ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					completed = false;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Rethrow post-completion exceptions
					if ( completed ) {
						throw e;
					}

					// Propagate others as results
					done( -1, e );
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Ignore repeat invocations
				if ( completed ) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( this[ 0 ] ) {
				if ( jQuery.isFunction( html ) ) {
					html = html.call( this[ 0 ] );
				}

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function( selector ) {
			this.parent( selector ).not( "body" ).each( function() {
				jQuery( this ).replaceWith( this.childNodes );
			} );
			return this;
		}
	} );


	jQuery.expr.pseudos.hidden = function( elem ) {
		return !jQuery.expr.pseudos.visible( elem );
	};
	jQuery.expr.pseudos.visible = function( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	};




	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter( function( s ) {
		if ( s.crossDomain ) {
			s.contents.script = false;
		}
	} );

	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();


	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( typeof data !== "string" ) {
			return [];
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if ( !context ) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if ( support.createHTMLDocument ) {
				context = document.implementation.createHTMLDocument( "" );

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement( "base" );
				base.href = document.location.href;
				context.head.appendChild( base );
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec( data );
		scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = stripAndCollapse( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.pseudos.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {

			// Preserve chaining for setter
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var doc, docElem, rect, win,
				elem = this[ 0 ];

			if ( !elem ) {
				return;
			}

			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if ( !elem.getClientRects().length ) {
				return { top: 0, left: 0 };
			}

			rect = elem.getBoundingClientRect();

			doc = elem.ownerDocument;
			docElem = doc.documentElement;
			win = doc.defaultView;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
					left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
				};
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {

				// Coalesce documents and windows
				var win;
				if ( jQuery.isWindow( elem ) ) {
					win = elem;
				} else if ( elem.nodeType === 9 ) {
					win = elem.defaultView;
				}

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf( "outer" ) === 0 ?
							elem[ "inner" + name ] :
							elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		}
	} );

	jQuery.holdReady = function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}




	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}




	return jQuery;
	} );


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var $, RE_STR, Test, actionFuncs, getRandomColor, getValue, jquery_stylesheet, parseValue;

	$ = __webpack_require__(10);

	jquery_stylesheet = __webpack_require__(12);

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
	        AutoEvent: __webpack_require__(8)
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
/* 12 */
/***/ (function(module, exports) {

	/**
	 * jQuery plugin for adding, removing and making changes to CSS rules
	 * 
	 * @author Vimal Aravindashan
	 * @version 0.3.7
	 * @licensed MIT license
	 */
	(function (factory) {
		if (typeof module === "object" && typeof module.exports === "object") {
			// Node/CommonJS
			module.exports = factory;
		} else {
			// Browser globals
			factory(jQuery);
		}
	}(function ($) {
		var	_ahref = $(document.createElement('a')), /**< <a> tag used for evaluating hrefs */
			_styles = _ahref.prop('style'), /**< Collection of styles available on the host */
			_sheet = function(s) {
				return s.sheet || s.styleSheet;
			}($('<style type="text/css">*{}</style>').appendTo('head')[0]), /**< StyleSheet for adding new rules*/
			_rules = ('cssRules' in _sheet) ? 'cssRules' : 'rules', /**< Attribute name for rules collection in a stylesheet */
			vendorPrefixes = ["Webkit", "O", "Moz", "ms"]; /**< Case sensitive list of vendor specific prefixes */
		
		/**
		 * @function filterStyleSheet
		 * Filter a stylesheet based on accessibility and, ID or location
		 * @param {String} filter Filter to be applied. id or href of the style element can be used as filters.
		 * @param {CSSStyleSheet} styleSheet StyleSheet to be filtered
		 * @returns {Boolean} true if styleSheet matches the filter, false otherwise
		 */
		function filterStyleSheet(filter, styleSheet) {
			try {
				if(styleSheet[_rules]) {
					filter = filter || '';
					var node = $(styleSheet.ownerNode || styleSheet.owningElement);
					return (filter === '') || (filter === '*') ||
						('#'+(node.prop('id') || '') == filter) ||
						((node.prop('href') || '') == _ahref.prop('href', filter).prop('href'));
				} else {
					return false;
				}
			} catch(e) {
				return false;
			}
		}
		
		/**
		 * @function parseSelector
		 * Splits a jQuery.stylesheet compatible selector into stylesheet filter and selector text
		 * @param {String} selector Selector text to be parsed
		 * @returns {Object} object with two properties 'styleSheet' and 'selectorText'
		 */
		function parseSelector(selector) {
			var styleSheet = (/.*?{/.exec(selector) || ['{'])[0],
				selectorText = /{.*}/g.exec(selector); //TODO: replace selector with dict object
			if(selectorText === null) {
				var parts = selector.split('{');
				selectorText = '{'+parts[parts.length==1 ? 0 : 1].split('}')[0]+'}';
			} else {
				selectorText = selectorText[0];
			}
			return {
				styleSheet: $.trim(styleSheet.substr(0, styleSheet.length-1)),
				selectorText: normalizeSelector(selectorText.substr(1, selectorText.length-2))
			};
		}
		
		/**
		 * @function normalizeSelector
		 * Normalizes selectorText to work cross-browser
		 * @param {String} selectorText selector string to normalize
		 * @returns {String} normalized selector string
		 */
		function normalizeSelector(selectorText) {
			var selector = [], last, len;
			last = _sheet[_rules].length;
			insertRule.call(_sheet, selectorText, ';'); //NOTE: IE doesn't seem to mind ';' as non-empty
			len = _sheet[_rules].length;
			for(var i=len-1; i>=last; i--) {
				selector.push(_sheet[_rules][i].selectorText);
				deleteRule.call(_sheet, i);
			}
			return selector.reverse().join(', ');
		}
		
		/**
		 * @function matchSelector
		 * Matches given selector to selectorText of cssRule
		 * @param {CSSStyleRule} cssRule to match with
		 * @param {String} selectorText selector string to compare
		 * @param {Boolean} matchGroups when true, selector is matched in grouped style rules
		 * @returns true if selectorText of cssRule matches given selector, false otherwise
		 */
		function matchSelector(cssRule, selectorText, matchGroups) {
			if($.type(cssRule.selectorText) !== 'string') {
				return false;
			}
			
			if(cssRule.selectorText === selectorText) {
				return true;
			} else if (matchGroups === true) {
				return $($.map(cssRule.selectorText.split(','), $.trim)).filter(function(i) {
					return this.toString() === selectorText;
				}).length > 0;
			} else {
				return false;
			}
		}
		
		/**
		 * @function vendorPropName
		 * Vendor prefixed style property name.
		 * Based on similar function in jQuery library.
		 * @param {String} name camelCased CSS property name
		 * @returns {String} Vendor specific tag prefixed style name
		 * if found in styles, else passed name as-is
		 * @see vendorPrefixes
		 * @see _styles
		 */
		function vendorPropName(name) {
			var titleName = name[0].toUpperCase() + name.slice(1),
				styleName, i = vendorPrefixes.length;
			while( --i ) {
				styleName = vendorPrefixes[i] + titleName;
				if(styleName in _styles) {
					return styleName;
				}
			}
			return name;
		}
		
		/**
		 * @function normalizeRule
		 * Normalizes the CSSStyleRule object to work better across browsers
		 * @param {CSSStyleRule} rule CSSStyleRule object to be normalized
		 * @param {StyleSheet} styleSheet parent stylesheet of the rule
		 * @returns {CSSStyleRule} normalized CSSStyleRule
		 */
		function normalizeRule(rule, styleSheet) {
			//NOTE: this is experimental, however, it does have it's benefits
			//      for use with $.animate(), be sure to include jquery.stylesheet-animate.js as well
			//TODO: move some of the defaults used here to user options
			rule.ownerDocument = rule.ownerDocument || document; //XXX: Hack for jQuery.isHidden()
			rule.nodeType = rule.nodeType || 1; //XXX: Hack for jQuery's defaultPrefilter()
			rule.nodeName = rule.nodeName || 'DIV'; //XXX: Hack for jQuery's acceptData()
			rule.parentNode = rule.parentNode || styleSheet.ownerNode || styleSheet.owningElement; //XXX: Hack for jQuery.contains()
			rule.parentStyleSheet = rule.parentStyleSheet || styleSheet; //XXX: Fix for IE7
			return rule;
		}
		/*
		 * Checking for 'instanceof CSSStyleRule' fails in IE7 but not in IE8, however, the call to normalizeRule() fails in both.
		 * So, we will define our custom CSSStyleRule class on all browsers where normalizeRule() fails.
		 */
		try {
			normalizeRule(_sheet[_rules][0], _sheet);
			$.support.nativeCSSStyleRule = true;
		} catch(e) {
			$.support.nativeCSSStyleRule = false;
			CSSStyleRule = function(rule) {
				$.extend(this, rule);
				this.rule = rule; //XXX: deleteRule() requires the original object
				this.currentStyle = rule.style; //XXX: Hack for jQuery's curCSS()/getStyles() for IE7
			};
		}
		
		/**
		 * @function insertRule
		 * Cross-browser function for inserting rules
		 * @param {String} selector selectorText for the rule
		 * @param {String} css CSS property-value pair string
		 * @param {Number} index Index position to insert the string;
		 * defaults to end of rules collection
		 */
		function insertRule(selector, css, index) {
			if(!selector || !css) {
				return -1; //NOTE: IE does not like addRule(selector,'',index)
			}
			var self = this,
				_insfn = self.insertRule ? function (selector, css, index) { this.insertRule(selector+'{'+css+'}', index); } : self.addRule;
			index = index || this[_rules].length;
			try {
				return _insfn.call(self, selector, css, index);
			} catch(e) {
				$.each(selector.split(','), function(i, sel) {
					_insfn.call(self, $.trim(sel), css);
				});
				return -1;
			}
		}
		
		/**
		 * @function deleteRule
		 * Cross-browser function for deleting rules
		 * @param {Number|CSSStyleRule} Index of rule to be deleted, or
		 * reference to rule to be deleted from rules collection
		 */
		function deleteRule(rule) {
			//NOTE: If we are using our custom CSSStyleRule, then CSSStyleRule.rule is the real style rule object
			rule = (rule && rule.rule) ? rule.rule : rule;
			if(!rule) {
				return;
			}
			var self = this,
				_delfn = self.deleteRule || self.removeRule;
			if(!_delfn) { //NOTE: IE7 has issues with rule.parentStyleSheet, so we need to search for the parent stylesheet
				$(document.styleSheets).each(function (i, styleSheet) {
					if($(styleSheet[_rules]).filter(function() {return this === rule;}).length == 1) {
						self = styleSheet;
						_delfn = self.deleteRule || self.removeRule;
						return false;
					}
				});
			}
			if($.type(rule) == 'number') {
				_delfn.call(self, rule);
			} else {
				$.each(self[_rules], function (i, _rule) {
					if(rule === _rule) {
						_delfn.call(self, i);
						return false;
					}
				});
			}
		}
		
		/**
		 * jQuery.stylesheet
		 * 
		 * Constructor/Factory method for initializing a jQuery.stylesheet object.
		 * Includes a short-cut to apply style changes immediately.
		 * @param {String} selector CSS rule selector text with optional stylesheet filter  
		 * @param {String|Array|Object} name Name of style property to get/set.
		 * Also accepts array of property names and object of name/value pairs.
		 * @param {String} value If defined, then value of the style property
		 * is updated with it. Unused when name is an object map.
		 * @returns {jQuery.stylesheet|String|Object} A new jQuery.stylesheet object
		 * if name/value is not passed, or value of property or object of name/value pairs
		 */
		$.stylesheet = function (selector, name, value) {
			if(!(this instanceof $.stylesheet)) {
				return new $.stylesheet(selector, name, value);
			}
			
			this.init(selector);
			return this.css(name, value);
		};
		
		$.extend($.stylesheet, {
			/**
			 * @function jQuery.stylesheet.cssRules
			 * @param {String} selector CSS rule selector text with optional stylesheet filter
			 * @returns {Array} Array of CSSStyleRule objects that match the selector text
			 * and pass the stylesheet filter
			 */
			cssRules: function (selector) {
				var rules = [],
					filters = parseSelector(selector);
				//NOTE: The stylesheet filter will be treated as case-sensitive
				//      The selectorText filter's case depends on the browser
				$(document.styleSheets).each(function (i, styleSheet) {
					if(filterStyleSheet(filters.styleSheet, styleSheet)) {
						$.merge(rules, $(styleSheet[_rules]).filter(function() {
							return matchSelector(this, filters.selectorText, filters.styleSheet === '*');
						}).map(function() {
							return normalizeRule($.support.nativeCSSStyleRule ? this : new CSSStyleRule(this), styleSheet);
						}));
					}
				});
				return rules.reverse();
			},
			
			/**
			 * @function jQuery.stylesheet.camelCase
			 * jQuery.camelCase is undocumented and could be removed at any point
			 * @param {String} str Hypenated string to be camelCased
			 * @returns {String} camelCased string
			 */
			camelCase: $.camelCase || function( str ) {
				return str.replace(/-([\da-z])/g, function(a){return a.toUpperCase().replace('-','');});
			},
			
			/**
			 * Normalized CSS property names
			 * jQuery.cssProps is undocumented and could be removed at any point
			 */
			cssProps: $.cssProps || {},
			
			/**
			 * @function jQuery.styesheet.cssStyleName
			 * @param {String} name Hypenated CSS property name
			 * @returns {String} camelCased or vendor specific name if found in host styles
			 */
			cssStyleName: function (name) {
				if(name) {
					var camelcasedName = $.camelCase(name);
					if(camelcasedName in _styles) {
						return camelcasedName;
					} else if (($.cssProps[name] || ($.cssProps[name] = vendorPropName(camelcasedName))) in _styles) {
						return $.cssProps[name];
					}
				}
			}
		});
		
		$.stylesheet.fn = $.stylesheet.prototype = {
			/**
			 * @function jQuery.stylesheet.fn.init
			 * Initializes a jQuery.stylesheet object.
			 * Selects a list of applicable CSS rules for given selector.
			 * @see jQuery.stylesheet.cssRules
			 * @param {String|Array|Object} selector CSS rule selector text(s)
			 * with optional stylesheet filter(s)
			 */
			init: function (selector) {
				var rules = []; /**< Array of CSSStyleRule objects matching the selector initialized with */
				
				switch($.type(selector)) {
				case 'string':
					rules = $.stylesheet.cssRules(selector);
					break;
				case 'array':
					$.each(selector, function (idx, val) {
						if($.type(val) === 'string') {
							$.merge(rules, $.stylesheet.cssRules(val));
						} else if(val instanceof CSSStyleRule) {
							rules.push(val);
						}
					});
					break;
				case 'object':
					if(selector instanceof CSSStyleRule) {
						rules.push(val);
					}
					break;
				}
				
				$.extend(this, {
					/**
					 * @function jQuery.stylesheet.rules
					 * @returns {Array} Copy of array of CSSStyleRule objects used
					 * by this instance of jQuery.stylesheet 
					 */
					rules: function() {
						return rules.slice();
					},
					
					/**
					 * @function jQuery.stylesheet.css()
					 * @param {String|Array|Object} name Name of style property to get/set.
					 * Also accepts array of property names and object of name/value pairs.
					 * @param {String} value If defined, then value of the style property
					 * is updated with it. Unused when name is an object map.
					 * @returns {jQuery.stylesheet|String|Object} A new jQuery.stylesheet object
					 * if name/value is not passed, or value of property or object of name/value pairs
					 */
					css: function (name, value) {
						var self = this, styles = undefined;
						
						switch($.type(name)) {
						case 'null':
							$.each(rules, function (idx, rule) {
								deleteRule.call(rule.parentStyleSheet, rule);
							});
							//NOTE: Safari seems to replace the rules collection object on insert/delete
							//      Refresh our private collection to reflect the changes
							rules = $.stylesheet.cssRules(selector);
							return self;
						case 'string':
							var stylename = $.stylesheet.cssStyleName(name);
							if(stylename) {
								if(rules.length === 0 && value !== undefined) {
									var filters = parseSelector(selector),
										sheet = $(document.styleSheets).filter(function () {
											return filterStyleSheet(filters.styleSheet, this);
										});
									sheet = (sheet && sheet.length == 1) ? sheet[0] : _sheet;
									insertRule.call(sheet, filters.selectorText, name+':'+value+';');
									//NOTE: See above note on Safari
									//      Also, IE has different behaviour for grouped selectors 
									rules = $.stylesheet.cssRules(selector);
									styles = self;
								} else {
									$.each(rules, function (i, rule) {
										if(rule.style[stylename] !== '') {
											if(value !== undefined) {
												rule.style[stylename] = value;
												styles = self;
											} else {
												styles = rule.style[stylename];
											}
											return false;
										}
									});
									if(styles === undefined && value !== undefined) {
										rules[0].style[stylename] = value;
										styles = self;
									}
								}
							}
							break;
						case 'array':
							styles = {};
							$.each(name, function (idx, key) {
								styles[key] = self.css(key, value);
							});
							if(value !== undefined) {
								styles = self;
							}
							break;
						case 'object':
							$.each(name, function (key, val) {
								self.css(key, val);
							});
							return self;
						default: /*undefined*/
							return self;
						}
						
						return styles;
					}
				});
			}
		};
	}));
	// vi:sw=2:ts=2


/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Status = __webpack_require__(15);

	var _Status2 = _interopRequireDefault(_Status);

	__webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.riot = __webpack_require__(16);

	var generate = function generate(testPatterns) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  _Status2.default.opts = opts;
	  return {
	    list: window.riot.mount('test-list', { testPatterns: testPatterns })
	  };
	};

	exports.default = generate;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var Status, riot;

	riot = __webpack_require__(16);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/* Riot v3.6.1, @license MIT */
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.riot = global.riot || {})));
	}(this, (function (exports) { 'use strict';

	var __TAGS_CACHE = [];
	var __TAG_IMPL = {};
	var GLOBAL_MIXIN = '__global_mixin';
	var ATTRS_PREFIX = 'riot-';
	var REF_DIRECTIVES = ['ref', 'data-ref'];
	var IS_DIRECTIVE = 'data-is';
	var CONDITIONAL_DIRECTIVE = 'if';
	var LOOP_DIRECTIVE = 'each';
	var LOOP_NO_REORDER_DIRECTIVE = 'no-reorder';
	var SHOW_DIRECTIVE = 'show';
	var HIDE_DIRECTIVE = 'hide';
	var RIOT_EVENTS_KEY = '__riot-events__';
	var T_STRING = 'string';
	var T_OBJECT = 'object';
	var T_UNDEF  = 'undefined';
	var T_FUNCTION = 'function';
	var XLINK_NS = 'http://www.w3.org/1999/xlink';
	var SVG_NS = 'http://www.w3.org/2000/svg';
	var XLINK_REGEX = /^xlink:(\w+)/;
	var WIN = typeof window === T_UNDEF ? undefined : window;
	var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
	var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
	var RE_EVENTS_PREFIX = /^on/;
	var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
	var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
	var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
	var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
	var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;

	/**
	 * Check Check if the passed argument is undefined
	 * @param   { String } value -
	 * @returns { Boolean } -
	 */
	function isBoolAttr(value) {
	  return RE_BOOL_ATTRS.test(value)
	}

	/**
	 * Check if passed argument is a function
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isFunction(value) {
	  return typeof value === T_FUNCTION
	}

	/**
	 * Check if passed argument is an object, exclude null
	 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isObject(value) {
	  return value && typeof value === T_OBJECT // typeof null is 'object'
	}

	/**
	 * Check if passed argument is undefined
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isUndefined(value) {
	  return typeof value === T_UNDEF
	}

	/**
	 * Check if passed argument is a string
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isString(value) {
	  return typeof value === T_STRING
	}

	/**
	 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
	 * @param { * } value -
	 * @returns { Boolean } -
	 */
	function isBlank(value) {
	  return isUndefined(value) || value === null || value === ''
	}

	/**
	 * Check if passed argument is a kind of array
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isArray(value) {
	  return Array.isArray(value) || value instanceof Array
	}

	/**
	 * Check whether object's property could be overridden
	 * @param   { Object }  obj - source object
	 * @param   { String }  key - object property
	 * @returns { Boolean } -
	 */
	function isWritable(obj, key) {
	  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
	  return isUndefined(obj[key]) || descriptor && descriptor.writable
	}

	/**
	 * Check if passed argument is a reserved name
	 * @param   { String } value -
	 * @returns { Boolean } -
	 */
	function isReservedName(value) {
	  return RE_RESERVED_NAMES.test(value)
	}

	var check = Object.freeze({
		isBoolAttr: isBoolAttr,
		isFunction: isFunction,
		isObject: isObject,
		isUndefined: isUndefined,
		isString: isString,
		isBlank: isBlank,
		isArray: isArray,
		isWritable: isWritable,
		isReservedName: isReservedName
	});

	/**
	 * Shorter and fast way to select multiple nodes in the DOM
	 * @param   { String } selector - DOM selector
	 * @param   { Object } ctx - DOM node where the targets of our search will is located
	 * @returns { Object } dom nodes found
	 */
	function $$(selector, ctx) {
	  return Array.prototype.slice.call((ctx || document).querySelectorAll(selector))
	}

	/**
	 * Shorter and fast way to select a single node in the DOM
	 * @param   { String } selector - unique dom selector
	 * @param   { Object } ctx - DOM node where the target of our search will is located
	 * @returns { Object } dom node found
	 */
	function $(selector, ctx) {
	  return (ctx || document).querySelector(selector)
	}

	/**
	 * Create a document fragment
	 * @returns { Object } document fragment
	 */
	function createFrag() {
	  return document.createDocumentFragment()
	}

	/**
	 * Create a document text node
	 * @returns { Object } create a text node to use as placeholder
	 */
	function createDOMPlaceholder() {
	  return document.createTextNode('')
	}

	/**
	 * Check if a DOM node is an svg tag
	 * @param   { HTMLElement }  el - node we want to test
	 * @returns {Boolean} true if it's an svg node
	 */
	function isSvg(el) {
	  return !!el.ownerSVGElement
	}

	/**
	 * Create a generic DOM node
	 * @param   { String } name - name of the DOM node we want to create
	 * @param   { Boolean } isSvg - true if we need to use an svg node
	 * @returns { Object } DOM node just created
	 */
	function mkEl(name) {
	  return name === 'svg' ? document.createElementNS(SVG_NS, name) : document.createElement(name)
	}

	/**
	 * Set the inner html of any DOM node SVGs included
	 * @param { Object } container - DOM node where we'll inject new html
	 * @param { String } html - html to inject
	 */
	/* istanbul ignore next */
	function setInnerHTML(container, html) {
	  if (!isUndefined(container.innerHTML))
	    { container.innerHTML = html; }
	    // some browsers do not support innerHTML on the SVGs tags
	  else {
	    var doc = new DOMParser().parseFromString(html, 'application/xml');
	    var node = container.ownerDocument.importNode(doc.documentElement, true);
	    container.appendChild(node);
	  }
	}

	/**
	 * Toggle the visibility of any DOM node
	 * @param   { Object }  dom - DOM node we want to hide
	 * @param   { Boolean } show - do we want to show it?
	 */

	function toggleVisibility(dom, show) {
	  dom.style.display = show ? '' : 'none';
	  dom['hidden'] = show ? false : true;
	}

	/**
	 * Remove any DOM attribute from a node
	 * @param   { Object } dom - DOM node we want to update
	 * @param   { String } name - name of the property we want to remove
	 */
	function remAttr(dom, name) {
	  dom.removeAttribute(name);
	}

	/**
	 * Convert a style object to a string
	 * @param   { Object } style - style object we need to parse
	 * @returns { String } resulting css string
	 * @example
	 * styleObjectToString({ color: 'red', height: '10px'}) // => 'color: red; height: 10px'
	 */
	function styleObjectToString(style) {
	  return Object.keys(style).reduce(function (acc, prop) {
	    return (acc + " " + prop + ": " + (style[prop]) + ";")
	  }, '')
	}

	/**
	 * Get the value of any DOM attribute on a node
	 * @param   { Object } dom - DOM node we want to parse
	 * @param   { String } name - name of the attribute we want to get
	 * @returns { String | undefined } name of the node attribute whether it exists
	 */
	function getAttr(dom, name) {
	  return dom.getAttribute(name)
	}

	/**
	 * Set any DOM attribute
	 * @param { Object } dom - DOM node we want to update
	 * @param { String } name - name of the property we want to set
	 * @param { String } val - value of the property we want to set
	 */
	function setAttr(dom, name, val) {
	  var xlink = XLINK_REGEX.exec(name);
	  if (xlink && xlink[1])
	    { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
	  else
	    { dom.setAttribute(name, val); }
	}

	/**
	 * Insert safely a tag to fix #1962 #1649
	 * @param   { HTMLElement } root - children container
	 * @param   { HTMLElement } curr - node to insert
	 * @param   { HTMLElement } next - node that should preceed the current node inserted
	 */
	function safeInsert(root, curr, next) {
	  root.insertBefore(curr, next.parentNode && next);
	}

	/**
	 * Minimize risk: only zero or one _space_ between attr & value
	 * @param   { String }   html - html string we want to parse
	 * @param   { Function } fn - callback function to apply on any attribute found
	 */
	function walkAttrs(html, fn) {
	  if (!html)
	    { return }
	  var m;
	  while (m = RE_HTML_ATTRS.exec(html))
	    { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
	}

	/**
	 * Walk down recursively all the children tags starting dom node
	 * @param   { Object }   dom - starting node where we will start the recursion
	 * @param   { Function } fn - callback to transform the child node just found
	 * @param   { Object }   context - fn can optionally return an object, which is passed to children
	 */
	function walkNodes(dom, fn, context) {
	  if (dom) {
	    var res = fn(dom, context);
	    var next;
	    // stop the recursion
	    if (res === false) { return }

	    dom = dom.firstChild;

	    while (dom) {
	      next = dom.nextSibling;
	      walkNodes(dom, fn, res);
	      dom = next;
	    }
	  }
	}

	var dom = Object.freeze({
		$$: $$,
		$: $,
		createFrag: createFrag,
		createDOMPlaceholder: createDOMPlaceholder,
		isSvg: isSvg,
		mkEl: mkEl,
		setInnerHTML: setInnerHTML,
		toggleVisibility: toggleVisibility,
		remAttr: remAttr,
		styleObjectToString: styleObjectToString,
		getAttr: getAttr,
		setAttr: setAttr,
		safeInsert: safeInsert,
		walkAttrs: walkAttrs,
		walkNodes: walkNodes
	});

	var styleNode;
	var cssTextProp;
	var byName = {};
	var remainder = [];
	var needsInject = false;

	// skip the following code on the server
	if (WIN) {
	  styleNode = (function () {
	    // create a new style element with the correct type
	    var newNode = mkEl('style');
	    setAttr(newNode, 'type', 'text/css');

	    // replace any user node or insert the new one into the head
	    var userNode = $('style[type=riot]');
	    /* istanbul ignore next */
	    if (userNode) {
	      if (userNode.id) { newNode.id = userNode.id; }
	      userNode.parentNode.replaceChild(newNode, userNode);
	    }
	    else { document.getElementsByTagName('head')[0].appendChild(newNode); }

	    return newNode
	  })();
	  cssTextProp = styleNode.styleSheet;
	}

	/**
	 * Object that will be used to inject and manage the css of every tag instance
	 */
	var styleManager = {
	  styleNode: styleNode,
	  /**
	   * Save a tag style to be later injected into DOM
	   * @param { String } css - css string
	   * @param { String } name - if it's passed we will map the css to a tagname
	   */
	  add: function add(css, name) {
	    if (name) { byName[name] = css; }
	    else { remainder.push(css); }
	    needsInject = true;
	  },
	  /**
	   * Inject all previously saved tag styles into DOM
	   * innerHTML seems slow: http://jsperf.com/riot-insert-style
	   */
	  inject: function inject() {
	    if (!WIN || !needsInject) { return }
	    needsInject = false;
	    var style = Object.keys(byName)
	      .map(function(k) { return byName[k] })
	      .concat(remainder).join('\n');
	    /* istanbul ignore next */
	    if (cssTextProp) { cssTextProp.cssText = style; }
	    else { styleNode.innerHTML = style; }
	  }
	};

	/**
	 * The riot template engine
	 * @version v3.0.8
	 */

	var skipRegex = (function () { //eslint-disable-line no-unused-vars

	  var beforeReChars = '[{(,;:?=|&!^~>%*/';

	  var beforeReWords = [
	    'case',
	    'default',
	    'do',
	    'else',
	    'in',
	    'instanceof',
	    'prefix',
	    'return',
	    'typeof',
	    'void',
	    'yield'
	  ];

	  var wordsLastChar = beforeReWords.reduce(function (s, w) {
	    return s + w.slice(-1)
	  }, '');

	  var RE_REGEX = /^\/(?=[^*>/])[^[/\\]*(?:(?:\\.|\[(?:\\.|[^\]\\]*)*\])[^[\\/]*)*?\/[gimuy]*/;
	  var RE_VN_CHAR = /[$\w]/;

	  function prev (code, pos) {
	    while (--pos >= 0 && /\s/.test(code[pos])){  }
	    return pos
	  }

	  function _skipRegex (code, start) {

	    var re = /.*/g;
	    var pos = re.lastIndex = start++;
	    var match = re.exec(code)[0].match(RE_REGEX);

	    if (match) {
	      var next = pos + match[0].length;

	      pos = prev(code, pos);
	      var c = code[pos];

	      if (pos < 0 || ~beforeReChars.indexOf(c)) {
	        return next
	      }

	      if (c === '.') {

	        if (code[pos - 1] === '.') {
	          start = next;
	        }

	      } else if (c === '+' || c === '-') {

	        if (code[--pos] !== c ||
	            (pos = prev(code, pos)) < 0 ||
	            !RE_VN_CHAR.test(code[pos])) {
	          start = next;
	        }

	      } else if (~wordsLastChar.indexOf(c)) {

	        var end = pos + 1;

	        while (--pos >= 0 && RE_VN_CHAR.test(code[pos])){  }
	        if (~beforeReWords.indexOf(code.slice(pos + 1, end))) {
	          start = next;
	        }
	      }
	    }

	    return start
	  }

	  return _skipRegex

	})();

	/**
	 * riot.util.brackets
	 *
	 * - `brackets    ` - Returns a string or regex based on its parameter
	 * - `brackets.set` - Change the current riot brackets
	 *
	 * @module
	 */

	/* global riot */

	/* istanbul ignore next */
	var brackets = (function (UNDEF) {

	  var
	    REGLOB = 'g',

	    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

	    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,

	    S_QBLOCKS = R_STRINGS.source + '|' +
	      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
	      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?([^<]\/)[gim]*/.source,

	    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

	    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

	    S_QBLOCK2 = R_STRINGS.source + '|' + /(\/)(?![*\/])/.source,

	    FINDBRACES = {
	      '(': RegExp('([()])|'   + S_QBLOCK2, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCK2, REGLOB),
	      '{': RegExp('([{}])|'   + S_QBLOCK2, REGLOB)
	    },

	    DEFAULT = '{ }';

	  var _pairs = [
	    '{', '}',
	    '{', '}',
	    /{[^}]*}/,
	    /\\([{}])/g,
	    /\\({)|{/g,
	    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCK2, REGLOB),
	    DEFAULT,
	    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
	    /(^|[^\\]){=[\S\s]*?}/
	  ];

	  var
	    cachedBrackets = UNDEF,
	    _regex,
	    _cache = [],
	    _settings;

	  function _loopback (re) { return re }

	  function _rewrite (re, bp) {
	    if (!bp) { bp = _cache; }
	    return new RegExp(
	      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
	    )
	  }

	  function _create (pair) {
	    if (pair === DEFAULT) { return _pairs }

	    var arr = pair.split(' ');

	    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
	      throw new Error('Unsupported brackets "' + pair + '"')
	    }
	    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

	    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
	    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
	    arr[6] = _rewrite(_pairs[6], arr);
	    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCK2, REGLOB);
	    arr[8] = pair;
	    return arr
	  }

	  function _brackets (reOrIdx) {
	    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
	  }

	  _brackets.split = function split (str, tmpl, _bp) {
	    // istanbul ignore next: _bp is for the compiler
	    if (!_bp) { _bp = _cache; }

	    var
	      parts = [],
	      match,
	      isexpr,
	      start,
	      pos,
	      re = _bp[6];

	    var qblocks = [];
	    var prevStr = '';
	    var mark, lastIndex;

	    isexpr = start = re.lastIndex = 0;

	    while ((match = re.exec(str))) {

	      lastIndex = re.lastIndex;
	      pos = match.index;

	      if (isexpr) {

	        if (match[2]) {

	          var ch = match[2];
	          var rech = FINDBRACES[ch];
	          var ix = 1;

	          rech.lastIndex = lastIndex;
	          while ((match = rech.exec(str))) {
	            if (match[1]) {
	              if (match[1] === ch) { ++ix; }
	              else if (!--ix) { break }
	            } else {
	              rech.lastIndex = pushQBlock(match.index, rech.lastIndex, match[2]);
	            }
	          }
	          re.lastIndex = ix ? str.length : rech.lastIndex;
	          continue
	        }

	        if (!match[3]) {
	          re.lastIndex = pushQBlock(pos, lastIndex, match[4]);
	          continue
	        }
	      }

	      if (!match[1]) {
	        unescapeStr(str.slice(start, pos));
	        start = re.lastIndex;
	        re = _bp[6 + (isexpr ^= 1)];
	        re.lastIndex = start;
	      }
	    }

	    if (str && start < str.length) {
	      unescapeStr(str.slice(start));
	    }

	    parts.qblocks = qblocks;

	    return parts

	    function unescapeStr (s) {
	      if (prevStr) {
	        s = prevStr + s;
	        prevStr = '';
	      }
	      if (tmpl || isexpr) {
	        parts.push(s && s.replace(_bp[5], '$1'));
	      } else {
	        parts.push(s);
	      }
	    }

	    function pushQBlock(_pos, _lastIndex, slash) { //eslint-disable-line
	      if (slash) {
	        _lastIndex = skipRegex(str, _pos);
	      }

	      if (tmpl && _lastIndex > _pos + 2) {
	        mark = '\u2057' + qblocks.length + '~';
	        qblocks.push(str.slice(_pos, _lastIndex));
	        prevStr += str.slice(start, _pos) + mark;
	        start = _lastIndex;
	      }
	      return _lastIndex
	    }
	  };

	  _brackets.hasExpr = function hasExpr (str) {
	    return _cache[4].test(str)
	  };

	  _brackets.loopKeys = function loopKeys (expr) {
	    var m = expr.match(_cache[9]);

	    return m
	      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
	      : { val: expr.trim() }
	  };

	  _brackets.array = function array (pair) {
	    return pair ? _create(pair) : _cache
	  };

	  function _reset (pair) {
	    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
	      _cache = _create(pair);
	      _regex = pair === DEFAULT ? _loopback : _rewrite;
	      _cache[9] = _regex(_pairs[9]);
	    }
	    cachedBrackets = pair;
	  }

	  function _setSettings (o) {
	    var b;

	    o = o || {};
	    b = o.brackets;
	    Object.defineProperty(o, 'brackets', {
	      set: _reset,
	      get: function () { return cachedBrackets },
	      enumerable: true
	    });
	    _settings = o;
	    _reset(b);
	  }

	  Object.defineProperty(_brackets, 'settings', {
	    set: _setSettings,
	    get: function () { return _settings }
	  });

	  /* istanbul ignore next: in the browser riot is always in the scope */
	  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
	  _brackets.set = _reset;
	  _brackets.skipRegex = skipRegex;

	  _brackets.R_STRINGS = R_STRINGS;
	  _brackets.R_MLCOMMS = R_MLCOMMS;
	  _brackets.S_QBLOCKS = S_QBLOCKS;
	  _brackets.S_QBLOCK2 = S_QBLOCK2;

	  return _brackets

	})();

	/**
	 * @module tmpl
	 *
	 * tmpl          - Root function, returns the template value, render with data
	 * tmpl.hasExpr  - Test the existence of a expression inside a string
	 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	 */

	/* istanbul ignore next */
	var tmpl = (function () {

	  var _cache = {};

	  function _tmpl (str, data) {
	    if (!str) { return str }

	    return (_cache[str] || (_cache[str] = _create(str))).call(
	      data, _logErr.bind({
	        data: data,
	        tmpl: str
	      })
	    )
	  }

	  _tmpl.hasExpr = brackets.hasExpr;

	  _tmpl.loopKeys = brackets.loopKeys;

	  // istanbul ignore next
	  _tmpl.clearCache = function () { _cache = {}; };

	  _tmpl.errorHandler = null;

	  function _logErr (err, ctx) {

	    err.riotData = {
	      tagName: ctx && ctx.__ && ctx.__.tagName,
	      _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
	    };

	    if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }
	    else if (
	      typeof console !== 'undefined' &&
	      typeof console.error === 'function'
	    ) {
	      console.error(err.message);
	      console.log('<%s> %s', err.riotData.tagName || 'Unknown tag', this.tmpl); // eslint-disable-line
	      console.log(this.data); // eslint-disable-line
	    }
	  }

	  function _create (str) {
	    var expr = _getTmpl(str);

	    if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }

	    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
	  }

	  var RE_DQUOTE = /\u2057/g;
	  var RE_QBMARK = /\u2057(\d+)~/g;

	  function _getTmpl (str) {
	    var parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
	    var qstr = parts.qblocks;
	    var expr;

	    if (parts.length > 2 || parts[0]) {
	      var i, j, list = [];

	      for (i = j = 0; i < parts.length; ++i) {

	        expr = parts[i];

	        if (expr && (expr = i & 1

	            ? _parseExpr(expr, 1, qstr)

	            : '"' + expr
	                .replace(/\\/g, '\\\\')
	                .replace(/\r\n?|\n/g, '\\n')
	                .replace(/"/g, '\\"') +
	              '"'

	          )) { list[j++] = expr; }

	      }

	      expr = j < 2 ? list[0]
	           : '[' + list.join(',') + '].join("")';

	    } else {

	      expr = _parseExpr(parts[1], 0, qstr);
	    }

	    if (qstr.length) {
	      expr = expr.replace(RE_QBMARK, function (_, pos) {
	        return qstr[pos]
	          .replace(/\r/g, '\\r')
	          .replace(/\n/g, '\\n')
	      });
	    }
	    return expr
	  }

	  var RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/;
	  var
	    RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    };

	  function _parseExpr (expr, asText, qstr) {

	    expr = expr
	      .replace(/\s+/g, ' ').trim()
	      .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

	    if (expr) {
	      var
	        list = [],
	        cnt = 0,
	        match;

	      while (expr &&
	            (match = expr.match(RE_CSNAME)) &&
	            !match.index
	        ) {
	        var
	          key,
	          jsb,
	          re = /,|([[{(])|$/g;

	        expr = RegExp.rightContext;
	        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

	        while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }

	        jsb  = expr.slice(0, match.index);
	        expr = RegExp.rightContext;

	        list[cnt++] = _wrapExpr(jsb, 1, key);
	      }

	      expr = !cnt ? _wrapExpr(expr, asText)
	           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
	    }
	    return expr

	    function skipBraces (ch, re) {
	      var
	        mm,
	        lv = 1,
	        ir = RE_BREND[ch];

	      ir.lastIndex = re.lastIndex;
	      while (mm = ir.exec(expr)) {
	        if (mm[0] === ch) { ++lv; }
	        else if (!--lv) { break }
	      }
	      re.lastIndex = lv ? expr.length : ir.lastIndex;
	    }
	  }

	  // istanbul ignore next: not both
	  var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
	    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

	  function _wrapExpr (expr, asText, key) {
	    var tb;

	    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	      if (mvar) {
	        pos = tb ? 0 : pos + match.length;

	        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	          match = p + '("' + mvar + JS_CONTEXT + mvar;
	          if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
	        } else if (pos) {
	          tb = !JS_NOPROPS.test(s.slice(pos));
	        }
	      }
	      return match
	    });

	    if (tb) {
	      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
	    }

	    if (key) {

	      expr = (tb
	          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
	        ) + '?"' + key + '":""';

	    } else if (asText) {

	      expr = 'function(v){' + (tb
	          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
	        ) + ';return v||v===0?v:""}.call(this)';
	    }

	    return expr
	  }

	  _tmpl.version = brackets.version = 'v3.0.8';

	  return _tmpl

	})();

	/* istanbul ignore next */
	var observable$1 = function(el) {

	  /**
	   * Extend the original object or create a new empty one
	   * @type { Object }
	   */

	  el = el || {};

	  /**
	   * Private variables
	   */
	  var callbacks = {},
	    slice = Array.prototype.slice;

	  /**
	   * Public Api
	   */

	  // extend the el object adding the observable methods
	  Object.defineProperties(el, {
	    /**
	     * Listen to the given `event` ands
	     * execute the `callback` each time an event is triggered.
	     * @param  { String } event - event id
	     * @param  { Function } fn - callback function
	     * @returns { Object } el
	     */
	    on: {
	      value: function(event, fn) {
	        if (typeof fn == 'function')
	          { (callbacks[event] = callbacks[event] || []).push(fn); }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Removes the given `event` listeners
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    off: {
	      value: function(event, fn) {
	        if (event == '*' && !fn) { callbacks = {}; }
	        else {
	          if (fn) {
	            var arr = callbacks[event];
	            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	              if (cb == fn) { arr.splice(i--, 1); }
	            }
	          } else { delete callbacks[event]; }
	        }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Listen to the given `event` and
	     * execute the `callback` at most once
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    one: {
	      value: function(event, fn) {
	        function on() {
	          el.off(event, on);
	          fn.apply(el, arguments);
	        }
	        return el.on(event, on)
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Execute all callback functions that listen to
	     * the given `event`
	     * @param   { String } event - event id
	     * @returns { Object } el
	     */
	    trigger: {
	      value: function(event) {
	        var arguments$1 = arguments;


	        // getting the arguments
	        var arglen = arguments.length - 1,
	          args = new Array(arglen),
	          fns,
	          fn,
	          i;

	        for (i = 0; i < arglen; i++) {
	          args[i] = arguments$1[i + 1]; // skip first argument
	        }

	        fns = slice.call(callbacks[event] || [], 0);

	        for (i = 0; fn = fns[i]; ++i) {
	          fn.apply(el, args);
	        }

	        if (callbacks['*'] && event != '*')
	          { el.trigger.apply(el, ['*', event].concat(args)); }

	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    }
	  });

	  return el

	};

	/**
	 * Specialized function for looping an array-like collection with `each={}`
	 * @param   { Array } list - collection of items
	 * @param   {Function} fn - callback function
	 * @returns { Array } the array looped
	 */
	function each(list, fn) {
	  var len = list ? list.length : 0;
	  var i = 0;
	  for (; i < len; ++i) {
	    fn(list[i], i);
	  }
	  return list
	}

	/**
	 * Check whether an array contains an item
	 * @param   { Array } array - target array
	 * @param   { * } item - item to test
	 * @returns { Boolean } -
	 */
	function contains(array, item) {
	  return array.indexOf(item) !== -1
	}

	/**
	 * Convert a string containing dashes to camel case
	 * @param   { String } str - input string
	 * @returns { String } my-string -> myString
	 */
	function toCamel(str) {
	  return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
	}

	/**
	 * Faster String startsWith alternative
	 * @param   { String } str - source string
	 * @param   { String } value - test string
	 * @returns { Boolean } -
	 */
	function startsWith(str, value) {
	  return str.slice(0, value.length) === value
	}

	/**
	 * Helper function to set an immutable property
	 * @param   { Object } el - object where the new property will be set
	 * @param   { String } key - object key where the new property will be stored
	 * @param   { * } value - value of the new property
	 * @param   { Object } options - set the propery overriding the default options
	 * @returns { Object } - the initial object
	 */
	function defineProperty(el, key, value, options) {
	  Object.defineProperty(el, key, extend({
	    value: value,
	    enumerable: false,
	    writable: false,
	    configurable: true
	  }, options));
	  return el
	}

	/**
	 * Extend any object with other properties
	 * @param   { Object } src - source object
	 * @returns { Object } the resulting extended object
	 *
	 * var obj = { foo: 'baz' }
	 * extend(obj, {bar: 'bar', foo: 'bar'})
	 * console.log(obj) => {bar: 'bar', foo: 'bar'}
	 *
	 */
	function extend(src) {
	  var obj, args = arguments;
	  for (var i = 1; i < args.length; ++i) {
	    if (obj = args[i]) {
	      for (var key in obj) {
	        // check if this property of the source object could be overridden
	        if (isWritable(src, key))
	          { src[key] = obj[key]; }
	      }
	    }
	  }
	  return src
	}

	var misc = Object.freeze({
		each: each,
		contains: contains,
		toCamel: toCamel,
		startsWith: startsWith,
		defineProperty: defineProperty,
		extend: extend
	});

	var settings$1 = extend(Object.create(brackets.settings), {
	  skipAnonymousTags: true,
	  // handle the auto updates on any DOM event
	  autoUpdate: true
	});

	/**
	 * Trigger DOM events
	 * @param   { HTMLElement } dom - dom element target of the event
	 * @param   { Function } handler - user function
	 * @param   { Object } e - event object
	 */
	function handleEvent(dom, handler, e) {
	  var ptag = this.__.parent,
	    item = this.__.item;

	  if (!item)
	    { while (ptag && !item) {
	      item = ptag.__.item;
	      ptag = ptag.__.parent;
	    } }

	  // override the event properties
	  /* istanbul ignore next */
	  if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
	  /* istanbul ignore next */
	  if (isWritable(e, 'target')) { e.target = e.srcElement; }
	  /* istanbul ignore next */
	  if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }

	  e.item = item;

	  handler.call(this, e);

	  // avoid auto updates
	  if (!settings$1.autoUpdate) { return }

	  if (!e.preventUpdate) {
	    var p = getImmediateCustomParentTag(this);
	    // fixes #2083
	    if (p.isMounted) { p.update(); }
	  }
	}

	/**
	 * Attach an event to a DOM node
	 * @param { String } name - event name
	 * @param { Function } handler - event callback
	 * @param { Object } dom - dom node
	 * @param { Tag } tag - tag instance
	 */
	function setEventHandler(name, handler, dom, tag) {
	  var eventName,
	    cb = handleEvent.bind(tag, dom, handler);

	  // avoid to bind twice the same event
	  // possible fix for #2332
	  dom[name] = null;

	  // normalize event name
	  eventName = name.replace(RE_EVENTS_PREFIX, '');

	  // cache the listener into the listeners array
	  if (!contains(tag.__.listeners, dom)) { tag.__.listeners.push(dom); }
	  if (!dom[RIOT_EVENTS_KEY]) { dom[RIOT_EVENTS_KEY] = {}; }
	  if (dom[RIOT_EVENTS_KEY][name]) { dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][name]); }

	  dom[RIOT_EVENTS_KEY][name] = cb;
	  dom.addEventListener(eventName, cb, false);
	}

	/**
	 * Update dynamically created data-is tags with changing expressions
	 * @param { Object } expr - expression tag and expression info
	 * @param { Tag }    parent - parent for tag creation
	 * @param { String } tagName - tag implementation we want to use
	 */
	function updateDataIs(expr, parent, tagName) {
	  var conf, isVirtual, head, ref;

	  if (expr.tag && expr.tagName === tagName) {
	    expr.tag.update();
	    return
	  }

	  isVirtual = expr.dom.tagName === 'VIRTUAL';
	  // sync _parent to accommodate changing tagnames
	  if (expr.tag) {
	    // need placeholder before unmount
	    if(isVirtual) {
	      head = expr.tag.__.head;
	      ref = createDOMPlaceholder();
	      head.parentNode.insertBefore(ref, head);
	    }

	    expr.tag.unmount(true);
	  }

	  if (!isString(tagName)) { return }

	  expr.impl = __TAG_IMPL[tagName];
	  conf = {root: expr.dom, parent: parent, hasImpl: true, tagName: tagName};
	  expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
	  each(expr.attrs, function (a) { return setAttr(expr.tag.root, a.name, a.value); });
	  expr.tagName = tagName;
	  expr.tag.mount();
	  if (isVirtual)
	    { makeReplaceVirtual(expr.tag, ref || expr.tag.root); } // root exist first time, after use placeholder

	  // parent is the placeholder tag, not the dynamic tag so clean up
	  parent.__.onUnmount = function() {
	    var delName = expr.tag.opts.dataIs,
	      tags = expr.tag.parent.tags,
	      _tags = expr.tag.__.parent.tags;
	    arrayishRemove(tags, delName, expr.tag);
	    arrayishRemove(_tags, delName, expr.tag);
	    expr.tag.unmount();
	  };
	}

	/**
	 * Nomalize any attribute removing the "riot-" prefix
	 * @param   { String } attrName - original attribute name
	 * @returns { String } valid html attribute name
	 */
	function normalizeAttrName(attrName) {
	  if (!attrName) { return null }
	  attrName = attrName.replace(ATTRS_PREFIX, '');
	  if (CASE_SENSITIVE_ATTRIBUTES[attrName]) { attrName = CASE_SENSITIVE_ATTRIBUTES[attrName]; }
	  return attrName
	}

	/**
	 * Update on single tag expression
	 * @this Tag
	 * @param { Object } expr - expression logic
	 * @returns { undefined }
	 */
	function updateExpression(expr) {
	  if (this.root && getAttr(this.root,'virtualized')) { return }

	  var dom = expr.dom,
	    // remove the riot- prefix
	    attrName = normalizeAttrName(expr.attr),
	    isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName),
	    isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
	    parent = dom && (expr.parent || dom.parentNode),
	    // detect the style attributes
	    isStyleAttr = attrName === 'style',
	    isClassAttr = attrName === 'class',
	    hasValue,
	    isObj,
	    value;

	  // if it's a tag we could totally skip the rest
	  if (expr._riot_id) {
	    if (expr.isMounted) {
	      expr.update();
	    // if it hasn't been mounted yet, do that now.
	    } else {
	      expr.mount();
	      if (isVirtual) {
	        makeReplaceVirtual(expr, expr.root);
	      }
	    }
	    return
	  }
	  // if this expression has the update method it means it can handle the DOM changes by itself
	  if (expr.update) { return expr.update() }

	  // ...it seems to be a simple expression so we try to calculat its value
	  value = tmpl(expr.expr, isToggle ? extend({}, Object.create(this.parent), this) : this);
	  hasValue = !isBlank(value);
	  isObj = isObject(value);

	  // convert the style/class objects to strings
	  if (isObj) {
	    isObj = !isClassAttr && !isStyleAttr;
	    if (isClassAttr) {
	      value = tmpl(JSON.stringify(value), this);
	    } else if (isStyleAttr) {
	      value = styleObjectToString(value);
	    }
	  }

	  // remove original attribute
	  if (expr.attr && (!expr.isAttrRemoved || !hasValue || value === false)) {
	    remAttr(dom, expr.attr);
	    expr.isAttrRemoved = true;
	  }

	  // for the boolean attributes we don't need the value
	  // we can convert it to checked=true to checked=checked
	  if (expr.bool) { value = value ? attrName : false; }
	  if (expr.isRtag) { return updateDataIs(expr, this, value) }
	  if (expr.wasParsedOnce && expr.value === value) { return }

	  // update the expression value
	  expr.value = value;
	  expr.wasParsedOnce = true;

	  // if the value is an object we can not do much more with it
	  if (isObj && !isToggle) { return }
	  // avoid to render undefined/null values
	  if (isBlank(value)) { value = ''; }

	  // textarea and text nodes have no attribute name
	  if (!attrName) {
	    // about #815 w/o replace: the browser converts the value to a string,
	    // the comparison by "==" does too, but not in the server
	    value += '';
	    // test for parent avoids error with invalid assignment to nodeValue
	    if (parent) {
	      // cache the parent node because somehow it will become null on IE
	      // on the next iteration
	      expr.parent = parent;
	      if (parent.tagName === 'TEXTAREA') {
	        parent.value = value;                    // #1113
	        if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
	      }                                         // will be available on 'updated'
	      else { dom.nodeValue = value; }
	    }
	    return
	  }


	  // event handler
	  if (isFunction(value)) {
	    setEventHandler(attrName, value, dom, this);
	  // show / hide
	  } else if (isToggle) {
	    toggleVisibility(dom, attrName === HIDE_DIRECTIVE ? !value : value);
	  // handle attributes
	  } else {
	    if (expr.bool) {
	      dom[attrName] = value;
	    }

	    if (attrName === 'value' && dom.value !== value) {
	      dom.value = value;
	    }

	    if (hasValue && value !== false) {
	      setAttr(dom, attrName, value);
	    }

	    // make sure that in case of style changes
	    // the element stays hidden
	    if (isStyleAttr && dom.hidden) { toggleVisibility(dom, false); }
	  }
	}

	/**
	 * Update all the expressions in a Tag instance
	 * @this Tag
	 * @param { Array } expressions - expression that must be re evaluated
	 */
	function updateAllExpressions(expressions) {
	  each(expressions, updateExpression.bind(this));
	}

	var IfExpr = {
	  init: function init(dom, tag, expr) {
	    remAttr(dom, CONDITIONAL_DIRECTIVE);
	    this.tag = tag;
	    this.expr = expr;
	    this.stub = createDOMPlaceholder();
	    this.pristine = dom;

	    var p = dom.parentNode;
	    p.insertBefore(this.stub, dom);
	    p.removeChild(dom);

	    return this
	  },
	  update: function update() {
	    this.value = tmpl(this.expr, this.tag);

	    if (this.value && !this.current) { // insert
	      this.current = this.pristine.cloneNode(true);
	      this.stub.parentNode.insertBefore(this.current, this.stub);
	      this.expressions = [];
	      parseExpressions.apply(this.tag, [this.current, this.expressions, true]);
	    } else if (!this.value && this.current) { // remove
	      unmountAll(this.expressions);
	      if (this.current._tag) {
	        this.current._tag.unmount();
	      } else if (this.current.parentNode) {
	        this.current.parentNode.removeChild(this.current);
	      }
	      this.current = null;
	      this.expressions = [];
	    }

	    if (this.value) { updateAllExpressions.call(this.tag, this.expressions); }
	  },
	  unmount: function unmount() {
	    unmountAll(this.expressions || []);
	  }
	};

	var RefExpr = {
	  init: function init(dom, parent, attrName, attrValue) {
	    this.dom = dom;
	    this.attr = attrName;
	    this.rawValue = attrValue;
	    this.parent = parent;
	    this.hasExp = tmpl.hasExpr(attrValue);
	    return this
	  },
	  update: function update() {
	    var old = this.value;
	    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
	    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
	    var tagOrDom = this.dom.__ref || this.tag || this.dom;

	    this.value = this.hasExp ? tmpl(this.rawValue, this.parent) : this.rawValue;

	    // the name changed, so we need to remove it from the old key (if present)
	    if (!isBlank(old) && customParent) { arrayishRemove(customParent.refs, old, tagOrDom); }
	    if (!isBlank(this.value) && isString(this.value)) {
	      // add it to the refs of parent tag (this behavior was changed >=3.0)
	      if (customParent) { arrayishAdd(
	        customParent.refs,
	        this.value,
	        tagOrDom,
	        // use an array if it's a looped node and the ref is not an expression
	        null,
	        this.parent.__.index
	      ); }

	      if (this.value !== old) {
	        setAttr(this.dom, this.attr, this.value);
	      }
	    } else {
	      remAttr(this.dom, this.attr);
	    }

	    // cache the ref bound to this dom node
	    // to reuse it in future (see also #2329)
	    if (!this.dom.__ref) { this.dom.__ref = tagOrDom; }
	  },
	  unmount: function unmount() {
	    var tagOrDom = this.tag || this.dom;
	    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
	    if (!isBlank(this.value) && customParent)
	      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
	  }
	};

	/**
	 * Convert the item looped into an object used to extend the child tag properties
	 * @param   { Object } expr - object containing the keys used to extend the children tags
	 * @param   { * } key - value to assign to the new object returned
	 * @param   { * } val - value containing the position of the item in the array
	 * @param   { Object } base - prototype object for the new item
	 * @returns { Object } - new object containing the values of the original item
	 *
	 * The variables 'key' and 'val' are arbitrary.
	 * They depend on the collection type looped (Array, Object)
	 * and on the expression used on the each tag
	 *
	 */
	function mkitem(expr, key, val, base) {
	  var item = base ? Object.create(base) : {};
	  item[expr.key] = key;
	  if (expr.pos) { item[expr.pos] = val; }
	  return item
	}

	/**
	 * Unmount the redundant tags
	 * @param   { Array } items - array containing the current items to loop
	 * @param   { Array } tags - array containing all the children tags
	 */
	function unmountRedundant(items, tags) {
	  var i = tags.length,
	    j = items.length;

	  while (i > j) {
	    i--;
	    remove.apply(tags[i], [tags, i]);
	  }
	}


	/**
	 * Remove a child tag
	 * @this Tag
	 * @param   { Array } tags - tags collection
	 * @param   { Number } i - index of the tag to remove
	 */
	function remove(tags, i) {
	  tags.splice(i, 1);
	  this.unmount();
	  arrayishRemove(this.parent, this, this.__.tagName, true);
	}

	/**
	 * Move the nested custom tags in non custom loop tags
	 * @this Tag
	 * @param   { Number } i - current position of the loop tag
	 */
	function moveNestedTags(i) {
	  var this$1 = this;

	  each(Object.keys(this.tags), function (tagName) {
	    moveChildTag.apply(this$1.tags[tagName], [tagName, i]);
	  });
	}

	/**
	 * Move a child tag
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function move(root, nextTag, isVirtual) {
	  if (isVirtual)
	    { moveVirtual.apply(this, [root, nextTag]); }
	  else
	    { safeInsert(root, this.root, nextTag.root); }
	}

	/**
	 * Insert and mount a child tag
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function insert(root, nextTag, isVirtual) {
	  if (isVirtual)
	    { makeVirtual.apply(this, [root, nextTag]); }
	  else
	    { safeInsert(root, this.root, nextTag.root); }
	}

	/**
	 * Append a new tag into the DOM
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function append(root, isVirtual) {
	  if (isVirtual)
	    { makeVirtual.call(this, root); }
	  else
	    { root.appendChild(this.root); }
	}

	/**
	 * Manage tags having the 'each'
	 * @param   { HTMLElement } dom - DOM node we need to loop
	 * @param   { Tag } parent - parent tag instance where the dom node is contained
	 * @param   { String } expr - string contained in the 'each' attribute
	 * @returns { Object } expression object for this each loop
	 */
	function _each(dom, parent, expr) {

	  // remove the each property from the original tag
	  remAttr(dom, LOOP_DIRECTIVE);

	  var mustReorder = typeof getAttr(dom, LOOP_NO_REORDER_DIRECTIVE) !== T_STRING || remAttr(dom, LOOP_NO_REORDER_DIRECTIVE),
	    tagName = getTagName(dom),
	    impl = __TAG_IMPL[tagName],
	    parentNode = dom.parentNode,
	    placeholder = createDOMPlaceholder(),
	    child = getTag(dom),
	    ifExpr = getAttr(dom, CONDITIONAL_DIRECTIVE),
	    tags = [],
	    oldItems = [],
	    hasKeys,
	    isLoop = true,
	    isAnonymous = !__TAG_IMPL[tagName],
	    isVirtual = dom.tagName === 'VIRTUAL';

	  // parse the each expression
	  expr = tmpl.loopKeys(expr);
	  expr.isLoop = true;

	  if (ifExpr) { remAttr(dom, CONDITIONAL_DIRECTIVE); }

	  // insert a marked where the loop tags will be injected
	  parentNode.insertBefore(placeholder, dom);
	  parentNode.removeChild(dom);

	  expr.update = function updateEach() {
	    // get the new items collection
	    expr.value = tmpl(expr.val, parent);

	    var frag = createFrag(),
	      items = expr.value,
	      isObject$$1 = !isArray(items) && !isString(items),
	      root = placeholder.parentNode;

	    // if this DOM was removed the update here is useless
	    // this condition fixes also a weird async issue on IE in our unit test
	    if (!root) { return }

	    // object loop. any changes cause full redraw
	    if (isObject$$1) {
	      hasKeys = items || false;
	      items = hasKeys ?
	        Object.keys(items).map(function (key) {
	          return mkitem(expr, items[key], key)
	        }) : [];
	    } else {
	      hasKeys = false;
	    }

	    if (ifExpr) {
	      items = items.filter(function(item, i) {
	        if (expr.key && !isObject$$1)
	          { return !!tmpl(ifExpr, mkitem(expr, item, i, parent)) }

	        return !!tmpl(ifExpr, extend(Object.create(parent), item))
	      });
	    }

	    // loop all the new items
	    each(items, function(item, i) {
	      // reorder only if the items are objects
	      var
	        doReorder = mustReorder && typeof item === T_OBJECT && !hasKeys,
	        oldPos = oldItems.indexOf(item),
	        isNew = oldPos === -1,
	        pos = !isNew && doReorder ? oldPos : i,
	        // does a tag exist in this position?
	        tag = tags[pos],
	        mustAppend = i >= oldItems.length,
	        mustCreate =  doReorder && isNew || !doReorder && !tag;

	      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

	      // new tag
	      if (mustCreate) {
	        tag = new Tag$1(impl, {
	          parent: parent,
	          isLoop: isLoop,
	          isAnonymous: isAnonymous,
	          tagName: tagName,
	          root: dom.cloneNode(isAnonymous),
	          item: item,
	          index: i,
	        }, dom.innerHTML);

	        // mount the tag
	        tag.mount();

	        if (mustAppend)
	          { append.apply(tag, [frag || root, isVirtual]); }
	        else
	          { insert.apply(tag, [root, tags[i], isVirtual]); }

	        if (!mustAppend) { oldItems.splice(i, 0, item); }
	        tags.splice(i, 0, tag);
	        if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
	      } else if (pos !== i && doReorder) {
	        // move
	        if (contains(items, oldItems[pos])) {
	          move.apply(tag, [root, tags[i], isVirtual]);
	          // move the old tag instance
	          tags.splice(i, 0, tags.splice(pos, 1)[0]);
	          // move the old item
	          oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
	        }

	        // update the position attribute if it exists
	        if (expr.pos) { tag[expr.pos] = i; }

	        // if the loop tags are not custom
	        // we need to move all their custom tags into the right position
	        if (!child && tag.tags) { moveNestedTags.call(tag, i); }
	      }

	      // cache the original item to use it in the events bound to this node
	      // and its children
	      tag.__.item = item;
	      tag.__.index = i;
	      tag.__.parent = parent;

	      if (!mustCreate) { tag.update(item); }
	    });

	    // remove the redundant tags
	    unmountRedundant(items, tags);

	    // clone the items array
	    oldItems = items.slice();

	    // this condition is weird u
	    root.insertBefore(frag, placeholder);
	  };

	  expr.unmount = function() {
	    each(tags, function(t) { t.unmount(); });
	  };

	  return expr
	}

	/**
	 * Walk the tag DOM to detect the expressions to evaluate
	 * @this Tag
	 * @param   { HTMLElement } root - root tag where we will start digging the expressions
	 * @param   { Array } expressions - empty array where the expressions will be added
	 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
	 * @returns { Object } an object containing the root noode and the dom tree
	 */
	function parseExpressions(root, expressions, mustIncludeRoot) {
	  var this$1 = this;

	  var tree = {parent: {children: expressions}};

	  walkNodes(root, function (dom, ctx) {
	    var type = dom.nodeType, parent = ctx.parent, attr, expr, tagImpl;
	    if (!mustIncludeRoot && dom === root) { return {parent: parent} }

	    // text node
	    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
	      { parent.children.push({dom: dom, expr: dom.nodeValue}); }

	    if (type !== 1) { return ctx } // not an element

	    var isVirtual = dom.tagName === 'VIRTUAL';

	    // loop. each does it's own thing (for now)
	    if (attr = getAttr(dom, LOOP_DIRECTIVE)) {
	      if(isVirtual) { setAttr(dom, 'loopVirtual', true); } // ignore here, handled in _each
	      parent.children.push(_each(dom, this$1, attr));
	      return false
	    }

	    // if-attrs become the new parent. Any following expressions (either on the current
	    // element, or below it) become children of this expression.
	    if (attr = getAttr(dom, CONDITIONAL_DIRECTIVE)) {
	      parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
	      return false
	    }

	    if (expr = getAttr(dom, IS_DIRECTIVE)) {
	      if (tmpl.hasExpr(expr)) {
	        parent.children.push({isRtag: true, expr: expr, dom: dom, attrs: [].slice.call(dom.attributes)});
	        return false
	      }
	    }

	    // if this is a tag, stop traversing here.
	    // we ignore the root, since parseExpressions is called while we're mounting that root
	    tagImpl = getTag(dom);
	    if(isVirtual) {
	      if(getAttr(dom, 'virtualized')) {dom.parentElement.removeChild(dom); } // tag created, remove from dom
	      if(!tagImpl && !getAttr(dom, 'virtualized') && !getAttr(dom, 'loopVirtual'))  // ok to create virtual tag
	        { tagImpl = { tmpl: dom.outerHTML }; }
	    }

	    if (tagImpl && (dom !== root || mustIncludeRoot)) {
	      if(isVirtual && !getAttr(dom, IS_DIRECTIVE)) { // handled in update
	        // can not remove attribute like directives
	        // so flag for removal after creation to prevent maximum stack error
	        setAttr(dom, 'virtualized', true);

	        var tag = new Tag$1({ tmpl: dom.outerHTML },
	          {root: dom, parent: this$1},
	          dom.innerHTML);
	        parent.children.push(tag); // no return, anonymous tag, keep parsing
	      } else {
	        var conf = {root: dom, parent: this$1, hasImpl: true};
	        parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
	        return false
	      }
	    }

	    // attribute expressions
	    parseAttributes.apply(this$1, [dom, dom.attributes, function(attr, expr) {
	      if (!expr) { return }
	      parent.children.push(expr);
	    }]);

	    // whatever the parent is, all child elements get the same parent.
	    // If this element had an if-attr, that's the parent for all child elements
	    return {parent: parent}
	  }, tree);
	}

	/**
	 * Calls `fn` for every attribute on an element. If that attr has an expression,
	 * it is also passed to fn.
	 * @this Tag
	 * @param   { HTMLElement } dom - dom node to parse
	 * @param   { Array } attrs - array of attributes
	 * @param   { Function } fn - callback to exec on any iteration
	 */
	function parseAttributes(dom, attrs, fn) {
	  var this$1 = this;

	  each(attrs, function (attr) {
	    if (!attr) { return false }

	    var name = attr.name, bool = isBoolAttr(name), expr;

	    if (contains(REF_DIRECTIVES, name)) {
	      expr =  Object.create(RefExpr).init(dom, this$1, name, attr.value);
	    } else if (tmpl.hasExpr(attr.value)) {
	      expr = {dom: dom, expr: attr.value, attr: name, bool: bool};
	    }

	    fn(attr, expr);
	  });
	}

	/*
	  Includes hacks needed for the Internet Explorer version 9 and below
	  See: http://kangax.github.io/compat-table/es5/#ie8
	       http://codeplanet.io/dropping-ie8/
	*/

	var reHasYield  = /<yield\b/i;
	var reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
	var reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
	var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
	var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
	var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
	var GENERIC = 'div';
	var SVG = 'svg';


	/*
	  Creates the root element for table or select child elements:
	  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	*/
	function specialTags(el, tmpl, tagName) {

	  var
	    select = tagName[0] === 'o',
	    parent = select ? 'select>' : 'table>';

	  // trim() is important here, this ensures we don't have artifacts,
	  // so we can check if we have only one element inside the parent
	  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
	  parent = el.firstChild;

	  // returns the immediate parent if tr/th/td/col is the only element, if not
	  // returns the whole tree, as this can include additional elements
	  /* istanbul ignore next */
	  if (select) {
	    parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
	  } else {
	    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	    var tname = rootEls[tagName];
	    if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
	  }
	  return parent
	}

	/*
	  Replace the yield tag from any tag template with the innerHTML of the
	  original tag in the page
	*/
	function replaceYield(tmpl, html) {
	  // do nothing if no yield
	  if (!reHasYield.test(tmpl)) { return tmpl }

	  // be careful with #1343 - string on the source having `$1`
	  var src = {};

	  html = html && html.replace(reYieldSrc, function (_, ref, text) {
	    src[ref] = src[ref] || text;   // preserve first definition
	    return ''
	  }).trim();

	  return tmpl
	    .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
	      return src[ref] || def || ''
	    })
	    .replace(reYieldAll, function (_, def) {        // yield without any "from"
	      return html || def || ''
	    })
	}

	/**
	 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	 *
	 * @param   { String } tmpl  - The template coming from the custom tag definition
	 * @param   { String } html - HTML content that comes from the DOM element where you
	 *           will mount the tag, mostly the original tag in the page
	 * @param   { Boolean } isSvg - true if the root node is an svg
	 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
	 */
	function mkdom(tmpl, html, isSvg$$1) {
	  var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/),
	    tagName = match && match[1].toLowerCase(),
	    el = mkEl(isSvg$$1 ? SVG : GENERIC);

	  // replace all the yield tags with the tag inner html
	  tmpl = replaceYield(tmpl, html);

	  /* istanbul ignore next */
	  if (tblTags.test(tagName))
	    { el = specialTags(el, tmpl, tagName); }
	  else
	    { setInnerHTML(el, tmpl); }

	  return el
	}

	/**
	 * Another way to create a riot tag a bit more es6 friendly
	 * @param { HTMLElement } el - tag DOM selector or DOM node/s
	 * @param { Object } opts - tag logic
	 * @returns { Tag } new riot tag instance
	 */
	function Tag$2(el, opts) {
	  // get the tag properties from the class constructor
	  var ref = this;
	  var name = ref.name;
	  var tmpl = ref.tmpl;
	  var css = ref.css;
	  var attrs = ref.attrs;
	  var onCreate = ref.onCreate;
	  // register a new tag and cache the class prototype
	  if (!__TAG_IMPL[name]) {
	    tag$1(name, tmpl, css, attrs, onCreate);
	    // cache the class constructor
	    __TAG_IMPL[name].class = this.constructor;
	  }

	  // mount the tag using the class instance
	  mountTo(el, name, opts, this);
	  // inject the component css
	  if (css) { styleManager.inject(); }

	  return this
	}

	/**
	 * Create a new riot tag implementation
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   tmpl - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	function tag$1(name, tmpl, css, attrs, fn) {
	  if (isFunction(attrs)) {
	    fn = attrs;

	    if (/^[\w\-]+\s?=/.test(css)) {
	      attrs = css;
	      css = '';
	    } else
	      { attrs = ''; }
	  }

	  if (css) {
	    if (isFunction(css))
	      { fn = css; }
	    else
	      { styleManager.add(css); }
	  }

	  name = name.toLowerCase();
	  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

	  return name
	}

	/**
	 * Create a new riot tag implementation (for use by the compiler)
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   tmpl - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	function tag2$1(name, tmpl, css, attrs, fn) {
	  if (css) { styleManager.add(css, name); }

	  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

	  return name
	}

	/**
	 * Mount a tag using a specific tag implementation
	 * @param   { * } selector - tag DOM selector or DOM node/s
	 * @param   { String } tagName - tag implementation name
	 * @param   { Object } opts - tag logic
	 * @returns { Array } new tags instances
	 */
	function mount$1(selector, tagName, opts) {
	  var tags = [];
	  var elem, allTags;

	  function pushTagsTo(root) {
	    if (root.tagName) {
	      var riotTag = getAttr(root, IS_DIRECTIVE), tag;

	      // have tagName? force riot-tag to be the same
	      if (tagName && riotTag !== tagName) {
	        riotTag = tagName;
	        setAttr(root, IS_DIRECTIVE, tagName);
	      }

	      tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

	      if (tag)
	        { tags.push(tag); }
	    } else if (root.length)
	      { each(root, pushTagsTo); } // assume nodeList
	  }

	  // inject styles into DOM
	  styleManager.inject();

	  if (isObject(tagName)) {
	    opts = tagName;
	    tagName = 0;
	  }

	  // crawl the DOM to find the tag
	  if (isString(selector)) {
	    selector = selector === '*' ?
	      // select all registered tags
	      // & tags found with the riot-tag attribute set
	      allTags = selectTags() :
	      // or just the ones named like the selector
	      selector + selectTags(selector.split(/, */));

	    // make sure to pass always a selector
	    // to the querySelectorAll function
	    elem = selector ? $$(selector) : [];
	  }
	  else
	    // probably you have passed already a tag or a NodeList
	    { elem = selector; }

	  // select all the registered and mount them inside their root elements
	  if (tagName === '*') {
	    // get all custom tags
	    tagName = allTags || selectTags();
	    // if the root els it's just a single tag
	    if (elem.tagName)
	      { elem = $$(tagName, elem); }
	    else {
	      // select all the children for all the different root elements
	      var nodeList = [];

	      each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });

	      elem = nodeList;
	    }
	    // get rid of the tagName
	    tagName = 0;
	  }

	  pushTagsTo(elem);

	  return tags
	}

	// Create a mixin that could be globally shared across all the tags
	var mixins = {};
	var globals = mixins[GLOBAL_MIXIN] = {};
	var mixins_id = 0;

	/**
	 * Create/Return a mixin by its name
	 * @param   { String }  name - mixin name (global mixin if object)
	 * @param   { Object }  mix - mixin logic
	 * @param   { Boolean } g - is global?
	 * @returns { Object }  the mixin logic
	 */
	function mixin$1(name, mix, g) {
	  // Unnamed global
	  if (isObject(name)) {
	    mixin$1(("__" + (mixins_id++) + "__"), name, true);
	    return
	  }

	  var store = g ? globals : mixins;

	  // Getter
	  if (!mix) {
	    if (isUndefined(store[name]))
	      { throw new Error(("Unregistered mixin: " + name)) }

	    return store[name]
	  }

	  // Setter
	  store[name] = isFunction(mix) ?
	    extend(mix.prototype, store[name] || {}) && mix :
	    extend(store[name] || {}, mix);
	}

	/**
	 * Update all the tags instances created
	 * @returns { Array } all the tags instances
	 */
	function update$1() {
	  return each(__TAGS_CACHE, function (tag) { return tag.update(); })
	}

	function unregister$1(name) {
	  __TAG_IMPL[name] = null;
	}

	var version$1 = 'v3.6.1';


	var core = Object.freeze({
		Tag: Tag$2,
		tag: tag$1,
		tag2: tag2$1,
		mount: mount$1,
		mixin: mixin$1,
		update: update$1,
		unregister: unregister$1,
		version: version$1
	});

	// counter to give a unique id to all the Tag instances
	var __uid = 0;

	/**
	 * We need to update opts for this tag. That requires updating the expressions
	 * in any attributes on the tag, and then copying the result onto opts.
	 * @this Tag
	 * @param   {Boolean} isLoop - is it a loop tag?
	 * @param   { Tag }  parent - parent tag node
	 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
	 * @param   { Object }  opts - tag options
	 * @param   { Array }  instAttrs - tag attributes array
	 */
	function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
	  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
	  // (and only this case) we don't need to do updateOpts, because the regular parse
	  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
	  if (isLoop && isAnonymous) { return }

	  var ctx = !isAnonymous && isLoop ? this : parent || this;
	  each(instAttrs, function (attr) {
	    if (attr.expr) { updateAllExpressions.call(ctx, [attr.expr]); }
	    // normalize the attribute names
	    opts[toCamel(attr.name).replace(ATTRS_PREFIX, '')] = attr.expr ? attr.expr.value : attr.value;
	  });
	}


	/**
	 * Tag class
	 * @constructor
	 * @param { Object } impl - it contains the tag template, and logic
	 * @param { Object } conf - tag options
	 * @param { String } innerHTML - html that eventually we need to inject in the tag
	 */
	function Tag$1(impl, conf, innerHTML) {
	  if ( impl === void 0 ) impl = {};
	  if ( conf === void 0 ) conf = {};

	  var opts = extend({}, conf.opts),
	    parent = conf.parent,
	    isLoop = conf.isLoop,
	    isAnonymous = !!conf.isAnonymous,
	    skipAnonymous = settings$1.skipAnonymousTags && isAnonymous,
	    item = cleanUpData(conf.item),
	    index = conf.index, // available only for the looped nodes
	    instAttrs = [], // All attributes on the Tag when it's first parsed
	    implAttrs = [], // expressions on this type of Tag
	    expressions = [],
	    root = conf.root,
	    tagName = conf.tagName || getTagName(root),
	    isVirtual = tagName === 'virtual',
	    isInline = !isVirtual && !impl.tmpl,
	    propsInSyncWithParent = [],
	    dom;

	  // make this tag observable
	  if (!skipAnonymous) { observable$1(this); }
	  // only call unmount if we have a valid __TAG_IMPL (has name property)
	  if (impl.name && root._tag) { root._tag.unmount(true); }

	  // not yet mounted
	  this.isMounted = false;

	  defineProperty(this, '__', {
	    isAnonymous: isAnonymous,
	    instAttrs: instAttrs,
	    innerHTML: innerHTML,
	    tagName: tagName,
	    index: index,
	    isLoop: isLoop,
	    isInline: isInline,
	    // tags having event listeners
	    // it would be better to use weak maps here but we can not introduce breaking changes now
	    listeners: [],
	    // these vars will be needed only for the virtual tags
	    virts: [],
	    tail: null,
	    head: null,
	    parent: null,
	    item: null
	  });

	  // create a unique id to this tag
	  // it could be handy to use it also to improve the virtual dom rendering speed
	  defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
	  defineProperty(this, 'root', root);
	  extend(this, { opts: opts }, item);
	  // protect the "tags" and "refs" property from being overridden
	  defineProperty(this, 'parent', parent || null);
	  defineProperty(this, 'tags', {});
	  defineProperty(this, 'refs', {});

	  if (isInline || isLoop && isAnonymous) {
	    dom = root;
	  } else {
	    if (!isVirtual) { root.innerHTML = ''; }
	    dom = mkdom(impl.tmpl, innerHTML, isSvg(root));
	  }

	  /**
	   * Update the tag expressions and options
	   * @param   { * }  data - data we want to use to extend the tag properties
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'update', function tagUpdate(data) {
	    var nextOpts = {},
	      canTrigger = this.isMounted && !skipAnonymous;

	    // make sure the data passed will not override
	    // the component core methods
	    data = cleanUpData(data);
	    extend(this, data);
	    updateOpts.apply(this, [isLoop, parent, isAnonymous, nextOpts, instAttrs]);

	    if (canTrigger && this.isMounted && isFunction(this.shouldUpdate) && !this.shouldUpdate(data, nextOpts)) {
	      return this
	    }

	    // inherit properties from the parent, but only for isAnonymous tags
	    if (isLoop && isAnonymous) { inheritFrom.apply(this, [this.parent, propsInSyncWithParent]); }
	    extend(opts, nextOpts);
	    if (canTrigger) { this.trigger('update', data); }
	    updateAllExpressions.call(this, expressions);
	    if (canTrigger) { this.trigger('updated'); }

	    return this

	  }.bind(this));

	  /**
	   * Add a mixin to this tag
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'mixin', function tagMixin() {
	    var this$1 = this;

	    each(arguments, function (mix) {
	      var instance, obj;
	      var props = [];

	      // properties blacklisted and will not be bound to the tag instance
	      var propsBlacklist = ['init', '__proto__'];

	      mix = isString(mix) ? mixin$1(mix) : mix;

	      // check if the mixin is a function
	      if (isFunction(mix)) {
	        // create the new mixin instance
	        instance = new mix();
	      } else { instance = mix; }

	      var proto = Object.getPrototypeOf(instance);

	      // build multilevel prototype inheritance chain property list
	      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
	      while (obj = Object.getPrototypeOf(obj || instance))

	      // loop the keys in the function prototype or the all object keys
	      each(props, function (key) {
	        // bind methods to this
	        // allow mixins to override other properties/parent mixins
	        if (!contains(propsBlacklist, key)) {
	          // check for getters/setters
	          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
	          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

	          // apply method only if it does not already exist on the instance
	          if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
	            Object.defineProperty(this$1, key, descriptor);
	          } else {
	            this$1[key] = isFunction(instance[key]) ?
	              instance[key].bind(this$1) :
	              instance[key];
	          }
	        }
	      });

	      // init method will be called automatically
	      if (instance.init)
	        { instance.init.bind(this$1)(); }
	    });
	    return this
	  }.bind(this));

	  /**
	   * Mount the current tag instance
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'mount', function tagMount() {
	    var this$1 = this;

	    root._tag = this; // keep a reference to the tag just created

	    // Read all the attrs on this instance. This give us the info we need for updateOpts
	    parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
	      if (!isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = this$1; }
	      attr.expr = expr;
	      instAttrs.push(attr);
	    }]);

	    // update the root adding custom attributes coming from the compiler
	    implAttrs = [];
	    walkAttrs(impl.attrs, function (k, v) { implAttrs.push({name: k, value: v}); });
	    parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
	      if (expr) { expressions.push(expr); }
	      else { setAttr(root, attr.name, attr.value); }
	    }]);

	    // initialiation
	    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);

	    // add global mixins
	    var globalMixin = mixin$1(GLOBAL_MIXIN);

	    if (globalMixin && !skipAnonymous) {
	      for (var i in globalMixin) {
	        if (globalMixin.hasOwnProperty(i)) {
	          this$1.mixin(globalMixin[i]);
	        }
	      }
	    }

	    if (impl.fn) { impl.fn.call(this, opts); }

	    if (!skipAnonymous) { this.trigger('before-mount'); }

	    // parse layout after init. fn may calculate args for nested custom tags
	    parseExpressions.apply(this, [dom, expressions, isAnonymous]);

	    this.update(item);

	    if (!isAnonymous && !isInline) {
	      while (dom.firstChild) { root.appendChild(dom.firstChild); }
	    }

	    defineProperty(this, 'root', root);
	    defineProperty(this, 'isMounted', true);

	    if (skipAnonymous) { return }

	    // if it's not a child tag we can trigger its mount event
	    if (!this.parent) {
	      this.trigger('mount');
	    }
	    // otherwise we need to wait that the parent "mount" or "updated" event gets triggered
	    else {
	      var p = getImmediateCustomParentTag(this.parent);
	      p.one(!p.isMounted ? 'mount' : 'updated', function () {
	        this$1.trigger('mount');
	      });
	    }

	    return this

	  }.bind(this));

	  /**
	   * Unmount the tag instance
	   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
	    var this$1 = this;

	    var el = this.root,
	      p = el.parentNode,
	      ptag,
	      tagIndex = __TAGS_CACHE.indexOf(this);

	    if (!skipAnonymous) { this.trigger('before-unmount'); }

	    // clear all attributes coming from the mounted tag
	    walkAttrs(impl.attrs, function (name) {
	      if (startsWith(name, ATTRS_PREFIX))
	        { name = name.slice(ATTRS_PREFIX.length); }

	      remAttr(root, name);
	    });

	    // remove all the event listeners
	    this.__.listeners.forEach(function (dom) {
	      Object.keys(dom[RIOT_EVENTS_KEY]).forEach(function (eventName) {
	        dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][eventName]);
	      });
	    });

	    // remove this tag instance from the global virtualDom variable
	    if (tagIndex !== -1)
	      { __TAGS_CACHE.splice(tagIndex, 1); }

	    if (p || isVirtual) {
	      if (parent) {
	        ptag = getImmediateCustomParentTag(parent);

	        if (isVirtual) {
	          Object.keys(this.tags).forEach(function (tagName) {
	            arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
	          });
	        } else {
	          arrayishRemove(ptag.tags, tagName, this);
	          // remove from _parent too
	          if(parent !== ptag) {
	            arrayishRemove(parent.tags, tagName, this);
	          }
	        }
	      } else {
	        // remove the tag contents
	        setInnerHTML(el, '');
	      }

	      if (p && !mustKeepRoot) { p.removeChild(el); }
	    }

	    if (this.__.virts) {
	      each(this.__.virts, function (v) {
	        if (v.parentNode) { v.parentNode.removeChild(v); }
	      });
	    }

	    // allow expressions to unmount themselves
	    unmountAll(expressions);
	    each(instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });

	    // custom internal unmount function to avoid relying on the observable
	    if (this.__.onUnmount) { this.__.onUnmount(); }

	    if (!skipAnonymous) {
	      this.trigger('unmount');
	      this.off('*');
	    }

	    defineProperty(this, 'isMounted', false);

	    delete this.root._tag;

	    return this

	  }.bind(this));
	}

	/**
	 * Detect the tag implementation by a DOM node
	 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	 */
	function getTag(dom) {
	  return dom.tagName && __TAG_IMPL[getAttr(dom, IS_DIRECTIVE) ||
	    getAttr(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()]
	}

	/**
	 * Inherit properties from a target tag instance
	 * @this Tag
	 * @param   { Tag } target - tag where we will inherit properties
	 * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
	 */
	function inheritFrom(target, propsInSyncWithParent) {
	  var this$1 = this;

	  each(Object.keys(target), function (k) {
	    // some properties must be always in sync with the parent tag
	    var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);

	    if (isUndefined(this$1[k]) || mustSync) {
	      // track the property to keep in sync
	      // so we can keep it updated
	      if (!mustSync) { propsInSyncWithParent.push(k); }
	      this$1[k] = target[k];
	    }
	  });
	}

	/**
	 * Move the position of a custom tag in its parent tag
	 * @this Tag
	 * @param   { String } tagName - key where the tag was stored
	 * @param   { Number } newPos - index where the new tag will be stored
	 */
	function moveChildTag(tagName, newPos) {
	  var parent = this.parent,
	    tags;
	  // no parent no move
	  if (!parent) { return }

	  tags = parent.tags[tagName];

	  if (isArray(tags))
	    { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
	  else { arrayishAdd(parent.tags, tagName, this); }
	}

	/**
	 * Create a new child tag including it correctly into its parent
	 * @param   { Object } child - child tag implementation
	 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
	 * @param   { String } innerHTML - inner html of the child node
	 * @param   { Object } parent - instance of the parent tag including the child custom tag
	 * @returns { Object } instance of the new child tag just created
	 */
	function initChildTag(child, opts, innerHTML, parent) {
	  var tag = new Tag$1(child, opts, innerHTML),
	    tagName = opts.tagName || getTagName(opts.root, true),
	    ptag = getImmediateCustomParentTag(parent);
	  // fix for the parent attribute in the looped elements
	  defineProperty(tag, 'parent', ptag);
	  // store the real parent tag
	  // in some cases this could be different from the custom parent tag
	  // for example in nested loops
	  tag.__.parent = parent;

	  // add this tag to the custom parent tag
	  arrayishAdd(ptag.tags, tagName, tag);

	  // and also to the real parent tag
	  if (ptag !== parent)
	    { arrayishAdd(parent.tags, tagName, tag); }

	  return tag
	}

	/**
	 * Loop backward all the parents tree to detect the first custom parent tag
	 * @param   { Object } tag - a Tag instance
	 * @returns { Object } the instance of the first custom parent tag found
	 */
	function getImmediateCustomParentTag(tag) {
	  var ptag = tag;
	  while (ptag.__.isAnonymous) {
	    if (!ptag.parent) { break }
	    ptag = ptag.parent;
	  }
	  return ptag
	}

	/**
	 * Trigger the unmount method on all the expressions
	 * @param   { Array } expressions - DOM expressions
	 */
	function unmountAll(expressions) {
	  each(expressions, function(expr) {
	    if (expr instanceof Tag$1) { expr.unmount(true); }
	    else if (expr.tagName) { expr.tag.unmount(true); }
	    else if (expr.unmount) { expr.unmount(); }
	  });
	}

	/**
	 * Get the tag name of any DOM node
	 * @param   { Object } dom - DOM node we want to parse
	 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
	 * @returns { String } name to identify this dom node in riot
	 */
	function getTagName(dom, skipDataIs) {
	  var child = getTag(dom),
	    namedTag = !skipDataIs && getAttr(dom, IS_DIRECTIVE);
	  return namedTag && !tmpl.hasExpr(namedTag) ?
	                namedTag :
	              child ? child.name : dom.tagName.toLowerCase()
	}

	/**
	 * With this function we avoid that the internal Tag methods get overridden
	 * @param   { Object } data - options we want to use to extend the tag instance
	 * @returns { Object } clean object without containing the riot internal reserved words
	 */
	function cleanUpData(data) {
	  if (!(data instanceof Tag$1) && !(data && isFunction(data.trigger)))
	    { return data }

	  var o = {};
	  for (var key in data) {
	    if (!RE_RESERVED_NAMES.test(key)) { o[key] = data[key]; }
	  }
	  return o
	}

	/**
	 * Set the property of an object for a given key. If something already
	 * exists there, then it becomes an array containing both the old and new value.
	 * @param { Object } obj - object on which to set the property
	 * @param { String } key - property name
	 * @param { Object } value - the value of the property to be set
	 * @param { Boolean } ensureArray - ensure that the property remains an array
	 * @param { Number } index - add the new item in a certain array position
	 */
	function arrayishAdd(obj, key, value, ensureArray, index) {
	  var dest = obj[key];
	  var isArr = isArray(dest);
	  var hasIndex = !isUndefined(index);

	  if (dest && dest === value) { return }

	  // if the key was never set, set it once
	  if (!dest && ensureArray) { obj[key] = [value]; }
	  else if (!dest) { obj[key] = value; }
	  // if it was an array and not yet set
	  else {
	    if (isArr) {
	      var oldIndex = dest.indexOf(value);
	      // this item never changed its position
	      if (oldIndex === index) { return }
	      // remove the item from its old position
	      if (oldIndex !== -1) { dest.splice(oldIndex, 1); }
	      // move or add the item
	      if (hasIndex) {
	        dest.splice(index, 0, value);
	      } else {
	        dest.push(value);
	      }
	    } else { obj[key] = [dest, value]; }
	  }
	}

	/**
	 * Removes an item from an object at a given key. If the key points to an array,
	 * then the item is just removed from the array.
	 * @param { Object } obj - object on which to remove the property
	 * @param { String } key - property name
	 * @param { Object } value - the value of the property to be removed
	 * @param { Boolean } ensureArray - ensure that the property remains an array
	*/
	function arrayishRemove(obj, key, value, ensureArray) {
	  if (isArray(obj[key])) {
	    var index = obj[key].indexOf(value);
	    if (index !== -1) { obj[key].splice(index, 1); }
	    if (!obj[key].length) { delete obj[key]; }
	    else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
	  } else
	    { delete obj[key]; } // otherwise just delete the key
	}

	/**
	 * Mount a tag creating new Tag instance
	 * @param   { Object } root - dom node where the tag will be mounted
	 * @param   { String } tagName - name of the riot tag we want to mount
	 * @param   { Object } opts - options to pass to the Tag instance
	 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
	 * @returns { Tag } a new Tag instance
	 */
	function mountTo(root, tagName, opts, ctx) {
	  var impl = __TAG_IMPL[tagName],
	    implClass = __TAG_IMPL[tagName].class,
	    tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

	  var conf = extend({ root: root, opts: opts }, { parent: opts ? opts.parent : null });

	  if (impl && root) { Tag$1.apply(tag, [impl, conf, innerHTML]); }

	  if (tag && tag.mount) {
	    tag.mount(true);
	    // add this tag to the virtualDom variable
	    if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
	  }

	  return tag
	}

	/**
	 * makes a tag virtual and replaces a reference in the dom
	 * @this Tag
	 * @param { tag } the tag to make virtual
	 * @param { ref } the dom reference location
	 */
	function makeReplaceVirtual(tag, ref) {
	  var frag = createFrag();
	  makeVirtual.call(tag, frag);
	  ref.parentNode.replaceChild(frag, ref);
	}

	/**
	 * Adds the elements for a virtual tag
	 * @this Tag
	 * @param { Node } src - the node that will do the inserting or appending
	 * @param { Tag } target - only if inserting, insert before this tag's first child
	 */
	function makeVirtual(src, target) {
	  var this$1 = this;

	  var head = createDOMPlaceholder(),
	    tail = createDOMPlaceholder(),
	    frag = createFrag(),
	    sib, el;

	  this.root.insertBefore(head, this.root.firstChild);
	  this.root.appendChild(tail);

	  this.__.head = el = head;
	  this.__.tail = tail;

	  while (el) {
	    sib = el.nextSibling;
	    frag.appendChild(el);
	    this$1.__.virts.push(el); // hold for unmounting
	    el = sib;
	  }

	  if (target)
	    { src.insertBefore(frag, target.__.head); }
	  else
	    { src.appendChild(frag); }
	}

	/**
	 * Move virtual tag and all child nodes
	 * @this Tag
	 * @param { Node } src  - the node that will do the inserting
	 * @param { Tag } target - insert before this tag's first child
	 */
	function moveVirtual(src, target) {
	  var this$1 = this;

	  var el = this.__.head,
	    frag = createFrag(),
	    sib;

	  while (el) {
	    sib = el.nextSibling;
	    frag.appendChild(el);
	    el = sib;
	    if (el === this$1.__.tail) {
	      frag.appendChild(el);
	      src.insertBefore(frag, target.__.head);
	      break
	    }
	  }
	}

	/**
	 * Get selectors for tags
	 * @param   { Array } tags - tag names to select
	 * @returns { String } selector
	 */
	function selectTags(tags) {
	  // select all tags
	  if (!tags) {
	    var keys = Object.keys(__TAG_IMPL);
	    return keys + selectTags(keys)
	  }

	  return tags
	    .filter(function (t) { return !/[^-\w]/.test(t); })
	    .reduce(function (list, t) {
	      var name = t.trim().toLowerCase();
	      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]"
	    }, '')
	}


	var tags = Object.freeze({
		getTag: getTag,
		inheritFrom: inheritFrom,
		moveChildTag: moveChildTag,
		initChildTag: initChildTag,
		getImmediateCustomParentTag: getImmediateCustomParentTag,
		unmountAll: unmountAll,
		getTagName: getTagName,
		cleanUpData: cleanUpData,
		arrayishAdd: arrayishAdd,
		arrayishRemove: arrayishRemove,
		mountTo: mountTo,
		makeReplaceVirtual: makeReplaceVirtual,
		makeVirtual: makeVirtual,
		moveVirtual: moveVirtual,
		selectTags: selectTags
	});

	/**
	 * Riot public api
	 */
	var settings = settings$1;
	var util = {
	  tmpl: tmpl,
	  brackets: brackets,
	  styleManager: styleManager,
	  vdom: __TAGS_CACHE,
	  styleNode: styleManager.styleNode,
	  // export the riot internal utils as well
	  dom: dom,
	  check: check,
	  misc: misc,
	  tags: tags
	};

	// export the core props/methods
	var Tag$$1 = Tag$2;
	var tag$$1 = tag$1;
	var tag2$$1 = tag2$1;
	var mount$$1 = mount$1;
	var mixin$$1 = mixin$1;
	var update$$1 = update$1;
	var unregister$$1 = unregister$1;
	var version$$1 = version$1;
	var observable = observable$1;

	var riot$1 = extend({}, core, {
	  observable: observable$1,
	  settings: settings,
	  util: util,
	});

	exports.settings = settings;
	exports.util = util;
	exports.Tag = Tag$$1;
	exports.tag = tag$$1;
	exports.tag2 = tag2$$1;
	exports.mount = mount$$1;
	exports.mixin = mixin$$1;
	exports.update = update$$1;
	exports.unregister = unregister$$1;
	exports.version = version$$1;
	exports.observable = observable;
	exports['default'] = riot$1;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	
	    var riot = __webpack_require__(16)
	    __webpack_require__(18)
	__webpack_require__(19)
	__webpack_require__(20)

	riot.tag2('test-list', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="width:0;height:0;position:absolute;overflow:hidden;"> <defs> <symbol viewbox="0 0 1024 1024" aria-labelledby="fmsi-ant-question-circle-title" id="si-ant-question-circle"> <title id="fmsi-ant-question-circle-title">icon question-circle</title> <path d="M512 0Q373 0 255 68.5T68.5 255 0 512t68.5 257T255 955.5t257 68.5 257-68.5T955.5 769t68.5-257-68.5-257T769 68.5 512 0zm30 802q0 13-9 22.5t-23 9.5q-13 0-22.5-9.5T478 802t9.5-22.5T510 770q14 0 23 9.5t9 22.5zm66-220q-36 19-51 35t-15 46v11q0 13-9 22.5t-23 9.5q-13 0-22.5-9.5T478 674v-11q0-48 24.5-79.5T578 525q35-18 55.5-52.5T654 398q0-60-42-102t-102-42q-62 0-103 37-30 28-38 68-2 11-11 18.5t-20 7.5q-16 0-25.5-11.5T306 347q12-62 59-104 59-53 145-53 87 0 147.5 61T718 398q0 58-29.5 107.5T608 582z"></path> </symbol> </defs> </svg> <div class="header"> <svg class="logo"> <text x="0" y="16" font-size="18" fill="white">AM: coffee time ☕</text> </svg> <svg class="question" onclick="{showHelp}"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#si-ant-question-circle" fill="white"></use> </svg> </div> <div class="phantom-header"></div> <help ref="help"></help> <test-status></test-status> <a onclick="{toRouteHash}">base</a> <a onclick="{toggleParameterMode}">show all parameters</a> <recursive-item ref="item" data="{opts.testPatterns}" routing="" depth="1"></recursive-item> <test-iframe ref="testFrame" if="{instanceUrl}" url="{instanceUrl}" config="{Status.config}"></test-iframe>', 'test-list,[data-is="test-list"]{display:block;width:100%;background-color:white;font-size:14px;padding-left:12px;box-sizing:border-box} test-list>.header,[data-is="test-list"]>.header{width:100%;height:30px;background:#333;position:fixed;top:0;left:0;display:flex;align-items:center;justify-content:space-between;z-index:10} test-list>.header>svg,[data-is="test-list"]>.header>svg{height:20px;padding:4px} test-list>.header>svg.logo>text,[data-is="test-list"]>.header>svg.logo>text{font-family:"Playfair Display","Georgia",serif} test-list>.header>svg.question,[data-is="test-list"]>.header>svg.question{width:20px;margin-right:6px;cursor:pointer} test-list>.phantom-header,[data-is="test-list"]>.phantom-header{height:30px;content:" ";width:100%} test-list>a,[data-is="test-list"]>a{border:1px solid #ccc} test-list a,[data-is="test-list"] a{color:blue;text-decoration:none;cursor:pointer;display:inline-block} test-list a:hover,[data-is="test-list"] a:hover{opacity:.4}', '', function(opts) {
	var Status, bodyStyle, depth, fn, i, keyboardjs, route;

	Status = this.Status = __webpack_require__(15);

	route = __webpack_require__(22);

	keyboardjs = __webpack_require__(24);

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
	this.Status = __webpack_require__(15).on("item-update", (function(_this) {
	  return function() {
	    return _this.update();
	  };
	})(this));
	});

	riot.tag2('recursive-item', '<list-line ref="lines" if="{getStrInfo(key).name !== \'default\'}" depth="{parent.opts.depth}" routing="{parent.opts.routing}" each="{data, key in opts.data}"></list-line>', 'recursive-item,[data-is="recursive-item"]{display:block;border-left:1px solid #ccc}', '', function(opts) {
	var getLines;

	this.getStrInfo = __webpack_require__(29).getStrInfo;

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

	Status = this.Status = __webpack_require__(15);

	Parser = __webpack_require__(29);

	route = __webpack_require__(22);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	
	    var riot = __webpack_require__(16)
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	
	    var riot = __webpack_require__(16)
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	    var riot = __webpack_require__(16)
	    riot.tag2('test-iframe', '<span class="{isIos ? \'ios\' : \'no-ios\'}"> <iframe if="{!isElectron}" riot-src="{opts.url}"></iframe> <webview if="{isElectron}" riot-src="{opts.url}" nodeintegration></webview> </span>', 'test-iframe,[data-is="test-iframe"]{ z-index: 100000; position: relative; } test-iframe .ios,[data-is="test-iframe"] .ios{ display: block; -webkit-overflow-scrolling: touch; overflow: auto; position: fixed; top: 0; left: 0; width: 100%; height: 100%; } test-iframe iframe,[data-is="test-iframe"] iframe,test-iframe webview,[data-is="test-iframe"] webview{ background-color: white; border: none; width: 100%; height: 100%; } test-iframe .no-ios iframe,[data-is="test-iframe"] .no-ios iframe,test-iframe .no-ios webview,[data-is="test-iframe"] .no-ios webview{ position: fixed; left: 0px; top: 0px; }', '', function(opts) {
	var WholeStatus, ref,
	  slice = [].slice;

	WholeStatus = __webpack_require__(15);

	this.isIos = __webpack_require__(21).ios();

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

	    
	  
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * is.js 0.8.0
	 * Author: Aras Atasaygin
	 */

	// AMD with global, Node, or global
	;(function(root, factory) {    // eslint-disable-line no-extra-semi
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            // Also create a global in case some scripts
	            // that are loaded still are looking for
	            // a global even when an AMD loader is in use.
	            return (root.is = factory());
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like enviroments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is self)
	        root.is = factory();
	    }
	}(this, function() {

	    // Baseline
	    /* -------------------------------------------------------------------------- */

	    // define 'is' object and current version
	    var is = {};
	    is.VERSION = '0.8.0';

	    // define interfaces
	    is.not = {};
	    is.all = {};
	    is.any = {};

	    // cache some methods to call later on
	    var toString = Object.prototype.toString;
	    var slice = Array.prototype.slice;
	    var hasOwnProperty = Object.prototype.hasOwnProperty;

	    // helper function which reverses the sense of predicate result
	    function not(func) {
	        return function() {
	            return !func.apply(null, slice.call(arguments));
	        };
	    }

	    // helper function which call predicate function per parameter and return true if all pass
	    function all(func) {
	        return function() {
	            var params = getParams(arguments);
	            var length = params.length;
	            for (var i = 0; i < length; i++) {
	                if (!func.call(null, params[i])) {
	                    return false;
	                }
	            }
	            return true;
	        };
	    }

	    // helper function which call predicate function per parameter and return true if any pass
	    function any(func) {
	        return function() {
	            var params = getParams(arguments);
	            var length = params.length;
	            for (var i = 0; i < length; i++) {
	                if (func.call(null, params[i])) {
	                    return true;
	                }
	            }
	            return false;
	        };
	    }

	    // build a 'comparator' object for various comparison checks
	    var comparator = {
	        '<': function(a, b) { return a < b; },
	        '<=': function(a, b) { return a <= b; },
	        '>': function(a, b) { return a > b; },
	        '>=': function(a, b) { return a >= b; }
	    }

	    // helper function which compares a version to a range
	    function compareVersion(version, range) {
	        var string = (range + '');
	        var n = +(string.match(/\d+/) || NaN);
	        var op = string.match(/^[<>]=?|/)[0];
	        return comparator[op] ? comparator[op](version, n) : (version == n || n !== n);
	    }

	    // helper function which extracts params from arguments
	    function getParams(args) {
	        var params = slice.call(args);
	        var length = params.length;
	        if (length === 1 && is.array(params[0])) {    // support array
	            params = params[0];
	        }
	        return params;
	    }

	    // Type checks
	    /* -------------------------------------------------------------------------- */

	    // is a given value Arguments?
	    is.arguments = function(value) {    // fallback check is for IE
	        return toString.call(value) === '[object Arguments]' ||
	            (value != null && typeof value === 'object' && 'callee' in value);
	    };

	    // is a given value Array?
	    is.array = Array.isArray || function(value) {    // check native isArray first
	        return toString.call(value) === '[object Array]';
	    };

	    // is a given value Boolean?
	    is.boolean = function(value) {
	        return value === true || value === false || toString.call(value) === '[object Boolean]';
	    };

	    // is a given value Char?
	    is.char = function(value) {
	        return is.string(value) && value.length === 1;
	    };

	    // is a given value Date Object?
	    is.date = function(value) {
	        return toString.call(value) === '[object Date]';
	    };

	    // is a given object a DOM node?
	    is.domNode = function(object) {
	        return is.object(object) && object.nodeType > 0;
	    };

	    // is a given value Error object?
	    is.error = function(value) {
	        return toString.call(value) === '[object Error]';
	    };

	    // is a given value function?
	    is['function'] = function(value) {    // fallback check is for IE
	        return toString.call(value) === '[object Function]' || typeof value === 'function';
	    };

	    // is given value a pure JSON object?
	    is.json = function(value) {
	        return toString.call(value) === '[object Object]';
	    };

	    // is a given value NaN?
	    is.nan = function(value) {    // NaN is number :) Also it is the only value which does not equal itself
	        return value !== value;
	    };

	    // is a given value null?
	    is['null'] = function(value) {
	        return value === null;
	    };

	    // is a given value number?
	    is.number = function(value) {
	        return is.not.nan(value) && toString.call(value) === '[object Number]';
	    };

	    // is a given value object?
	    is.object = function(value) {
	        return Object(value) === value;
	    };

	    // is a given value RegExp?
	    is.regexp = function(value) {
	        return toString.call(value) === '[object RegExp]';
	    };

	    // are given values same type?
	    // prevent NaN, Number same type check
	    is.sameType = function(value, other) {
	        var tag = toString.call(value);
	        if (tag !== toString.call(other)) {
	            return false;
	        }
	        if (tag === '[object Number]') {
	            return !is.any.nan(value, other) || is.all.nan(value, other);
	        }
	        return true;
	    };
	    // sameType method does not support 'all' and 'any' interfaces
	    is.sameType.api = ['not'];

	    // is a given value String?
	    is.string = function(value) {
	        return toString.call(value) === '[object String]';
	    };

	    // is a given value undefined?
	    is.undefined = function(value) {
	        return value === void 0;
	    };

	    // is a given value window?
	    // setInterval method is only available for window object
	    is.windowObject = function(value) {
	        return value != null && typeof value === 'object' && 'setInterval' in value;
	    };

	    // Presence checks
	    /* -------------------------------------------------------------------------- */

	    //is a given value empty? Objects, arrays, strings
	    is.empty = function(value) {
	        if (is.object(value)) {
	            var length = Object.getOwnPropertyNames(value).length;
	            if (length === 0 || (length === 1 && is.array(value)) ||
	                    (length === 2 && is.arguments(value))) {
	                return true;
	            }
	            return false;
	        }
	        return value === '';
	    };

	    // is a given value existy?
	    is.existy = function(value) {
	        return value != null;
	    };

	    // is a given value falsy?
	    is.falsy = function(value) {
	        return !value;
	    };

	    // is a given value truthy?
	    is.truthy = not(is.falsy);

	    // Arithmetic checks
	    /* -------------------------------------------------------------------------- */

	    // is a given number above minimum parameter?
	    is.above = function(n, min) {
	        return is.all.number(n, min) && n > min;
	    };
	    // above method does not support 'all' and 'any' interfaces
	    is.above.api = ['not'];

	    // is a given number decimal?
	    is.decimal = function(n) {
	        return is.number(n) && n % 1 !== 0;
	    };

	    // are given values equal? supports numbers, strings, regexes, booleans
	    // TODO: Add object and array support
	    is.equal = function(value, other) {
	        // check 0 and -0 equity with Infinity and -Infinity
	        if (is.all.number(value, other)) {
	            return value === other && 1 / value === 1 / other;
	        }
	        // check regexes as strings too
	        if (is.all.string(value, other) || is.all.regexp(value, other)) {
	            return '' + value === '' + other;
	        }
	        if (is.all.boolean(value, other)) {
	            return value === other;
	        }
	        return false;
	    };
	    // equal method does not support 'all' and 'any' interfaces
	    is.equal.api = ['not'];

	    // is a given number even?
	    is.even = function(n) {
	        return is.number(n) && n % 2 === 0;
	    };

	    // is a given number finite?
	    is.finite = isFinite || function(n) {
	        return is.not.infinite(n) && is.not.nan(n);
	    };

	    // is a given number infinite?
	    is.infinite = function(n) {
	        return n === Infinity || n === -Infinity;
	    };

	    // is a given number integer?
	    is.integer = function(n) {
	        return is.number(n) && n % 1 === 0;
	    };

	    // is a given number negative?
	    is.negative = function(n) {
	        return is.number(n) && n < 0;
	    };

	    // is a given number odd?
	    is.odd = function(n) {
	        return is.number(n) && n % 2 === 1;
	    };

	    // is a given number positive?
	    is.positive = function(n) {
	        return is.number(n) && n > 0;
	    };

	    // is a given number above maximum parameter?
	    is.under = function(n, max) {
	        return is.all.number(n, max) && n < max;
	    };
	    // least method does not support 'all' and 'any' interfaces
	    is.under.api = ['not'];

	    // is a given number within minimum and maximum parameters?
	    is.within = function(n, min, max) {
	        return is.all.number(n, min, max) && n > min && n < max;
	    };
	    // within method does not support 'all' and 'any' interfaces
	    is.within.api = ['not'];

	    // Regexp checks
	    /* -------------------------------------------------------------------------- */
	    // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
	    // Scott Gonzalez: Email address validation

	    // dateString match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits for the day and month, and two or four digits for the year
	    // eppPhone match extensible provisioning protocol format
	    // nanpPhone match north american number plan format
	    // time match hours, minutes, and seconds, 24-hour clock
	    var regexes = {
	        affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
	        alphaNumeric: /^[A-Za-z0-9]+$/,
	        caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
	        creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
	        dateString: /^(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])(?:\2)(?:[0-9]{2})?[0-9]{2}$/,
	        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, // eslint-disable-line no-control-regex
	        eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
	        hexadecimal: /^(?:0x)?[0-9a-fA-F]+$/,
	        hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
	        ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
	        ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
	        nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
	        socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4}$/,
	        timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
	        ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
	        url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
	        usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/
	    };

	    function regexpCheck(regexp, regexes) {
	        is[regexp] = function(value) {
	            return regexes[regexp].test(value);
	        };
	    }

	    // create regexp checks methods from 'regexes' object
	    for (var regexp in regexes) {
	        if (regexes.hasOwnProperty(regexp)) {
	            regexpCheck(regexp, regexes);
	        }
	    }

	    // simplify IP checks by calling the regex helpers for IPv4 and IPv6
	    is.ip = function(value) {
	        return is.ipv4(value) || is.ipv6(value);
	    };

	    // String checks
	    /* -------------------------------------------------------------------------- */

	    // is a given string or sentence capitalized?
	    is.capitalized = function(string) {
	        if (is.not.string(string)) {
	            return false;
	        }
	        var words = string.split(' ');
	        for (var i = 0; i < words.length; i++) {
	            var word = words[i];
	            if (word.length) {
	                var chr = word.charAt(0);
	                if (chr !== chr.toUpperCase()) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    };

	    // is string end with a given target parameter?
	    is.endWith = function(string, target) {
	        if (is.not.string(string)) {
	            return false;
	        }
	        target += '';
	        var position = string.length - target.length;
	        return position >= 0 && string.indexOf(target, position) === position;
	    };
	    // endWith method does not support 'all' and 'any' interfaces
	    is.endWith.api = ['not'];

	    // is a given string include parameter target?
	    is.include = function(string, target) {
	        return string.indexOf(target) > -1;
	    };
	    // include method does not support 'all' and 'any' interfaces
	    is.include.api = ['not'];

	    // is a given string all lowercase?
	    is.lowerCase = function(string) {
	        return is.string(string) && string === string.toLowerCase();
	    };

	    // is a given string palindrome?
	    is.palindrome = function(string) {
	        if (is.not.string(string)) {
	            return false;
	        }
	        string = string.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
	        var length = string.length - 1;
	        for (var i = 0, half = Math.floor(length / 2); i <= half; i++) {
	            if (string.charAt(i) !== string.charAt(length - i)) {
	                return false;
	            }
	        }
	        return true;
	    };

	    // is a given value space?
	    // horizantal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32
	    is.space = function(value) {
	        if (is.not.char(value)) {
	            return false;
	        }
	        var charCode = value.charCodeAt(0);
	        return (charCode > 8 && charCode < 14) || charCode === 32;
	    };

	    // is string start with a given target parameter?
	    is.startWith = function(string, target) {
	        return is.string(string) && string.indexOf(target) === 0;
	    };
	    // startWith method does not support 'all' and 'any' interfaces
	    is.startWith.api = ['not'];

	    // is a given string all uppercase?
	    is.upperCase = function(string) {
	        return is.string(string) && string === string.toUpperCase();
	    };

	    // Time checks
	    /* -------------------------------------------------------------------------- */

	    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	    var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

	    // is a given dates day equal given day parameter?
	    is.day = function(date, day) {
	        return is.date(date) && day.toLowerCase() === days[date.getDay()];
	    };
	    // day method does not support 'all' and 'any' interfaces
	    is.day.api = ['not'];

	    // is a given date in daylight saving time?
	    is.dayLightSavingTime = function(date) {
	        var january = new Date(date.getFullYear(), 0, 1);
	        var july = new Date(date.getFullYear(), 6, 1);
	        var stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
	        return date.getTimezoneOffset() < stdTimezoneOffset;
	    };

	    // is a given date future?
	    is.future = function(date) {
	        var now = new Date();
	        return is.date(date) && date.getTime() > now.getTime();
	    };

	    // is date within given range?
	    is.inDateRange = function(date, start, end) {
	        if (is.not.date(date) || is.not.date(start) || is.not.date(end)) {
	            return false;
	        }
	        var stamp = date.getTime();
	        return stamp > start.getTime() && stamp < end.getTime();
	    };
	    // inDateRange method does not support 'all' and 'any' interfaces
	    is.inDateRange.api = ['not'];

	    // is a given date in last month range?
	    is.inLastMonth = function(date) {
	        return is.inDateRange(date, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());
	    };

	    // is a given date in last week range?
	    is.inLastWeek = function(date) {
	        return is.inDateRange(date, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());
	    };

	    // is a given date in last year range?
	    is.inLastYear = function(date) {
	        return is.inDateRange(date, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
	    };

	    // is a given date in next month range?
	    is.inNextMonth = function(date) {
	        return is.inDateRange(date, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));
	    };

	    // is a given date in next week range?
	    is.inNextWeek = function(date) {
	        return is.inDateRange(date, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));
	    };

	    // is a given date in next year range?
	    is.inNextYear = function(date) {
	        return is.inDateRange(date, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
	    };

	    // is the given year a leap year?
	    is.leapYear = function(year) {
	        return is.number(year) && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
	    };

	    // is a given dates month equal given month parameter?
	    is.month = function(date, month) {
	        return is.date(date) && month.toLowerCase() === months[date.getMonth()];
	    };
	    // month method does not support 'all' and 'any' interfaces
	    is.month.api = ['not'];

	    // is a given date past?
	    is.past = function(date) {
	        var now = new Date();
	        return is.date(date) && date.getTime() < now.getTime();
	    };

	    // is a given date in the parameter quarter?
	    is.quarterOfYear = function(date, quarter) {
	        return is.date(date) && is.number(quarter) && quarter === Math.floor((date.getMonth() + 3) / 3);
	    };
	    // quarterOfYear method does not support 'all' and 'any' interfaces
	    is.quarterOfYear.api = ['not'];

	    // is a given date indicate today?
	    is.today = function(date) {
	        var now = new Date();
	        var todayString = now.toDateString();
	        return is.date(date) && date.toDateString() === todayString;
	    };

	    // is a given date indicate tomorrow?
	    is.tomorrow = function(date) {
	        var now = new Date();
	        var tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();
	        return is.date(date) && date.toDateString() === tomorrowString;
	    };

	    // is a given date weekend?
	    // 6: Saturday, 0: Sunday
	    is.weekend = function(date) {
	        return is.date(date) && (date.getDay() === 6 || date.getDay() === 0);
	    };

	    // is a given date weekday?
	    is.weekday = not(is.weekend);

	    // is a given dates year equal given year parameter?
	    is.year = function(date, year) {
	        return is.date(date) && is.number(year) && year === date.getFullYear();
	    };
	    // year method does not support 'all' and 'any' interfaces
	    is.year.api = ['not'];

	    // is a given date indicate yesterday?
	    is.yesterday = function(date) {
	        var now = new Date();
	        var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
	        return is.date(date) && date.toDateString() === yesterdayString;
	    };

	    // Environment checks
	    /* -------------------------------------------------------------------------- */

	    var freeGlobal = is.windowObject(typeof global == 'object' && global) && global;
	    var freeSelf = is.windowObject(typeof self == 'object' && self) && self;
	    var thisGlobal = is.windowObject(typeof this == 'object' && this) && this;
	    var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

	    var document = freeSelf && freeSelf.document;
	    var previousIs = root.is;

	    // store navigator properties to use later
	    var navigator = freeSelf && freeSelf.navigator;
	    var appVersion = (navigator && navigator.appVersion || '').toLowerCase();
	    var userAgent = (navigator && navigator.userAgent || '').toLowerCase();
	    var vendor = (navigator && navigator.vendor || '').toLowerCase();

	    // is current device android?
	    is.android = function() {
	        return /android/.test(userAgent);
	    };
	    // android method does not support 'all' and 'any' interfaces
	    is.android.api = ['not'];

	    // is current device android phone?
	    is.androidPhone = function() {
	        return /android/.test(userAgent) && /mobile/.test(userAgent);
	    };
	    // androidPhone method does not support 'all' and 'any' interfaces
	    is.androidPhone.api = ['not'];

	    // is current device android tablet?
	    is.androidTablet = function() {
	        return /android/.test(userAgent) && !/mobile/.test(userAgent);
	    };
	    // androidTablet method does not support 'all' and 'any' interfaces
	    is.androidTablet.api = ['not'];

	    // is current device blackberry?
	    is.blackberry = function() {
	        return /blackberry/.test(userAgent) || /bb10/.test(userAgent);
	    };
	    // blackberry method does not support 'all' and 'any' interfaces
	    is.blackberry.api = ['not'];

	    // is current browser chrome?
	    // parameter is optional
	    is.chrome = function(range) {
	        var match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
	        return match !== null && compareVersion(match[1], range);
	    };
	    // chrome method does not support 'all' and 'any' interfaces
	    is.chrome.api = ['not'];

	    // is current device desktop?
	    is.desktop = function() {
	        return is.not.mobile() && is.not.tablet();
	    };
	    // desktop method does not support 'all' and 'any' interfaces
	    is.desktop.api = ['not'];

	    // is current browser edge?
	    // parameter is optional
	    is.edge = function(range) {
	        var match = userAgent.match(/edge\/(\d+)/);
	        return match !== null && compareVersion(match[1], range);
	    };
	    // edge method does not support 'all' and 'any' interfaces
	    is.edge.api = ['not'];

	    // is current browser firefox?
	    // parameter is optional
	    is.firefox = function(range) {
	        var match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
	        return match !== null && compareVersion(match[1], range);
	    };
	    // firefox method does not support 'all' and 'any' interfaces
	    is.firefox.api = ['not'];

	    // is current browser internet explorer?
	    // parameter is optional
	    is.ie = function(range) {
	        var match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/);
	        return match !== null && compareVersion(match[1], range);
	    };
	    // ie method does not support 'all' and 'any' interfaces
	    is.ie.api = ['not'];

	    // is current device ios?
	    is.ios = function() {
	        return is.iphone() || is.ipad() || is.ipod();
	    };
	    // ios method does not support 'all' and 'any' interfaces
	    is.ios.api = ['not'];

	    // is current device ipad?
	    // parameter is optional
	    is.ipad = function(range) {
	        var match = userAgent.match(/ipad.+?os (\d+)/);
	        return match !== null && compareVersion(match[1], range);
	    };
	    // ipad method does not support 'all' and 'any' interfaces
	    is.ipad.api = ['not'];

	    // is current device iphone?
	    // parameter is optional
	    is.iphone = function(range) {
	        // original iPhone doesn't have the os portion of the UA
	        var match = userAgent.match(/iphone(?:.+?os (\d+))?/);
	        return match !== null && compareVersion(match[1] || 1, range);
	    };
	    // iphone method does not support 'all' and 'any' interfaces
	    is.iphone.api = ['not'];

	    // is current device ipod?
	    // parameter is optional
	    is.ipod = function(range) {
	        var match = userAgent.match(/ipod.+?os (\d+)/);
	        return match !== null && compareVersion(match[1], range);
	    };
	    // ipod method does not support 'all' and 'any' interfaces
	    is.ipod.api = ['not'];

	    // is current operating system linux?
	    is.linux = function() {
	        return /linux/.test(appVersion);
	    };
	    // linux method does not support 'all' and 'any' interfaces
	    is.linux.api = ['not'];

	    // is current operating system mac?
	    is.mac = function() {
	        return /mac/.test(appVersion);
	    };
	    // mac method does not support 'all' and 'any' interfaces
	    is.mac.api = ['not'];

	    // is current device mobile?
	    is.mobile = function() {
	        return is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() || is.windowsPhone();
	    };
	    // mobile method does not support 'all' and 'any' interfaces
	    is.mobile.api = ['not'];

	    // is current state offline?
	    is.offline = not(is.online);
	    // offline method does not support 'all' and 'any' interfaces
	    is.offline.api = ['not'];

	    // is current state online?
	    is.online = function() {
	        return !navigator || navigator.onLine === true;
	    };
	    // online method does not support 'all' and 'any' interfaces
	    is.online.api = ['not'];

	    // is current browser opera?
	    // parameter is optional
	    is.opera = function(range) {
	        var match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
	        return match !== null && compareVersion(match[1], range);
	    };
	    // opera method does not support 'all' and 'any' interfaces
	    is.opera.api = ['not'];

	    // is current browser phantomjs?
	    // parameter is optional
	    is.phantom = function(range) {
	        var match = userAgent.match(/phantomjs\/(\d+)/);
	        return match !== null && compareVersion(match[1], range);
	    };
	    // phantom method does not support 'all' and 'any' interfaces
	    is.phantom.api = ['not'];

	    // is current browser safari?
	    // parameter is optional
	    is.safari = function(range) {
	        var match = userAgent.match(/version\/(\d+).+?safari/);
	        return match !== null && compareVersion(match[1], range);
	    };
	    // safari method does not support 'all' and 'any' interfaces
	    is.safari.api = ['not'];

	    // is current device tablet?
	    is.tablet = function() {
	        return is.ipad() || is.androidTablet() || is.windowsTablet();
	    };
	    // tablet method does not support 'all' and 'any' interfaces
	    is.tablet.api = ['not'];

	    // is current device supports touch?
	    is.touchDevice = function() {
	        return !!document && ('ontouchstart' in freeSelf ||
	            ('DocumentTouch' in freeSelf && document instanceof DocumentTouch));
	    };
	    // touchDevice method does not support 'all' and 'any' interfaces
	    is.touchDevice.api = ['not'];

	    // is current operating system windows?
	    is.windows = function() {
	        return /win/.test(appVersion);
	    };
	    // windows method does not support 'all' and 'any' interfaces
	    is.windows.api = ['not'];

	    // is current device windows phone?
	    is.windowsPhone = function() {
	        return is.windows() && /phone/.test(userAgent);
	    };
	    // windowsPhone method does not support 'all' and 'any' interfaces
	    is.windowsPhone.api = ['not'];

	    // is current device windows tablet?
	    is.windowsTablet = function() {
	        return is.windows() && is.not.windowsPhone() && /touch/.test(userAgent);
	    };
	    // windowsTablet method does not support 'all' and 'any' interfaces
	    is.windowsTablet.api = ['not'];

	    // Object checks
	    /* -------------------------------------------------------------------------- */

	    // has a given object got parameterized count property?
	    is.propertyCount = function(object, count) {
	        if (is.not.object(object) || is.not.number(count)) {
	            return false;
	        }
	        var n = 0;
	        for (var property in object) {
	            if (hasOwnProperty.call(object, property) && ++n > count) {
	                return false;
	            }
	        }
	        return n === count;
	    };
	    // propertyCount method does not support 'all' and 'any' interfaces
	    is.propertyCount.api = ['not'];

	    // is given object has parameterized property?
	    is.propertyDefined = function(object, property) {
	        return is.object(object) && is.string(property) && property in object;
	    };
	    // propertyDefined method does not support 'all' and 'any' interfaces
	    is.propertyDefined.api = ['not'];

	    // Array checks
	    /* -------------------------------------------------------------------------- */

	    // is a given item in an array?
	    is.inArray = function(value, array) {
	        if (is.not.array(array)) {
	            return false;
	        }
	        for (var i = 0; i < array.length; i++) {
	            if (array[i] === value) {
	                return true;
	            }
	        }
	        return false;
	    };
	    // inArray method does not support 'all' and 'any' interfaces
	    is.inArray.api = ['not'];

	    // is a given array sorted?
	    is.sorted = function(array, sign) {
	        if (is.not.array(array)) {
	            return false;
	        }
	        var predicate = comparator[sign] || comparator['>='];
	        for (var i = 1; i < array.length; i++) {
	            if (!predicate(array[i], array[i - 1])) {
	                return false;
	            }
	        }
	        return true;
	    };

	    // API
	    // Set 'not', 'all' and 'any' interfaces to methods based on their api property
	    /* -------------------------------------------------------------------------- */

	    function setInterfaces() {
	        var options = is;
	        for (var option in options) {
	            if (hasOwnProperty.call(options, option) && is['function'](options[option])) {
	                var interfaces = options[option].api || ['not', 'all', 'any'];
	                for (var i = 0; i < interfaces.length; i++) {
	                    if (interfaces[i] === 'not') {
	                        is.not[option] = not(is[option]);
	                    }
	                    if (interfaces[i] === 'all') {
	                        is.all[option] = all(is[option]);
	                    }
	                    if (interfaces[i] === 'any') {
	                        is.any[option] = any(is[option]);
	                    }
	                }
	            }
	        }
	    }
	    setInterfaces();

	    // Configuration methods
	    // Intentionally added after setInterfaces function
	    /* -------------------------------------------------------------------------- */

	    // change namespace of library to prevent name collisions
	    // var preferredName = is.setNamespace();
	    // preferredName.odd(3);
	    // => true
	    is.setNamespace = function() {
	        root.is = previousIs;
	        return this;
	    };

	    // set optional regexes to methods
	    is.setRegexp = function(regexp, name) {
	        for (var r in regexes) {
	            if (hasOwnProperty.call(regexes, r) && (name === r)) {
	                regexes[r] = regexp;
	            }
	        }
	    };

	    return is;
	}));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var observable = _interopDefault(__webpack_require__(23));

	/**
	 * Simple client-side router
	 * @module riot-route
	 */

	var RE_ORIGIN = /^.+?\/\/+[^\/]+/;
	var EVENT_LISTENER = 'EventListener';
	var REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER;
	var ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER;
	var HAS_ATTRIBUTE = 'hasAttribute';
	var POPSTATE = 'popstate';
	var HASHCHANGE = 'hashchange';
	var TRIGGER = 'trigger';
	var MAX_EMIT_STACK_LEVEL = 3;
	var win = typeof window != 'undefined' && window;
	var doc = typeof document != 'undefined' && document;
	var hist = win && history;
	var loc = win && (hist.location || win.location);
	var prot = Router.prototype;
	var clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click';
	var central = observable();

	var started = false;
	var routeFound = false;
	var debouncedEmit;
	var base;
	var current;
	var parser;
	var secondParser;
	var emitStack = [];
	var emitStackLevel = 0;

	/**
	 * Default parser. You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_PARSER(path) {
	  return path.split(/[/?#]/)
	}

	/**
	 * Default parser (second). You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @param {string} filter - filter string (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_SECOND_PARSER(path, filter) {
	  var f = filter
	    .replace(/\?/g, '\\?')
	    .replace(/\*/g, '([^/?#]+?)')
	    .replace(/\.\./, '.*');
	  var re = new RegExp(("^" + f + "$"));
	  var args = path.match(re);

	  if (args) { return args.slice(1) }
	}

	/**
	 * Simple/cheap debounce implementation
	 * @param   {function} fn - callback
	 * @param   {number} delay - delay in seconds
	 * @returns {function} debounced function
	 */
	function debounce(fn, delay) {
	  var t;
	  return function () {
	    clearTimeout(t);
	    t = setTimeout(fn, delay);
	  }
	}

	/**
	 * Set the window listeners to trigger the routes
	 * @param {boolean} autoExec - see route.start
	 */
	function start(autoExec) {
	  debouncedEmit = debounce(emit, 1);
	  win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit);
	  win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	  doc[ADD_EVENT_LISTENER](clickEvent, click);
	  if (autoExec) { emit(true); }
	}

	/**
	 * Router class
	 */
	function Router() {
	  this.$ = [];
	  observable(this); // make it observable
	  central.on('stop', this.s.bind(this));
	  central.on('emit', this.e.bind(this));
	}

	function normalize(path) {
	  return path.replace(/^\/|\/$/, '')
	}

	function isString(str) {
	  return typeof str == 'string'
	}

	/**
	 * Get the part after domain name
	 * @param {string} href - fullpath
	 * @returns {string} path from root
	 */
	function getPathFromRoot(href) {
	  return (href || loc.href).replace(RE_ORIGIN, '')
	}

	/**
	 * Get the part after base
	 * @param {string} href - fullpath
	 * @returns {string} path from base
	 */
	function getPathFromBase(href) {
	  return base[0] === '#'
	    ? (href || loc.href || '').split(base)[1] || ''
	    : (loc ? getPathFromRoot(href) : href || '').replace(base, '')
	}

	function emit(force) {
	  // the stack is needed for redirections
	  var isRoot = emitStackLevel === 0;
	  if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) { return }

	  emitStackLevel++;
	  emitStack.push(function() {
	    var path = getPathFromBase();
	    if (force || path !== current) {
	      central[TRIGGER]('emit', path);
	      current = path;
	    }
	  });
	  if (isRoot) {
	    var first;
	    while (first = emitStack.shift()) { first(); } // stack increses within this call
	    emitStackLevel = 0;
	  }
	}

	function click(e) {
	  if (
	    e.which !== 1 // not left click
	    || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
	    || e.defaultPrevented // or default prevented
	  ) { return }

	  var el = e.target;
	  while (el && el.nodeName !== 'A') { el = el.parentNode; }

	  if (
	    !el || el.nodeName !== 'A' // not A tag
	    || el[HAS_ATTRIBUTE]('download') // has download attr
	    || !el[HAS_ATTRIBUTE]('href') // has no href attr
	    || el.target && el.target !== '_self' // another window or frame
	    || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) === -1 // cross origin
	  ) { return }

	  if (el.href !== loc.href
	    && (
	      el.href.split('#')[0] === loc.href.split('#')[0] // internal jump
	      || base[0] !== '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
	      || base[0] === '#' && el.href.split(base)[0] !== loc.href.split(base)[0] // outside of #base
	      || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
	    )) { return }

	  e.preventDefault();
	}

	/**
	 * Go to the path
	 * @param {string} path - destination path
	 * @param {string} title - page title
	 * @param {boolean} shouldReplace - use replaceState or pushState
	 * @returns {boolean} - route not found flag
	 */
	function go(path, title, shouldReplace) {
	  // Server-side usage: directly execute handlers for the path
	  if (!hist) { return central[TRIGGER]('emit', getPathFromBase(path)) }

	  path = base + normalize(path);
	  title = title || doc.title;
	  // browsers ignores the second parameter `title`
	  shouldReplace
	    ? hist.replaceState(null, title, path)
	    : hist.pushState(null, title, path);
	  // so we need to set it manually
	  doc.title = title;
	  routeFound = false;
	  emit();
	  return routeFound
	}

	/**
	 * Go to path or set action
	 * a single string:                go there
	 * two strings:                    go there with setting a title
	 * two strings and boolean:        replace history with setting a title
	 * a single function:              set an action on the default route
	 * a string/RegExp and a function: set an action on the route
	 * @param {(string|function)} first - path / action / filter
	 * @param {(string|RegExp|function)} second - title / action
	 * @param {boolean} third - replace flag
	 */
	prot.m = function(first, second, third) {
	  if (isString(first) && (!second || isString(second))) { go(first, second, third || false); }
	  else if (second) { this.r(first, second); }
	  else { this.r('@', first); }
	};

	/**
	 * Stop routing
	 */
	prot.s = function() {
	  this.off('*');
	  this.$ = [];
	};

	/**
	 * Emit
	 * @param {string} path - path
	 */
	prot.e = function(path) {
	  this.$.concat('@').some(function(filter) {
	    var args = (filter === '@' ? parser : secondParser)(normalize(path), normalize(filter));
	    if (typeof args != 'undefined') {
	      this[TRIGGER].apply(null, [filter].concat(args));
	      return routeFound = true // exit from loop
	    }
	  }, this);
	};

	/**
	 * Register route
	 * @param {string} filter - filter for matching to url
	 * @param {function} action - action to register
	 */
	prot.r = function(filter, action) {
	  if (filter !== '@') {
	    filter = '/' + normalize(filter);
	    this.$.push(filter);
	  }
	  this.on(filter, action);
	};

	var mainRouter = new Router();
	var route = mainRouter.m.bind(mainRouter);

	/**
	 * Create a sub router
	 * @returns {function} the method of a new Router object
	 */
	route.create = function() {
	  var newSubRouter = new Router();
	  // assign sub-router's main method
	  var router = newSubRouter.m.bind(newSubRouter);
	  // stop only this sub-router
	  router.stop = newSubRouter.s.bind(newSubRouter);
	  return router
	};

	/**
	 * Set the base of url
	 * @param {(str|RegExp)} arg - a new base or '#' or '#!'
	 */
	route.base = function(arg) {
	  base = arg || '#';
	  current = getPathFromBase(); // recalculate current path
	};

	/** Exec routing right now **/
	route.exec = function() {
	  emit(true);
	};

	/**
	 * Replace the default router to yours
	 * @param {function} fn - your parser function
	 * @param {function} fn2 - your secondParser function
	 */
	route.parser = function(fn, fn2) {
	  if (!fn && !fn2) {
	    // reset parser for testing...
	    parser = DEFAULT_PARSER;
	    secondParser = DEFAULT_SECOND_PARSER;
	  }
	  if (fn) { parser = fn; }
	  if (fn2) { secondParser = fn2; }
	};

	/**
	 * Helper function to get url query as an object
	 * @returns {object} parsed query
	 */
	route.query = function() {
	  var q = {};
	  var href = loc.href || current;
	  href.replace(/[?&](.+?)=([^&]*)/g, function(_, k, v) { q[k] = v; });
	  return q
	};

	/** Stop routing **/
	route.stop = function () {
	  if (started) {
	    if (win) {
	      win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit);
	      win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	      doc[REMOVE_EVENT_LISTENER](clickEvent, click);
	    }
	    central[TRIGGER]('stop');
	    started = false;
	  }
	};

	/**
	 * Start routing
	 * @param {boolean} autoExec - automatically exec after starting if true
	 */
	route.start = function (autoExec) {
	  if (!started) {
	    if (win) {
	      if (document.readyState === 'interactive' || document.readyState === 'complete') {
	        start(autoExec);
	      }
	      else {
	        document.onreadystatechange = function () {
	          if (document.readyState === 'interactive') {
	            // the timeout is needed to solve
	            // a weird safari bug https://github.com/riot/route/issues/33
	            setTimeout(function() { start(autoExec); }, 1);
	          }
	        };
	      }
	    }
	    started = true;
	  }
	};

	/** Prepare the router **/
	route.base();
	route.parser();

	module.exports = route;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	;(function(window, undefined) {var observable = function(el) {

	  /**
	   * Extend the original object or create a new empty one
	   * @type { Object }
	   */

	  el = el || {}

	  /**
	   * Private variables
	   */
	  var callbacks = {},
	    slice = Array.prototype.slice

	  /**
	   * Public Api
	   */

	  // extend the el object adding the observable methods
	  Object.defineProperties(el, {
	    /**
	     * Listen to the given `event` ands
	     * execute the `callback` each time an event is triggered.
	     * @param  { String } event - event id
	     * @param  { Function } fn - callback function
	     * @returns { Object } el
	     */
	    on: {
	      value: function(event, fn) {
	        if (typeof fn == 'function')
	          (callbacks[event] = callbacks[event] || []).push(fn)
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Removes the given `event` listeners
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    off: {
	      value: function(event, fn) {
	        if (event == '*' && !fn) callbacks = {}
	        else {
	          if (fn) {
	            var arr = callbacks[event]
	            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	              if (cb == fn) arr.splice(i--, 1)
	            }
	          } else delete callbacks[event]
	        }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Listen to the given `event` and
	     * execute the `callback` at most once
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    one: {
	      value: function(event, fn) {
	        function on() {
	          el.off(event, on)
	          fn.apply(el, arguments)
	        }
	        return el.on(event, on)
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Execute all callback functions that listen to
	     * the given `event`
	     * @param   { String } event - event id
	     * @returns { Object } el
	     */
	    trigger: {
	      value: function(event) {

	        // getting the arguments
	        var arglen = arguments.length - 1,
	          args = new Array(arglen),
	          fns,
	          fn,
	          i

	        for (i = 0; i < arglen; i++) {
	          args[i] = arguments[i + 1] // skip first argument
	        }

	        fns = slice.call(callbacks[event] || [], 0)

	        for (i = 0; fn = fns[i]; ++i) {
	          fn.apply(el, args)
	        }

	        if (callbacks['*'] && event != '*')
	          el.trigger.apply(el, ['*', event].concat(args))

	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    }
	  })

	  return el

	}
	  /* istanbul ignore next */
	  // support CommonJS, AMD & browser
	  if (true)
	    module.exports = observable
	  else if (typeof define === 'function' && define.amd)
	    define(function() { return observable })
	  else
	    window.observable = observable

	})(typeof window != 'undefined' ? window : undefined);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	
	var Keyboard = __webpack_require__(25);
	var Locale   = __webpack_require__(26);
	var KeyCombo = __webpack_require__(27);

	var keyboard = new Keyboard();

	keyboard.setLocale('us', __webpack_require__(28));

	exports          = module.exports = keyboard;
	exports.Keyboard = Keyboard;
	exports.Locale   = Locale;
	exports.KeyCombo = KeyCombo;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var Locale = __webpack_require__(26);
	var KeyCombo = __webpack_require__(27);


	function Keyboard(targetWindow, targetElement, platform, userAgent) {
	  this._locale               = null;
	  this._currentContext       = null;
	  this._contexts             = {};
	  this._listeners            = [];
	  this._appliedListeners     = [];
	  this._locales              = {};
	  this._targetElement        = null;
	  this._targetWindow         = null;
	  this._targetPlatform       = '';
	  this._targetUserAgent      = '';
	  this._isModernBrowser      = false;
	  this._targetKeyDownBinding = null;
	  this._targetKeyUpBinding   = null;
	  this._targetResetBinding   = null;
	  this._paused               = false;

	  this.setContext('global');
	  this.watch(targetWindow, targetElement, platform, userAgent);
	}

	Keyboard.prototype.setLocale = function(localeName, localeBuilder) {
	  var locale = null;
	  if (typeof localeName === 'string') {

	    if (localeBuilder) {
	      locale = new Locale(localeName);
	      localeBuilder(locale, this._targetPlatform, this._targetUserAgent);
	    } else {
	      locale = this._locales[localeName] || null;
	    }
	  } else {
	    locale     = localeName;
	    localeName = locale._localeName;
	  }

	  this._locale              = locale;
	  this._locales[localeName] = locale;
	  if (locale) {
	    this._locale.pressedKeys = locale.pressedKeys;
	  }
	};

	Keyboard.prototype.getLocale = function(localName) {
	  localName || (localName = this._locale.localeName);
	  return this._locales[localName] || null;
	};

	Keyboard.prototype.bind = function(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault) {
	  if (keyComboStr === null || typeof keyComboStr === 'function') {
	    preventRepeatByDefault = releaseHandler;
	    releaseHandler         = pressHandler;
	    pressHandler           = keyComboStr;
	    keyComboStr            = null;
	  }

	  if (
	    keyComboStr &&
	    typeof keyComboStr === 'object' &&
	    typeof keyComboStr.length === 'number'
	  ) {
	    for (var i = 0; i < keyComboStr.length; i += 1) {
	      this.bind(keyComboStr[i], pressHandler, releaseHandler);
	    }
	    return;
	  }

	  this._listeners.push({
	    keyCombo               : keyComboStr ? new KeyCombo(keyComboStr) : null,
	    pressHandler           : pressHandler           || null,
	    releaseHandler         : releaseHandler         || null,
	    preventRepeat          : preventRepeatByDefault || false,
	    preventRepeatByDefault : preventRepeatByDefault || false
	  });
	};
	Keyboard.prototype.addListener = Keyboard.prototype.bind;
	Keyboard.prototype.on          = Keyboard.prototype.bind;

	Keyboard.prototype.unbind = function(keyComboStr, pressHandler, releaseHandler) {
	  if (keyComboStr === null || typeof keyComboStr === 'function') {
	    releaseHandler = pressHandler;
	    pressHandler   = keyComboStr;
	    keyComboStr = null;
	  }

	  if (
	    keyComboStr &&
	    typeof keyComboStr === 'object' &&
	    typeof keyComboStr.length === 'number'
	  ) {
	    for (var i = 0; i < keyComboStr.length; i += 1) {
	      this.unbind(keyComboStr[i], pressHandler, releaseHandler);
	    }
	    return;
	  }

	  for (var i = 0; i < this._listeners.length; i += 1) {
	    var listener = this._listeners[i];

	    var comboMatches          = !keyComboStr && !listener.keyCombo ||
	                                listener.keyCombo && listener.keyCombo.isEqual(keyComboStr);
	    var pressHandlerMatches   = !pressHandler && !releaseHandler ||
	                                !pressHandler && !listener.pressHandler ||
	                                pressHandler === listener.pressHandler;
	    var releaseHandlerMatches = !pressHandler && !releaseHandler ||
	                                !releaseHandler && !listener.releaseHandler ||
	                                releaseHandler === listener.releaseHandler;

	    if (comboMatches && pressHandlerMatches && releaseHandlerMatches) {
	      this._listeners.splice(i, 1);
	      i -= 1;
	    }
	  }
	};
	Keyboard.prototype.removeListener = Keyboard.prototype.unbind;
	Keyboard.prototype.off            = Keyboard.prototype.unbind;

	Keyboard.prototype.setContext = function(contextName) {
	  if(this._locale) { this.releaseAllKeys(); }

	  if (!this._contexts[contextName]) {
	    this._contexts[contextName] = [];
	  }
	  this._listeners      = this._contexts[contextName];
	  this._currentContext = contextName;
	};

	Keyboard.prototype.getContext = function() {
	  return this._currentContext;
	};

	Keyboard.prototype.withContext = function(contextName, callback) {
	  var previousContextName = this.getContext();
	  this.setContext(contextName);

	  callback();

	  this.setContext(previousContextName);
	};

	Keyboard.prototype.watch = function(targetWindow, targetElement, targetPlatform, targetUserAgent) {
	  var _this = this;

	  this.stop();

	  if (!targetWindow) {
	    if (!global.addEventListener && !global.attachEvent) {
	      throw new Error('Cannot find global functions addEventListener or attachEvent.');
	    }
	    targetWindow = global;
	  }

	  if (typeof targetWindow.nodeType === 'number') {
	    targetUserAgent = targetPlatform;
	    targetPlatform  = targetElement;
	    targetElement   = targetWindow;
	    targetWindow    = global;
	  }

	  if (!targetWindow.addEventListener && !targetWindow.attachEvent) {
	    throw new Error('Cannot find addEventListener or attachEvent methods on targetWindow.');
	  }

	  this._isModernBrowser = !!targetWindow.addEventListener;

	  var userAgent = targetWindow.navigator && targetWindow.navigator.userAgent || '';
	  var platform  = targetWindow.navigator && targetWindow.navigator.platform  || '';

	  targetElement   && targetElement   !== null || (targetElement   = targetWindow.document);
	  targetPlatform  && targetPlatform  !== null || (targetPlatform  = platform);
	  targetUserAgent && targetUserAgent !== null || (targetUserAgent = userAgent);

	  this._targetKeyDownBinding = function(event) {
	    _this.pressKey(event.keyCode, event);
	  };
	  this._targetKeyUpBinding = function(event) {
	    _this.releaseKey(event.keyCode, event);
	  };
	  this._targetResetBinding = function(event) {
	    _this.releaseAllKeys(event)
	  };

	  this._bindEvent(targetElement, 'keydown', this._targetKeyDownBinding);
	  this._bindEvent(targetElement, 'keyup',   this._targetKeyUpBinding);
	  this._bindEvent(targetWindow,  'focus',   this._targetResetBinding);
	  this._bindEvent(targetWindow,  'blur',    this._targetResetBinding);

	  this._targetElement   = targetElement;
	  this._targetWindow    = targetWindow;
	  this._targetPlatform  = targetPlatform;
	  this._targetUserAgent = targetUserAgent;
	};

	Keyboard.prototype.stop = function() {
	  var _this = this;

	  if (!this._targetElement || !this._targetWindow) { return; }

	  this._unbindEvent(this._targetElement, 'keydown', this._targetKeyDownBinding);
	  this._unbindEvent(this._targetElement, 'keyup',   this._targetKeyUpBinding);
	  this._unbindEvent(this._targetWindow,  'focus',   this._targetResetBinding);
	  this._unbindEvent(this._targetWindow,  'blur',    this._targetResetBinding);

	  this._targetWindow  = null;
	  this._targetElement = null;
	};

	Keyboard.prototype.pressKey = function(keyCode, event) {
	  if (this._paused) { return; }
	  if (!this._locale) { throw new Error('Locale not set'); }

	  this._locale.pressKey(keyCode);
	  this._applyBindings(event);
	};

	Keyboard.prototype.releaseKey = function(keyCode, event) {
	  if (this._paused) { return; }
	  if (!this._locale) { throw new Error('Locale not set'); }

	  this._locale.releaseKey(keyCode);
	  this._clearBindings(event);
	};

	Keyboard.prototype.releaseAllKeys = function(event) {
	  if (this._paused) { return; }
	  if (!this._locale) { throw new Error('Locale not set'); }

	  this._locale.pressedKeys.length = 0;
	  this._clearBindings(event);
	};

	Keyboard.prototype.pause = function() {
	  if (this._paused) { return; }
	  if (this._locale) { this.releaseAllKeys(); }
	  this._paused = true;
	};

	Keyboard.prototype.resume = function() {
	  this._paused = false;
	};

	Keyboard.prototype.reset = function() {
	  this.releaseAllKeys();
	  this._listeners.length = 0;
	};

	Keyboard.prototype._bindEvent = function(targetElement, eventName, handler) {
	  return this._isModernBrowser ?
	    targetElement.addEventListener(eventName, handler, false) :
	    targetElement.attachEvent('on' + eventName, handler);
	};

	Keyboard.prototype._unbindEvent = function(targetElement, eventName, handler) {
	  return this._isModernBrowser ?
	    targetElement.removeEventListener(eventName, handler, false) :
	    targetElement.detachEvent('on' + eventName, handler);
	};

	Keyboard.prototype._getGroupedListeners = function() {
	  var listenerGroups   = [];
	  var listenerGroupMap = [];

	  var listeners = this._listeners;
	  if (this._currentContext !== 'global') {
	    listeners = [].concat(listeners, this._contexts.global);
	  }

	  listeners.sort(function(a, b) {
	    return (b.keyCombo ? b.keyCombo.keyNames.length : 0) - (a.keyCombo ? a.keyCombo.keyNames.length : 0);
	  }).forEach(function(l) {
	    var mapIndex = -1;
	    for (var i = 0; i < listenerGroupMap.length; i += 1) {
	      if (listenerGroupMap[i] === null && l.keyCombo === null ||
	          listenerGroupMap[i] !== null && listenerGroupMap[i].isEqual(l.keyCombo)) {
	        mapIndex = i;
	      }
	    }
	    if (mapIndex === -1) {
	      mapIndex = listenerGroupMap.length;
	      listenerGroupMap.push(l.keyCombo);
	    }
	    if (!listenerGroups[mapIndex]) {
	      listenerGroups[mapIndex] = [];
	    }
	    listenerGroups[mapIndex].push(l);
	  });
	  return listenerGroups;
	};

	Keyboard.prototype._applyBindings = function(event) {
	  var preventRepeat = false;

	  event || (event = {});
	  event.preventRepeat = function() { preventRepeat = true; };
	  event.pressedKeys   = this._locale.pressedKeys.slice(0);

	  var pressedKeys    = this._locale.pressedKeys.slice(0);
	  var listenerGroups = this._getGroupedListeners();


	  for (var i = 0; i < listenerGroups.length; i += 1) {
	    var listeners = listenerGroups[i];
	    var keyCombo  = listeners[0].keyCombo;

	    if (keyCombo === null || keyCombo.check(pressedKeys)) {
	      for (var j = 0; j < listeners.length; j += 1) {
	        var listener = listeners[j];

	        if (keyCombo === null) {
	          listener = {
	            keyCombo               : new KeyCombo(pressedKeys.join('+')),
	            pressHandler           : listener.pressHandler,
	            releaseHandler         : listener.releaseHandler,
	            preventRepeat          : listener.preventRepeat,
	            preventRepeatByDefault : listener.preventRepeatByDefault
	          };
	        }

	        if (listener.pressHandler && !listener.preventRepeat) {
	          listener.pressHandler.call(this, event);
	          if (preventRepeat) {
	            listener.preventRepeat = preventRepeat;
	            preventRepeat          = false;
	          }
	        }

	        if (listener.releaseHandler && this._appliedListeners.indexOf(listener) === -1) {
	          this._appliedListeners.push(listener);
	        }
	      }

	      if (keyCombo) {
	        for (var j = 0; j < keyCombo.keyNames.length; j += 1) {
	          var index = pressedKeys.indexOf(keyCombo.keyNames[j]);
	          if (index !== -1) {
	            pressedKeys.splice(index, 1);
	            j -= 1;
	          }
	        }
	      }
	    }
	  }
	};

	Keyboard.prototype._clearBindings = function(event) {
	  event || (event = {});

	  for (var i = 0; i < this._appliedListeners.length; i += 1) {
	    var listener = this._appliedListeners[i];
	    var keyCombo = listener.keyCombo;
	    if (keyCombo === null || !keyCombo.check(this._locale.pressedKeys)) {
	      listener.preventRepeat = listener.preventRepeatByDefault;
	      listener.releaseHandler.call(this, event);
	      this._appliedListeners.splice(i, 1);
	      i -= 1;
	    }
	  }
	};

	module.exports = Keyboard;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	
	var KeyCombo = __webpack_require__(27);


	function Locale(name) {
	  this.localeName     = name;
	  this.pressedKeys    = [];
	  this._appliedMacros = [];
	  this._keyMap        = {};
	  this._killKeyCodes  = [];
	  this._macros        = [];
	}

	Locale.prototype.bindKeyCode = function(keyCode, keyNames) {
	  if (typeof keyNames === 'string') {
	    keyNames = [keyNames];
	  }

	  this._keyMap[keyCode] = keyNames;
	};

	Locale.prototype.bindMacro = function(keyComboStr, keyNames) {
	  if (typeof keyNames === 'string') {
	    keyNames = [ keyNames ];
	  }

	  var handler = null;
	  if (typeof keyNames === 'function') {
	    handler = keyNames;
	    keyNames = null;
	  }

	  var macro = {
	    keyCombo : new KeyCombo(keyComboStr),
	    keyNames : keyNames,
	    handler  : handler
	  };

	  this._macros.push(macro);
	};

	Locale.prototype.getKeyCodes = function(keyName) {
	  var keyCodes = [];
	  for (var keyCode in this._keyMap) {
	    var index = this._keyMap[keyCode].indexOf(keyName);
	    if (index > -1) { keyCodes.push(keyCode|0); }
	  }
	  return keyCodes;
	};

	Locale.prototype.getKeyNames = function(keyCode) {
	  return this._keyMap[keyCode] || [];
	};

	Locale.prototype.setKillKey = function(keyCode) {
	  if (typeof keyCode === 'string') {
	    var keyCodes = this.getKeyCodes(keyCode);
	    for (var i = 0; i < keyCodes.length; i += 1) {
	      this.setKillKey(keyCodes[i]);
	    }
	    return;
	  }

	  this._killKeyCodes.push(keyCode);
	};

	Locale.prototype.pressKey = function(keyCode) {
	  if (typeof keyCode === 'string') {
	    var keyCodes = this.getKeyCodes(keyCode);
	    for (var i = 0; i < keyCodes.length; i += 1) {
	      this.pressKey(keyCodes[i]);
	    }
	    return;
	  }

	  var keyNames = this.getKeyNames(keyCode);
	  for (var i = 0; i < keyNames.length; i += 1) {
	    if (this.pressedKeys.indexOf(keyNames[i]) === -1) {
	      this.pressedKeys.push(keyNames[i]);
	    }
	  }

	  this._applyMacros();
	};

	Locale.prototype.releaseKey = function(keyCode) {
	  if (typeof keyCode === 'string') {
	    var keyCodes = this.getKeyCodes(keyCode);
	    for (var i = 0; i < keyCodes.length; i += 1) {
	      this.releaseKey(keyCodes[i]);
	    }
	  }

	  else {
	    var keyNames         = this.getKeyNames(keyCode);
	    var killKeyCodeIndex = this._killKeyCodes.indexOf(keyCode);
	    
	    if (killKeyCodeIndex > -1) {
	      this.pressedKeys.length = 0;
	    } else {
	      for (var i = 0; i < keyNames.length; i += 1) {
	        var index = this.pressedKeys.indexOf(keyNames[i]);
	        if (index > -1) {
	          this.pressedKeys.splice(index, 1);
	        }
	      }
	    }

	    this._clearMacros();
	  }
	};

	Locale.prototype._applyMacros = function() {
	  var macros = this._macros.slice(0);
	  for (var i = 0; i < macros.length; i += 1) {
	    var macro = macros[i];
	    if (macro.keyCombo.check(this.pressedKeys)) {
	      if (macro.handler) {
	        macro.keyNames = macro.handler(this.pressedKeys);
	      }
	      for (var j = 0; j < macro.keyNames.length; j += 1) {
	        if (this.pressedKeys.indexOf(macro.keyNames[j]) === -1) {
	          this.pressedKeys.push(macro.keyNames[j]);
	        }
	      }
	      this._appliedMacros.push(macro);
	    }
	  }
	};

	Locale.prototype._clearMacros = function() {
	  for (var i = 0; i < this._appliedMacros.length; i += 1) {
	    var macro = this._appliedMacros[i];
	    if (!macro.keyCombo.check(this.pressedKeys)) {
	      for (var j = 0; j < macro.keyNames.length; j += 1) {
	        var index = this.pressedKeys.indexOf(macro.keyNames[j]);
	        if (index > -1) {
	          this.pressedKeys.splice(index, 1);
	        }
	      }
	      if (macro.handler) {
	        macro.keyNames = null;
	      }
	      this._appliedMacros.splice(i, 1);
	      i -= 1;
	    }
	  }
	};


	module.exports = Locale;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

	
	function KeyCombo(keyComboStr) {
	  this.sourceStr = keyComboStr;
	  this.subCombos = KeyCombo.parseComboStr(keyComboStr);
	  this.keyNames  = this.subCombos.reduce(function(memo, nextSubCombo) {
	    return memo.concat(nextSubCombo);
	  });
	}

	// TODO: Add support for key combo sequences
	KeyCombo.sequenceDeliminator = '>>';
	KeyCombo.comboDeliminator    = '>';
	KeyCombo.keyDeliminator      = '+';

	KeyCombo.parseComboStr = function(keyComboStr) {
	  var subComboStrs = KeyCombo._splitStr(keyComboStr, KeyCombo.comboDeliminator);
	  var combo        = [];

	  for (var i = 0 ; i < subComboStrs.length; i += 1) {
	    combo.push(KeyCombo._splitStr(subComboStrs[i], KeyCombo.keyDeliminator));
	  }
	  return combo;
	};

	KeyCombo.prototype.check = function(pressedKeyNames) {
	  var startingKeyNameIndex = 0;
	  for (var i = 0; i < this.subCombos.length; i += 1) {
	    startingKeyNameIndex = this._checkSubCombo(
	      this.subCombos[i],
	      startingKeyNameIndex,
	      pressedKeyNames
	    );
	    if (startingKeyNameIndex === -1) { return false; }
	  }
	  return true;
	};

	KeyCombo.prototype.isEqual = function(otherKeyCombo) {
	  if (
	    !otherKeyCombo ||
	    typeof otherKeyCombo !== 'string' &&
	    typeof otherKeyCombo !== 'object'
	  ) { return false; }

	  if (typeof otherKeyCombo === 'string') {
	    otherKeyCombo = new KeyCombo(otherKeyCombo);
	  }

	  if (this.subCombos.length !== otherKeyCombo.subCombos.length) {
	    return false;
	  }
	  for (var i = 0; i < this.subCombos.length; i += 1) {
	    if (this.subCombos[i].length !== otherKeyCombo.subCombos[i].length) {
	      return false;
	    }
	  }

	  for (var i = 0; i < this.subCombos.length; i += 1) {
	    var subCombo      = this.subCombos[i];
	    var otherSubCombo = otherKeyCombo.subCombos[i].slice(0);

	    for (var j = 0; j < subCombo.length; j += 1) {
	      var keyName = subCombo[j];
	      var index   = otherSubCombo.indexOf(keyName);

	      if (index > -1) {
	        otherSubCombo.splice(index, 1);
	      }
	    }
	    if (otherSubCombo.length !== 0) {
	      return false;
	    }
	  }

	  return true;
	};

	KeyCombo._splitStr = function(str, deliminator) {
	  var s  = str;
	  var d  = deliminator;
	  var c  = '';
	  var ca = [];

	  for (var ci = 0; ci < s.length; ci += 1) {
	    if (ci > 0 && s[ci] === d && s[ci - 1] !== '\\') {
	      ca.push(c.trim());
	      c = '';
	      ci += 1;
	    }
	    c += s[ci];
	  }
	  if (c) { ca.push(c.trim()); }

	  return ca;
	};

	KeyCombo.prototype._checkSubCombo = function(subCombo, startingKeyNameIndex, pressedKeyNames) {
	  subCombo = subCombo.slice(0);
	  pressedKeyNames = pressedKeyNames.slice(startingKeyNameIndex);

	  var endIndex = startingKeyNameIndex;
	  for (var i = 0; i < subCombo.length; i += 1) {

	    var keyName = subCombo[i];
	    if (keyName[0] === '\\') {
	      var escapedKeyName = keyName.slice(1);
	      if (
	        escapedKeyName === KeyCombo.comboDeliminator ||
	        escapedKeyName === KeyCombo.keyDeliminator
	      ) {
	        keyName = escapedKeyName;
	      }
	    }

	    var index = pressedKeyNames.indexOf(keyName);
	    if (index > -1) {
	      subCombo.splice(i, 1);
	      i -= 1;
	      if (index > endIndex) {
	        endIndex = index;
	      }
	      if (subCombo.length === 0) {
	        return endIndex;
	      }
	    }
	  }
	  return -1;
	};


	module.exports = KeyCombo;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	
	module.exports = function(locale, platform, userAgent) {

	  // general
	  locale.bindKeyCode(3,   ['cancel']);
	  locale.bindKeyCode(8,   ['backspace']);
	  locale.bindKeyCode(9,   ['tab']);
	  locale.bindKeyCode(12,  ['clear']);
	  locale.bindKeyCode(13,  ['enter']);
	  locale.bindKeyCode(16,  ['shift']);
	  locale.bindKeyCode(17,  ['ctrl']);
	  locale.bindKeyCode(18,  ['alt', 'menu']);
	  locale.bindKeyCode(19,  ['pause', 'break']);
	  locale.bindKeyCode(20,  ['capslock']);
	  locale.bindKeyCode(27,  ['escape', 'esc']);
	  locale.bindKeyCode(32,  ['space', 'spacebar']);
	  locale.bindKeyCode(33,  ['pageup']);
	  locale.bindKeyCode(34,  ['pagedown']);
	  locale.bindKeyCode(35,  ['end']);
	  locale.bindKeyCode(36,  ['home']);
	  locale.bindKeyCode(37,  ['left']);
	  locale.bindKeyCode(38,  ['up']);
	  locale.bindKeyCode(39,  ['right']);
	  locale.bindKeyCode(40,  ['down']);
	  locale.bindKeyCode(41,  ['select']);
	  locale.bindKeyCode(42,  ['printscreen']);
	  locale.bindKeyCode(43,  ['execute']);
	  locale.bindKeyCode(44,  ['snapshot']);
	  locale.bindKeyCode(45,  ['insert', 'ins']);
	  locale.bindKeyCode(46,  ['delete', 'del']);
	  locale.bindKeyCode(47,  ['help']);
	  locale.bindKeyCode(145, ['scrolllock', 'scroll']);
	  locale.bindKeyCode(187, ['equal', 'equalsign', '=']);
	  locale.bindKeyCode(188, ['comma', ',']);
	  locale.bindKeyCode(190, ['period', '.']);
	  locale.bindKeyCode(191, ['slash', 'forwardslash', '/']);
	  locale.bindKeyCode(192, ['graveaccent', '`']);
	  locale.bindKeyCode(219, ['openbracket', '[']);
	  locale.bindKeyCode(220, ['backslash', '\\']);
	  locale.bindKeyCode(221, ['closebracket', ']']);
	  locale.bindKeyCode(222, ['apostrophe', '\'']);

	  // 0-9
	  locale.bindKeyCode(48, ['zero', '0']);
	  locale.bindKeyCode(49, ['one', '1']);
	  locale.bindKeyCode(50, ['two', '2']);
	  locale.bindKeyCode(51, ['three', '3']);
	  locale.bindKeyCode(52, ['four', '4']);
	  locale.bindKeyCode(53, ['five', '5']);
	  locale.bindKeyCode(54, ['six', '6']);
	  locale.bindKeyCode(55, ['seven', '7']);
	  locale.bindKeyCode(56, ['eight', '8']);
	  locale.bindKeyCode(57, ['nine', '9']);

	  // numpad
	  locale.bindKeyCode(96, ['numzero', 'num0']);
	  locale.bindKeyCode(97, ['numone', 'num1']);
	  locale.bindKeyCode(98, ['numtwo', 'num2']);
	  locale.bindKeyCode(99, ['numthree', 'num3']);
	  locale.bindKeyCode(100, ['numfour', 'num4']);
	  locale.bindKeyCode(101, ['numfive', 'num5']);
	  locale.bindKeyCode(102, ['numsix', 'num6']);
	  locale.bindKeyCode(103, ['numseven', 'num7']);
	  locale.bindKeyCode(104, ['numeight', 'num8']);
	  locale.bindKeyCode(105, ['numnine', 'num9']);
	  locale.bindKeyCode(106, ['nummultiply', 'num*']);
	  locale.bindKeyCode(107, ['numadd', 'num+']);
	  locale.bindKeyCode(108, ['numenter']);
	  locale.bindKeyCode(109, ['numsubtract', 'num-']);
	  locale.bindKeyCode(110, ['numdecimal', 'num.']);
	  locale.bindKeyCode(111, ['numdivide', 'num/']);
	  locale.bindKeyCode(144, ['numlock', 'num']);

	  // function keys
	  locale.bindKeyCode(112, ['f1']);
	  locale.bindKeyCode(113, ['f2']);
	  locale.bindKeyCode(114, ['f3']);
	  locale.bindKeyCode(115, ['f4']);
	  locale.bindKeyCode(116, ['f5']);
	  locale.bindKeyCode(117, ['f6']);
	  locale.bindKeyCode(118, ['f7']);
	  locale.bindKeyCode(119, ['f8']);
	  locale.bindKeyCode(120, ['f9']);
	  locale.bindKeyCode(121, ['f10']);
	  locale.bindKeyCode(122, ['f11']);
	  locale.bindKeyCode(123, ['f12']);

	  // secondary key symbols
	  locale.bindMacro('shift + `', ['tilde', '~']);
	  locale.bindMacro('shift + 1', ['exclamation', 'exclamationpoint', '!']);
	  locale.bindMacro('shift + 2', ['at', '@']);
	  locale.bindMacro('shift + 3', ['number', '#']);
	  locale.bindMacro('shift + 4', ['dollar', 'dollars', 'dollarsign', '$']);
	  locale.bindMacro('shift + 5', ['percent', '%']);
	  locale.bindMacro('shift + 6', ['caret', '^']);
	  locale.bindMacro('shift + 7', ['ampersand', 'and', '&']);
	  locale.bindMacro('shift + 8', ['asterisk', '*']);
	  locale.bindMacro('shift + 9', ['openparen', '(']);
	  locale.bindMacro('shift + 0', ['closeparen', ')']);
	  locale.bindMacro('shift + -', ['underscore', '_']);
	  locale.bindMacro('shift + =', ['plus', '+']);
	  locale.bindMacro('shift + [', ['opencurlybrace', 'opencurlybracket', '{']);
	  locale.bindMacro('shift + ]', ['closecurlybrace', 'closecurlybracket', '}']);
	  locale.bindMacro('shift + \\', ['verticalbar', '|']);
	  locale.bindMacro('shift + ;', ['colon', ':']);
	  locale.bindMacro('shift + \'', ['quotationmark', '\'']);
	  locale.bindMacro('shift + !,', ['openanglebracket', '<']);
	  locale.bindMacro('shift + .', ['closeanglebracket', '>']);
	  locale.bindMacro('shift + /', ['questionmark', '?']);

	  //a-z and A-Z
	  for (var keyCode = 65; keyCode <= 90; keyCode += 1) {
	    var keyName = String.fromCharCode(keyCode + 32);
	    var capitalKeyName = String.fromCharCode(keyCode);
	  	locale.bindKeyCode(keyCode, keyName);
	  	locale.bindMacro('shift + ' + keyName, capitalKeyName);
	  	locale.bindMacro('capslock + ' + keyName, capitalKeyName);
	  }

	  // browser caveats
	  var semicolonKeyCode = userAgent.match('Firefox') ? 59  : 186;
	  var dashKeyCode      = userAgent.match('Firefox') ? 173 : 189;
	  var leftCommandKeyCode;
	  var rightCommandKeyCode;
	  if (platform.match('Mac') && (userAgent.match('Safari') || userAgent.match('Chrome'))) {
	    leftCommandKeyCode  = 91;
	    rightCommandKeyCode = 93;
	  } else if(platform.match('Mac') && userAgent.match('Opera')) {
	    leftCommandKeyCode  = 17;
	    rightCommandKeyCode = 17;
	  } else if(platform.match('Mac') && userAgent.match('Firefox')) {
	    leftCommandKeyCode  = 224;
	    rightCommandKeyCode = 224;
	  }
	  locale.bindKeyCode(semicolonKeyCode,    ['semicolon', ';']);
	  locale.bindKeyCode(dashKeyCode,         ['dash', '-']);
	  locale.bindKeyCode(leftCommandKeyCode,  ['command', 'windows', 'win', 'super', 'leftcommand', 'leftwindows', 'leftwin', 'leftsuper']);
	  locale.bindKeyCode(rightCommandKeyCode, ['command', 'windows', 'win', 'super', 'rightcommand', 'rightwindows', 'rightwin', 'rightsuper']);

	  // kill keys
	  locale.setKillKey('command');
	};


/***/ }),
/* 29 */
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
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _generate = __webpack_require__(14);

	var _generate2 = _interopRequireDefault(_generate);

	var _jsYaml = __webpack_require__(35);

	var _jsYaml2 = _interopRequireDefault(_jsYaml);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var yaml = document.querySelector('script[for="test-list"]').innerHTML;
	var data = _jsYaml2.default.load(yaml);

	(0, _generate2.default)(data);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';


	var yaml = __webpack_require__(36);


	module.exports = yaml;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';


	var loader = __webpack_require__(37);
	var dumper = __webpack_require__(69);


	function deprecated(name) {
	  return function () {
	    throw new Error('Function ' + name + ' is deprecated and cannot be used.');
	  };
	}


	module.exports.Type                = __webpack_require__(43);
	module.exports.Schema              = __webpack_require__(42);
	module.exports.FAILSAFE_SCHEMA     = __webpack_require__(46);
	module.exports.JSON_SCHEMA         = __webpack_require__(45);
	module.exports.CORE_SCHEMA         = __webpack_require__(44);
	module.exports.DEFAULT_SAFE_SCHEMA = __webpack_require__(41);
	module.exports.DEFAULT_FULL_SCHEMA = __webpack_require__(64);
	module.exports.load                = loader.load;
	module.exports.loadAll             = loader.loadAll;
	module.exports.safeLoad            = loader.safeLoad;
	module.exports.safeLoadAll         = loader.safeLoadAll;
	module.exports.dump                = dumper.dump;
	module.exports.safeDump            = dumper.safeDump;
	module.exports.YAMLException       = __webpack_require__(39);

	// Deprecated schema names from JS-YAML 2.0.x
	module.exports.MINIMAL_SCHEMA = __webpack_require__(46);
	module.exports.SAFE_SCHEMA    = __webpack_require__(41);
	module.exports.DEFAULT_SCHEMA = __webpack_require__(64);

	// Deprecated functions from JS-YAML 1.x.x
	module.exports.scan           = deprecated('scan');
	module.exports.parse          = deprecated('parse');
	module.exports.compose        = deprecated('compose');
	module.exports.addConstructor = deprecated('addConstructor');


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*eslint-disable max-len,no-use-before-define*/

	var common              = __webpack_require__(38);
	var YAMLException       = __webpack_require__(39);
	var Mark                = __webpack_require__(40);
	var DEFAULT_SAFE_SCHEMA = __webpack_require__(41);
	var DEFAULT_FULL_SCHEMA = __webpack_require__(64);


	var _hasOwnProperty = Object.prototype.hasOwnProperty;


	var CONTEXT_FLOW_IN   = 1;
	var CONTEXT_FLOW_OUT  = 2;
	var CONTEXT_BLOCK_IN  = 3;
	var CONTEXT_BLOCK_OUT = 4;


	var CHOMPING_CLIP  = 1;
	var CHOMPING_STRIP = 2;
	var CHOMPING_KEEP  = 3;


	var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
	var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
	var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
	var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


	function is_EOL(c) {
	  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
	}

	function is_WHITE_SPACE(c) {
	  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
	}

	function is_WS_OR_EOL(c) {
	  return (c === 0x09/* Tab */) ||
	         (c === 0x20/* Space */) ||
	         (c === 0x0A/* LF */) ||
	         (c === 0x0D/* CR */);
	}

	function is_FLOW_INDICATOR(c) {
	  return c === 0x2C/* , */ ||
	         c === 0x5B/* [ */ ||
	         c === 0x5D/* ] */ ||
	         c === 0x7B/* { */ ||
	         c === 0x7D/* } */;
	}

	function fromHexCode(c) {
	  var lc;

	  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
	    return c - 0x30;
	  }

	  /*eslint-disable no-bitwise*/
	  lc = c | 0x20;

	  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
	    return lc - 0x61 + 10;
	  }

	  return -1;
	}

	function escapedHexLen(c) {
	  if (c === 0x78/* x */) { return 2; }
	  if (c === 0x75/* u */) { return 4; }
	  if (c === 0x55/* U */) { return 8; }
	  return 0;
	}

	function fromDecimalCode(c) {
	  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
	    return c - 0x30;
	  }

	  return -1;
	}

	function simpleEscapeSequence(c) {
	  return (c === 0x30/* 0 */) ? '\x00' :
	        (c === 0x61/* a */) ? '\x07' :
	        (c === 0x62/* b */) ? '\x08' :
	        (c === 0x74/* t */) ? '\x09' :
	        (c === 0x09/* Tab */) ? '\x09' :
	        (c === 0x6E/* n */) ? '\x0A' :
	        (c === 0x76/* v */) ? '\x0B' :
	        (c === 0x66/* f */) ? '\x0C' :
	        (c === 0x72/* r */) ? '\x0D' :
	        (c === 0x65/* e */) ? '\x1B' :
	        (c === 0x20/* Space */) ? ' ' :
	        (c === 0x22/* " */) ? '\x22' :
	        (c === 0x2F/* / */) ? '/' :
	        (c === 0x5C/* \ */) ? '\x5C' :
	        (c === 0x4E/* N */) ? '\x85' :
	        (c === 0x5F/* _ */) ? '\xA0' :
	        (c === 0x4C/* L */) ? '\u2028' :
	        (c === 0x50/* P */) ? '\u2029' : '';
	}

	function charFromCodepoint(c) {
	  if (c <= 0xFFFF) {
	    return String.fromCharCode(c);
	  }
	  // Encode UTF-16 surrogate pair
	  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
	  return String.fromCharCode(((c - 0x010000) >> 10) + 0xD800,
	                             ((c - 0x010000) & 0x03FF) + 0xDC00);
	}

	var simpleEscapeCheck = new Array(256); // integer, for fast access
	var simpleEscapeMap = new Array(256);
	for (var i = 0; i < 256; i++) {
	  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
	  simpleEscapeMap[i] = simpleEscapeSequence(i);
	}


	function State(input, options) {
	  this.input = input;

	  this.filename  = options['filename']  || null;
	  this.schema    = options['schema']    || DEFAULT_FULL_SCHEMA;
	  this.onWarning = options['onWarning'] || null;
	  this.legacy    = options['legacy']    || false;
	  this.json      = options['json']      || false;
	  this.listener  = options['listener']  || null;

	  this.implicitTypes = this.schema.compiledImplicit;
	  this.typeMap       = this.schema.compiledTypeMap;

	  this.length     = input.length;
	  this.position   = 0;
	  this.line       = 0;
	  this.lineStart  = 0;
	  this.lineIndent = 0;

	  this.documents = [];

	  /*
	  this.version;
	  this.checkLineBreaks;
	  this.tagMap;
	  this.anchorMap;
	  this.tag;
	  this.anchor;
	  this.kind;
	  this.result;*/

	}


	function generateError(state, message) {
	  return new YAMLException(
	    message,
	    new Mark(state.filename, state.input, state.position, state.line, (state.position - state.lineStart)));
	}

	function throwError(state, message) {
	  throw generateError(state, message);
	}

	function throwWarning(state, message) {
	  if (state.onWarning) {
	    state.onWarning.call(null, generateError(state, message));
	  }
	}


	var directiveHandlers = {

	  YAML: function handleYamlDirective(state, name, args) {

	    var match, major, minor;

	    if (state.version !== null) {
	      throwError(state, 'duplication of %YAML directive');
	    }

	    if (args.length !== 1) {
	      throwError(state, 'YAML directive accepts exactly one argument');
	    }

	    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

	    if (match === null) {
	      throwError(state, 'ill-formed argument of the YAML directive');
	    }

	    major = parseInt(match[1], 10);
	    minor = parseInt(match[2], 10);

	    if (major !== 1) {
	      throwError(state, 'unacceptable YAML version of the document');
	    }

	    state.version = args[0];
	    state.checkLineBreaks = (minor < 2);

	    if (minor !== 1 && minor !== 2) {
	      throwWarning(state, 'unsupported YAML version of the document');
	    }
	  },

	  TAG: function handleTagDirective(state, name, args) {

	    var handle, prefix;

	    if (args.length !== 2) {
	      throwError(state, 'TAG directive accepts exactly two arguments');
	    }

	    handle = args[0];
	    prefix = args[1];

	    if (!PATTERN_TAG_HANDLE.test(handle)) {
	      throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
	    }

	    if (_hasOwnProperty.call(state.tagMap, handle)) {
	      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
	    }

	    if (!PATTERN_TAG_URI.test(prefix)) {
	      throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
	    }

	    state.tagMap[handle] = prefix;
	  }
	};


	function captureSegment(state, start, end, checkJson) {
	  var _position, _length, _character, _result;

	  if (start < end) {
	    _result = state.input.slice(start, end);

	    if (checkJson) {
	      for (_position = 0, _length = _result.length;
	           _position < _length;
	           _position += 1) {
	        _character = _result.charCodeAt(_position);
	        if (!(_character === 0x09 ||
	              (0x20 <= _character && _character <= 0x10FFFF))) {
	          throwError(state, 'expected valid JSON character');
	        }
	      }
	    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
	      throwError(state, 'the stream contains non-printable characters');
	    }

	    state.result += _result;
	  }
	}

	function mergeMappings(state, destination, source, overridableKeys) {
	  var sourceKeys, key, index, quantity;

	  if (!common.isObject(source)) {
	    throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
	  }

	  sourceKeys = Object.keys(source);

	  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
	    key = sourceKeys[index];

	    if (!_hasOwnProperty.call(destination, key)) {
	      destination[key] = source[key];
	      overridableKeys[key] = true;
	    }
	  }
	}

	function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
	  var index, quantity;

	  keyNode = String(keyNode);

	  if (_result === null) {
	    _result = {};
	  }

	  if (keyTag === 'tag:yaml.org,2002:merge') {
	    if (Array.isArray(valueNode)) {
	      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
	        mergeMappings(state, _result, valueNode[index], overridableKeys);
	      }
	    } else {
	      mergeMappings(state, _result, valueNode, overridableKeys);
	    }
	  } else {
	    if (!state.json &&
	        !_hasOwnProperty.call(overridableKeys, keyNode) &&
	        _hasOwnProperty.call(_result, keyNode)) {
	      state.line = startLine || state.line;
	      state.position = startPos || state.position;
	      throwError(state, 'duplicated mapping key');
	    }
	    _result[keyNode] = valueNode;
	    delete overridableKeys[keyNode];
	  }

	  return _result;
	}

	function readLineBreak(state) {
	  var ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch === 0x0A/* LF */) {
	    state.position++;
	  } else if (ch === 0x0D/* CR */) {
	    state.position++;
	    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
	      state.position++;
	    }
	  } else {
	    throwError(state, 'a line break is expected');
	  }

	  state.line += 1;
	  state.lineStart = state.position;
	}

	function skipSeparationSpace(state, allowComments, checkIndent) {
	  var lineBreaks = 0,
	      ch = state.input.charCodeAt(state.position);

	  while (ch !== 0) {
	    while (is_WHITE_SPACE(ch)) {
	      ch = state.input.charCodeAt(++state.position);
	    }

	    if (allowComments && ch === 0x23/* # */) {
	      do {
	        ch = state.input.charCodeAt(++state.position);
	      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
	    }

	    if (is_EOL(ch)) {
	      readLineBreak(state);

	      ch = state.input.charCodeAt(state.position);
	      lineBreaks++;
	      state.lineIndent = 0;

	      while (ch === 0x20/* Space */) {
	        state.lineIndent++;
	        ch = state.input.charCodeAt(++state.position);
	      }
	    } else {
	      break;
	    }
	  }

	  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
	    throwWarning(state, 'deficient indentation');
	  }

	  return lineBreaks;
	}

	function testDocumentSeparator(state) {
	  var _position = state.position,
	      ch;

	  ch = state.input.charCodeAt(_position);

	  // Condition state.position === state.lineStart is tested
	  // in parent on each call, for efficiency. No needs to test here again.
	  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
	      ch === state.input.charCodeAt(_position + 1) &&
	      ch === state.input.charCodeAt(_position + 2)) {

	    _position += 3;

	    ch = state.input.charCodeAt(_position);

	    if (ch === 0 || is_WS_OR_EOL(ch)) {
	      return true;
	    }
	  }

	  return false;
	}

	function writeFoldedLines(state, count) {
	  if (count === 1) {
	    state.result += ' ';
	  } else if (count > 1) {
	    state.result += common.repeat('\n', count - 1);
	  }
	}


	function readPlainScalar(state, nodeIndent, withinFlowCollection) {
	  var preceding,
	      following,
	      captureStart,
	      captureEnd,
	      hasPendingContent,
	      _line,
	      _lineStart,
	      _lineIndent,
	      _kind = state.kind,
	      _result = state.result,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (is_WS_OR_EOL(ch)      ||
	      is_FLOW_INDICATOR(ch) ||
	      ch === 0x23/* # */    ||
	      ch === 0x26/* & */    ||
	      ch === 0x2A/* * */    ||
	      ch === 0x21/* ! */    ||
	      ch === 0x7C/* | */    ||
	      ch === 0x3E/* > */    ||
	      ch === 0x27/* ' */    ||
	      ch === 0x22/* " */    ||
	      ch === 0x25/* % */    ||
	      ch === 0x40/* @ */    ||
	      ch === 0x60/* ` */) {
	    return false;
	  }

	  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
	    following = state.input.charCodeAt(state.position + 1);

	    if (is_WS_OR_EOL(following) ||
	        withinFlowCollection && is_FLOW_INDICATOR(following)) {
	      return false;
	    }
	  }

	  state.kind = 'scalar';
	  state.result = '';
	  captureStart = captureEnd = state.position;
	  hasPendingContent = false;

	  while (ch !== 0) {
	    if (ch === 0x3A/* : */) {
	      following = state.input.charCodeAt(state.position + 1);

	      if (is_WS_OR_EOL(following) ||
	          withinFlowCollection && is_FLOW_INDICATOR(following)) {
	        break;
	      }

	    } else if (ch === 0x23/* # */) {
	      preceding = state.input.charCodeAt(state.position - 1);

	      if (is_WS_OR_EOL(preceding)) {
	        break;
	      }

	    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
	               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
	      break;

	    } else if (is_EOL(ch)) {
	      _line = state.line;
	      _lineStart = state.lineStart;
	      _lineIndent = state.lineIndent;
	      skipSeparationSpace(state, false, -1);

	      if (state.lineIndent >= nodeIndent) {
	        hasPendingContent = true;
	        ch = state.input.charCodeAt(state.position);
	        continue;
	      } else {
	        state.position = captureEnd;
	        state.line = _line;
	        state.lineStart = _lineStart;
	        state.lineIndent = _lineIndent;
	        break;
	      }
	    }

	    if (hasPendingContent) {
	      captureSegment(state, captureStart, captureEnd, false);
	      writeFoldedLines(state, state.line - _line);
	      captureStart = captureEnd = state.position;
	      hasPendingContent = false;
	    }

	    if (!is_WHITE_SPACE(ch)) {
	      captureEnd = state.position + 1;
	    }

	    ch = state.input.charCodeAt(++state.position);
	  }

	  captureSegment(state, captureStart, captureEnd, false);

	  if (state.result) {
	    return true;
	  }

	  state.kind = _kind;
	  state.result = _result;
	  return false;
	}

	function readSingleQuotedScalar(state, nodeIndent) {
	  var ch,
	      captureStart, captureEnd;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x27/* ' */) {
	    return false;
	  }

	  state.kind = 'scalar';
	  state.result = '';
	  state.position++;
	  captureStart = captureEnd = state.position;

	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    if (ch === 0x27/* ' */) {
	      captureSegment(state, captureStart, state.position, true);
	      ch = state.input.charCodeAt(++state.position);

	      if (ch === 0x27/* ' */) {
	        captureStart = state.position;
	        state.position++;
	        captureEnd = state.position;
	      } else {
	        return true;
	      }

	    } else if (is_EOL(ch)) {
	      captureSegment(state, captureStart, captureEnd, true);
	      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
	      captureStart = captureEnd = state.position;

	    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
	      throwError(state, 'unexpected end of the document within a single quoted scalar');

	    } else {
	      state.position++;
	      captureEnd = state.position;
	    }
	  }

	  throwError(state, 'unexpected end of the stream within a single quoted scalar');
	}

	function readDoubleQuotedScalar(state, nodeIndent) {
	  var captureStart,
	      captureEnd,
	      hexLength,
	      hexResult,
	      tmp,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x22/* " */) {
	    return false;
	  }

	  state.kind = 'scalar';
	  state.result = '';
	  state.position++;
	  captureStart = captureEnd = state.position;

	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    if (ch === 0x22/* " */) {
	      captureSegment(state, captureStart, state.position, true);
	      state.position++;
	      return true;

	    } else if (ch === 0x5C/* \ */) {
	      captureSegment(state, captureStart, state.position, true);
	      ch = state.input.charCodeAt(++state.position);

	      if (is_EOL(ch)) {
	        skipSeparationSpace(state, false, nodeIndent);

	        // TODO: rework to inline fn with no type cast?
	      } else if (ch < 256 && simpleEscapeCheck[ch]) {
	        state.result += simpleEscapeMap[ch];
	        state.position++;

	      } else if ((tmp = escapedHexLen(ch)) > 0) {
	        hexLength = tmp;
	        hexResult = 0;

	        for (; hexLength > 0; hexLength--) {
	          ch = state.input.charCodeAt(++state.position);

	          if ((tmp = fromHexCode(ch)) >= 0) {
	            hexResult = (hexResult << 4) + tmp;

	          } else {
	            throwError(state, 'expected hexadecimal character');
	          }
	        }

	        state.result += charFromCodepoint(hexResult);

	        state.position++;

	      } else {
	        throwError(state, 'unknown escape sequence');
	      }

	      captureStart = captureEnd = state.position;

	    } else if (is_EOL(ch)) {
	      captureSegment(state, captureStart, captureEnd, true);
	      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
	      captureStart = captureEnd = state.position;

	    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
	      throwError(state, 'unexpected end of the document within a double quoted scalar');

	    } else {
	      state.position++;
	      captureEnd = state.position;
	    }
	  }

	  throwError(state, 'unexpected end of the stream within a double quoted scalar');
	}

	function readFlowCollection(state, nodeIndent) {
	  var readNext = true,
	      _line,
	      _tag     = state.tag,
	      _result,
	      _anchor  = state.anchor,
	      following,
	      terminator,
	      isPair,
	      isExplicitPair,
	      isMapping,
	      overridableKeys = {},
	      keyNode,
	      keyTag,
	      valueNode,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch === 0x5B/* [ */) {
	    terminator = 0x5D;/* ] */
	    isMapping = false;
	    _result = [];
	  } else if (ch === 0x7B/* { */) {
	    terminator = 0x7D;/* } */
	    isMapping = true;
	    _result = {};
	  } else {
	    return false;
	  }

	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }

	  ch = state.input.charCodeAt(++state.position);

	  while (ch !== 0) {
	    skipSeparationSpace(state, true, nodeIndent);

	    ch = state.input.charCodeAt(state.position);

	    if (ch === terminator) {
	      state.position++;
	      state.tag = _tag;
	      state.anchor = _anchor;
	      state.kind = isMapping ? 'mapping' : 'sequence';
	      state.result = _result;
	      return true;
	    } else if (!readNext) {
	      throwError(state, 'missed comma between flow collection entries');
	    }

	    keyTag = keyNode = valueNode = null;
	    isPair = isExplicitPair = false;

	    if (ch === 0x3F/* ? */) {
	      following = state.input.charCodeAt(state.position + 1);

	      if (is_WS_OR_EOL(following)) {
	        isPair = isExplicitPair = true;
	        state.position++;
	        skipSeparationSpace(state, true, nodeIndent);
	      }
	    }

	    _line = state.line;
	    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
	    keyTag = state.tag;
	    keyNode = state.result;
	    skipSeparationSpace(state, true, nodeIndent);

	    ch = state.input.charCodeAt(state.position);

	    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
	      isPair = true;
	      ch = state.input.charCodeAt(++state.position);
	      skipSeparationSpace(state, true, nodeIndent);
	      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
	      valueNode = state.result;
	    }

	    if (isMapping) {
	      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
	    } else if (isPair) {
	      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
	    } else {
	      _result.push(keyNode);
	    }

	    skipSeparationSpace(state, true, nodeIndent);

	    ch = state.input.charCodeAt(state.position);

	    if (ch === 0x2C/* , */) {
	      readNext = true;
	      ch = state.input.charCodeAt(++state.position);
	    } else {
	      readNext = false;
	    }
	  }

	  throwError(state, 'unexpected end of the stream within a flow collection');
	}

	function readBlockScalar(state, nodeIndent) {
	  var captureStart,
	      folding,
	      chomping       = CHOMPING_CLIP,
	      didReadContent = false,
	      detectedIndent = false,
	      textIndent     = nodeIndent,
	      emptyLines     = 0,
	      atMoreIndented = false,
	      tmp,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch === 0x7C/* | */) {
	    folding = false;
	  } else if (ch === 0x3E/* > */) {
	    folding = true;
	  } else {
	    return false;
	  }

	  state.kind = 'scalar';
	  state.result = '';

	  while (ch !== 0) {
	    ch = state.input.charCodeAt(++state.position);

	    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
	      if (CHOMPING_CLIP === chomping) {
	        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
	      } else {
	        throwError(state, 'repeat of a chomping mode identifier');
	      }

	    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
	      if (tmp === 0) {
	        throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
	      } else if (!detectedIndent) {
	        textIndent = nodeIndent + tmp - 1;
	        detectedIndent = true;
	      } else {
	        throwError(state, 'repeat of an indentation width identifier');
	      }

	    } else {
	      break;
	    }
	  }

	  if (is_WHITE_SPACE(ch)) {
	    do { ch = state.input.charCodeAt(++state.position); }
	    while (is_WHITE_SPACE(ch));

	    if (ch === 0x23/* # */) {
	      do { ch = state.input.charCodeAt(++state.position); }
	      while (!is_EOL(ch) && (ch !== 0));
	    }
	  }

	  while (ch !== 0) {
	    readLineBreak(state);
	    state.lineIndent = 0;

	    ch = state.input.charCodeAt(state.position);

	    while ((!detectedIndent || state.lineIndent < textIndent) &&
	           (ch === 0x20/* Space */)) {
	      state.lineIndent++;
	      ch = state.input.charCodeAt(++state.position);
	    }

	    if (!detectedIndent && state.lineIndent > textIndent) {
	      textIndent = state.lineIndent;
	    }

	    if (is_EOL(ch)) {
	      emptyLines++;
	      continue;
	    }

	    // End of the scalar.
	    if (state.lineIndent < textIndent) {

	      // Perform the chomping.
	      if (chomping === CHOMPING_KEEP) {
	        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	      } else if (chomping === CHOMPING_CLIP) {
	        if (didReadContent) { // i.e. only if the scalar is not empty.
	          state.result += '\n';
	        }
	      }

	      // Break this `while` cycle and go to the funciton's epilogue.
	      break;
	    }

	    // Folded style: use fancy rules to handle line breaks.
	    if (folding) {

	      // Lines starting with white space characters (more-indented lines) are not folded.
	      if (is_WHITE_SPACE(ch)) {
	        atMoreIndented = true;
	        // except for the first content line (cf. Example 8.1)
	        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

	      // End of more-indented block.
	      } else if (atMoreIndented) {
	        atMoreIndented = false;
	        state.result += common.repeat('\n', emptyLines + 1);

	      // Just one line break - perceive as the same line.
	      } else if (emptyLines === 0) {
	        if (didReadContent) { // i.e. only if we have already read some scalar content.
	          state.result += ' ';
	        }

	      // Several line breaks - perceive as different lines.
	      } else {
	        state.result += common.repeat('\n', emptyLines);
	      }

	    // Literal style: just add exact number of line breaks between content lines.
	    } else {
	      // Keep all line breaks except the header line break.
	      state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	    }

	    didReadContent = true;
	    detectedIndent = true;
	    emptyLines = 0;
	    captureStart = state.position;

	    while (!is_EOL(ch) && (ch !== 0)) {
	      ch = state.input.charCodeAt(++state.position);
	    }

	    captureSegment(state, captureStart, state.position, false);
	  }

	  return true;
	}

	function readBlockSequence(state, nodeIndent) {
	  var _line,
	      _tag      = state.tag,
	      _anchor   = state.anchor,
	      _result   = [],
	      following,
	      detected  = false,
	      ch;

	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }

	  ch = state.input.charCodeAt(state.position);

	  while (ch !== 0) {

	    if (ch !== 0x2D/* - */) {
	      break;
	    }

	    following = state.input.charCodeAt(state.position + 1);

	    if (!is_WS_OR_EOL(following)) {
	      break;
	    }

	    detected = true;
	    state.position++;

	    if (skipSeparationSpace(state, true, -1)) {
	      if (state.lineIndent <= nodeIndent) {
	        _result.push(null);
	        ch = state.input.charCodeAt(state.position);
	        continue;
	      }
	    }

	    _line = state.line;
	    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
	    _result.push(state.result);
	    skipSeparationSpace(state, true, -1);

	    ch = state.input.charCodeAt(state.position);

	    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
	      throwError(state, 'bad indentation of a sequence entry');
	    } else if (state.lineIndent < nodeIndent) {
	      break;
	    }
	  }

	  if (detected) {
	    state.tag = _tag;
	    state.anchor = _anchor;
	    state.kind = 'sequence';
	    state.result = _result;
	    return true;
	  }
	  return false;
	}

	function readBlockMapping(state, nodeIndent, flowIndent) {
	  var following,
	      allowCompact,
	      _line,
	      _pos,
	      _tag          = state.tag,
	      _anchor       = state.anchor,
	      _result       = {},
	      overridableKeys = {},
	      keyTag        = null,
	      keyNode       = null,
	      valueNode     = null,
	      atExplicitKey = false,
	      detected      = false,
	      ch;

	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }

	  ch = state.input.charCodeAt(state.position);

	  while (ch !== 0) {
	    following = state.input.charCodeAt(state.position + 1);
	    _line = state.line; // Save the current line.
	    _pos = state.position;

	    //
	    // Explicit notation case. There are two separate blocks:
	    // first for the key (denoted by "?") and second for the value (denoted by ":")
	    //
	    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

	      if (ch === 0x3F/* ? */) {
	        if (atExplicitKey) {
	          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
	          keyTag = keyNode = valueNode = null;
	        }

	        detected = true;
	        atExplicitKey = true;
	        allowCompact = true;

	      } else if (atExplicitKey) {
	        // i.e. 0x3A/* : */ === character after the explicit key.
	        atExplicitKey = false;
	        allowCompact = true;

	      } else {
	        throwError(state, 'incomplete explicit mapping pair; a key node is missed');
	      }

	      state.position += 1;
	      ch = following;

	    //
	    // Implicit notation case. Flow-style node as the key first, then ":", and the value.
	    //
	    } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {

	      if (state.line === _line) {
	        ch = state.input.charCodeAt(state.position);

	        while (is_WHITE_SPACE(ch)) {
	          ch = state.input.charCodeAt(++state.position);
	        }

	        if (ch === 0x3A/* : */) {
	          ch = state.input.charCodeAt(++state.position);

	          if (!is_WS_OR_EOL(ch)) {
	            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
	          }

	          if (atExplicitKey) {
	            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
	            keyTag = keyNode = valueNode = null;
	          }

	          detected = true;
	          atExplicitKey = false;
	          allowCompact = false;
	          keyTag = state.tag;
	          keyNode = state.result;

	        } else if (detected) {
	          throwError(state, 'can not read an implicit mapping pair; a colon is missed');

	        } else {
	          state.tag = _tag;
	          state.anchor = _anchor;
	          return true; // Keep the result of `composeNode`.
	        }

	      } else if (detected) {
	        throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

	      } else {
	        state.tag = _tag;
	        state.anchor = _anchor;
	        return true; // Keep the result of `composeNode`.
	      }

	    } else {
	      break; // Reading is done. Go to the epilogue.
	    }

	    //
	    // Common reading code for both explicit and implicit notations.
	    //
	    if (state.line === _line || state.lineIndent > nodeIndent) {
	      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
	        if (atExplicitKey) {
	          keyNode = state.result;
	        } else {
	          valueNode = state.result;
	        }
	      }

	      if (!atExplicitKey) {
	        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
	        keyTag = keyNode = valueNode = null;
	      }

	      skipSeparationSpace(state, true, -1);
	      ch = state.input.charCodeAt(state.position);
	    }

	    if (state.lineIndent > nodeIndent && (ch !== 0)) {
	      throwError(state, 'bad indentation of a mapping entry');
	    } else if (state.lineIndent < nodeIndent) {
	      break;
	    }
	  }

	  //
	  // Epilogue.
	  //

	  // Special case: last mapping's node contains only the key in explicit notation.
	  if (atExplicitKey) {
	    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
	  }

	  // Expose the resulting mapping.
	  if (detected) {
	    state.tag = _tag;
	    state.anchor = _anchor;
	    state.kind = 'mapping';
	    state.result = _result;
	  }

	  return detected;
	}

	function readTagProperty(state) {
	  var _position,
	      isVerbatim = false,
	      isNamed    = false,
	      tagHandle,
	      tagName,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x21/* ! */) return false;

	  if (state.tag !== null) {
	    throwError(state, 'duplication of a tag property');
	  }

	  ch = state.input.charCodeAt(++state.position);

	  if (ch === 0x3C/* < */) {
	    isVerbatim = true;
	    ch = state.input.charCodeAt(++state.position);

	  } else if (ch === 0x21/* ! */) {
	    isNamed = true;
	    tagHandle = '!!';
	    ch = state.input.charCodeAt(++state.position);

	  } else {
	    tagHandle = '!';
	  }

	  _position = state.position;

	  if (isVerbatim) {
	    do { ch = state.input.charCodeAt(++state.position); }
	    while (ch !== 0 && ch !== 0x3E/* > */);

	    if (state.position < state.length) {
	      tagName = state.input.slice(_position, state.position);
	      ch = state.input.charCodeAt(++state.position);
	    } else {
	      throwError(state, 'unexpected end of the stream within a verbatim tag');
	    }
	  } else {
	    while (ch !== 0 && !is_WS_OR_EOL(ch)) {

	      if (ch === 0x21/* ! */) {
	        if (!isNamed) {
	          tagHandle = state.input.slice(_position - 1, state.position + 1);

	          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
	            throwError(state, 'named tag handle cannot contain such characters');
	          }

	          isNamed = true;
	          _position = state.position + 1;
	        } else {
	          throwError(state, 'tag suffix cannot contain exclamation marks');
	        }
	      }

	      ch = state.input.charCodeAt(++state.position);
	    }

	    tagName = state.input.slice(_position, state.position);

	    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
	      throwError(state, 'tag suffix cannot contain flow indicator characters');
	    }
	  }

	  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
	    throwError(state, 'tag name cannot contain such characters: ' + tagName);
	  }

	  if (isVerbatim) {
	    state.tag = tagName;

	  } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
	    state.tag = state.tagMap[tagHandle] + tagName;

	  } else if (tagHandle === '!') {
	    state.tag = '!' + tagName;

	  } else if (tagHandle === '!!') {
	    state.tag = 'tag:yaml.org,2002:' + tagName;

	  } else {
	    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
	  }

	  return true;
	}

	function readAnchorProperty(state) {
	  var _position,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x26/* & */) return false;

	  if (state.anchor !== null) {
	    throwError(state, 'duplication of an anchor property');
	  }

	  ch = state.input.charCodeAt(++state.position);
	  _position = state.position;

	  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
	    ch = state.input.charCodeAt(++state.position);
	  }

	  if (state.position === _position) {
	    throwError(state, 'name of an anchor node must contain at least one character');
	  }

	  state.anchor = state.input.slice(_position, state.position);
	  return true;
	}

	function readAlias(state) {
	  var _position, alias,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x2A/* * */) return false;

	  ch = state.input.charCodeAt(++state.position);
	  _position = state.position;

	  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
	    ch = state.input.charCodeAt(++state.position);
	  }

	  if (state.position === _position) {
	    throwError(state, 'name of an alias node must contain at least one character');
	  }

	  alias = state.input.slice(_position, state.position);

	  if (!state.anchorMap.hasOwnProperty(alias)) {
	    throwError(state, 'unidentified alias "' + alias + '"');
	  }

	  state.result = state.anchorMap[alias];
	  skipSeparationSpace(state, true, -1);
	  return true;
	}

	function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
	  var allowBlockStyles,
	      allowBlockScalars,
	      allowBlockCollections,
	      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
	      atNewLine  = false,
	      hasContent = false,
	      typeIndex,
	      typeQuantity,
	      type,
	      flowIndent,
	      blockIndent;

	  if (state.listener !== null) {
	    state.listener('open', state);
	  }

	  state.tag    = null;
	  state.anchor = null;
	  state.kind   = null;
	  state.result = null;

	  allowBlockStyles = allowBlockScalars = allowBlockCollections =
	    CONTEXT_BLOCK_OUT === nodeContext ||
	    CONTEXT_BLOCK_IN  === nodeContext;

	  if (allowToSeek) {
	    if (skipSeparationSpace(state, true, -1)) {
	      atNewLine = true;

	      if (state.lineIndent > parentIndent) {
	        indentStatus = 1;
	      } else if (state.lineIndent === parentIndent) {
	        indentStatus = 0;
	      } else if (state.lineIndent < parentIndent) {
	        indentStatus = -1;
	      }
	    }
	  }

	  if (indentStatus === 1) {
	    while (readTagProperty(state) || readAnchorProperty(state)) {
	      if (skipSeparationSpace(state, true, -1)) {
	        atNewLine = true;
	        allowBlockCollections = allowBlockStyles;

	        if (state.lineIndent > parentIndent) {
	          indentStatus = 1;
	        } else if (state.lineIndent === parentIndent) {
	          indentStatus = 0;
	        } else if (state.lineIndent < parentIndent) {
	          indentStatus = -1;
	        }
	      } else {
	        allowBlockCollections = false;
	      }
	    }
	  }

	  if (allowBlockCollections) {
	    allowBlockCollections = atNewLine || allowCompact;
	  }

	  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
	    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
	      flowIndent = parentIndent;
	    } else {
	      flowIndent = parentIndent + 1;
	    }

	    blockIndent = state.position - state.lineStart;

	    if (indentStatus === 1) {
	      if (allowBlockCollections &&
	          (readBlockSequence(state, blockIndent) ||
	           readBlockMapping(state, blockIndent, flowIndent)) ||
	          readFlowCollection(state, flowIndent)) {
	        hasContent = true;
	      } else {
	        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
	            readSingleQuotedScalar(state, flowIndent) ||
	            readDoubleQuotedScalar(state, flowIndent)) {
	          hasContent = true;

	        } else if (readAlias(state)) {
	          hasContent = true;

	          if (state.tag !== null || state.anchor !== null) {
	            throwError(state, 'alias node should not have any properties');
	          }

	        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
	          hasContent = true;

	          if (state.tag === null) {
	            state.tag = '?';
	          }
	        }

	        if (state.anchor !== null) {
	          state.anchorMap[state.anchor] = state.result;
	        }
	      }
	    } else if (indentStatus === 0) {
	      // Special case: block sequences are allowed to have same indentation level as the parent.
	      // http://www.yaml.org/spec/1.2/spec.html#id2799784
	      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
	    }
	  }

	  if (state.tag !== null && state.tag !== '!') {
	    if (state.tag === '?') {
	      for (typeIndex = 0, typeQuantity = state.implicitTypes.length;
	           typeIndex < typeQuantity;
	           typeIndex += 1) {
	        type = state.implicitTypes[typeIndex];

	        // Implicit resolving is not allowed for non-scalar types, and '?'
	        // non-specific tag is only assigned to plain scalars. So, it isn't
	        // needed to check for 'kind' conformity.

	        if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
	          state.result = type.construct(state.result);
	          state.tag = type.tag;
	          if (state.anchor !== null) {
	            state.anchorMap[state.anchor] = state.result;
	          }
	          break;
	        }
	      }
	    } else if (_hasOwnProperty.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
	      type = state.typeMap[state.kind || 'fallback'][state.tag];

	      if (state.result !== null && type.kind !== state.kind) {
	        throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
	      }

	      if (!type.resolve(state.result)) { // `state.result` updated in resolver if matched
	        throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
	      } else {
	        state.result = type.construct(state.result);
	        if (state.anchor !== null) {
	          state.anchorMap[state.anchor] = state.result;
	        }
	      }
	    } else {
	      throwError(state, 'unknown tag !<' + state.tag + '>');
	    }
	  }

	  if (state.listener !== null) {
	    state.listener('close', state);
	  }
	  return state.tag !== null ||  state.anchor !== null || hasContent;
	}

	function readDocument(state) {
	  var documentStart = state.position,
	      _position,
	      directiveName,
	      directiveArgs,
	      hasDirectives = false,
	      ch;

	  state.version = null;
	  state.checkLineBreaks = state.legacy;
	  state.tagMap = {};
	  state.anchorMap = {};

	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    skipSeparationSpace(state, true, -1);

	    ch = state.input.charCodeAt(state.position);

	    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
	      break;
	    }

	    hasDirectives = true;
	    ch = state.input.charCodeAt(++state.position);
	    _position = state.position;

	    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
	      ch = state.input.charCodeAt(++state.position);
	    }

	    directiveName = state.input.slice(_position, state.position);
	    directiveArgs = [];

	    if (directiveName.length < 1) {
	      throwError(state, 'directive name must not be less than one character in length');
	    }

	    while (ch !== 0) {
	      while (is_WHITE_SPACE(ch)) {
	        ch = state.input.charCodeAt(++state.position);
	      }

	      if (ch === 0x23/* # */) {
	        do { ch = state.input.charCodeAt(++state.position); }
	        while (ch !== 0 && !is_EOL(ch));
	        break;
	      }

	      if (is_EOL(ch)) break;

	      _position = state.position;

	      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
	        ch = state.input.charCodeAt(++state.position);
	      }

	      directiveArgs.push(state.input.slice(_position, state.position));
	    }

	    if (ch !== 0) readLineBreak(state);

	    if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
	      directiveHandlers[directiveName](state, directiveName, directiveArgs);
	    } else {
	      throwWarning(state, 'unknown document directive "' + directiveName + '"');
	    }
	  }

	  skipSeparationSpace(state, true, -1);

	  if (state.lineIndent === 0 &&
	      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
	      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
	      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
	    state.position += 3;
	    skipSeparationSpace(state, true, -1);

	  } else if (hasDirectives) {
	    throwError(state, 'directives end mark is expected');
	  }

	  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
	  skipSeparationSpace(state, true, -1);

	  if (state.checkLineBreaks &&
	      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
	    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
	  }

	  state.documents.push(state.result);

	  if (state.position === state.lineStart && testDocumentSeparator(state)) {

	    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
	      state.position += 3;
	      skipSeparationSpace(state, true, -1);
	    }
	    return;
	  }

	  if (state.position < (state.length - 1)) {
	    throwError(state, 'end of the stream or a document separator is expected');
	  } else {
	    return;
	  }
	}


	function loadDocuments(input, options) {
	  input = String(input);
	  options = options || {};

	  if (input.length !== 0) {

	    // Add tailing `\n` if not exists
	    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
	        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
	      input += '\n';
	    }

	    // Strip BOM
	    if (input.charCodeAt(0) === 0xFEFF) {
	      input = input.slice(1);
	    }
	  }

	  var state = new State(input, options);

	  // Use 0 as string terminator. That significantly simplifies bounds check.
	  state.input += '\0';

	  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
	    state.lineIndent += 1;
	    state.position += 1;
	  }

	  while (state.position < (state.length - 1)) {
	    readDocument(state);
	  }

	  return state.documents;
	}


	function loadAll(input, iterator, options) {
	  var documents = loadDocuments(input, options), index, length;

	  for (index = 0, length = documents.length; index < length; index += 1) {
	    iterator(documents[index]);
	  }
	}


	function load(input, options) {
	  var documents = loadDocuments(input, options);

	  if (documents.length === 0) {
	    /*eslint-disable no-undefined*/
	    return undefined;
	  } else if (documents.length === 1) {
	    return documents[0];
	  }
	  throw new YAMLException('expected a single document in the stream, but found more');
	}


	function safeLoadAll(input, output, options) {
	  loadAll(input, output, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
	}


	function safeLoad(input, options) {
	  return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
	}


	module.exports.loadAll     = loadAll;
	module.exports.load        = load;
	module.exports.safeLoadAll = safeLoadAll;
	module.exports.safeLoad    = safeLoad;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

	'use strict';


	function isNothing(subject) {
	  return (typeof subject === 'undefined') || (subject === null);
	}


	function isObject(subject) {
	  return (typeof subject === 'object') && (subject !== null);
	}


	function toArray(sequence) {
	  if (Array.isArray(sequence)) return sequence;
	  else if (isNothing(sequence)) return [];

	  return [ sequence ];
	}


	function extend(target, source) {
	  var index, length, key, sourceKeys;

	  if (source) {
	    sourceKeys = Object.keys(source);

	    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
	      key = sourceKeys[index];
	      target[key] = source[key];
	    }
	  }

	  return target;
	}


	function repeat(string, count) {
	  var result = '', cycle;

	  for (cycle = 0; cycle < count; cycle += 1) {
	    result += string;
	  }

	  return result;
	}


	function isNegativeZero(number) {
	  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
	}


	module.exports.isNothing      = isNothing;
	module.exports.isObject       = isObject;
	module.exports.toArray        = toArray;
	module.exports.repeat         = repeat;
	module.exports.isNegativeZero = isNegativeZero;
	module.exports.extend         = extend;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	// YAML error class. http://stackoverflow.com/questions/8458984
	//
	'use strict';

	function YAMLException(reason, mark) {
	  // Super constructor
	  Error.call(this);

	  // Include stack trace in error object
	  if (Error.captureStackTrace) {
	    // Chrome and NodeJS
	    Error.captureStackTrace(this, this.constructor);
	  } else {
	    // FF, IE 10+ and Safari 6+. Fallback for others
	    this.stack = (new Error()).stack || '';
	  }

	  this.name = 'YAMLException';
	  this.reason = reason;
	  this.mark = mark;
	  this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');
	}


	// Inherit from Error
	YAMLException.prototype = Object.create(Error.prototype);
	YAMLException.prototype.constructor = YAMLException;


	YAMLException.prototype.toString = function toString(compact) {
	  var result = this.name + ': ';

	  result += this.reason || '(unknown reason)';

	  if (!compact && this.mark) {
	    result += ' ' + this.mark.toString();
	  }

	  return result;
	};


	module.exports = YAMLException;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';


	var common = __webpack_require__(38);


	function Mark(name, buffer, position, line, column) {
	  this.name     = name;
	  this.buffer   = buffer;
	  this.position = position;
	  this.line     = line;
	  this.column   = column;
	}


	Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
	  var head, start, tail, end, snippet;

	  if (!this.buffer) return null;

	  indent = indent || 4;
	  maxLength = maxLength || 75;

	  head = '';
	  start = this.position;

	  while (start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1) {
	    start -= 1;
	    if (this.position - start > (maxLength / 2 - 1)) {
	      head = ' ... ';
	      start += 5;
	      break;
	    }
	  }

	  tail = '';
	  end = this.position;

	  while (end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1) {
	    end += 1;
	    if (end - this.position > (maxLength / 2 - 1)) {
	      tail = ' ... ';
	      end -= 5;
	      break;
	    }
	  }

	  snippet = this.buffer.slice(start, end);

	  return common.repeat(' ', indent) + head + snippet + tail + '\n' +
	         common.repeat(' ', indent + this.position - start + head.length) + '^';
	};


	Mark.prototype.toString = function toString(compact) {
	  var snippet, where = '';

	  if (this.name) {
	    where += 'in "' + this.name + '" ';
	  }

	  where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);

	  if (!compact) {
	    snippet = this.getSnippet();

	    if (snippet) {
	      where += ':\n' + snippet;
	    }
	  }

	  return where;
	};


	module.exports = Mark;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	// JS-YAML's default schema for `safeLoad` function.
	// It is not described in the YAML specification.
	//
	// This schema is based on standard YAML's Core schema and includes most of
	// extra types described at YAML tag repository. (http://yaml.org/type/)


	'use strict';


	var Schema = __webpack_require__(42);


	module.exports = new Schema({
	  include: [
	    __webpack_require__(44)
	  ],
	  implicit: [
	    __webpack_require__(54),
	    __webpack_require__(55)
	  ],
	  explicit: [
	    __webpack_require__(56),
	    __webpack_require__(61),
	    __webpack_require__(62),
	    __webpack_require__(63)
	  ]
	});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*eslint-disable max-len*/

	var common        = __webpack_require__(38);
	var YAMLException = __webpack_require__(39);
	var Type          = __webpack_require__(43);


	function compileList(schema, name, result) {
	  var exclude = [];

	  schema.include.forEach(function (includedSchema) {
	    result = compileList(includedSchema, name, result);
	  });

	  schema[name].forEach(function (currentType) {
	    result.forEach(function (previousType, previousIndex) {
	      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
	        exclude.push(previousIndex);
	      }
	    });

	    result.push(currentType);
	  });

	  return result.filter(function (type, index) {
	    return exclude.indexOf(index) === -1;
	  });
	}


	function compileMap(/* lists... */) {
	  var result = {
	        scalar: {},
	        sequence: {},
	        mapping: {},
	        fallback: {}
	      }, index, length;

	  function collectType(type) {
	    result[type.kind][type.tag] = result['fallback'][type.tag] = type;
	  }

	  for (index = 0, length = arguments.length; index < length; index += 1) {
	    arguments[index].forEach(collectType);
	  }
	  return result;
	}


	function Schema(definition) {
	  this.include  = definition.include  || [];
	  this.implicit = definition.implicit || [];
	  this.explicit = definition.explicit || [];

	  this.implicit.forEach(function (type) {
	    if (type.loadKind && type.loadKind !== 'scalar') {
	      throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
	    }
	  });

	  this.compiledImplicit = compileList(this, 'implicit', []);
	  this.compiledExplicit = compileList(this, 'explicit', []);
	  this.compiledTypeMap  = compileMap(this.compiledImplicit, this.compiledExplicit);
	}


	Schema.DEFAULT = null;


	Schema.create = function createSchema() {
	  var schemas, types;

	  switch (arguments.length) {
	    case 1:
	      schemas = Schema.DEFAULT;
	      types = arguments[0];
	      break;

	    case 2:
	      schemas = arguments[0];
	      types = arguments[1];
	      break;

	    default:
	      throw new YAMLException('Wrong number of arguments for Schema.create function');
	  }

	  schemas = common.toArray(schemas);
	  types = common.toArray(types);

	  if (!schemas.every(function (schema) { return schema instanceof Schema; })) {
	    throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
	  }

	  if (!types.every(function (type) { return type instanceof Type; })) {
	    throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
	  }

	  return new Schema({
	    include: schemas,
	    explicit: types
	  });
	};


	module.exports = Schema;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var YAMLException = __webpack_require__(39);

	var TYPE_CONSTRUCTOR_OPTIONS = [
	  'kind',
	  'resolve',
	  'construct',
	  'instanceOf',
	  'predicate',
	  'represent',
	  'defaultStyle',
	  'styleAliases'
	];

	var YAML_NODE_KINDS = [
	  'scalar',
	  'sequence',
	  'mapping'
	];

	function compileStyleAliases(map) {
	  var result = {};

	  if (map !== null) {
	    Object.keys(map).forEach(function (style) {
	      map[style].forEach(function (alias) {
	        result[String(alias)] = style;
	      });
	    });
	  }

	  return result;
	}

	function Type(tag, options) {
	  options = options || {};

	  Object.keys(options).forEach(function (name) {
	    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
	      throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
	    }
	  });

	  // TODO: Add tag format check.
	  this.tag          = tag;
	  this.kind         = options['kind']         || null;
	  this.resolve      = options['resolve']      || function () { return true; };
	  this.construct    = options['construct']    || function (data) { return data; };
	  this.instanceOf   = options['instanceOf']   || null;
	  this.predicate    = options['predicate']    || null;
	  this.represent    = options['represent']    || null;
	  this.defaultStyle = options['defaultStyle'] || null;
	  this.styleAliases = compileStyleAliases(options['styleAliases'] || null);

	  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
	    throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
	  }
	}

	module.exports = Type;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	// Standard YAML's Core schema.
	// http://www.yaml.org/spec/1.2/spec.html#id2804923
	//
	// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
	// So, Core schema has no distinctions from JSON schema is JS-YAML.


	'use strict';


	var Schema = __webpack_require__(42);


	module.exports = new Schema({
	  include: [
	    __webpack_require__(45)
	  ]
	});


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	// Standard YAML's JSON schema.
	// http://www.yaml.org/spec/1.2/spec.html#id2803231
	//
	// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
	// So, this schema is not such strict as defined in the YAML specification.
	// It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.


	'use strict';


	var Schema = __webpack_require__(42);


	module.exports = new Schema({
	  include: [
	    __webpack_require__(46)
	  ],
	  implicit: [
	    __webpack_require__(50),
	    __webpack_require__(51),
	    __webpack_require__(52),
	    __webpack_require__(53)
	  ]
	});


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	// Standard YAML's Failsafe schema.
	// http://www.yaml.org/spec/1.2/spec.html#id2802346


	'use strict';


	var Schema = __webpack_require__(42);


	module.exports = new Schema({
	  explicit: [
	    __webpack_require__(47),
	    __webpack_require__(48),
	    __webpack_require__(49)
	  ]
	});


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	module.exports = new Type('tag:yaml.org,2002:str', {
	  kind: 'scalar',
	  construct: function (data) { return data !== null ? data : ''; }
	});


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	module.exports = new Type('tag:yaml.org,2002:seq', {
	  kind: 'sequence',
	  construct: function (data) { return data !== null ? data : []; }
	});


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	module.exports = new Type('tag:yaml.org,2002:map', {
	  kind: 'mapping',
	  construct: function (data) { return data !== null ? data : {}; }
	});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	function resolveYamlNull(data) {
	  if (data === null) return true;

	  var max = data.length;

	  return (max === 1 && data === '~') ||
	         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
	}

	function constructYamlNull() {
	  return null;
	}

	function isNull(object) {
	  return object === null;
	}

	module.exports = new Type('tag:yaml.org,2002:null', {
	  kind: 'scalar',
	  resolve: resolveYamlNull,
	  construct: constructYamlNull,
	  predicate: isNull,
	  represent: {
	    canonical: function () { return '~';    },
	    lowercase: function () { return 'null'; },
	    uppercase: function () { return 'NULL'; },
	    camelcase: function () { return 'Null'; }
	  },
	  defaultStyle: 'lowercase'
	});


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	function resolveYamlBoolean(data) {
	  if (data === null) return false;

	  var max = data.length;

	  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
	         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
	}

	function constructYamlBoolean(data) {
	  return data === 'true' ||
	         data === 'True' ||
	         data === 'TRUE';
	}

	function isBoolean(object) {
	  return Object.prototype.toString.call(object) === '[object Boolean]';
	}

	module.exports = new Type('tag:yaml.org,2002:bool', {
	  kind: 'scalar',
	  resolve: resolveYamlBoolean,
	  construct: constructYamlBoolean,
	  predicate: isBoolean,
	  represent: {
	    lowercase: function (object) { return object ? 'true' : 'false'; },
	    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
	    camelcase: function (object) { return object ? 'True' : 'False'; }
	  },
	  defaultStyle: 'lowercase'
	});


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var common = __webpack_require__(38);
	var Type   = __webpack_require__(43);

	function isHexCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
	         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
	         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
	}

	function isOctCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
	}

	function isDecCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
	}

	function resolveYamlInteger(data) {
	  if (data === null) return false;

	  var max = data.length,
	      index = 0,
	      hasDigits = false,
	      ch;

	  if (!max) return false;

	  ch = data[index];

	  // sign
	  if (ch === '-' || ch === '+') {
	    ch = data[++index];
	  }

	  if (ch === '0') {
	    // 0
	    if (index + 1 === max) return true;
	    ch = data[++index];

	    // base 2, base 8, base 16

	    if (ch === 'b') {
	      // base 2
	      index++;

	      for (; index < max; index++) {
	        ch = data[index];
	        if (ch === '_') continue;
	        if (ch !== '0' && ch !== '1') return false;
	        hasDigits = true;
	      }
	      return hasDigits && ch !== '_';
	    }


	    if (ch === 'x') {
	      // base 16
	      index++;

	      for (; index < max; index++) {
	        ch = data[index];
	        if (ch === '_') continue;
	        if (!isHexCode(data.charCodeAt(index))) return false;
	        hasDigits = true;
	      }
	      return hasDigits && ch !== '_';
	    }

	    // base 8
	    for (; index < max; index++) {
	      ch = data[index];
	      if (ch === '_') continue;
	      if (!isOctCode(data.charCodeAt(index))) return false;
	      hasDigits = true;
	    }
	    return hasDigits && ch !== '_';
	  }

	  // base 10 (except 0) or base 60

	  // value should not start with `_`;
	  if (ch === '_') return false;

	  for (; index < max; index++) {
	    ch = data[index];
	    if (ch === '_') continue;
	    if (ch === ':') break;
	    if (!isDecCode(data.charCodeAt(index))) {
	      return false;
	    }
	    hasDigits = true;
	  }

	  // Should have digits and should not end with `_`
	  if (!hasDigits || ch === '_') return false;

	  // if !base60 - done;
	  if (ch !== ':') return true;

	  // base60 almost not used, no needs to optimize
	  return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
	}

	function constructYamlInteger(data) {
	  var value = data, sign = 1, ch, base, digits = [];

	  if (value.indexOf('_') !== -1) {
	    value = value.replace(/_/g, '');
	  }

	  ch = value[0];

	  if (ch === '-' || ch === '+') {
	    if (ch === '-') sign = -1;
	    value = value.slice(1);
	    ch = value[0];
	  }

	  if (value === '0') return 0;

	  if (ch === '0') {
	    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
	    if (value[1] === 'x') return sign * parseInt(value, 16);
	    return sign * parseInt(value, 8);
	  }

	  if (value.indexOf(':') !== -1) {
	    value.split(':').forEach(function (v) {
	      digits.unshift(parseInt(v, 10));
	    });

	    value = 0;
	    base = 1;

	    digits.forEach(function (d) {
	      value += (d * base);
	      base *= 60;
	    });

	    return sign * value;

	  }

	  return sign * parseInt(value, 10);
	}

	function isInteger(object) {
	  return (Object.prototype.toString.call(object)) === '[object Number]' &&
	         (object % 1 === 0 && !common.isNegativeZero(object));
	}

	module.exports = new Type('tag:yaml.org,2002:int', {
	  kind: 'scalar',
	  resolve: resolveYamlInteger,
	  construct: constructYamlInteger,
	  predicate: isInteger,
	  represent: {
	    binary:      function (object) { return '0b' + object.toString(2); },
	    octal:       function (object) { return '0'  + object.toString(8); },
	    decimal:     function (object) { return        object.toString(10); },
	    hexadecimal: function (object) { return '0x' + object.toString(16).toUpperCase(); }
	  },
	  defaultStyle: 'decimal',
	  styleAliases: {
	    binary:      [ 2,  'bin' ],
	    octal:       [ 8,  'oct' ],
	    decimal:     [ 10, 'dec' ],
	    hexadecimal: [ 16, 'hex' ]
	  }
	});


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var common = __webpack_require__(38);
	var Type   = __webpack_require__(43);

	var YAML_FLOAT_PATTERN = new RegExp(
	  // 2.5e4, 2.5 and integers
	  '^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
	  // .2e4, .2
	  // special case, seems not from spec
	  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
	  // 20:59
	  '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' +
	  // .inf
	  '|[-+]?\\.(?:inf|Inf|INF)' +
	  // .nan
	  '|\\.(?:nan|NaN|NAN))$');

	function resolveYamlFloat(data) {
	  if (data === null) return false;

	  if (!YAML_FLOAT_PATTERN.test(data) ||
	      // Quick hack to not allow integers end with `_`
	      // Probably should update regexp & check speed
	      data[data.length - 1] === '_') {
	    return false;
	  }

	  return true;
	}

	function constructYamlFloat(data) {
	  var value, sign, base, digits;

	  value  = data.replace(/_/g, '').toLowerCase();
	  sign   = value[0] === '-' ? -1 : 1;
	  digits = [];

	  if ('+-'.indexOf(value[0]) >= 0) {
	    value = value.slice(1);
	  }

	  if (value === '.inf') {
	    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

	  } else if (value === '.nan') {
	    return NaN;

	  } else if (value.indexOf(':') >= 0) {
	    value.split(':').forEach(function (v) {
	      digits.unshift(parseFloat(v, 10));
	    });

	    value = 0.0;
	    base = 1;

	    digits.forEach(function (d) {
	      value += d * base;
	      base *= 60;
	    });

	    return sign * value;

	  }
	  return sign * parseFloat(value, 10);
	}


	var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

	function representYamlFloat(object, style) {
	  var res;

	  if (isNaN(object)) {
	    switch (style) {
	      case 'lowercase': return '.nan';
	      case 'uppercase': return '.NAN';
	      case 'camelcase': return '.NaN';
	    }
	  } else if (Number.POSITIVE_INFINITY === object) {
	    switch (style) {
	      case 'lowercase': return '.inf';
	      case 'uppercase': return '.INF';
	      case 'camelcase': return '.Inf';
	    }
	  } else if (Number.NEGATIVE_INFINITY === object) {
	    switch (style) {
	      case 'lowercase': return '-.inf';
	      case 'uppercase': return '-.INF';
	      case 'camelcase': return '-.Inf';
	    }
	  } else if (common.isNegativeZero(object)) {
	    return '-0.0';
	  }

	  res = object.toString(10);

	  // JS stringifier can build scientific format without dots: 5e-100,
	  // while YAML requres dot: 5.e-100. Fix it with simple hack

	  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
	}

	function isFloat(object) {
	  return (Object.prototype.toString.call(object) === '[object Number]') &&
	         (object % 1 !== 0 || common.isNegativeZero(object));
	}

	module.exports = new Type('tag:yaml.org,2002:float', {
	  kind: 'scalar',
	  resolve: resolveYamlFloat,
	  construct: constructYamlFloat,
	  predicate: isFloat,
	  represent: representYamlFloat,
	  defaultStyle: 'lowercase'
	});


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	var YAML_DATE_REGEXP = new RegExp(
	  '^([0-9][0-9][0-9][0-9])'          + // [1] year
	  '-([0-9][0-9])'                    + // [2] month
	  '-([0-9][0-9])$');                   // [3] day

	var YAML_TIMESTAMP_REGEXP = new RegExp(
	  '^([0-9][0-9][0-9][0-9])'          + // [1] year
	  '-([0-9][0-9]?)'                   + // [2] month
	  '-([0-9][0-9]?)'                   + // [3] day
	  '(?:[Tt]|[ \\t]+)'                 + // ...
	  '([0-9][0-9]?)'                    + // [4] hour
	  ':([0-9][0-9])'                    + // [5] minute
	  ':([0-9][0-9])'                    + // [6] second
	  '(?:\\.([0-9]*))?'                 + // [7] fraction
	  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
	  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

	function resolveYamlTimestamp(data) {
	  if (data === null) return false;
	  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
	  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
	  return false;
	}

	function constructYamlTimestamp(data) {
	  var match, year, month, day, hour, minute, second, fraction = 0,
	      delta = null, tz_hour, tz_minute, date;

	  match = YAML_DATE_REGEXP.exec(data);
	  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

	  if (match === null) throw new Error('Date resolve error');

	  // match: [1] year [2] month [3] day

	  year = +(match[1]);
	  month = +(match[2]) - 1; // JS month starts with 0
	  day = +(match[3]);

	  if (!match[4]) { // no hour
	    return new Date(Date.UTC(year, month, day));
	  }

	  // match: [4] hour [5] minute [6] second [7] fraction

	  hour = +(match[4]);
	  minute = +(match[5]);
	  second = +(match[6]);

	  if (match[7]) {
	    fraction = match[7].slice(0, 3);
	    while (fraction.length < 3) { // milli-seconds
	      fraction += '0';
	    }
	    fraction = +fraction;
	  }

	  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

	  if (match[9]) {
	    tz_hour = +(match[10]);
	    tz_minute = +(match[11] || 0);
	    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
	    if (match[9] === '-') delta = -delta;
	  }

	  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

	  if (delta) date.setTime(date.getTime() - delta);

	  return date;
	}

	function representYamlTimestamp(object /*, style*/) {
	  return object.toISOString();
	}

	module.exports = new Type('tag:yaml.org,2002:timestamp', {
	  kind: 'scalar',
	  resolve: resolveYamlTimestamp,
	  construct: constructYamlTimestamp,
	  instanceOf: Date,
	  represent: representYamlTimestamp
	});


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	function resolveYamlMerge(data) {
	  return data === '<<' || data === null;
	}

	module.exports = new Type('tag:yaml.org,2002:merge', {
	  kind: 'scalar',
	  resolve: resolveYamlMerge
	});


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var require;'use strict';

	/*eslint-disable no-bitwise*/

	var NodeBuffer;

	try {
	  // A trick for browserified version, to not include `Buffer` shim
	  var _require = require;
	  NodeBuffer = __webpack_require__(57).Buffer;
	} catch (__) {}

	var Type       = __webpack_require__(43);


	// [ 64, 65, 66 ] -> [ padding, CR, LF ]
	var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


	function resolveYamlBinary(data) {
	  if (data === null) return false;

	  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

	  // Convert one by one.
	  for (idx = 0; idx < max; idx++) {
	    code = map.indexOf(data.charAt(idx));

	    // Skip CR/LF
	    if (code > 64) continue;

	    // Fail on illegal characters
	    if (code < 0) return false;

	    bitlen += 6;
	  }

	  // If there are any bits left, source was corrupted
	  return (bitlen % 8) === 0;
	}

	function constructYamlBinary(data) {
	  var idx, tailbits,
	      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
	      max = input.length,
	      map = BASE64_MAP,
	      bits = 0,
	      result = [];

	  // Collect by 6*4 bits (3 bytes)

	  for (idx = 0; idx < max; idx++) {
	    if ((idx % 4 === 0) && idx) {
	      result.push((bits >> 16) & 0xFF);
	      result.push((bits >> 8) & 0xFF);
	      result.push(bits & 0xFF);
	    }

	    bits = (bits << 6) | map.indexOf(input.charAt(idx));
	  }

	  // Dump tail

	  tailbits = (max % 4) * 6;

	  if (tailbits === 0) {
	    result.push((bits >> 16) & 0xFF);
	    result.push((bits >> 8) & 0xFF);
	    result.push(bits & 0xFF);
	  } else if (tailbits === 18) {
	    result.push((bits >> 10) & 0xFF);
	    result.push((bits >> 2) & 0xFF);
	  } else if (tailbits === 12) {
	    result.push((bits >> 4) & 0xFF);
	  }

	  // Wrap into Buffer for NodeJS and leave Array for browser
	  if (NodeBuffer) {
	    // Support node 6.+ Buffer API when available
	    return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
	  }

	  return result;
	}

	function representYamlBinary(object /*, style*/) {
	  var result = '', bits = 0, idx, tail,
	      max = object.length,
	      map = BASE64_MAP;

	  // Convert every three bytes to 4 ASCII characters.

	  for (idx = 0; idx < max; idx++) {
	    if ((idx % 3 === 0) && idx) {
	      result += map[(bits >> 18) & 0x3F];
	      result += map[(bits >> 12) & 0x3F];
	      result += map[(bits >> 6) & 0x3F];
	      result += map[bits & 0x3F];
	    }

	    bits = (bits << 8) + object[idx];
	  }

	  // Dump tail

	  tail = max % 3;

	  if (tail === 0) {
	    result += map[(bits >> 18) & 0x3F];
	    result += map[(bits >> 12) & 0x3F];
	    result += map[(bits >> 6) & 0x3F];
	    result += map[bits & 0x3F];
	  } else if (tail === 2) {
	    result += map[(bits >> 10) & 0x3F];
	    result += map[(bits >> 4) & 0x3F];
	    result += map[(bits << 2) & 0x3F];
	    result += map[64];
	  } else if (tail === 1) {
	    result += map[(bits >> 2) & 0x3F];
	    result += map[(bits << 4) & 0x3F];
	    result += map[64];
	    result += map[64];
	  }

	  return result;
	}

	function isBinary(object) {
	  return NodeBuffer && NodeBuffer.isBuffer(object);
	}

	module.exports = new Type('tag:yaml.org,2002:binary', {
	  kind: 'scalar',
	  resolve: resolveYamlBinary,
	  construct: constructYamlBinary,
	  predicate: isBinary,
	  represent: representYamlBinary
	});


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(58)
	var ieee754 = __webpack_require__(59)
	var isArray = __webpack_require__(60)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return (b64.length * 3 / 4) - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr((len * 3 / 4) - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0; i < l; i += 4) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ }),
/* 59 */
/***/ (function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ }),
/* 60 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	var _toString       = Object.prototype.toString;

	function resolveYamlOmap(data) {
	  if (data === null) return true;

	  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
	      object = data;

	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];
	    pairHasKey = false;

	    if (_toString.call(pair) !== '[object Object]') return false;

	    for (pairKey in pair) {
	      if (_hasOwnProperty.call(pair, pairKey)) {
	        if (!pairHasKey) pairHasKey = true;
	        else return false;
	      }
	    }

	    if (!pairHasKey) return false;

	    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
	    else return false;
	  }

	  return true;
	}

	function constructYamlOmap(data) {
	  return data !== null ? data : [];
	}

	module.exports = new Type('tag:yaml.org,2002:omap', {
	  kind: 'sequence',
	  resolve: resolveYamlOmap,
	  construct: constructYamlOmap
	});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	var _toString = Object.prototype.toString;

	function resolveYamlPairs(data) {
	  if (data === null) return true;

	  var index, length, pair, keys, result,
	      object = data;

	  result = new Array(object.length);

	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];

	    if (_toString.call(pair) !== '[object Object]') return false;

	    keys = Object.keys(pair);

	    if (keys.length !== 1) return false;

	    result[index] = [ keys[0], pair[keys[0]] ];
	  }

	  return true;
	}

	function constructYamlPairs(data) {
	  if (data === null) return [];

	  var index, length, pair, keys, result,
	      object = data;

	  result = new Array(object.length);

	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];

	    keys = Object.keys(pair);

	    result[index] = [ keys[0], pair[keys[0]] ];
	  }

	  return result;
	}

	module.exports = new Type('tag:yaml.org,2002:pairs', {
	  kind: 'sequence',
	  resolve: resolveYamlPairs,
	  construct: constructYamlPairs
	});


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	var _hasOwnProperty = Object.prototype.hasOwnProperty;

	function resolveYamlSet(data) {
	  if (data === null) return true;

	  var key, object = data;

	  for (key in object) {
	    if (_hasOwnProperty.call(object, key)) {
	      if (object[key] !== null) return false;
	    }
	  }

	  return true;
	}

	function constructYamlSet(data) {
	  return data !== null ? data : {};
	}

	module.exports = new Type('tag:yaml.org,2002:set', {
	  kind: 'mapping',
	  resolve: resolveYamlSet,
	  construct: constructYamlSet
	});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	// JS-YAML's default schema for `load` function.
	// It is not described in the YAML specification.
	//
	// This schema is based on JS-YAML's default safe schema and includes
	// JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
	//
	// Also this schema is used as default base schema at `Schema.create` function.


	'use strict';


	var Schema = __webpack_require__(42);


	module.exports = Schema.DEFAULT = new Schema({
	  include: [
	    __webpack_require__(41)
	  ],
	  explicit: [
	    __webpack_require__(65),
	    __webpack_require__(66),
	    __webpack_require__(67)
	  ]
	});


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	function resolveJavascriptUndefined() {
	  return true;
	}

	function constructJavascriptUndefined() {
	  /*eslint-disable no-undefined*/
	  return undefined;
	}

	function representJavascriptUndefined() {
	  return '';
	}

	function isUndefined(object) {
	  return typeof object === 'undefined';
	}

	module.exports = new Type('tag:yaml.org,2002:js/undefined', {
	  kind: 'scalar',
	  resolve: resolveJavascriptUndefined,
	  construct: constructJavascriptUndefined,
	  predicate: isUndefined,
	  represent: representJavascriptUndefined
	});


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(43);

	function resolveJavascriptRegExp(data) {
	  if (data === null) return false;
	  if (data.length === 0) return false;

	  var regexp = data,
	      tail   = /\/([gim]*)$/.exec(data),
	      modifiers = '';

	  // if regexp starts with '/' it can have modifiers and must be properly closed
	  // `/foo/gim` - modifiers tail can be maximum 3 chars
	  if (regexp[0] === '/') {
	    if (tail) modifiers = tail[1];

	    if (modifiers.length > 3) return false;
	    // if expression starts with /, is should be properly terminated
	    if (regexp[regexp.length - modifiers.length - 1] !== '/') return false;
	  }

	  return true;
	}

	function constructJavascriptRegExp(data) {
	  var regexp = data,
	      tail   = /\/([gim]*)$/.exec(data),
	      modifiers = '';

	  // `/foo/gim` - tail can be maximum 4 chars
	  if (regexp[0] === '/') {
	    if (tail) modifiers = tail[1];
	    regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
	  }

	  return new RegExp(regexp, modifiers);
	}

	function representJavascriptRegExp(object /*, style*/) {
	  var result = '/' + object.source + '/';

	  if (object.global) result += 'g';
	  if (object.multiline) result += 'm';
	  if (object.ignoreCase) result += 'i';

	  return result;
	}

	function isRegExp(object) {
	  return Object.prototype.toString.call(object) === '[object RegExp]';
	}

	module.exports = new Type('tag:yaml.org,2002:js/regexp', {
	  kind: 'scalar',
	  resolve: resolveJavascriptRegExp,
	  construct: constructJavascriptRegExp,
	  predicate: isRegExp,
	  represent: representJavascriptRegExp
	});


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	var require;'use strict';

	var esprima;

	// Browserified version does not have esprima
	//
	// 1. For node.js just require module as deps
	// 2. For browser try to require mudule via external AMD system.
	//    If not found - try to fallback to window.esprima. If not
	//    found too - then fail to parse.
	//
	try {
	  // workaround to exclude package from browserify list.
	  var _require = require;
	  esprima = __webpack_require__(68);
	} catch (_) {
	  /*global window */
	  if (typeof window !== 'undefined') esprima = window.esprima;
	}

	var Type = __webpack_require__(43);

	function resolveJavascriptFunction(data) {
	  if (data === null) return false;

	  try {
	    var source = '(' + data + ')',
	        ast    = esprima.parse(source, { range: true });

	    if (ast.type                    !== 'Program'             ||
	        ast.body.length             !== 1                     ||
	        ast.body[0].type            !== 'ExpressionStatement' ||
	        ast.body[0].expression.type !== 'FunctionExpression') {
	      return false;
	    }

	    return true;
	  } catch (err) {
	    return false;
	  }
	}

	function constructJavascriptFunction(data) {
	  /*jslint evil:true*/

	  var source = '(' + data + ')',
	      ast    = esprima.parse(source, { range: true }),
	      params = [],
	      body;

	  if (ast.type                    !== 'Program'             ||
	      ast.body.length             !== 1                     ||
	      ast.body[0].type            !== 'ExpressionStatement' ||
	      ast.body[0].expression.type !== 'FunctionExpression') {
	    throw new Error('Failed to resolve function');
	  }

	  ast.body[0].expression.params.forEach(function (param) {
	    params.push(param.name);
	  });

	  body = ast.body[0].expression.body.range;

	  // Esprima's ranges include the first '{' and the last '}' characters on
	  // function expressions. So cut them out.
	  /*eslint-disable no-new-func*/
	  return new Function(params, source.slice(body[0] + 1, body[1] - 1));
	}

	function representJavascriptFunction(object /*, style*/) {
	  return object.toString();
	}

	function isFunction(object) {
	  return Object.prototype.toString.call(object) === '[object Function]';
	}

	module.exports = new Type('tag:yaml.org,2002:js/function', {
	  kind: 'scalar',
	  resolve: resolveJavascriptFunction,
	  construct: constructJavascriptFunction,
	  predicate: isFunction,
	  represent: representJavascriptFunction
	});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
	/* istanbul ignore next */
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
	/* istanbul ignore next */
		else if(typeof exports === 'object')
			exports["esprima"] = factory();
		else
			root["esprima"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/* istanbul ignore if */
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

		/*
		  Copyright JS Foundation and other contributors, https://js.foundation/

		  Redistribution and use in source and binary forms, with or without
		  modification, are permitted provided that the following conditions are met:

		    * Redistributions of source code must retain the above copyright
		      notice, this list of conditions and the following disclaimer.
		    * Redistributions in binary form must reproduce the above copyright
		      notice, this list of conditions and the following disclaimer in the
		      documentation and/or other materials provided with the distribution.

		  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
		  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
		  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
		  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
		  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
		  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
		  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
		  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
		  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		*/
		"use strict";
		var comment_handler_1 = __webpack_require__(1);
		var parser_1 = __webpack_require__(3);
		var jsx_parser_1 = __webpack_require__(11);
		var tokenizer_1 = __webpack_require__(15);
		function parse(code, options, delegate) {
		    var commentHandler = null;
		    var proxyDelegate = function (node, metadata) {
		        if (delegate) {
		            delegate(node, metadata);
		        }
		        if (commentHandler) {
		            commentHandler.visit(node, metadata);
		        }
		    };
		    var parserDelegate = (typeof delegate === 'function') ? proxyDelegate : null;
		    var collectComment = false;
		    if (options) {
		        collectComment = (typeof options.comment === 'boolean' && options.comment);
		        var attachComment = (typeof options.attachComment === 'boolean' && options.attachComment);
		        if (collectComment || attachComment) {
		            commentHandler = new comment_handler_1.CommentHandler();
		            commentHandler.attach = attachComment;
		            options.comment = true;
		            parserDelegate = proxyDelegate;
		        }
		    }
		    var parser;
		    if (options && typeof options.jsx === 'boolean' && options.jsx) {
		        parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
		    }
		    else {
		        parser = new parser_1.Parser(code, options, parserDelegate);
		    }
		    var ast = (parser.parseProgram());
		    if (collectComment) {
		        ast.comments = commentHandler.comments;
		    }
		    if (parser.config.tokens) {
		        ast.tokens = parser.tokens;
		    }
		    if (parser.config.tolerant) {
		        ast.errors = parser.errorHandler.errors;
		    }
		    return ast;
		}
		exports.parse = parse;
		function tokenize(code, options, delegate) {
		    var tokenizer = new tokenizer_1.Tokenizer(code, options);
		    var tokens;
		    tokens = [];
		    try {
		        while (true) {
		            var token = tokenizer.getNextToken();
		            if (!token) {
		                break;
		            }
		            if (delegate) {
		                token = delegate(token);
		            }
		            tokens.push(token);
		        }
		    }
		    catch (e) {
		        tokenizer.errorHandler.tolerate(e);
		    }
		    if (tokenizer.errorHandler.tolerant) {
		        tokens.errors = tokenizer.errors();
		    }
		    return tokens;
		}
		exports.tokenize = tokenize;
		var syntax_1 = __webpack_require__(2);
		exports.Syntax = syntax_1.Syntax;
		// Sync with *.json manifests.
		exports.version = '3.1.3';


	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		var syntax_1 = __webpack_require__(2);
		var CommentHandler = (function () {
		    function CommentHandler() {
		        this.attach = false;
		        this.comments = [];
		        this.stack = [];
		        this.leading = [];
		        this.trailing = [];
		    }
		    CommentHandler.prototype.insertInnerComments = function (node, metadata) {
		        //  innnerComments for properties empty block
		        //  `function a() {/** comments **\/}`
		        if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
		            var innerComments = [];
		            for (var i = this.leading.length - 1; i >= 0; --i) {
		                var entry = this.leading[i];
		                if (metadata.end.offset >= entry.start) {
		                    innerComments.unshift(entry.comment);
		                    this.leading.splice(i, 1);
		                    this.trailing.splice(i, 1);
		                }
		            }
		            if (innerComments.length) {
		                node.innerComments = innerComments;
		            }
		        }
		    };
		    CommentHandler.prototype.findTrailingComments = function (node, metadata) {
		        var trailingComments = [];
		        if (this.trailing.length > 0) {
		            for (var i = this.trailing.length - 1; i >= 0; --i) {
		                var entry_1 = this.trailing[i];
		                if (entry_1.start >= metadata.end.offset) {
		                    trailingComments.unshift(entry_1.comment);
		                }
		            }
		            this.trailing.length = 0;
		            return trailingComments;
		        }
		        var entry = this.stack[this.stack.length - 1];
		        if (entry && entry.node.trailingComments) {
		            var firstComment = entry.node.trailingComments[0];
		            if (firstComment && firstComment.range[0] >= metadata.end.offset) {
		                trailingComments = entry.node.trailingComments;
		                delete entry.node.trailingComments;
		            }
		        }
		        return trailingComments;
		    };
		    CommentHandler.prototype.findLeadingComments = function (node, metadata) {
		        var leadingComments = [];
		        var target;
		        while (this.stack.length > 0) {
		            var entry = this.stack[this.stack.length - 1];
		            if (entry && entry.start >= metadata.start.offset) {
		                target = this.stack.pop().node;
		            }
		            else {
		                break;
		            }
		        }
		        if (target) {
		            var count = target.leadingComments ? target.leadingComments.length : 0;
		            for (var i = count - 1; i >= 0; --i) {
		                var comment = target.leadingComments[i];
		                if (comment.range[1] <= metadata.start.offset) {
		                    leadingComments.unshift(comment);
		                    target.leadingComments.splice(i, 1);
		                }
		            }
		            if (target.leadingComments && target.leadingComments.length === 0) {
		                delete target.leadingComments;
		            }
		            return leadingComments;
		        }
		        for (var i = this.leading.length - 1; i >= 0; --i) {
		            var entry = this.leading[i];
		            if (entry.start <= metadata.start.offset) {
		                leadingComments.unshift(entry.comment);
		                this.leading.splice(i, 1);
		            }
		        }
		        return leadingComments;
		    };
		    CommentHandler.prototype.visitNode = function (node, metadata) {
		        if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
		            return;
		        }
		        this.insertInnerComments(node, metadata);
		        var trailingComments = this.findTrailingComments(node, metadata);
		        var leadingComments = this.findLeadingComments(node, metadata);
		        if (leadingComments.length > 0) {
		            node.leadingComments = leadingComments;
		        }
		        if (trailingComments.length > 0) {
		            node.trailingComments = trailingComments;
		        }
		        this.stack.push({
		            node: node,
		            start: metadata.start.offset
		        });
		    };
		    CommentHandler.prototype.visitComment = function (node, metadata) {
		        var type = (node.type[0] === 'L') ? 'Line' : 'Block';
		        var comment = {
		            type: type,
		            value: node.value
		        };
		        if (node.range) {
		            comment.range = node.range;
		        }
		        if (node.loc) {
		            comment.loc = node.loc;
		        }
		        this.comments.push(comment);
		        if (this.attach) {
		            var entry = {
		                comment: {
		                    type: type,
		                    value: node.value,
		                    range: [metadata.start.offset, metadata.end.offset]
		                },
		                start: metadata.start.offset
		            };
		            if (node.loc) {
		                entry.comment.loc = node.loc;
		            }
		            node.type = type;
		            this.leading.push(entry);
		            this.trailing.push(entry);
		        }
		    };
		    CommentHandler.prototype.visit = function (node, metadata) {
		        if (node.type === 'LineComment') {
		            this.visitComment(node, metadata);
		        }
		        else if (node.type === 'BlockComment') {
		            this.visitComment(node, metadata);
		        }
		        else if (this.attach) {
		            this.visitNode(node, metadata);
		        }
		    };
		    return CommentHandler;
		}());
		exports.CommentHandler = CommentHandler;


	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		"use strict";
		exports.Syntax = {
		    AssignmentExpression: 'AssignmentExpression',
		    AssignmentPattern: 'AssignmentPattern',
		    ArrayExpression: 'ArrayExpression',
		    ArrayPattern: 'ArrayPattern',
		    ArrowFunctionExpression: 'ArrowFunctionExpression',
		    BlockStatement: 'BlockStatement',
		    BinaryExpression: 'BinaryExpression',
		    BreakStatement: 'BreakStatement',
		    CallExpression: 'CallExpression',
		    CatchClause: 'CatchClause',
		    ClassBody: 'ClassBody',
		    ClassDeclaration: 'ClassDeclaration',
		    ClassExpression: 'ClassExpression',
		    ConditionalExpression: 'ConditionalExpression',
		    ContinueStatement: 'ContinueStatement',
		    DoWhileStatement: 'DoWhileStatement',
		    DebuggerStatement: 'DebuggerStatement',
		    EmptyStatement: 'EmptyStatement',
		    ExportAllDeclaration: 'ExportAllDeclaration',
		    ExportDefaultDeclaration: 'ExportDefaultDeclaration',
		    ExportNamedDeclaration: 'ExportNamedDeclaration',
		    ExportSpecifier: 'ExportSpecifier',
		    ExpressionStatement: 'ExpressionStatement',
		    ForStatement: 'ForStatement',
		    ForOfStatement: 'ForOfStatement',
		    ForInStatement: 'ForInStatement',
		    FunctionDeclaration: 'FunctionDeclaration',
		    FunctionExpression: 'FunctionExpression',
		    Identifier: 'Identifier',
		    IfStatement: 'IfStatement',
		    ImportDeclaration: 'ImportDeclaration',
		    ImportDefaultSpecifier: 'ImportDefaultSpecifier',
		    ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
		    ImportSpecifier: 'ImportSpecifier',
		    Literal: 'Literal',
		    LabeledStatement: 'LabeledStatement',
		    LogicalExpression: 'LogicalExpression',
		    MemberExpression: 'MemberExpression',
		    MetaProperty: 'MetaProperty',
		    MethodDefinition: 'MethodDefinition',
		    NewExpression: 'NewExpression',
		    ObjectExpression: 'ObjectExpression',
		    ObjectPattern: 'ObjectPattern',
		    Program: 'Program',
		    Property: 'Property',
		    RestElement: 'RestElement',
		    ReturnStatement: 'ReturnStatement',
		    SequenceExpression: 'SequenceExpression',
		    SpreadElement: 'SpreadElement',
		    Super: 'Super',
		    SwitchCase: 'SwitchCase',
		    SwitchStatement: 'SwitchStatement',
		    TaggedTemplateExpression: 'TaggedTemplateExpression',
		    TemplateElement: 'TemplateElement',
		    TemplateLiteral: 'TemplateLiteral',
		    ThisExpression: 'ThisExpression',
		    ThrowStatement: 'ThrowStatement',
		    TryStatement: 'TryStatement',
		    UnaryExpression: 'UnaryExpression',
		    UpdateExpression: 'UpdateExpression',
		    VariableDeclaration: 'VariableDeclaration',
		    VariableDeclarator: 'VariableDeclarator',
		    WhileStatement: 'WhileStatement',
		    WithStatement: 'WithStatement',
		    YieldExpression: 'YieldExpression'
		};


	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		var assert_1 = __webpack_require__(4);
		var messages_1 = __webpack_require__(5);
		var error_handler_1 = __webpack_require__(6);
		var token_1 = __webpack_require__(7);
		var scanner_1 = __webpack_require__(8);
		var syntax_1 = __webpack_require__(2);
		var Node = __webpack_require__(10);
		var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
		var Parser = (function () {
		    function Parser(code, options, delegate) {
		        if (options === void 0) { options = {}; }
		        this.config = {
		            range: (typeof options.range === 'boolean') && options.range,
		            loc: (typeof options.loc === 'boolean') && options.loc,
		            source: null,
		            tokens: (typeof options.tokens === 'boolean') && options.tokens,
		            comment: (typeof options.comment === 'boolean') && options.comment,
		            tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
		        };
		        if (this.config.loc && options.source && options.source !== null) {
		            this.config.source = String(options.source);
		        }
		        this.delegate = delegate;
		        this.errorHandler = new error_handler_1.ErrorHandler();
		        this.errorHandler.tolerant = this.config.tolerant;
		        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
		        this.scanner.trackComment = this.config.comment;
		        this.operatorPrecedence = {
		            ')': 0,
		            ';': 0,
		            ',': 0,
		            '=': 0,
		            ']': 0,
		            '||': 1,
		            '&&': 2,
		            '|': 3,
		            '^': 4,
		            '&': 5,
		            '==': 6,
		            '!=': 6,
		            '===': 6,
		            '!==': 6,
		            '<': 7,
		            '>': 7,
		            '<=': 7,
		            '>=': 7,
		            '<<': 8,
		            '>>': 8,
		            '>>>': 8,
		            '+': 9,
		            '-': 9,
		            '*': 11,
		            '/': 11,
		            '%': 11
		        };
		        this.sourceType = (options && options.sourceType === 'module') ? 'module' : 'script';
		        this.lookahead = null;
		        this.hasLineTerminator = false;
		        this.context = {
		            allowIn: true,
		            allowYield: true,
		            firstCoverInitializedNameError: null,
		            isAssignmentTarget: false,
		            isBindingElement: false,
		            inFunctionBody: false,
		            inIteration: false,
		            inSwitch: false,
		            labelSet: {},
		            strict: (this.sourceType === 'module')
		        };
		        this.tokens = [];
		        this.startMarker = {
		            index: 0,
		            lineNumber: this.scanner.lineNumber,
		            lineStart: 0
		        };
		        this.lastMarker = {
		            index: 0,
		            lineNumber: this.scanner.lineNumber,
		            lineStart: 0
		        };
		        this.nextToken();
		        this.lastMarker = {
		            index: this.scanner.index,
		            lineNumber: this.scanner.lineNumber,
		            lineStart: this.scanner.lineStart
		        };
		    }
		    Parser.prototype.throwError = function (messageFormat) {
		        var values = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            values[_i - 1] = arguments[_i];
		        }
		        var args = Array.prototype.slice.call(arguments, 1);
		        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
		            assert_1.assert(idx < args.length, 'Message reference must be in range');
		            return args[idx];
		        });
		        var index = this.lastMarker.index;
		        var line = this.lastMarker.lineNumber;
		        var column = this.lastMarker.index - this.lastMarker.lineStart + 1;
		        throw this.errorHandler.createError(index, line, column, msg);
		    };
		    Parser.prototype.tolerateError = function (messageFormat) {
		        var values = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            values[_i - 1] = arguments[_i];
		        }
		        var args = Array.prototype.slice.call(arguments, 1);
		        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
		            assert_1.assert(idx < args.length, 'Message reference must be in range');
		            return args[idx];
		        });
		        var index = this.lastMarker.index;
		        var line = this.scanner.lineNumber;
		        var column = this.lastMarker.index - this.lastMarker.lineStart + 1;
		        this.errorHandler.tolerateError(index, line, column, msg);
		    };
		    // Throw an exception because of the token.
		    Parser.prototype.unexpectedTokenError = function (token, message) {
		        var msg = message || messages_1.Messages.UnexpectedToken;
		        var value;
		        if (token) {
		            if (!message) {
		                msg = (token.type === token_1.Token.EOF) ? messages_1.Messages.UnexpectedEOS :
		                    (token.type === token_1.Token.Identifier) ? messages_1.Messages.UnexpectedIdentifier :
		                        (token.type === token_1.Token.NumericLiteral) ? messages_1.Messages.UnexpectedNumber :
		                            (token.type === token_1.Token.StringLiteral) ? messages_1.Messages.UnexpectedString :
		                                (token.type === token_1.Token.Template) ? messages_1.Messages.UnexpectedTemplate :
		                                    messages_1.Messages.UnexpectedToken;
		                if (token.type === token_1.Token.Keyword) {
		                    if (this.scanner.isFutureReservedWord(token.value)) {
		                        msg = messages_1.Messages.UnexpectedReserved;
		                    }
		                    else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
		                        msg = messages_1.Messages.StrictReservedWord;
		                    }
		                }
		            }
		            value = (token.type === token_1.Token.Template) ? token.value.raw : token.value;
		        }
		        else {
		            value = 'ILLEGAL';
		        }
		        msg = msg.replace('%0', value);
		        if (token && typeof token.lineNumber === 'number') {
		            var index = token.start;
		            var line = token.lineNumber;
		            var column = token.start - this.lastMarker.lineStart + 1;
		            return this.errorHandler.createError(index, line, column, msg);
		        }
		        else {
		            var index = this.lastMarker.index;
		            var line = this.lastMarker.lineNumber;
		            var column = index - this.lastMarker.lineStart + 1;
		            return this.errorHandler.createError(index, line, column, msg);
		        }
		    };
		    Parser.prototype.throwUnexpectedToken = function (token, message) {
		        throw this.unexpectedTokenError(token, message);
		    };
		    Parser.prototype.tolerateUnexpectedToken = function (token, message) {
		        this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
		    };
		    Parser.prototype.collectComments = function () {
		        if (!this.config.comment) {
		            this.scanner.scanComments();
		        }
		        else {
		            var comments = this.scanner.scanComments();
		            if (comments.length > 0 && this.delegate) {
		                for (var i = 0; i < comments.length; ++i) {
		                    var e = comments[i];
		                    var node = void 0;
		                    node = {
		                        type: e.multiLine ? 'BlockComment' : 'LineComment',
		                        value: this.scanner.source.slice(e.slice[0], e.slice[1])
		                    };
		                    if (this.config.range) {
		                        node.range = e.range;
		                    }
		                    if (this.config.loc) {
		                        node.loc = e.loc;
		                    }
		                    var metadata = {
		                        start: {
		                            line: e.loc.start.line,
		                            column: e.loc.start.column,
		                            offset: e.range[0]
		                        },
		                        end: {
		                            line: e.loc.end.line,
		                            column: e.loc.end.column,
		                            offset: e.range[1]
		                        }
		                    };
		                    this.delegate(node, metadata);
		                }
		            }
		        }
		    };
		    // From internal representation to an external structure
		    Parser.prototype.getTokenRaw = function (token) {
		        return this.scanner.source.slice(token.start, token.end);
		    };
		    Parser.prototype.convertToken = function (token) {
		        var t;
		        t = {
		            type: token_1.TokenName[token.type],
		            value: this.getTokenRaw(token)
		        };
		        if (this.config.range) {
		            t.range = [token.start, token.end];
		        }
		        if (this.config.loc) {
		            t.loc = {
		                start: {
		                    line: this.startMarker.lineNumber,
		                    column: this.startMarker.index - this.startMarker.lineStart
		                },
		                end: {
		                    line: this.scanner.lineNumber,
		                    column: this.scanner.index - this.scanner.lineStart
		                }
		            };
		        }
		        if (token.regex) {
		            t.regex = token.regex;
		        }
		        return t;
		    };
		    Parser.prototype.nextToken = function () {
		        var token = this.lookahead;
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.lineNumber = this.scanner.lineNumber;
		        this.lastMarker.lineStart = this.scanner.lineStart;
		        this.collectComments();
		        this.startMarker.index = this.scanner.index;
		        this.startMarker.lineNumber = this.scanner.lineNumber;
		        this.startMarker.lineStart = this.scanner.lineStart;
		        var next;
		        next = this.scanner.lex();
		        this.hasLineTerminator = (token && next) ? (token.lineNumber !== next.lineNumber) : false;
		        if (next && this.context.strict && next.type === token_1.Token.Identifier) {
		            if (this.scanner.isStrictModeReservedWord(next.value)) {
		                next.type = token_1.Token.Keyword;
		            }
		        }
		        this.lookahead = next;
		        if (this.config.tokens && next.type !== token_1.Token.EOF) {
		            this.tokens.push(this.convertToken(next));
		        }
		        return token;
		    };
		    Parser.prototype.nextRegexToken = function () {
		        this.collectComments();
		        var token = this.scanner.scanRegExp();
		        if (this.config.tokens) {
		            // Pop the previous token, '/' or '/='
		            // This is added from the lookahead token.
		            this.tokens.pop();
		            this.tokens.push(this.convertToken(token));
		        }
		        // Prime the next lookahead.
		        this.lookahead = token;
		        this.nextToken();
		        return token;
		    };
		    Parser.prototype.createNode = function () {
		        return {
		            index: this.startMarker.index,
		            line: this.startMarker.lineNumber,
		            column: this.startMarker.index - this.startMarker.lineStart
		        };
		    };
		    Parser.prototype.startNode = function (token) {
		        return {
		            index: token.start,
		            line: token.lineNumber,
		            column: token.start - token.lineStart
		        };
		    };
		    Parser.prototype.finalize = function (meta, node) {
		        if (this.config.range) {
		            node.range = [meta.index, this.lastMarker.index];
		        }
		        if (this.config.loc) {
		            node.loc = {
		                start: {
		                    line: meta.line,
		                    column: meta.column
		                },
		                end: {
		                    line: this.lastMarker.lineNumber,
		                    column: this.lastMarker.index - this.lastMarker.lineStart
		                }
		            };
		            if (this.config.source) {
		                node.loc.source = this.config.source;
		            }
		        }
		        if (this.delegate) {
		            var metadata = {
		                start: {
		                    line: meta.line,
		                    column: meta.column,
		                    offset: meta.index
		                },
		                end: {
		                    line: this.lastMarker.lineNumber,
		                    column: this.lastMarker.index - this.lastMarker.lineStart,
		                    offset: this.lastMarker.index
		                }
		            };
		            this.delegate(node, metadata);
		        }
		        return node;
		    };
		    // Expect the next token to match the specified punctuator.
		    // If not, an exception will be thrown.
		    Parser.prototype.expect = function (value) {
		        var token = this.nextToken();
		        if (token.type !== token_1.Token.Punctuator || token.value !== value) {
		            this.throwUnexpectedToken(token);
		        }
		    };
		    // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
		    Parser.prototype.expectCommaSeparator = function () {
		        if (this.config.tolerant) {
		            var token = this.lookahead;
		            if (token.type === token_1.Token.Punctuator && token.value === ',') {
		                this.nextToken();
		            }
		            else if (token.type === token_1.Token.Punctuator && token.value === ';') {
		                this.nextToken();
		                this.tolerateUnexpectedToken(token);
		            }
		            else {
		                this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
		            }
		        }
		        else {
		            this.expect(',');
		        }
		    };
		    // Expect the next token to match the specified keyword.
		    // If not, an exception will be thrown.
		    Parser.prototype.expectKeyword = function (keyword) {
		        var token = this.nextToken();
		        if (token.type !== token_1.Token.Keyword || token.value !== keyword) {
		            this.throwUnexpectedToken(token);
		        }
		    };
		    // Return true if the next token matches the specified punctuator.
		    Parser.prototype.match = function (value) {
		        return this.lookahead.type === token_1.Token.Punctuator && this.lookahead.value === value;
		    };
		    // Return true if the next token matches the specified keyword
		    Parser.prototype.matchKeyword = function (keyword) {
		        return this.lookahead.type === token_1.Token.Keyword && this.lookahead.value === keyword;
		    };
		    // Return true if the next token matches the specified contextual keyword
		    // (where an identifier is sometimes a keyword depending on the context)
		    Parser.prototype.matchContextualKeyword = function (keyword) {
		        return this.lookahead.type === token_1.Token.Identifier && this.lookahead.value === keyword;
		    };
		    // Return true if the next token is an assignment operator
		    Parser.prototype.matchAssign = function () {
		        if (this.lookahead.type !== token_1.Token.Punctuator) {
		            return false;
		        }
		        var op = this.lookahead.value;
		        return op === '=' ||
		            op === '*=' ||
		            op === '**=' ||
		            op === '/=' ||
		            op === '%=' ||
		            op === '+=' ||
		            op === '-=' ||
		            op === '<<=' ||
		            op === '>>=' ||
		            op === '>>>=' ||
		            op === '&=' ||
		            op === '^=' ||
		            op === '|=';
		    };
		    // Cover grammar support.
		    //
		    // When an assignment expression position starts with an left parenthesis, the determination of the type
		    // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
		    // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
		    //
		    // There are three productions that can be parsed in a parentheses pair that needs to be determined
		    // after the outermost pair is closed. They are:
		    //
		    //   1. AssignmentExpression
		    //   2. BindingElements
		    //   3. AssignmentTargets
		    //
		    // In order to avoid exponential backtracking, we use two flags to denote if the production can be
		    // binding element or assignment target.
		    //
		    // The three productions have the relationship:
		    //
		    //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
		    //
		    // with a single exception that CoverInitializedName when used directly in an Expression, generates
		    // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
		    // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
		    //
		    // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
		    // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
		    // the CoverInitializedName check is conducted.
		    //
		    // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
		    // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
		    // pattern. The CoverInitializedName check is deferred.
		    Parser.prototype.isolateCoverGrammar = function (parseFunction) {
		        var previousIsBindingElement = this.context.isBindingElement;
		        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
		        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
		        this.context.isBindingElement = true;
		        this.context.isAssignmentTarget = true;
		        this.context.firstCoverInitializedNameError = null;
		        var result = parseFunction.call(this);
		        if (this.context.firstCoverInitializedNameError !== null) {
		            this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
		        }
		        this.context.isBindingElement = previousIsBindingElement;
		        this.context.isAssignmentTarget = previousIsAssignmentTarget;
		        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
		        return result;
		    };
		    Parser.prototype.inheritCoverGrammar = function (parseFunction) {
		        var previousIsBindingElement = this.context.isBindingElement;
		        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
		        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
		        this.context.isBindingElement = true;
		        this.context.isAssignmentTarget = true;
		        this.context.firstCoverInitializedNameError = null;
		        var result = parseFunction.call(this);
		        this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
		        this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
		        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
		        return result;
		    };
		    Parser.prototype.consumeSemicolon = function () {
		        if (this.match(';')) {
		            this.nextToken();
		        }
		        else if (!this.hasLineTerminator) {
		            if (this.lookahead.type !== token_1.Token.EOF && !this.match('}')) {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		            this.lastMarker.index = this.startMarker.index;
		            this.lastMarker.lineNumber = this.startMarker.lineNumber;
		            this.lastMarker.lineStart = this.startMarker.lineStart;
		        }
		    };
		    // ECMA-262 12.2 Primary Expressions
		    Parser.prototype.parsePrimaryExpression = function () {
		        var node = this.createNode();
		        var expr;
		        var value, token, raw;
		        switch (this.lookahead.type) {
		            case token_1.Token.Identifier:
		                if (this.sourceType === 'module' && this.lookahead.value === 'await') {
		                    this.tolerateUnexpectedToken(this.lookahead);
		                }
		                expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
		                break;
		            case token_1.Token.NumericLiteral:
		            case token_1.Token.StringLiteral:
		                if (this.context.strict && this.lookahead.octal) {
		                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
		                }
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                token = this.nextToken();
		                raw = this.getTokenRaw(token);
		                expr = this.finalize(node, new Node.Literal(token.value, raw));
		                break;
		            case token_1.Token.BooleanLiteral:
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                token = this.nextToken();
		                token.value = (token.value === 'true');
		                raw = this.getTokenRaw(token);
		                expr = this.finalize(node, new Node.Literal(token.value, raw));
		                break;
		            case token_1.Token.NullLiteral:
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                token = this.nextToken();
		                token.value = null;
		                raw = this.getTokenRaw(token);
		                expr = this.finalize(node, new Node.Literal(token.value, raw));
		                break;
		            case token_1.Token.Template:
		                expr = this.parseTemplateLiteral();
		                break;
		            case token_1.Token.Punctuator:
		                value = this.lookahead.value;
		                switch (value) {
		                    case '(':
		                        this.context.isBindingElement = false;
		                        expr = this.inheritCoverGrammar(this.parseGroupExpression);
		                        break;
		                    case '[':
		                        expr = this.inheritCoverGrammar(this.parseArrayInitializer);
		                        break;
		                    case '{':
		                        expr = this.inheritCoverGrammar(this.parseObjectInitializer);
		                        break;
		                    case '/':
		                    case '/=':
		                        this.context.isAssignmentTarget = false;
		                        this.context.isBindingElement = false;
		                        this.scanner.index = this.startMarker.index;
		                        token = this.nextRegexToken();
		                        raw = this.getTokenRaw(token);
		                        expr = this.finalize(node, new Node.RegexLiteral(token.value, raw, token.regex));
		                        break;
		                    default:
		                        this.throwUnexpectedToken(this.nextToken());
		                }
		                break;
		            case token_1.Token.Keyword:
		                if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
		                    expr = this.parseIdentifierName();
		                }
		                else if (!this.context.strict && this.matchKeyword('let')) {
		                    expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
		                }
		                else {
		                    this.context.isAssignmentTarget = false;
		                    this.context.isBindingElement = false;
		                    if (this.matchKeyword('function')) {
		                        expr = this.parseFunctionExpression();
		                    }
		                    else if (this.matchKeyword('this')) {
		                        this.nextToken();
		                        expr = this.finalize(node, new Node.ThisExpression());
		                    }
		                    else if (this.matchKeyword('class')) {
		                        expr = this.parseClassExpression();
		                    }
		                    else {
		                        this.throwUnexpectedToken(this.nextToken());
		                    }
		                }
		                break;
		            default:
		                this.throwUnexpectedToken(this.nextToken());
		        }
		        return expr;
		    };
		    // ECMA-262 12.2.5 Array Initializer
		    Parser.prototype.parseSpreadElement = function () {
		        var node = this.createNode();
		        this.expect('...');
		        var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
		        return this.finalize(node, new Node.SpreadElement(arg));
		    };
		    Parser.prototype.parseArrayInitializer = function () {
		        var node = this.createNode();
		        var elements = [];
		        this.expect('[');
		        while (!this.match(']')) {
		            if (this.match(',')) {
		                this.nextToken();
		                elements.push(null);
		            }
		            else if (this.match('...')) {
		                var element = this.parseSpreadElement();
		                if (!this.match(']')) {
		                    this.context.isAssignmentTarget = false;
		                    this.context.isBindingElement = false;
		                    this.expect(',');
		                }
		                elements.push(element);
		            }
		            else {
		                elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
		                if (!this.match(']')) {
		                    this.expect(',');
		                }
		            }
		        }
		        this.expect(']');
		        return this.finalize(node, new Node.ArrayExpression(elements));
		    };
		    // ECMA-262 12.2.6 Object Initializer
		    Parser.prototype.parsePropertyMethod = function (params) {
		        this.context.isAssignmentTarget = false;
		        this.context.isBindingElement = false;
		        var previousStrict = this.context.strict;
		        var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
		        if (this.context.strict && params.firstRestricted) {
		            this.tolerateUnexpectedToken(params.firstRestricted, params.message);
		        }
		        if (this.context.strict && params.stricted) {
		            this.tolerateUnexpectedToken(params.stricted, params.message);
		        }
		        this.context.strict = previousStrict;
		        return body;
		    };
		    Parser.prototype.parsePropertyMethodFunction = function () {
		        var isGenerator = false;
		        var node = this.createNode();
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = false;
		        var params = this.parseFormalParameters();
		        var method = this.parsePropertyMethod(params);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
		    };
		    Parser.prototype.parseObjectPropertyKey = function () {
		        var node = this.createNode();
		        var token = this.nextToken();
		        var key = null;
		        switch (token.type) {
		            case token_1.Token.StringLiteral:
		            case token_1.Token.NumericLiteral:
		                if (this.context.strict && token.octal) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
		                }
		                var raw = this.getTokenRaw(token);
		                key = this.finalize(node, new Node.Literal(token.value, raw));
		                break;
		            case token_1.Token.Identifier:
		            case token_1.Token.BooleanLiteral:
		            case token_1.Token.NullLiteral:
		            case token_1.Token.Keyword:
		                key = this.finalize(node, new Node.Identifier(token.value));
		                break;
		            case token_1.Token.Punctuator:
		                if (token.value === '[') {
		                    key = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    this.expect(']');
		                }
		                else {
		                    this.throwUnexpectedToken(token);
		                }
		                break;
		            default:
		                this.throwUnexpectedToken(token);
		        }
		        return key;
		    };
		    Parser.prototype.isPropertyKey = function (key, value) {
		        return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
		            (key.type === syntax_1.Syntax.Literal && key.value === value);
		    };
		    Parser.prototype.parseObjectProperty = function (hasProto) {
		        var node = this.createNode();
		        var token = this.lookahead;
		        var kind;
		        var key;
		        var value;
		        var computed = false;
		        var method = false;
		        var shorthand = false;
		        if (token.type === token_1.Token.Identifier) {
		            this.nextToken();
		            key = this.finalize(node, new Node.Identifier(token.value));
		        }
		        else if (this.match('*')) {
		            this.nextToken();
		        }
		        else {
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		        }
		        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
		        if (token.type === token_1.Token.Identifier && token.value === 'get' && lookaheadPropertyKey) {
		            kind = 'get';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            this.context.allowYield = false;
		            value = this.parseGetterMethod();
		        }
		        else if (token.type === token_1.Token.Identifier && token.value === 'set' && lookaheadPropertyKey) {
		            kind = 'set';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            value = this.parseSetterMethod();
		        }
		        else if (token.type === token_1.Token.Punctuator && token.value === '*' && lookaheadPropertyKey) {
		            kind = 'init';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            value = this.parseGeneratorMethod();
		            method = true;
		        }
		        else {
		            if (!key) {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		            kind = 'init';
		            if (this.match(':')) {
		                if (!computed && this.isPropertyKey(key, '__proto__')) {
		                    if (hasProto.value) {
		                        this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
		                    }
		                    hasProto.value = true;
		                }
		                this.nextToken();
		                value = this.inheritCoverGrammar(this.parseAssignmentExpression);
		            }
		            else if (this.match('(')) {
		                value = this.parsePropertyMethodFunction();
		                method = true;
		            }
		            else if (token.type === token_1.Token.Identifier) {
		                var id = this.finalize(node, new Node.Identifier(token.value));
		                if (this.match('=')) {
		                    this.context.firstCoverInitializedNameError = this.lookahead;
		                    this.nextToken();
		                    shorthand = true;
		                    var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    value = this.finalize(node, new Node.AssignmentPattern(id, init));
		                }
		                else {
		                    shorthand = true;
		                    value = id;
		                }
		            }
		            else {
		                this.throwUnexpectedToken(this.nextToken());
		            }
		        }
		        return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
		    };
		    Parser.prototype.parseObjectInitializer = function () {
		        var node = this.createNode();
		        this.expect('{');
		        var properties = [];
		        var hasProto = { value: false };
		        while (!this.match('}')) {
		            properties.push(this.parseObjectProperty(hasProto));
		            if (!this.match('}')) {
		                this.expectCommaSeparator();
		            }
		        }
		        this.expect('}');
		        return this.finalize(node, new Node.ObjectExpression(properties));
		    };
		    // ECMA-262 12.2.9 Template Literals
		    Parser.prototype.parseTemplateHead = function () {
		        assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
		        var node = this.createNode();
		        var token = this.nextToken();
		        var value = {
		            raw: token.value.raw,
		            cooked: token.value.cooked
		        };
		        return this.finalize(node, new Node.TemplateElement(value, token.tail));
		    };
		    Parser.prototype.parseTemplateElement = function () {
		        if (this.lookahead.type !== token_1.Token.Template) {
		            this.throwUnexpectedToken();
		        }
		        var node = this.createNode();
		        var token = this.nextToken();
		        var value = {
		            raw: token.value.raw,
		            cooked: token.value.cooked
		        };
		        return this.finalize(node, new Node.TemplateElement(value, token.tail));
		    };
		    Parser.prototype.parseTemplateLiteral = function () {
		        var node = this.createNode();
		        var expressions = [];
		        var quasis = [];
		        var quasi = this.parseTemplateHead();
		        quasis.push(quasi);
		        while (!quasi.tail) {
		            expressions.push(this.parseExpression());
		            quasi = this.parseTemplateElement();
		            quasis.push(quasi);
		        }
		        return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
		    };
		    // ECMA-262 12.2.10 The Grouping Operator
		    Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
		        switch (expr.type) {
		            case syntax_1.Syntax.Identifier:
		            case syntax_1.Syntax.MemberExpression:
		            case syntax_1.Syntax.RestElement:
		            case syntax_1.Syntax.AssignmentPattern:
		                break;
		            case syntax_1.Syntax.SpreadElement:
		                expr.type = syntax_1.Syntax.RestElement;
		                this.reinterpretExpressionAsPattern(expr.argument);
		                break;
		            case syntax_1.Syntax.ArrayExpression:
		                expr.type = syntax_1.Syntax.ArrayPattern;
		                for (var i = 0; i < expr.elements.length; i++) {
		                    if (expr.elements[i] !== null) {
		                        this.reinterpretExpressionAsPattern(expr.elements[i]);
		                    }
		                }
		                break;
		            case syntax_1.Syntax.ObjectExpression:
		                expr.type = syntax_1.Syntax.ObjectPattern;
		                for (var i = 0; i < expr.properties.length; i++) {
		                    this.reinterpretExpressionAsPattern(expr.properties[i].value);
		                }
		                break;
		            case syntax_1.Syntax.AssignmentExpression:
		                expr.type = syntax_1.Syntax.AssignmentPattern;
		                delete expr.operator;
		                this.reinterpretExpressionAsPattern(expr.left);
		                break;
		            default:
		                // Allow other node type for tolerant parsing.
		                break;
		        }
		    };
		    Parser.prototype.parseGroupExpression = function () {
		        var expr;
		        this.expect('(');
		        if (this.match(')')) {
		            this.nextToken();
		            if (!this.match('=>')) {
		                this.expect('=>');
		            }
		            expr = {
		                type: ArrowParameterPlaceHolder,
		                params: []
		            };
		        }
		        else {
		            var startToken = this.lookahead;
		            var params = [];
		            if (this.match('...')) {
		                expr = this.parseRestElement(params);
		                this.expect(')');
		                if (!this.match('=>')) {
		                    this.expect('=>');
		                }
		                expr = {
		                    type: ArrowParameterPlaceHolder,
		                    params: [expr]
		                };
		            }
		            else {
		                var arrow = false;
		                this.context.isBindingElement = true;
		                expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
		                if (this.match(',')) {
		                    var expressions = [];
		                    this.context.isAssignmentTarget = false;
		                    expressions.push(expr);
		                    while (this.startMarker.index < this.scanner.length) {
		                        if (!this.match(',')) {
		                            break;
		                        }
		                        this.nextToken();
		                        if (this.match('...')) {
		                            if (!this.context.isBindingElement) {
		                                this.throwUnexpectedToken(this.lookahead);
		                            }
		                            expressions.push(this.parseRestElement(params));
		                            this.expect(')');
		                            if (!this.match('=>')) {
		                                this.expect('=>');
		                            }
		                            this.context.isBindingElement = false;
		                            for (var i = 0; i < expressions.length; i++) {
		                                this.reinterpretExpressionAsPattern(expressions[i]);
		                            }
		                            arrow = true;
		                            expr = {
		                                type: ArrowParameterPlaceHolder,
		                                params: expressions
		                            };
		                        }
		                        else {
		                            expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
		                        }
		                        if (arrow) {
		                            break;
		                        }
		                    }
		                    if (!arrow) {
		                        expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
		                    }
		                }
		                if (!arrow) {
		                    this.expect(')');
		                    if (this.match('=>')) {
		                        if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
		                            arrow = true;
		                            expr = {
		                                type: ArrowParameterPlaceHolder,
		                                params: [expr]
		                            };
		                        }
		                        if (!arrow) {
		                            if (!this.context.isBindingElement) {
		                                this.throwUnexpectedToken(this.lookahead);
		                            }
		                            if (expr.type === syntax_1.Syntax.SequenceExpression) {
		                                for (var i = 0; i < expr.expressions.length; i++) {
		                                    this.reinterpretExpressionAsPattern(expr.expressions[i]);
		                                }
		                            }
		                            else {
		                                this.reinterpretExpressionAsPattern(expr);
		                            }
		                            var params_1 = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
		                            expr = {
		                                type: ArrowParameterPlaceHolder,
		                                params: params_1
		                            };
		                        }
		                    }
		                    this.context.isBindingElement = false;
		                }
		            }
		        }
		        return expr;
		    };
		    // ECMA-262 12.3 Left-Hand-Side Expressions
		    Parser.prototype.parseArguments = function () {
		        this.expect('(');
		        var args = [];
		        if (!this.match(')')) {
		            while (true) {
		                var expr = this.match('...') ? this.parseSpreadElement() :
		                    this.isolateCoverGrammar(this.parseAssignmentExpression);
		                args.push(expr);
		                if (this.match(')')) {
		                    break;
		                }
		                this.expectCommaSeparator();
		            }
		        }
		        this.expect(')');
		        return args;
		    };
		    Parser.prototype.isIdentifierName = function (token) {
		        return token.type === token_1.Token.Identifier ||
		            token.type === token_1.Token.Keyword ||
		            token.type === token_1.Token.BooleanLiteral ||
		            token.type === token_1.Token.NullLiteral;
		    };
		    Parser.prototype.parseIdentifierName = function () {
		        var node = this.createNode();
		        var token = this.nextToken();
		        if (!this.isIdentifierName(token)) {
		            this.throwUnexpectedToken(token);
		        }
		        return this.finalize(node, new Node.Identifier(token.value));
		    };
		    Parser.prototype.parseNewExpression = function () {
		        var node = this.createNode();
		        var id = this.parseIdentifierName();
		        assert_1.assert(id.name === 'new', 'New expression must start with `new`');
		        var expr;
		        if (this.match('.')) {
		            this.nextToken();
		            if (this.lookahead.type === token_1.Token.Identifier && this.context.inFunctionBody && this.lookahead.value === 'target') {
		                var property = this.parseIdentifierName();
		                expr = new Node.MetaProperty(id, property);
		            }
		            else {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		        }
		        else {
		            var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
		            var args = this.match('(') ? this.parseArguments() : [];
		            expr = new Node.NewExpression(callee, args);
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        return this.finalize(node, expr);
		    };
		    Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
		        var startToken = this.lookahead;
		        var previousAllowIn = this.context.allowIn;
		        this.context.allowIn = true;
		        var expr;
		        if (this.matchKeyword('super') && this.context.inFunctionBody) {
		            expr = this.createNode();
		            this.nextToken();
		            expr = this.finalize(expr, new Node.Super());
		            if (!this.match('(') && !this.match('.') && !this.match('[')) {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		        }
		        else {
		            expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
		        }
		        while (true) {
		            if (this.match('.')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('.');
		                var property = this.parseIdentifierName();
		                expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
		            }
		            else if (this.match('(')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = false;
		                var args = this.parseArguments();
		                expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
		            }
		            else if (this.match('[')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('[');
		                var property = this.isolateCoverGrammar(this.parseExpression);
		                this.expect(']');
		                expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
		            }
		            else if (this.lookahead.type === token_1.Token.Template && this.lookahead.head) {
		                var quasi = this.parseTemplateLiteral();
		                expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
		            }
		            else {
		                break;
		            }
		        }
		        this.context.allowIn = previousAllowIn;
		        return expr;
		    };
		    Parser.prototype.parseSuper = function () {
		        var node = this.createNode();
		        this.expectKeyword('super');
		        if (!this.match('[') && !this.match('.')) {
		            this.throwUnexpectedToken(this.lookahead);
		        }
		        return this.finalize(node, new Node.Super());
		    };
		    Parser.prototype.parseLeftHandSideExpression = function () {
		        assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
		        var node = this.startNode(this.lookahead);
		        var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
		            this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
		        while (true) {
		            if (this.match('[')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('[');
		                var property = this.isolateCoverGrammar(this.parseExpression);
		                this.expect(']');
		                expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
		            }
		            else if (this.match('.')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('.');
		                var property = this.parseIdentifierName();
		                expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
		            }
		            else if (this.lookahead.type === token_1.Token.Template && this.lookahead.head) {
		                var quasi = this.parseTemplateLiteral();
		                expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
		            }
		            else {
		                break;
		            }
		        }
		        return expr;
		    };
		    // ECMA-262 12.4 Update Expressions
		    Parser.prototype.parseUpdateExpression = function () {
		        var expr;
		        var startToken = this.lookahead;
		        if (this.match('++') || this.match('--')) {
		            var node = this.startNode(startToken);
		            var token = this.nextToken();
		            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
		            if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
		                this.tolerateError(messages_1.Messages.StrictLHSPrefix);
		            }
		            if (!this.context.isAssignmentTarget) {
		                this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
		            }
		            var prefix = true;
		            expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        else {
		            expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
		            if (!this.hasLineTerminator && this.lookahead.type === token_1.Token.Punctuator) {
		                if (this.match('++') || this.match('--')) {
		                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
		                        this.tolerateError(messages_1.Messages.StrictLHSPostfix);
		                    }
		                    if (!this.context.isAssignmentTarget) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
		                    }
		                    this.context.isAssignmentTarget = false;
		                    this.context.isBindingElement = false;
		                    var operator = this.nextToken().value;
		                    var prefix = false;
		                    expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
		                }
		            }
		        }
		        return expr;
		    };
		    // ECMA-262 12.5 Unary Operators
		    Parser.prototype.parseUnaryExpression = function () {
		        var expr;
		        if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
		            this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
		            var node = this.startNode(this.lookahead);
		            var token = this.nextToken();
		            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
		            expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
		            if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
		                this.tolerateError(messages_1.Messages.StrictDelete);
		            }
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        else {
		            expr = this.parseUpdateExpression();
		        }
		        return expr;
		    };
		    Parser.prototype.parseExponentiationExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
		        if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
		            this.nextToken();
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		            var left = expr;
		            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
		            expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
		        }
		        return expr;
		    };
		    // ECMA-262 12.6 Exponentiation Operators
		    // ECMA-262 12.7 Multiplicative Operators
		    // ECMA-262 12.8 Additive Operators
		    // ECMA-262 12.9 Bitwise Shift Operators
		    // ECMA-262 12.10 Relational Operators
		    // ECMA-262 12.11 Equality Operators
		    // ECMA-262 12.12 Binary Bitwise Operators
		    // ECMA-262 12.13 Binary Logical Operators
		    Parser.prototype.binaryPrecedence = function (token) {
		        var op = token.value;
		        var precedence;
		        if (token.type === token_1.Token.Punctuator) {
		            precedence = this.operatorPrecedence[op] || 0;
		        }
		        else if (token.type === token_1.Token.Keyword) {
		            precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
		        }
		        else {
		            precedence = 0;
		        }
		        return precedence;
		    };
		    Parser.prototype.parseBinaryExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
		        var token = this.lookahead;
		        var prec = this.binaryPrecedence(token);
		        if (prec > 0) {
		            this.nextToken();
		            token.prec = prec;
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		            var markers = [startToken, this.lookahead];
		            var left = expr;
		            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
		            var stack = [left, token, right];
		            while (true) {
		                prec = this.binaryPrecedence(this.lookahead);
		                if (prec <= 0) {
		                    break;
		                }
		                // Reduce: make a binary expression from the three topmost entries.
		                while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
		                    right = stack.pop();
		                    var operator = stack.pop().value;
		                    left = stack.pop();
		                    markers.pop();
		                    var node = this.startNode(markers[markers.length - 1]);
		                    stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
		                }
		                // Shift.
		                token = this.nextToken();
		                token.prec = prec;
		                stack.push(token);
		                markers.push(this.lookahead);
		                stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
		            }
		            // Final reduce to clean-up the stack.
		            var i = stack.length - 1;
		            expr = stack[i];
		            markers.pop();
		            while (i > 1) {
		                var node = this.startNode(markers.pop());
		                expr = this.finalize(node, new Node.BinaryExpression(stack[i - 1].value, stack[i - 2], expr));
		                i -= 2;
		            }
		        }
		        return expr;
		    };
		    // ECMA-262 12.14 Conditional Operator
		    Parser.prototype.parseConditionalExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
		        if (this.match('?')) {
		            this.nextToken();
		            var previousAllowIn = this.context.allowIn;
		            this.context.allowIn = true;
		            var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
		            this.context.allowIn = previousAllowIn;
		            this.expect(':');
		            var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
		            expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        return expr;
		    };
		    // ECMA-262 12.15 Assignment Operators
		    Parser.prototype.checkPatternParam = function (options, param) {
		        switch (param.type) {
		            case syntax_1.Syntax.Identifier:
		                this.validateParam(options, param, param.name);
		                break;
		            case syntax_1.Syntax.RestElement:
		                this.checkPatternParam(options, param.argument);
		                break;
		            case syntax_1.Syntax.AssignmentPattern:
		                this.checkPatternParam(options, param.left);
		                break;
		            case syntax_1.Syntax.ArrayPattern:
		                for (var i = 0; i < param.elements.length; i++) {
		                    if (param.elements[i] !== null) {
		                        this.checkPatternParam(options, param.elements[i]);
		                    }
		                }
		                break;
		            case syntax_1.Syntax.YieldExpression:
		                break;
		            default:
		                assert_1.assert(param.type === syntax_1.Syntax.ObjectPattern, 'Invalid type');
		                for (var i = 0; i < param.properties.length; i++) {
		                    this.checkPatternParam(options, param.properties[i].value);
		                }
		                break;
		        }
		    };
		    Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
		        var params = [expr];
		        var options;
		        switch (expr.type) {
		            case syntax_1.Syntax.Identifier:
		                break;
		            case ArrowParameterPlaceHolder:
		                params = expr.params;
		                break;
		            default:
		                return null;
		        }
		        options = {
		            paramSet: {}
		        };
		        for (var i = 0; i < params.length; ++i) {
		            var param = params[i];
		            if (param.type === syntax_1.Syntax.AssignmentPattern) {
		                if (param.right.type === syntax_1.Syntax.YieldExpression) {
		                    if (param.right.argument) {
		                        this.throwUnexpectedToken(this.lookahead);
		                    }
		                    param.right.type = syntax_1.Syntax.Identifier;
		                    param.right.name = 'yield';
		                    delete param.right.argument;
		                    delete param.right.delegate;
		                }
		            }
		            this.checkPatternParam(options, param);
		            params[i] = param;
		        }
		        if (this.context.strict || !this.context.allowYield) {
		            for (var i = 0; i < params.length; ++i) {
		                var param = params[i];
		                if (param.type === syntax_1.Syntax.YieldExpression) {
		                    this.throwUnexpectedToken(this.lookahead);
		                }
		            }
		        }
		        if (options.message === messages_1.Messages.StrictParamDupe) {
		            var token = this.context.strict ? options.stricted : options.firstRestricted;
		            this.throwUnexpectedToken(token, options.message);
		        }
		        return {
		            params: params,
		            stricted: options.stricted,
		            firstRestricted: options.firstRestricted,
		            message: options.message
		        };
		    };
		    Parser.prototype.parseAssignmentExpression = function () {
		        var expr;
		        if (!this.context.allowYield && this.matchKeyword('yield')) {
		            expr = this.parseYieldExpression();
		        }
		        else {
		            var startToken = this.lookahead;
		            var token = startToken;
		            expr = this.parseConditionalExpression();
		            if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
		                // ECMA-262 14.2 Arrow Function Definitions
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                var list = this.reinterpretAsCoverFormalsList(expr);
		                if (list) {
		                    if (this.hasLineTerminator) {
		                        this.tolerateUnexpectedToken(this.lookahead);
		                    }
		                    this.context.firstCoverInitializedNameError = null;
		                    var previousStrict = this.context.strict;
		                    var previousAllowYield = this.context.allowYield;
		                    this.context.allowYield = true;
		                    var node = this.startNode(startToken);
		                    this.expect('=>');
		                    var body = this.match('{') ? this.parseFunctionSourceElements() :
		                        this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    var expression = body.type !== syntax_1.Syntax.BlockStatement;
		                    if (this.context.strict && list.firstRestricted) {
		                        this.throwUnexpectedToken(list.firstRestricted, list.message);
		                    }
		                    if (this.context.strict && list.stricted) {
		                        this.tolerateUnexpectedToken(list.stricted, list.message);
		                    }
		                    expr = this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
		                    this.context.strict = previousStrict;
		                    this.context.allowYield = previousAllowYield;
		                }
		            }
		            else {
		                if (this.matchAssign()) {
		                    if (!this.context.isAssignmentTarget) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
		                    }
		                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
		                        var id = (expr);
		                        if (this.scanner.isRestrictedWord(id.name)) {
		                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
		                        }
		                        if (this.scanner.isStrictModeReservedWord(id.name)) {
		                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
		                        }
		                    }
		                    if (!this.match('=')) {
		                        this.context.isAssignmentTarget = false;
		                        this.context.isBindingElement = false;
		                    }
		                    else {
		                        this.reinterpretExpressionAsPattern(expr);
		                    }
		                    token = this.nextToken();
		                    var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(token.value, expr, right));
		                    this.context.firstCoverInitializedNameError = null;
		                }
		            }
		        }
		        return expr;
		    };
		    // ECMA-262 12.16 Comma Operator
		    Parser.prototype.parseExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
		        if (this.match(',')) {
		            var expressions = [];
		            expressions.push(expr);
		            while (this.startMarker.index < this.scanner.length) {
		                if (!this.match(',')) {
		                    break;
		                }
		                this.nextToken();
		                expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
		            }
		            expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
		        }
		        return expr;
		    };
		    // ECMA-262 13.2 Block
		    Parser.prototype.parseStatementListItem = function () {
		        var statement = null;
		        this.context.isAssignmentTarget = true;
		        this.context.isBindingElement = true;
		        if (this.lookahead.type === token_1.Token.Keyword) {
		            switch (this.lookahead.value) {
		                case 'export':
		                    if (this.sourceType !== 'module') {
		                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
		                    }
		                    statement = this.parseExportDeclaration();
		                    break;
		                case 'import':
		                    if (this.sourceType !== 'module') {
		                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
		                    }
		                    statement = this.parseImportDeclaration();
		                    break;
		                case 'const':
		                    statement = this.parseLexicalDeclaration({ inFor: false });
		                    break;
		                case 'function':
		                    statement = this.parseFunctionDeclaration();
		                    break;
		                case 'class':
		                    statement = this.parseClassDeclaration();
		                    break;
		                case 'let':
		                    statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
		                    break;
		                default:
		                    statement = this.parseStatement();
		                    break;
		            }
		        }
		        else {
		            statement = this.parseStatement();
		        }
		        return statement;
		    };
		    Parser.prototype.parseBlock = function () {
		        var node = this.createNode();
		        this.expect('{');
		        var block = [];
		        while (true) {
		            if (this.match('}')) {
		                break;
		            }
		            block.push(this.parseStatementListItem());
		        }
		        this.expect('}');
		        return this.finalize(node, new Node.BlockStatement(block));
		    };
		    // ECMA-262 13.3.1 Let and Const Declarations
		    Parser.prototype.parseLexicalBinding = function (kind, options) {
		        var node = this.createNode();
		        var params = [];
		        var id = this.parsePattern(params, kind);
		        // ECMA-262 12.2.1
		        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
		            if (this.scanner.isRestrictedWord((id).name)) {
		                this.tolerateError(messages_1.Messages.StrictVarName);
		            }
		        }
		        var init = null;
		        if (kind === 'const') {
		            if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
		                this.expect('=');
		                init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		            }
		        }
		        else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
		            this.expect('=');
		            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		        }
		        return this.finalize(node, new Node.VariableDeclarator(id, init));
		    };
		    Parser.prototype.parseBindingList = function (kind, options) {
		        var list = [this.parseLexicalBinding(kind, options)];
		        while (this.match(',')) {
		            this.nextToken();
		            list.push(this.parseLexicalBinding(kind, options));
		        }
		        return list;
		    };
		    Parser.prototype.isLexicalDeclaration = function () {
		        var previousIndex = this.scanner.index;
		        var previousLineNumber = this.scanner.lineNumber;
		        var previousLineStart = this.scanner.lineStart;
		        this.collectComments();
		        var next = this.scanner.lex();
		        this.scanner.index = previousIndex;
		        this.scanner.lineNumber = previousLineNumber;
		        this.scanner.lineStart = previousLineStart;
		        return (next.type === token_1.Token.Identifier) ||
		            (next.type === token_1.Token.Punctuator && next.value === '[') ||
		            (next.type === token_1.Token.Punctuator && next.value === '{') ||
		            (next.type === token_1.Token.Keyword && next.value === 'let') ||
		            (next.type === token_1.Token.Keyword && next.value === 'yield');
		    };
		    Parser.prototype.parseLexicalDeclaration = function (options) {
		        var node = this.createNode();
		        var kind = this.nextToken().value;
		        assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
		        var declarations = this.parseBindingList(kind, options);
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
		    };
		    // ECMA-262 13.3.3 Destructuring Binding Patterns
		    Parser.prototype.parseBindingRestElement = function (params, kind) {
		        var node = this.createNode();
		        this.expect('...');
		        var arg = this.parsePattern(params, kind);
		        return this.finalize(node, new Node.RestElement(arg));
		    };
		    Parser.prototype.parseArrayPattern = function (params, kind) {
		        var node = this.createNode();
		        this.expect('[');
		        var elements = [];
		        while (!this.match(']')) {
		            if (this.match(',')) {
		                this.nextToken();
		                elements.push(null);
		            }
		            else {
		                if (this.match('...')) {
		                    elements.push(this.parseBindingRestElement(params, kind));
		                    break;
		                }
		                else {
		                    elements.push(this.parsePatternWithDefault(params, kind));
		                }
		                if (!this.match(']')) {
		                    this.expect(',');
		                }
		            }
		        }
		        this.expect(']');
		        return this.finalize(node, new Node.ArrayPattern(elements));
		    };
		    Parser.prototype.parsePropertyPattern = function (params, kind) {
		        var node = this.createNode();
		        var computed = false;
		        var shorthand = false;
		        var method = false;
		        var key;
		        var value;
		        if (this.lookahead.type === token_1.Token.Identifier) {
		            var keyToken = this.lookahead;
		            key = this.parseVariableIdentifier();
		            var init = this.finalize(node, new Node.Identifier(keyToken.value));
		            if (this.match('=')) {
		                params.push(keyToken);
		                shorthand = true;
		                this.nextToken();
		                var expr = this.parseAssignmentExpression();
		                value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
		            }
		            else if (!this.match(':')) {
		                params.push(keyToken);
		                shorthand = true;
		                value = init;
		            }
		            else {
		                this.expect(':');
		                value = this.parsePatternWithDefault(params, kind);
		            }
		        }
		        else {
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            this.expect(':');
		            value = this.parsePatternWithDefault(params, kind);
		        }
		        return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
		    };
		    Parser.prototype.parseObjectPattern = function (params, kind) {
		        var node = this.createNode();
		        var properties = [];
		        this.expect('{');
		        while (!this.match('}')) {
		            properties.push(this.parsePropertyPattern(params, kind));
		            if (!this.match('}')) {
		                this.expect(',');
		            }
		        }
		        this.expect('}');
		        return this.finalize(node, new Node.ObjectPattern(properties));
		    };
		    Parser.prototype.parsePattern = function (params, kind) {
		        var pattern;
		        if (this.match('[')) {
		            pattern = this.parseArrayPattern(params, kind);
		        }
		        else if (this.match('{')) {
		            pattern = this.parseObjectPattern(params, kind);
		        }
		        else {
		            if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
		                this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.UnexpectedToken);
		            }
		            params.push(this.lookahead);
		            pattern = this.parseVariableIdentifier(kind);
		        }
		        return pattern;
		    };
		    Parser.prototype.parsePatternWithDefault = function (params, kind) {
		        var startToken = this.lookahead;
		        var pattern = this.parsePattern(params, kind);
		        if (this.match('=')) {
		            this.nextToken();
		            var previousAllowYield = this.context.allowYield;
		            this.context.allowYield = true;
		            var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
		            this.context.allowYield = previousAllowYield;
		            pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
		        }
		        return pattern;
		    };
		    // ECMA-262 13.3.2 Variable Statement
		    Parser.prototype.parseVariableIdentifier = function (kind) {
		        var node = this.createNode();
		        var token = this.nextToken();
		        if (token.type === token_1.Token.Keyword && token.value === 'yield') {
		            if (this.context.strict) {
		                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
		            }
		            if (!this.context.allowYield) {
		                this.throwUnexpectedToken(token);
		            }
		        }
		        else if (token.type !== token_1.Token.Identifier) {
		            if (this.context.strict && token.type === token_1.Token.Keyword && this.scanner.isStrictModeReservedWord(token.value)) {
		                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
		            }
		            else {
		                if (this.context.strict || token.value !== 'let' || kind !== 'var') {
		                    this.throwUnexpectedToken(token);
		                }
		            }
		        }
		        else if (this.sourceType === 'module' && token.type === token_1.Token.Identifier && token.value === 'await') {
		            this.tolerateUnexpectedToken(token);
		        }
		        return this.finalize(node, new Node.Identifier(token.value));
		    };
		    Parser.prototype.parseVariableDeclaration = function (options) {
		        var node = this.createNode();
		        var params = [];
		        var id = this.parsePattern(params, 'var');
		        // ECMA-262 12.2.1
		        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
		            if (this.scanner.isRestrictedWord((id).name)) {
		                this.tolerateError(messages_1.Messages.StrictVarName);
		            }
		        }
		        var init = null;
		        if (this.match('=')) {
		            this.nextToken();
		            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		        }
		        else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
		            this.expect('=');
		        }
		        return this.finalize(node, new Node.VariableDeclarator(id, init));
		    };
		    Parser.prototype.parseVariableDeclarationList = function (options) {
		        var opt = { inFor: options.inFor };
		        var list = [];
		        list.push(this.parseVariableDeclaration(opt));
		        while (this.match(',')) {
		            this.nextToken();
		            list.push(this.parseVariableDeclaration(opt));
		        }
		        return list;
		    };
		    Parser.prototype.parseVariableStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('var');
		        var declarations = this.parseVariableDeclarationList({ inFor: false });
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
		    };
		    // ECMA-262 13.4 Empty Statement
		    Parser.prototype.parseEmptyStatement = function () {
		        var node = this.createNode();
		        this.expect(';');
		        return this.finalize(node, new Node.EmptyStatement());
		    };
		    // ECMA-262 13.5 Expression Statement
		    Parser.prototype.parseExpressionStatement = function () {
		        var node = this.createNode();
		        var expr = this.parseExpression();
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ExpressionStatement(expr));
		    };
		    // ECMA-262 13.6 If statement
		    Parser.prototype.parseIfStatement = function () {
		        var node = this.createNode();
		        var consequent;
		        var alternate = null;
		        this.expectKeyword('if');
		        this.expect('(');
		        var test = this.parseExpression();
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		            consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
		        }
		        else {
		            this.expect(')');
		            consequent = this.parseStatement();
		            if (this.matchKeyword('else')) {
		                this.nextToken();
		                alternate = this.parseStatement();
		            }
		        }
		        return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
		    };
		    // ECMA-262 13.7.2 The do-while Statement
		    Parser.prototype.parseDoWhileStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('do');
		        var previousInIteration = this.context.inIteration;
		        this.context.inIteration = true;
		        var body = this.parseStatement();
		        this.context.inIteration = previousInIteration;
		        this.expectKeyword('while');
		        this.expect('(');
		        var test = this.parseExpression();
		        this.expect(')');
		        if (this.match(';')) {
		            this.nextToken();
		        }
		        return this.finalize(node, new Node.DoWhileStatement(body, test));
		    };
		    // ECMA-262 13.7.3 The while Statement
		    Parser.prototype.parseWhileStatement = function () {
		        var node = this.createNode();
		        var body;
		        this.expectKeyword('while');
		        this.expect('(');
		        var test = this.parseExpression();
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		            body = this.finalize(this.createNode(), new Node.EmptyStatement());
		        }
		        else {
		            this.expect(')');
		            var previousInIteration = this.context.inIteration;
		            this.context.inIteration = true;
		            body = this.parseStatement();
		            this.context.inIteration = previousInIteration;
		        }
		        return this.finalize(node, new Node.WhileStatement(test, body));
		    };
		    // ECMA-262 13.7.4 The for Statement
		    // ECMA-262 13.7.5 The for-in and for-of Statements
		    Parser.prototype.parseForStatement = function () {
		        var init = null;
		        var test = null;
		        var update = null;
		        var forIn = true;
		        var left, right;
		        var node = this.createNode();
		        this.expectKeyword('for');
		        this.expect('(');
		        if (this.match(';')) {
		            this.nextToken();
		        }
		        else {
		            if (this.matchKeyword('var')) {
		                init = this.createNode();
		                this.nextToken();
		                var previousAllowIn = this.context.allowIn;
		                this.context.allowIn = false;
		                var declarations = this.parseVariableDeclarationList({ inFor: true });
		                this.context.allowIn = previousAllowIn;
		                if (declarations.length === 1 && this.matchKeyword('in')) {
		                    var decl = declarations[0];
		                    if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
		                        this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
		                    }
		                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
		                    this.nextToken();
		                    left = init;
		                    right = this.parseExpression();
		                    init = null;
		                }
		                else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
		                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
		                    this.nextToken();
		                    left = init;
		                    right = this.parseAssignmentExpression();
		                    init = null;
		                    forIn = false;
		                }
		                else {
		                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
		                    this.expect(';');
		                }
		            }
		            else if (this.matchKeyword('const') || this.matchKeyword('let')) {
		                init = this.createNode();
		                var kind = this.nextToken().value;
		                if (!this.context.strict && this.lookahead.value === 'in') {
		                    init = this.finalize(init, new Node.Identifier(kind));
		                    this.nextToken();
		                    left = init;
		                    right = this.parseExpression();
		                    init = null;
		                }
		                else {
		                    var previousAllowIn = this.context.allowIn;
		                    this.context.allowIn = false;
		                    var declarations = this.parseBindingList(kind, { inFor: true });
		                    this.context.allowIn = previousAllowIn;
		                    if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
		                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
		                        this.nextToken();
		                        left = init;
		                        right = this.parseExpression();
		                        init = null;
		                    }
		                    else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
		                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
		                        this.nextToken();
		                        left = init;
		                        right = this.parseAssignmentExpression();
		                        init = null;
		                        forIn = false;
		                    }
		                    else {
		                        this.consumeSemicolon();
		                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
		                    }
		                }
		            }
		            else {
		                var initStartToken = this.lookahead;
		                var previousAllowIn = this.context.allowIn;
		                this.context.allowIn = false;
		                init = this.inheritCoverGrammar(this.parseAssignmentExpression);
		                this.context.allowIn = previousAllowIn;
		                if (this.matchKeyword('in')) {
		                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
		                    }
		                    this.nextToken();
		                    this.reinterpretExpressionAsPattern(init);
		                    left = init;
		                    right = this.parseExpression();
		                    init = null;
		                }
		                else if (this.matchContextualKeyword('of')) {
		                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
		                    }
		                    this.nextToken();
		                    this.reinterpretExpressionAsPattern(init);
		                    left = init;
		                    right = this.parseAssignmentExpression();
		                    init = null;
		                    forIn = false;
		                }
		                else {
		                    if (this.match(',')) {
		                        var initSeq = [init];
		                        while (this.match(',')) {
		                            this.nextToken();
		                            initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
		                        }
		                        init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
		                    }
		                    this.expect(';');
		                }
		            }
		        }
		        if (typeof left === 'undefined') {
		            if (!this.match(';')) {
		                test = this.parseExpression();
		            }
		            this.expect(';');
		            if (!this.match(')')) {
		                update = this.parseExpression();
		            }
		        }
		        var body;
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		            body = this.finalize(this.createNode(), new Node.EmptyStatement());
		        }
		        else {
		            this.expect(')');
		            var previousInIteration = this.context.inIteration;
		            this.context.inIteration = true;
		            body = this.isolateCoverGrammar(this.parseStatement);
		            this.context.inIteration = previousInIteration;
		        }
		        return (typeof left === 'undefined') ?
		            this.finalize(node, new Node.ForStatement(init, test, update, body)) :
		            forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
		                this.finalize(node, new Node.ForOfStatement(left, right, body));
		    };
		    // ECMA-262 13.8 The continue statement
		    Parser.prototype.parseContinueStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('continue');
		        var label = null;
		        if (this.lookahead.type === token_1.Token.Identifier && !this.hasLineTerminator) {
		            label = this.parseVariableIdentifier();
		            var key = '$' + label.name;
		            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
		                this.throwError(messages_1.Messages.UnknownLabel, label.name);
		            }
		        }
		        this.consumeSemicolon();
		        if (label === null && !this.context.inIteration) {
		            this.throwError(messages_1.Messages.IllegalContinue);
		        }
		        return this.finalize(node, new Node.ContinueStatement(label));
		    };
		    // ECMA-262 13.9 The break statement
		    Parser.prototype.parseBreakStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('break');
		        var label = null;
		        if (this.lookahead.type === token_1.Token.Identifier && !this.hasLineTerminator) {
		            label = this.parseVariableIdentifier();
		            var key = '$' + label.name;
		            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
		                this.throwError(messages_1.Messages.UnknownLabel, label.name);
		            }
		        }
		        this.consumeSemicolon();
		        if (label === null && !this.context.inIteration && !this.context.inSwitch) {
		            this.throwError(messages_1.Messages.IllegalBreak);
		        }
		        return this.finalize(node, new Node.BreakStatement(label));
		    };
		    // ECMA-262 13.10 The return statement
		    Parser.prototype.parseReturnStatement = function () {
		        if (!this.context.inFunctionBody) {
		            this.tolerateError(messages_1.Messages.IllegalReturn);
		        }
		        var node = this.createNode();
		        this.expectKeyword('return');
		        var hasArgument = !this.match(';') && !this.match('}') &&
		            !this.hasLineTerminator && this.lookahead.type !== token_1.Token.EOF;
		        var argument = hasArgument ? this.parseExpression() : null;
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ReturnStatement(argument));
		    };
		    // ECMA-262 13.11 The with statement
		    Parser.prototype.parseWithStatement = function () {
		        if (this.context.strict) {
		            this.tolerateError(messages_1.Messages.StrictModeWith);
		        }
		        var node = this.createNode();
		        this.expectKeyword('with');
		        this.expect('(');
		        var object = this.parseExpression();
		        this.expect(')');
		        var body = this.parseStatement();
		        return this.finalize(node, new Node.WithStatement(object, body));
		    };
		    // ECMA-262 13.12 The switch statement
		    Parser.prototype.parseSwitchCase = function () {
		        var node = this.createNode();
		        var test;
		        if (this.matchKeyword('default')) {
		            this.nextToken();
		            test = null;
		        }
		        else {
		            this.expectKeyword('case');
		            test = this.parseExpression();
		        }
		        this.expect(':');
		        var consequent = [];
		        while (true) {
		            if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
		                break;
		            }
		            consequent.push(this.parseStatementListItem());
		        }
		        return this.finalize(node, new Node.SwitchCase(test, consequent));
		    };
		    Parser.prototype.parseSwitchStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('switch');
		        this.expect('(');
		        var discriminant = this.parseExpression();
		        this.expect(')');
		        var previousInSwitch = this.context.inSwitch;
		        this.context.inSwitch = true;
		        var cases = [];
		        var defaultFound = false;
		        this.expect('{');
		        while (true) {
		            if (this.match('}')) {
		                break;
		            }
		            var clause = this.parseSwitchCase();
		            if (clause.test === null) {
		                if (defaultFound) {
		                    this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
		                }
		                defaultFound = true;
		            }
		            cases.push(clause);
		        }
		        this.expect('}');
		        this.context.inSwitch = previousInSwitch;
		        return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
		    };
		    // ECMA-262 13.13 Labelled Statements
		    Parser.prototype.parseLabelledStatement = function () {
		        var node = this.createNode();
		        var expr = this.parseExpression();
		        var statement;
		        if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
		            this.nextToken();
		            var id = (expr);
		            var key = '$' + id.name;
		            if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
		                this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
		            }
		            this.context.labelSet[key] = true;
		            var labeledBody = this.parseStatement();
		            delete this.context.labelSet[key];
		            statement = new Node.LabeledStatement(id, labeledBody);
		        }
		        else {
		            this.consumeSemicolon();
		            statement = new Node.ExpressionStatement(expr);
		        }
		        return this.finalize(node, statement);
		    };
		    // ECMA-262 13.14 The throw statement
		    Parser.prototype.parseThrowStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('throw');
		        if (this.hasLineTerminator) {
		            this.throwError(messages_1.Messages.NewlineAfterThrow);
		        }
		        var argument = this.parseExpression();
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ThrowStatement(argument));
		    };
		    // ECMA-262 13.15 The try statement
		    Parser.prototype.parseCatchClause = function () {
		        var node = this.createNode();
		        this.expectKeyword('catch');
		        this.expect('(');
		        if (this.match(')')) {
		            this.throwUnexpectedToken(this.lookahead);
		        }
		        var params = [];
		        var param = this.parsePattern(params);
		        var paramMap = {};
		        for (var i = 0; i < params.length; i++) {
		            var key = '$' + params[i].value;
		            if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
		                this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
		            }
		            paramMap[key] = true;
		        }
		        if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
		            if (this.scanner.isRestrictedWord((param).name)) {
		                this.tolerateError(messages_1.Messages.StrictCatchVariable);
		            }
		        }
		        this.expect(')');
		        var body = this.parseBlock();
		        return this.finalize(node, new Node.CatchClause(param, body));
		    };
		    Parser.prototype.parseFinallyClause = function () {
		        this.expectKeyword('finally');
		        return this.parseBlock();
		    };
		    Parser.prototype.parseTryStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('try');
		        var block = this.parseBlock();
		        var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
		        var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
		        if (!handler && !finalizer) {
		            this.throwError(messages_1.Messages.NoCatchOrFinally);
		        }
		        return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
		    };
		    // ECMA-262 13.16 The debugger statement
		    Parser.prototype.parseDebuggerStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('debugger');
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.DebuggerStatement());
		    };
		    // ECMA-262 13 Statements
		    Parser.prototype.parseStatement = function () {
		        var statement = null;
		        switch (this.lookahead.type) {
		            case token_1.Token.BooleanLiteral:
		            case token_1.Token.NullLiteral:
		            case token_1.Token.NumericLiteral:
		            case token_1.Token.StringLiteral:
		            case token_1.Token.Template:
		            case token_1.Token.RegularExpression:
		                statement = this.parseExpressionStatement();
		                break;
		            case token_1.Token.Punctuator:
		                var value = this.lookahead.value;
		                if (value === '{') {
		                    statement = this.parseBlock();
		                }
		                else if (value === '(') {
		                    statement = this.parseExpressionStatement();
		                }
		                else if (value === ';') {
		                    statement = this.parseEmptyStatement();
		                }
		                else {
		                    statement = this.parseExpressionStatement();
		                }
		                break;
		            case token_1.Token.Identifier:
		                statement = this.parseLabelledStatement();
		                break;
		            case token_1.Token.Keyword:
		                switch (this.lookahead.value) {
		                    case 'break':
		                        statement = this.parseBreakStatement();
		                        break;
		                    case 'continue':
		                        statement = this.parseContinueStatement();
		                        break;
		                    case 'debugger':
		                        statement = this.parseDebuggerStatement();
		                        break;
		                    case 'do':
		                        statement = this.parseDoWhileStatement();
		                        break;
		                    case 'for':
		                        statement = this.parseForStatement();
		                        break;
		                    case 'function':
		                        statement = this.parseFunctionDeclaration();
		                        break;
		                    case 'if':
		                        statement = this.parseIfStatement();
		                        break;
		                    case 'return':
		                        statement = this.parseReturnStatement();
		                        break;
		                    case 'switch':
		                        statement = this.parseSwitchStatement();
		                        break;
		                    case 'throw':
		                        statement = this.parseThrowStatement();
		                        break;
		                    case 'try':
		                        statement = this.parseTryStatement();
		                        break;
		                    case 'var':
		                        statement = this.parseVariableStatement();
		                        break;
		                    case 'while':
		                        statement = this.parseWhileStatement();
		                        break;
		                    case 'with':
		                        statement = this.parseWithStatement();
		                        break;
		                    default:
		                        statement = this.parseExpressionStatement();
		                        break;
		                }
		                break;
		            default:
		                this.throwUnexpectedToken(this.lookahead);
		        }
		        return statement;
		    };
		    // ECMA-262 14.1 Function Definition
		    Parser.prototype.parseFunctionSourceElements = function () {
		        var node = this.createNode();
		        this.expect('{');
		        var body = this.parseDirectivePrologues();
		        var previousLabelSet = this.context.labelSet;
		        var previousInIteration = this.context.inIteration;
		        var previousInSwitch = this.context.inSwitch;
		        var previousInFunctionBody = this.context.inFunctionBody;
		        this.context.labelSet = {};
		        this.context.inIteration = false;
		        this.context.inSwitch = false;
		        this.context.inFunctionBody = true;
		        while (this.startMarker.index < this.scanner.length) {
		            if (this.match('}')) {
		                break;
		            }
		            body.push(this.parseStatementListItem());
		        }
		        this.expect('}');
		        this.context.labelSet = previousLabelSet;
		        this.context.inIteration = previousInIteration;
		        this.context.inSwitch = previousInSwitch;
		        this.context.inFunctionBody = previousInFunctionBody;
		        return this.finalize(node, new Node.BlockStatement(body));
		    };
		    Parser.prototype.validateParam = function (options, param, name) {
		        var key = '$' + name;
		        if (this.context.strict) {
		            if (this.scanner.isRestrictedWord(name)) {
		                options.stricted = param;
		                options.message = messages_1.Messages.StrictParamName;
		            }
		            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
		                options.stricted = param;
		                options.message = messages_1.Messages.StrictParamDupe;
		            }
		        }
		        else if (!options.firstRestricted) {
		            if (this.scanner.isRestrictedWord(name)) {
		                options.firstRestricted = param;
		                options.message = messages_1.Messages.StrictParamName;
		            }
		            else if (this.scanner.isStrictModeReservedWord(name)) {
		                options.firstRestricted = param;
		                options.message = messages_1.Messages.StrictReservedWord;
		            }
		            else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
		                options.stricted = param;
		                options.message = messages_1.Messages.StrictParamDupe;
		            }
		        }
		        /* istanbul ignore next */
		        if (typeof Object.defineProperty === 'function') {
		            Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
		        }
		        else {
		            options.paramSet[key] = true;
		        }
		    };
		    Parser.prototype.parseRestElement = function (params) {
		        var node = this.createNode();
		        this.expect('...');
		        var arg = this.parsePattern(params);
		        if (this.match('=')) {
		            this.throwError(messages_1.Messages.DefaultRestParameter);
		        }
		        if (!this.match(')')) {
		            this.throwError(messages_1.Messages.ParameterAfterRestParameter);
		        }
		        return this.finalize(node, new Node.RestElement(arg));
		    };
		    Parser.prototype.parseFormalParameter = function (options) {
		        var params = [];
		        var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
		        for (var i = 0; i < params.length; i++) {
		            this.validateParam(options, params[i], params[i].value);
		        }
		        options.params.push(param);
		        return !this.match(')');
		    };
		    Parser.prototype.parseFormalParameters = function (firstRestricted) {
		        var options;
		        options = {
		            params: [],
		            firstRestricted: firstRestricted
		        };
		        this.expect('(');
		        if (!this.match(')')) {
		            options.paramSet = {};
		            while (this.startMarker.index < this.scanner.length) {
		                if (!this.parseFormalParameter(options)) {
		                    break;
		                }
		                this.expect(',');
		            }
		        }
		        this.expect(')');
		        return {
		            params: options.params,
		            stricted: options.stricted,
		            firstRestricted: options.firstRestricted,
		            message: options.message
		        };
		    };
		    Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
		        var node = this.createNode();
		        this.expectKeyword('function');
		        var isGenerator = this.match('*');
		        if (isGenerator) {
		            this.nextToken();
		        }
		        var message;
		        var id = null;
		        var firstRestricted = null;
		        if (!identifierIsOptional || !this.match('(')) {
		            var token = this.lookahead;
		            id = this.parseVariableIdentifier();
		            if (this.context.strict) {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
		                }
		            }
		            else {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictFunctionName;
		                }
		                else if (this.scanner.isStrictModeReservedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictReservedWord;
		                }
		            }
		        }
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = !isGenerator;
		        var formalParameters = this.parseFormalParameters(firstRestricted);
		        var params = formalParameters.params;
		        var stricted = formalParameters.stricted;
		        firstRestricted = formalParameters.firstRestricted;
		        if (formalParameters.message) {
		            message = formalParameters.message;
		        }
		        var previousStrict = this.context.strict;
		        var body = this.parseFunctionSourceElements();
		        if (this.context.strict && firstRestricted) {
		            this.throwUnexpectedToken(firstRestricted, message);
		        }
		        if (this.context.strict && stricted) {
		            this.tolerateUnexpectedToken(stricted, message);
		        }
		        this.context.strict = previousStrict;
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
		    };
		    Parser.prototype.parseFunctionExpression = function () {
		        var node = this.createNode();
		        this.expectKeyword('function');
		        var isGenerator = this.match('*');
		        if (isGenerator) {
		            this.nextToken();
		        }
		        var message;
		        var id = null;
		        var firstRestricted;
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = !isGenerator;
		        if (!this.match('(')) {
		            var token = this.lookahead;
		            id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
		            if (this.context.strict) {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
		                }
		            }
		            else {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictFunctionName;
		                }
		                else if (this.scanner.isStrictModeReservedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictReservedWord;
		                }
		            }
		        }
		        var formalParameters = this.parseFormalParameters(firstRestricted);
		        var params = formalParameters.params;
		        var stricted = formalParameters.stricted;
		        firstRestricted = formalParameters.firstRestricted;
		        if (formalParameters.message) {
		            message = formalParameters.message;
		        }
		        var previousStrict = this.context.strict;
		        var body = this.parseFunctionSourceElements();
		        if (this.context.strict && firstRestricted) {
		            this.throwUnexpectedToken(firstRestricted, message);
		        }
		        if (this.context.strict && stricted) {
		            this.tolerateUnexpectedToken(stricted, message);
		        }
		        this.context.strict = previousStrict;
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
		    };
		    // ECMA-262 14.1.1 Directive Prologues
		    Parser.prototype.parseDirective = function () {
		        var token = this.lookahead;
		        var directive = null;
		        var node = this.createNode();
		        var expr = this.parseExpression();
		        if (expr.type === syntax_1.Syntax.Literal) {
		            directive = this.getTokenRaw(token).slice(1, -1);
		        }
		        this.consumeSemicolon();
		        return this.finalize(node, directive ? new Node.Directive(expr, directive) :
		            new Node.ExpressionStatement(expr));
		    };
		    Parser.prototype.parseDirectivePrologues = function () {
		        var firstRestricted = null;
		        var body = [];
		        while (true) {
		            var token = this.lookahead;
		            if (token.type !== token_1.Token.StringLiteral) {
		                break;
		            }
		            var statement = this.parseDirective();
		            body.push(statement);
		            var directive = statement.directive;
		            if (typeof directive !== 'string') {
		                break;
		            }
		            if (directive === 'use strict') {
		                this.context.strict = true;
		                if (firstRestricted) {
		                    this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
		                }
		            }
		            else {
		                if (!firstRestricted && token.octal) {
		                    firstRestricted = token;
		                }
		            }
		        }
		        return body;
		    };
		    // ECMA-262 14.3 Method Definitions
		    Parser.prototype.qualifiedPropertyName = function (token) {
		        switch (token.type) {
		            case token_1.Token.Identifier:
		            case token_1.Token.StringLiteral:
		            case token_1.Token.BooleanLiteral:
		            case token_1.Token.NullLiteral:
		            case token_1.Token.NumericLiteral:
		            case token_1.Token.Keyword:
		                return true;
		            case token_1.Token.Punctuator:
		                return token.value === '[';
		        }
		        return false;
		    };
		    Parser.prototype.parseGetterMethod = function () {
		        var node = this.createNode();
		        this.expect('(');
		        this.expect(')');
		        var isGenerator = false;
		        var params = {
		            params: [],
		            stricted: null,
		            firstRestricted: null,
		            message: null
		        };
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = false;
		        var method = this.parsePropertyMethod(params);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
		    };
		    Parser.prototype.parseSetterMethod = function () {
		        var node = this.createNode();
		        var options = {
		            params: [],
		            firstRestricted: null,
		            paramSet: {}
		        };
		        var isGenerator = false;
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = false;
		        this.expect('(');
		        if (this.match(')')) {
		            this.tolerateUnexpectedToken(this.lookahead);
		        }
		        else {
		            this.parseFormalParameter(options);
		        }
		        this.expect(')');
		        var method = this.parsePropertyMethod(options);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, options.params, method, isGenerator));
		    };
		    Parser.prototype.parseGeneratorMethod = function () {
		        var node = this.createNode();
		        var isGenerator = true;
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = true;
		        var params = this.parseFormalParameters();
		        this.context.allowYield = false;
		        var method = this.parsePropertyMethod(params);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
		    };
		    // ECMA-262 14.4 Generator Function Definitions
		    Parser.prototype.isStartOfExpression = function () {
		        var start = true;
		        var value = this.lookahead.value;
		        switch (this.lookahead.type) {
		            case token_1.Token.Punctuator:
		                start = (value === '[') || (value === '(') || (value === '{') ||
		                    (value === '+') || (value === '-') ||
		                    (value === '!') || (value === '~') ||
		                    (value === '++') || (value === '--') ||
		                    (value === '/') || (value === '/='); // regular expression literal
		                break;
		            case token_1.Token.Keyword:
		                start = (value === 'class') || (value === 'delete') ||
		                    (value === 'function') || (value === 'let') || (value === 'new') ||
		                    (value === 'super') || (value === 'this') || (value === 'typeof') ||
		                    (value === 'void') || (value === 'yield');
		                break;
		            default:
		                break;
		        }
		        return start;
		    };
		    Parser.prototype.parseYieldExpression = function () {
		        var node = this.createNode();
		        this.expectKeyword('yield');
		        var argument = null;
		        var delegate = false;
		        if (!this.hasLineTerminator) {
		            var previousAllowYield = this.context.allowYield;
		            this.context.allowYield = false;
		            delegate = this.match('*');
		            if (delegate) {
		                this.nextToken();
		                argument = this.parseAssignmentExpression();
		            }
		            else if (this.isStartOfExpression()) {
		                argument = this.parseAssignmentExpression();
		            }
		            this.context.allowYield = previousAllowYield;
		        }
		        return this.finalize(node, new Node.YieldExpression(argument, delegate));
		    };
		    // ECMA-262 14.5 Class Definitions
		    Parser.prototype.parseClassElement = function (hasConstructor) {
		        var token = this.lookahead;
		        var node = this.createNode();
		        var kind;
		        var key;
		        var value;
		        var computed = false;
		        var method = false;
		        var isStatic = false;
		        if (this.match('*')) {
		            this.nextToken();
		        }
		        else {
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            var id = key;
		            if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
		                token = this.lookahead;
		                isStatic = true;
		                computed = this.match('[');
		                if (this.match('*')) {
		                    this.nextToken();
		                }
		                else {
		                    key = this.parseObjectPropertyKey();
		                }
		            }
		        }
		        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
		        if (token.type === token_1.Token.Identifier) {
		            if (token.value === 'get' && lookaheadPropertyKey) {
		                kind = 'get';
		                computed = this.match('[');
		                key = this.parseObjectPropertyKey();
		                this.context.allowYield = false;
		                value = this.parseGetterMethod();
		            }
		            else if (token.value === 'set' && lookaheadPropertyKey) {
		                kind = 'set';
		                computed = this.match('[');
		                key = this.parseObjectPropertyKey();
		                value = this.parseSetterMethod();
		            }
		        }
		        else if (token.type === token_1.Token.Punctuator && token.value === '*' && lookaheadPropertyKey) {
		            kind = 'init';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            value = this.parseGeneratorMethod();
		            method = true;
		        }
		        if (!kind && key && this.match('(')) {
		            kind = 'init';
		            value = this.parsePropertyMethodFunction();
		            method = true;
		        }
		        if (!kind) {
		            this.throwUnexpectedToken(this.lookahead);
		        }
		        if (kind === 'init') {
		            kind = 'method';
		        }
		        if (!computed) {
		            if (isStatic && this.isPropertyKey(key, 'prototype')) {
		                this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
		            }
		            if (!isStatic && this.isPropertyKey(key, 'constructor')) {
		                if (kind !== 'method' || !method || value.generator) {
		                    this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
		                }
		                if (hasConstructor.value) {
		                    this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
		                }
		                else {
		                    hasConstructor.value = true;
		                }
		                kind = 'constructor';
		            }
		        }
		        return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
		    };
		    Parser.prototype.parseClassElementList = function () {
		        var body = [];
		        var hasConstructor = { value: false };
		        this.expect('{');
		        while (!this.match('}')) {
		            if (this.match(';')) {
		                this.nextToken();
		            }
		            else {
		                body.push(this.parseClassElement(hasConstructor));
		            }
		        }
		        this.expect('}');
		        return body;
		    };
		    Parser.prototype.parseClassBody = function () {
		        var node = this.createNode();
		        var elementList = this.parseClassElementList();
		        return this.finalize(node, new Node.ClassBody(elementList));
		    };
		    Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
		        var node = this.createNode();
		        var previousStrict = this.context.strict;
		        this.context.strict = true;
		        this.expectKeyword('class');
		        var id = (identifierIsOptional && (this.lookahead.type !== token_1.Token.Identifier)) ? null : this.parseVariableIdentifier();
		        var superClass = null;
		        if (this.matchKeyword('extends')) {
		            this.nextToken();
		            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
		        }
		        var classBody = this.parseClassBody();
		        this.context.strict = previousStrict;
		        return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
		    };
		    Parser.prototype.parseClassExpression = function () {
		        var node = this.createNode();
		        var previousStrict = this.context.strict;
		        this.context.strict = true;
		        this.expectKeyword('class');
		        var id = (this.lookahead.type === token_1.Token.Identifier) ? this.parseVariableIdentifier() : null;
		        var superClass = null;
		        if (this.matchKeyword('extends')) {
		            this.nextToken();
		            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
		        }
		        var classBody = this.parseClassBody();
		        this.context.strict = previousStrict;
		        return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
		    };
		    // ECMA-262 15.1 Scripts
		    // ECMA-262 15.2 Modules
		    Parser.prototype.parseProgram = function () {
		        var node = this.createNode();
		        var body = this.parseDirectivePrologues();
		        while (this.startMarker.index < this.scanner.length) {
		            body.push(this.parseStatementListItem());
		        }
		        return this.finalize(node, new Node.Program(body, this.sourceType));
		    };
		    // ECMA-262 15.2.2 Imports
		    Parser.prototype.parseModuleSpecifier = function () {
		        var node = this.createNode();
		        if (this.lookahead.type !== token_1.Token.StringLiteral) {
		            this.throwError(messages_1.Messages.InvalidModuleSpecifier);
		        }
		        var token = this.nextToken();
		        var raw = this.getTokenRaw(token);
		        return this.finalize(node, new Node.Literal(token.value, raw));
		    };
		    // import {<foo as bar>} ...;
		    Parser.prototype.parseImportSpecifier = function () {
		        var node = this.createNode();
		        var imported;
		        var local;
		        if (this.lookahead.type === token_1.Token.Identifier) {
		            imported = this.parseVariableIdentifier();
		            local = imported;
		            if (this.matchContextualKeyword('as')) {
		                this.nextToken();
		                local = this.parseVariableIdentifier();
		            }
		        }
		        else {
		            imported = this.parseIdentifierName();
		            local = imported;
		            if (this.matchContextualKeyword('as')) {
		                this.nextToken();
		                local = this.parseVariableIdentifier();
		            }
		            else {
		                this.throwUnexpectedToken(this.nextToken());
		            }
		        }
		        return this.finalize(node, new Node.ImportSpecifier(local, imported));
		    };
		    // {foo, bar as bas}
		    Parser.prototype.parseNamedImports = function () {
		        this.expect('{');
		        var specifiers = [];
		        while (!this.match('}')) {
		            specifiers.push(this.parseImportSpecifier());
		            if (!this.match('}')) {
		                this.expect(',');
		            }
		        }
		        this.expect('}');
		        return specifiers;
		    };
		    // import <foo> ...;
		    Parser.prototype.parseImportDefaultSpecifier = function () {
		        var node = this.createNode();
		        var local = this.parseIdentifierName();
		        return this.finalize(node, new Node.ImportDefaultSpecifier(local));
		    };
		    // import <* as foo> ...;
		    Parser.prototype.parseImportNamespaceSpecifier = function () {
		        var node = this.createNode();
		        this.expect('*');
		        if (!this.matchContextualKeyword('as')) {
		            this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
		        }
		        this.nextToken();
		        var local = this.parseIdentifierName();
		        return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
		    };
		    Parser.prototype.parseImportDeclaration = function () {
		        if (this.context.inFunctionBody) {
		            this.throwError(messages_1.Messages.IllegalImportDeclaration);
		        }
		        var node = this.createNode();
		        this.expectKeyword('import');
		        var src;
		        var specifiers = [];
		        if (this.lookahead.type === token_1.Token.StringLiteral) {
		            // import 'foo';
		            src = this.parseModuleSpecifier();
		        }
		        else {
		            if (this.match('{')) {
		                // import {bar}
		                specifiers = specifiers.concat(this.parseNamedImports());
		            }
		            else if (this.match('*')) {
		                // import * as foo
		                specifiers.push(this.parseImportNamespaceSpecifier());
		            }
		            else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
		                // import foo
		                specifiers.push(this.parseImportDefaultSpecifier());
		                if (this.match(',')) {
		                    this.nextToken();
		                    if (this.match('*')) {
		                        // import foo, * as foo
		                        specifiers.push(this.parseImportNamespaceSpecifier());
		                    }
		                    else if (this.match('{')) {
		                        // import foo, {bar}
		                        specifiers = specifiers.concat(this.parseNamedImports());
		                    }
		                    else {
		                        this.throwUnexpectedToken(this.lookahead);
		                    }
		                }
		            }
		            else {
		                this.throwUnexpectedToken(this.nextToken());
		            }
		            if (!this.matchContextualKeyword('from')) {
		                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
		                this.throwError(message, this.lookahead.value);
		            }
		            this.nextToken();
		            src = this.parseModuleSpecifier();
		        }
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
		    };
		    // ECMA-262 15.2.3 Exports
		    Parser.prototype.parseExportSpecifier = function () {
		        var node = this.createNode();
		        var local = this.parseIdentifierName();
		        var exported = local;
		        if (this.matchContextualKeyword('as')) {
		            this.nextToken();
		            exported = this.parseIdentifierName();
		        }
		        return this.finalize(node, new Node.ExportSpecifier(local, exported));
		    };
		    Parser.prototype.parseExportDeclaration = function () {
		        if (this.context.inFunctionBody) {
		            this.throwError(messages_1.Messages.IllegalExportDeclaration);
		        }
		        var node = this.createNode();
		        this.expectKeyword('export');
		        var exportDeclaration;
		        if (this.matchKeyword('default')) {
		            // export default ...
		            this.nextToken();
		            if (this.matchKeyword('function')) {
		                // export default function foo () {}
		                // export default function () {}
		                var declaration = this.parseFunctionDeclaration(true);
		                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
		            }
		            else if (this.matchKeyword('class')) {
		                // export default class foo {}
		                var declaration = this.parseClassDeclaration(true);
		                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
		            }
		            else {
		                if (this.matchContextualKeyword('from')) {
		                    this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
		                }
		                // export default {};
		                // export default [];
		                // export default (1 + 2);
		                var declaration = this.match('{') ? this.parseObjectInitializer() :
		                    this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
		                this.consumeSemicolon();
		                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
		            }
		        }
		        else if (this.match('*')) {
		            // export * from 'foo';
		            this.nextToken();
		            if (!this.matchContextualKeyword('from')) {
		                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
		                this.throwError(message, this.lookahead.value);
		            }
		            this.nextToken();
		            var src = this.parseModuleSpecifier();
		            this.consumeSemicolon();
		            exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
		        }
		        else if (this.lookahead.type === token_1.Token.Keyword) {
		            // export var f = 1;
		            var declaration = void 0;
		            switch (this.lookahead.value) {
		                case 'let':
		                case 'const':
		                    declaration = this.parseLexicalDeclaration({ inFor: false });
		                    break;
		                case 'var':
		                case 'class':
		                case 'function':
		                    declaration = this.parseStatementListItem();
		                    break;
		                default:
		                    this.throwUnexpectedToken(this.lookahead);
		            }
		            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
		        }
		        else {
		            var specifiers = [];
		            var source = null;
		            var isExportFromIdentifier = false;
		            this.expect('{');
		            while (!this.match('}')) {
		                isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
		                specifiers.push(this.parseExportSpecifier());
		                if (!this.match('}')) {
		                    this.expect(',');
		                }
		            }
		            this.expect('}');
		            if (this.matchContextualKeyword('from')) {
		                // export {default} from 'foo';
		                // export {foo} from 'foo';
		                this.nextToken();
		                source = this.parseModuleSpecifier();
		                this.consumeSemicolon();
		            }
		            else if (isExportFromIdentifier) {
		                // export {default}; // missing fromClause
		                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
		                this.throwError(message, this.lookahead.value);
		            }
		            else {
		                // export {foo};
		                this.consumeSemicolon();
		            }
		            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
		        }
		        return exportDeclaration;
		    };
		    return Parser;
		}());
		exports.Parser = Parser;


	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		// Ensure the condition is true, otherwise throw an error.
		// This is only to have a better contract semantic, i.e. another safety net
		// to catch a logic error. The condition shall be fulfilled in normal case.
		// Do NOT use this to enforce a certain condition on any user input.
		"use strict";
		function assert(condition, message) {
		    /* istanbul ignore if */
		    if (!condition) {
		        throw new Error('ASSERT: ' + message);
		    }
		}
		exports.assert = assert;


	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		"use strict";
		// Error messages should be identical to V8.
		exports.Messages = {
		    UnexpectedToken: 'Unexpected token %0',
		    UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
		    UnexpectedNumber: 'Unexpected number',
		    UnexpectedString: 'Unexpected string',
		    UnexpectedIdentifier: 'Unexpected identifier',
		    UnexpectedReserved: 'Unexpected reserved word',
		    UnexpectedTemplate: 'Unexpected quasi %0',
		    UnexpectedEOS: 'Unexpected end of input',
		    NewlineAfterThrow: 'Illegal newline after throw',
		    InvalidRegExp: 'Invalid regular expression',
		    UnterminatedRegExp: 'Invalid regular expression: missing /',
		    InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
		    InvalidLHSInForIn: 'Invalid left-hand side in for-in',
		    InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
		    MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
		    NoCatchOrFinally: 'Missing catch or finally after try',
		    UnknownLabel: 'Undefined label \'%0\'',
		    Redeclaration: '%0 \'%1\' has already been declared',
		    IllegalContinue: 'Illegal continue statement',
		    IllegalBreak: 'Illegal break statement',
		    IllegalReturn: 'Illegal return statement',
		    StrictModeWith: 'Strict mode code may not include a with statement',
		    StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
		    StrictVarName: 'Variable name may not be eval or arguments in strict mode',
		    StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
		    StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
		    StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
		    StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
		    StrictDelete: 'Delete of an unqualified identifier in strict mode.',
		    StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
		    StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
		    StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
		    StrictReservedWord: 'Use of future reserved word in strict mode',
		    TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
		    ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
		    DefaultRestParameter: 'Unexpected token =',
		    DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
		    ConstructorSpecialMethod: 'Class constructor may not be an accessor',
		    DuplicateConstructor: 'A class may only have one constructor',
		    StaticPrototype: 'Classes may not have static property named prototype',
		    MissingFromClause: 'Unexpected token',
		    NoAsAfterImportNamespace: 'Unexpected token',
		    InvalidModuleSpecifier: 'Unexpected token',
		    IllegalImportDeclaration: 'Unexpected token',
		    IllegalExportDeclaration: 'Unexpected token',
		    DuplicateBinding: 'Duplicate binding %0',
		    ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer'
		};


	/***/ },
	/* 6 */
	/***/ function(module, exports) {

		"use strict";
		var ErrorHandler = (function () {
		    function ErrorHandler() {
		        this.errors = [];
		        this.tolerant = false;
		    }
		    ;
		    ErrorHandler.prototype.recordError = function (error) {
		        this.errors.push(error);
		    };
		    ;
		    ErrorHandler.prototype.tolerate = function (error) {
		        if (this.tolerant) {
		            this.recordError(error);
		        }
		        else {
		            throw error;
		        }
		    };
		    ;
		    ErrorHandler.prototype.constructError = function (msg, column) {
		        var error = new Error(msg);
		        try {
		            throw error;
		        }
		        catch (base) {
		            /* istanbul ignore else */
		            if (Object.create && Object.defineProperty) {
		                error = Object.create(base);
		                Object.defineProperty(error, 'column', { value: column });
		            }
		        }
		        finally {
		            return error;
		        }
		    };
		    ;
		    ErrorHandler.prototype.createError = function (index, line, col, description) {
		        var msg = 'Line ' + line + ': ' + description;
		        var error = this.constructError(msg, col);
		        error.index = index;
		        error.lineNumber = line;
		        error.description = description;
		        return error;
		    };
		    ;
		    ErrorHandler.prototype.throwError = function (index, line, col, description) {
		        throw this.createError(index, line, col, description);
		    };
		    ;
		    ErrorHandler.prototype.tolerateError = function (index, line, col, description) {
		        var error = this.createError(index, line, col, description);
		        if (this.tolerant) {
		            this.recordError(error);
		        }
		        else {
		            throw error;
		        }
		    };
		    ;
		    return ErrorHandler;
		}());
		exports.ErrorHandler = ErrorHandler;


	/***/ },
	/* 7 */
	/***/ function(module, exports) {

		"use strict";
		(function (Token) {
		    Token[Token["BooleanLiteral"] = 1] = "BooleanLiteral";
		    Token[Token["EOF"] = 2] = "EOF";
		    Token[Token["Identifier"] = 3] = "Identifier";
		    Token[Token["Keyword"] = 4] = "Keyword";
		    Token[Token["NullLiteral"] = 5] = "NullLiteral";
		    Token[Token["NumericLiteral"] = 6] = "NumericLiteral";
		    Token[Token["Punctuator"] = 7] = "Punctuator";
		    Token[Token["StringLiteral"] = 8] = "StringLiteral";
		    Token[Token["RegularExpression"] = 9] = "RegularExpression";
		    Token[Token["Template"] = 10] = "Template";
		})(exports.Token || (exports.Token = {}));
		var Token = exports.Token;
		;
		exports.TokenName = {};
		exports.TokenName[Token.BooleanLiteral] = 'Boolean';
		exports.TokenName[Token.EOF] = '<end>';
		exports.TokenName[Token.Identifier] = 'Identifier';
		exports.TokenName[Token.Keyword] = 'Keyword';
		exports.TokenName[Token.NullLiteral] = 'Null';
		exports.TokenName[Token.NumericLiteral] = 'Numeric';
		exports.TokenName[Token.Punctuator] = 'Punctuator';
		exports.TokenName[Token.StringLiteral] = 'String';
		exports.TokenName[Token.RegularExpression] = 'RegularExpression';
		exports.TokenName[Token.Template] = 'Template';


	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		var assert_1 = __webpack_require__(4);
		var messages_1 = __webpack_require__(5);
		var character_1 = __webpack_require__(9);
		var token_1 = __webpack_require__(7);
		function hexValue(ch) {
		    return '0123456789abcdef'.indexOf(ch.toLowerCase());
		}
		function octalValue(ch) {
		    return '01234567'.indexOf(ch);
		}
		var Scanner = (function () {
		    function Scanner(code, handler) {
		        this.source = code;
		        this.errorHandler = handler;
		        this.trackComment = false;
		        this.length = code.length;
		        this.index = 0;
		        this.lineNumber = (code.length > 0) ? 1 : 0;
		        this.lineStart = 0;
		        this.curlyStack = [];
		    }
		    ;
		    Scanner.prototype.eof = function () {
		        return this.index >= this.length;
		    };
		    ;
		    Scanner.prototype.throwUnexpectedToken = function (message) {
		        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
		        this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
		    };
		    ;
		    Scanner.prototype.tolerateUnexpectedToken = function () {
		        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, messages_1.Messages.UnexpectedTokenIllegal);
		    };
		    ;
		    // ECMA-262 11.4 Comments
		    Scanner.prototype.skipSingleLineComment = function (offset) {
		        var comments;
		        var start, loc;
		        if (this.trackComment) {
		            comments = [];
		            start = this.index - offset;
		            loc = {
		                start: {
		                    line: this.lineNumber,
		                    column: this.index - this.lineStart - offset
		                },
		                end: {}
		            };
		        }
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            ++this.index;
		            if (character_1.Character.isLineTerminator(ch)) {
		                if (this.trackComment) {
		                    loc.end = {
		                        line: this.lineNumber,
		                        column: this.index - this.lineStart - 1
		                    };
		                    var entry = {
		                        multiLine: false,
		                        slice: [start + offset, this.index - 1],
		                        range: [start, this.index - 1],
		                        loc: loc
		                    };
		                    comments.push(entry);
		                }
		                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
		                    ++this.index;
		                }
		                ++this.lineNumber;
		                this.lineStart = this.index;
		                return comments;
		            }
		        }
		        if (this.trackComment) {
		            loc.end = {
		                line: this.lineNumber,
		                column: this.index - this.lineStart
		            };
		            var entry = {
		                multiLine: false,
		                slice: [start + offset, this.index],
		                range: [start, this.index],
		                loc: loc
		            };
		            comments.push(entry);
		        }
		        return comments;
		    };
		    ;
		    Scanner.prototype.skipMultiLineComment = function () {
		        var comments;
		        var start, loc;
		        if (this.trackComment) {
		            comments = [];
		            start = this.index - 2;
		            loc = {
		                start: {
		                    line: this.lineNumber,
		                    column: this.index - this.lineStart - 2
		                },
		                end: {}
		            };
		        }
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            if (character_1.Character.isLineTerminator(ch)) {
		                if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
		                    ++this.index;
		                }
		                ++this.lineNumber;
		                ++this.index;
		                this.lineStart = this.index;
		            }
		            else if (ch === 0x2A) {
		                // Block comment ends with '*/'.
		                if (this.source.charCodeAt(this.index + 1) === 0x2F) {
		                    this.index += 2;
		                    if (this.trackComment) {
		                        loc.end = {
		                            line: this.lineNumber,
		                            column: this.index - this.lineStart
		                        };
		                        var entry = {
		                            multiLine: true,
		                            slice: [start + 2, this.index - 2],
		                            range: [start, this.index],
		                            loc: loc
		                        };
		                        comments.push(entry);
		                    }
		                    return comments;
		                }
		                ++this.index;
		            }
		            else {
		                ++this.index;
		            }
		        }
		        // Ran off the end of the file - the whole thing is a comment
		        if (this.trackComment) {
		            loc.end = {
		                line: this.lineNumber,
		                column: this.index - this.lineStart
		            };
		            var entry = {
		                multiLine: true,
		                slice: [start + 2, this.index],
		                range: [start, this.index],
		                loc: loc
		            };
		            comments.push(entry);
		        }
		        this.tolerateUnexpectedToken();
		        return comments;
		    };
		    ;
		    Scanner.prototype.scanComments = function () {
		        var comments;
		        if (this.trackComment) {
		            comments = [];
		        }
		        var start = (this.index === 0);
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            if (character_1.Character.isWhiteSpace(ch)) {
		                ++this.index;
		            }
		            else if (character_1.Character.isLineTerminator(ch)) {
		                ++this.index;
		                if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
		                    ++this.index;
		                }
		                ++this.lineNumber;
		                this.lineStart = this.index;
		                start = true;
		            }
		            else if (ch === 0x2F) {
		                ch = this.source.charCodeAt(this.index + 1);
		                if (ch === 0x2F) {
		                    this.index += 2;
		                    var comment = this.skipSingleLineComment(2);
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                    start = true;
		                }
		                else if (ch === 0x2A) {
		                    this.index += 2;
		                    var comment = this.skipMultiLineComment();
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                }
		                else {
		                    break;
		                }
		            }
		            else if (start && ch === 0x2D) {
		                // U+003E is '>'
		                if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
		                    // '-->' is a single-line comment
		                    this.index += 3;
		                    var comment = this.skipSingleLineComment(3);
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                }
		                else {
		                    break;
		                }
		            }
		            else if (ch === 0x3C) {
		                if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
		                    this.index += 4; // `<!--`
		                    var comment = this.skipSingleLineComment(4);
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                }
		                else {
		                    break;
		                }
		            }
		            else {
		                break;
		            }
		        }
		        return comments;
		    };
		    ;
		    // ECMA-262 11.6.2.2 Future Reserved Words
		    Scanner.prototype.isFutureReservedWord = function (id) {
		        switch (id) {
		            case 'enum':
		            case 'export':
		            case 'import':
		            case 'super':
		                return true;
		            default:
		                return false;
		        }
		    };
		    ;
		    Scanner.prototype.isStrictModeReservedWord = function (id) {
		        switch (id) {
		            case 'implements':
		            case 'interface':
		            case 'package':
		            case 'private':
		            case 'protected':
		            case 'public':
		            case 'static':
		            case 'yield':
		            case 'let':
		                return true;
		            default:
		                return false;
		        }
		    };
		    ;
		    Scanner.prototype.isRestrictedWord = function (id) {
		        return id === 'eval' || id === 'arguments';
		    };
		    ;
		    // ECMA-262 11.6.2.1 Keywords
		    Scanner.prototype.isKeyword = function (id) {
		        switch (id.length) {
		            case 2:
		                return (id === 'if') || (id === 'in') || (id === 'do');
		            case 3:
		                return (id === 'var') || (id === 'for') || (id === 'new') ||
		                    (id === 'try') || (id === 'let');
		            case 4:
		                return (id === 'this') || (id === 'else') || (id === 'case') ||
		                    (id === 'void') || (id === 'with') || (id === 'enum');
		            case 5:
		                return (id === 'while') || (id === 'break') || (id === 'catch') ||
		                    (id === 'throw') || (id === 'const') || (id === 'yield') ||
		                    (id === 'class') || (id === 'super');
		            case 6:
		                return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
		                    (id === 'switch') || (id === 'export') || (id === 'import');
		            case 7:
		                return (id === 'default') || (id === 'finally') || (id === 'extends');
		            case 8:
		                return (id === 'function') || (id === 'continue') || (id === 'debugger');
		            case 10:
		                return (id === 'instanceof');
		            default:
		                return false;
		        }
		    };
		    ;
		    Scanner.prototype.codePointAt = function (i) {
		        var cp = this.source.charCodeAt(i);
		        if (cp >= 0xD800 && cp <= 0xDBFF) {
		            var second = this.source.charCodeAt(i + 1);
		            if (second >= 0xDC00 && second <= 0xDFFF) {
		                var first = cp;
		                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
		            }
		        }
		        return cp;
		    };
		    ;
		    Scanner.prototype.scanHexEscape = function (prefix) {
		        var len = (prefix === 'u') ? 4 : 2;
		        var code = 0;
		        for (var i = 0; i < len; ++i) {
		            if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
		                code = code * 16 + hexValue(this.source[this.index++]);
		            }
		            else {
		                return '';
		            }
		        }
		        return String.fromCharCode(code);
		    };
		    ;
		    Scanner.prototype.scanUnicodeCodePointEscape = function () {
		        var ch = this.source[this.index];
		        var code = 0;
		        // At least, one hex digit is required.
		        if (ch === '}') {
		            this.throwUnexpectedToken();
		        }
		        while (!this.eof()) {
		            ch = this.source[this.index++];
		            if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
		                break;
		            }
		            code = code * 16 + hexValue(ch);
		        }
		        if (code > 0x10FFFF || ch !== '}') {
		            this.throwUnexpectedToken();
		        }
		        return character_1.Character.fromCodePoint(code);
		    };
		    ;
		    Scanner.prototype.getIdentifier = function () {
		        var start = this.index++;
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            if (ch === 0x5C) {
		                // Blackslash (U+005C) marks Unicode escape sequence.
		                this.index = start;
		                return this.getComplexIdentifier();
		            }
		            else if (ch >= 0xD800 && ch < 0xDFFF) {
		                // Need to handle surrogate pairs.
		                this.index = start;
		                return this.getComplexIdentifier();
		            }
		            if (character_1.Character.isIdentifierPart(ch)) {
		                ++this.index;
		            }
		            else {
		                break;
		            }
		        }
		        return this.source.slice(start, this.index);
		    };
		    ;
		    Scanner.prototype.getComplexIdentifier = function () {
		        var cp = this.codePointAt(this.index);
		        var id = character_1.Character.fromCodePoint(cp);
		        this.index += id.length;
		        // '\u' (U+005C, U+0075) denotes an escaped character.
		        var ch;
		        if (cp === 0x5C) {
		            if (this.source.charCodeAt(this.index) !== 0x75) {
		                this.throwUnexpectedToken();
		            }
		            ++this.index;
		            if (this.source[this.index] === '{') {
		                ++this.index;
		                ch = this.scanUnicodeCodePointEscape();
		            }
		            else {
		                ch = this.scanHexEscape('u');
		                cp = ch.charCodeAt(0);
		                if (!ch || ch === '\\' || !character_1.Character.isIdentifierStart(cp)) {
		                    this.throwUnexpectedToken();
		                }
		            }
		            id = ch;
		        }
		        while (!this.eof()) {
		            cp = this.codePointAt(this.index);
		            if (!character_1.Character.isIdentifierPart(cp)) {
		                break;
		            }
		            ch = character_1.Character.fromCodePoint(cp);
		            id += ch;
		            this.index += ch.length;
		            // '\u' (U+005C, U+0075) denotes an escaped character.
		            if (cp === 0x5C) {
		                id = id.substr(0, id.length - 1);
		                if (this.source.charCodeAt(this.index) !== 0x75) {
		                    this.throwUnexpectedToken();
		                }
		                ++this.index;
		                if (this.source[this.index] === '{') {
		                    ++this.index;
		                    ch = this.scanUnicodeCodePointEscape();
		                }
		                else {
		                    ch = this.scanHexEscape('u');
		                    cp = ch.charCodeAt(0);
		                    if (!ch || ch === '\\' || !character_1.Character.isIdentifierPart(cp)) {
		                        this.throwUnexpectedToken();
		                    }
		                }
		                id += ch;
		            }
		        }
		        return id;
		    };
		    ;
		    Scanner.prototype.octalToDecimal = function (ch) {
		        // \0 is not octal escape sequence
		        var octal = (ch !== '0');
		        var code = octalValue(ch);
		        if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
		            octal = true;
		            code = code * 8 + octalValue(this.source[this.index++]);
		            // 3 digits are only allowed when string starts
		            // with 0, 1, 2, 3
		            if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
		                code = code * 8 + octalValue(this.source[this.index++]);
		            }
		        }
		        return {
		            code: code,
		            octal: octal
		        };
		    };
		    ;
		    // ECMA-262 11.6 Names and Keywords
		    Scanner.prototype.scanIdentifier = function () {
		        var type;
		        var start = this.index;
		        // Backslash (U+005C) starts an escaped character.
		        var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
		        // There is no keyword or literal with only one character.
		        // Thus, it must be an identifier.
		        if (id.length === 1) {
		            type = token_1.Token.Identifier;
		        }
		        else if (this.isKeyword(id)) {
		            type = token_1.Token.Keyword;
		        }
		        else if (id === 'null') {
		            type = token_1.Token.NullLiteral;
		        }
		        else if (id === 'true' || id === 'false') {
		            type = token_1.Token.BooleanLiteral;
		        }
		        else {
		            type = token_1.Token.Identifier;
		        }
		        return {
		            type: type,
		            value: id,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    ;
		    // ECMA-262 11.7 Punctuators
		    Scanner.prototype.scanPunctuator = function () {
		        var token = {
		            type: token_1.Token.Punctuator,
		            value: '',
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: this.index,
		            end: this.index
		        };
		        // Check for most common single-character punctuators.
		        var str = this.source[this.index];
		        switch (str) {
		            case '(':
		            case '{':
		                if (str === '{') {
		                    this.curlyStack.push('{');
		                }
		                ++this.index;
		                break;
		            case '.':
		                ++this.index;
		                if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
		                    // Spread operator: ...
		                    this.index += 2;
		                    str = '...';
		                }
		                break;
		            case '}':
		                ++this.index;
		                this.curlyStack.pop();
		                break;
		            case ')':
		            case ';':
		            case ',':
		            case '[':
		            case ']':
		            case ':':
		            case '?':
		            case '~':
		                ++this.index;
		                break;
		            default:
		                // 4-character punctuator.
		                str = this.source.substr(this.index, 4);
		                if (str === '>>>=') {
		                    this.index += 4;
		                }
		                else {
		                    // 3-character punctuators.
		                    str = str.substr(0, 3);
		                    if (str === '===' || str === '!==' || str === '>>>' ||
		                        str === '<<=' || str === '>>=' || str === '**=') {
		                        this.index += 3;
		                    }
		                    else {
		                        // 2-character punctuators.
		                        str = str.substr(0, 2);
		                        if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
		                            str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
		                            str === '++' || str === '--' || str === '<<' || str === '>>' ||
		                            str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
		                            str === '<=' || str === '>=' || str === '=>' || str === '**') {
		                            this.index += 2;
		                        }
		                        else {
		                            // 1-character punctuators.
		                            str = this.source[this.index];
		                            if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
		                                ++this.index;
		                            }
		                        }
		                    }
		                }
		        }
		        if (this.index === token.start) {
		            this.throwUnexpectedToken();
		        }
		        token.end = this.index;
		        token.value = str;
		        return token;
		    };
		    ;
		    // ECMA-262 11.8.3 Numeric Literals
		    Scanner.prototype.scanHexLiteral = function (start) {
		        var number = '';
		        while (!this.eof()) {
		            if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
		                break;
		            }
		            number += this.source[this.index++];
		        }
		        if (number.length === 0) {
		            this.throwUnexpectedToken();
		        }
		        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: token_1.Token.NumericLiteral,
		            value: parseInt('0x' + number, 16),
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    ;
		    Scanner.prototype.scanBinaryLiteral = function (start) {
		        var number = '';
		        var ch;
		        while (!this.eof()) {
		            ch = this.source[this.index];
		            if (ch !== '0' && ch !== '1') {
		                break;
		            }
		            number += this.source[this.index++];
		        }
		        if (number.length === 0) {
		            // only 0b or 0B
		            this.throwUnexpectedToken();
		        }
		        if (!this.eof()) {
		            ch = this.source.charCodeAt(this.index);
		            /* istanbul ignore else */
		            if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
		                this.throwUnexpectedToken();
		            }
		        }
		        return {
		            type: token_1.Token.NumericLiteral,
		            value: parseInt(number, 2),
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    ;
		    Scanner.prototype.scanOctalLiteral = function (prefix, start) {
		        var number = '';
		        var octal = false;
		        if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
		            octal = true;
		            number = '0' + this.source[this.index++];
		        }
		        else {
		            ++this.index;
		        }
		        while (!this.eof()) {
		            if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
		                break;
		            }
		            number += this.source[this.index++];
		        }
		        if (!octal && number.length === 0) {
		            // only 0o or 0O
		            this.throwUnexpectedToken();
		        }
		        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: token_1.Token.NumericLiteral,
		            value: parseInt(number, 8),
		            octal: octal,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    ;
		    Scanner.prototype.isImplicitOctalLiteral = function () {
		        // Implicit octal, unless there is a non-octal digit.
		        // (Annex B.1.1 on Numeric Literals)
		        for (var i = this.index + 1; i < this.length; ++i) {
		            var ch = this.source[i];
		            if (ch === '8' || ch === '9') {
		                return false;
		            }
		            if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                return true;
		            }
		        }
		        return true;
		    };
		    ;
		    Scanner.prototype.scanNumericLiteral = function () {
		        var start = this.index;
		        var ch = this.source[start];
		        assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
		        var number = '';
		        if (ch !== '.') {
		            number = this.source[this.index++];
		            ch = this.source[this.index];
		            // Hex number starts with '0x'.
		            // Octal number starts with '0'.
		            // Octal number in ES6 starts with '0o'.
		            // Binary number in ES6 starts with '0b'.
		            if (number === '0') {
		                if (ch === 'x' || ch === 'X') {
		                    ++this.index;
		                    return this.scanHexLiteral(start);
		                }
		                if (ch === 'b' || ch === 'B') {
		                    ++this.index;
		                    return this.scanBinaryLiteral(start);
		                }
		                if (ch === 'o' || ch === 'O') {
		                    return this.scanOctalLiteral(ch, start);
		                }
		                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                    if (this.isImplicitOctalLiteral()) {
		                        return this.scanOctalLiteral(ch, start);
		                    }
		                }
		            }
		            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                number += this.source[this.index++];
		            }
		            ch = this.source[this.index];
		        }
		        if (ch === '.') {
		            number += this.source[this.index++];
		            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                number += this.source[this.index++];
		            }
		            ch = this.source[this.index];
		        }
		        if (ch === 'e' || ch === 'E') {
		            number += this.source[this.index++];
		            ch = this.source[this.index];
		            if (ch === '+' || ch === '-') {
		                number += this.source[this.index++];
		            }
		            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                    number += this.source[this.index++];
		                }
		            }
		            else {
		                this.throwUnexpectedToken();
		            }
		        }
		        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: token_1.Token.NumericLiteral,
		            value: parseFloat(number),
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    ;
		    // ECMA-262 11.8.4 String Literals
		    Scanner.prototype.scanStringLiteral = function () {
		        var start = this.index;
		        var quote = this.source[start];
		        assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
		        ++this.index;
		        var octal = false;
		        var str = '';
		        while (!this.eof()) {
		            var ch = this.source[this.index++];
		            if (ch === quote) {
		                quote = '';
		                break;
		            }
		            else if (ch === '\\') {
		                ch = this.source[this.index++];
		                if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                    switch (ch) {
		                        case 'u':
		                        case 'x':
		                            if (this.source[this.index] === '{') {
		                                ++this.index;
		                                str += this.scanUnicodeCodePointEscape();
		                            }
		                            else {
		                                var unescaped = this.scanHexEscape(ch);
		                                if (!unescaped) {
		                                    this.throwUnexpectedToken();
		                                }
		                                str += unescaped;
		                            }
		                            break;
		                        case 'n':
		                            str += '\n';
		                            break;
		                        case 'r':
		                            str += '\r';
		                            break;
		                        case 't':
		                            str += '\t';
		                            break;
		                        case 'b':
		                            str += '\b';
		                            break;
		                        case 'f':
		                            str += '\f';
		                            break;
		                        case 'v':
		                            str += '\x0B';
		                            break;
		                        case '8':
		                        case '9':
		                            str += ch;
		                            this.tolerateUnexpectedToken();
		                            break;
		                        default:
		                            if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                                var octToDec = this.octalToDecimal(ch);
		                                octal = octToDec.octal || octal;
		                                str += String.fromCharCode(octToDec.code);
		                            }
		                            else {
		                                str += ch;
		                            }
		                            break;
		                    }
		                }
		                else {
		                    ++this.lineNumber;
		                    if (ch === '\r' && this.source[this.index] === '\n') {
		                        ++this.index;
		                    }
		                    this.lineStart = this.index;
		                }
		            }
		            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                break;
		            }
		            else {
		                str += ch;
		            }
		        }
		        if (quote !== '') {
		            this.index = start;
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: token_1.Token.StringLiteral,
		            value: str,
		            octal: octal,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    ;
		    // ECMA-262 11.8.6 Template Literal Lexical Components
		    Scanner.prototype.scanTemplate = function () {
		        var cooked = '';
		        var terminated = false;
		        var start = this.index;
		        var head = (this.source[start] === '`');
		        var tail = false;
		        var rawOffset = 2;
		        ++this.index;
		        while (!this.eof()) {
		            var ch = this.source[this.index++];
		            if (ch === '`') {
		                rawOffset = 1;
		                tail = true;
		                terminated = true;
		                break;
		            }
		            else if (ch === '$') {
		                if (this.source[this.index] === '{') {
		                    this.curlyStack.push('${');
		                    ++this.index;
		                    terminated = true;
		                    break;
		                }
		                cooked += ch;
		            }
		            else if (ch === '\\') {
		                ch = this.source[this.index++];
		                if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                    switch (ch) {
		                        case 'n':
		                            cooked += '\n';
		                            break;
		                        case 'r':
		                            cooked += '\r';
		                            break;
		                        case 't':
		                            cooked += '\t';
		                            break;
		                        case 'u':
		                        case 'x':
		                            if (this.source[this.index] === '{') {
		                                ++this.index;
		                                cooked += this.scanUnicodeCodePointEscape();
		                            }
		                            else {
		                                var restore = this.index;
		                                var unescaped = this.scanHexEscape(ch);
		                                if (unescaped) {
		                                    cooked += unescaped;
		                                }
		                                else {
		                                    this.index = restore;
		                                    cooked += ch;
		                                }
		                            }
		                            break;
		                        case 'b':
		                            cooked += '\b';
		                            break;
		                        case 'f':
		                            cooked += '\f';
		                            break;
		                        case 'v':
		                            cooked += '\v';
		                            break;
		                        default:
		                            if (ch === '0') {
		                                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                                    // Illegal: \01 \02 and so on
		                                    this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
		                                }
		                                cooked += '\0';
		                            }
		                            else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                                // Illegal: \1 \2
		                                this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
		                            }
		                            else {
		                                cooked += ch;
		                            }
		                            break;
		                    }
		                }
		                else {
		                    ++this.lineNumber;
		                    if (ch === '\r' && this.source[this.index] === '\n') {
		                        ++this.index;
		                    }
		                    this.lineStart = this.index;
		                }
		            }
		            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                ++this.lineNumber;
		                if (ch === '\r' && this.source[this.index] === '\n') {
		                    ++this.index;
		                }
		                this.lineStart = this.index;
		                cooked += '\n';
		            }
		            else {
		                cooked += ch;
		            }
		        }
		        if (!terminated) {
		            this.throwUnexpectedToken();
		        }
		        if (!head) {
		            this.curlyStack.pop();
		        }
		        return {
		            type: token_1.Token.Template,
		            value: {
		                cooked: cooked,
		                raw: this.source.slice(start + 1, this.index - rawOffset)
		            },
		            head: head,
		            tail: tail,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    ;
		    // ECMA-262 11.8.5 Regular Expression Literals
		    Scanner.prototype.testRegExp = function (pattern, flags) {
		        // The BMP character to use as a replacement for astral symbols when
		        // translating an ES6 "u"-flagged pattern to an ES5-compatible
		        // approximation.
		        // Note: replacing with '\uFFFF' enables false positives in unlikely
		        // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
		        // pattern that would not be detected by this substitution.
		        var astralSubstitute = '\uFFFF';
		        var tmp = pattern;
		        var self = this;
		        if (flags.indexOf('u') >= 0) {
		            tmp = tmp
		                .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
		                var codePoint = parseInt($1 || $2, 16);
		                if (codePoint > 0x10FFFF) {
		                    self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
		                }
		                if (codePoint <= 0xFFFF) {
		                    return String.fromCharCode(codePoint);
		                }
		                return astralSubstitute;
		            })
		                .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
		        }
		        // First, detect invalid regular expressions.
		        try {
		            RegExp(tmp);
		        }
		        catch (e) {
		            this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
		        }
		        // Return a regular expression object for this pattern-flag pair, or
		        // `null` in case the current environment doesn't support the flags it
		        // uses.
		        try {
		            return new RegExp(pattern, flags);
		        }
		        catch (exception) {
		            /* istanbul ignore next */
		            return null;
		        }
		    };
		    ;
		    Scanner.prototype.scanRegExpBody = function () {
		        var ch = this.source[this.index];
		        assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
		        var str = this.source[this.index++];
		        var classMarker = false;
		        var terminated = false;
		        while (!this.eof()) {
		            ch = this.source[this.index++];
		            str += ch;
		            if (ch === '\\') {
		                ch = this.source[this.index++];
		                // ECMA-262 7.8.5
		                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                    this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
		                }
		                str += ch;
		            }
		            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
		            }
		            else if (classMarker) {
		                if (ch === ']') {
		                    classMarker = false;
		                }
		            }
		            else {
		                if (ch === '/') {
		                    terminated = true;
		                    break;
		                }
		                else if (ch === '[') {
		                    classMarker = true;
		                }
		            }
		        }
		        if (!terminated) {
		            this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
		        }
		        // Exclude leading and trailing slash.
		        var body = str.substr(1, str.length - 2);
		        return {
		            value: body,
		            literal: str
		        };
		    };
		    ;
		    Scanner.prototype.scanRegExpFlags = function () {
		        var str = '';
		        var flags = '';
		        while (!this.eof()) {
		            var ch = this.source[this.index];
		            if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
		                break;
		            }
		            ++this.index;
		            if (ch === '\\' && !this.eof()) {
		                ch = this.source[this.index];
		                if (ch === 'u') {
		                    ++this.index;
		                    var restore = this.index;
		                    ch = this.scanHexEscape('u');
		                    if (ch) {
		                        flags += ch;
		                        for (str += '\\u'; restore < this.index; ++restore) {
		                            str += this.source[restore];
		                        }
		                    }
		                    else {
		                        this.index = restore;
		                        flags += 'u';
		                        str += '\\u';
		                    }
		                    this.tolerateUnexpectedToken();
		                }
		                else {
		                    str += '\\';
		                    this.tolerateUnexpectedToken();
		                }
		            }
		            else {
		                flags += ch;
		                str += ch;
		            }
		        }
		        return {
		            value: flags,
		            literal: str
		        };
		    };
		    ;
		    Scanner.prototype.scanRegExp = function () {
		        var start = this.index;
		        var body = this.scanRegExpBody();
		        var flags = this.scanRegExpFlags();
		        var value = this.testRegExp(body.value, flags.value);
		        return {
		            type: token_1.Token.RegularExpression,
		            value: value,
		            literal: body.literal + flags.literal,
		            regex: {
		                pattern: body.value,
		                flags: flags.value
		            },
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    ;
		    Scanner.prototype.lex = function () {
		        if (this.eof()) {
		            return {
		                type: token_1.Token.EOF,
		                lineNumber: this.lineNumber,
		                lineStart: this.lineStart,
		                start: this.index,
		                end: this.index
		            };
		        }
		        var cp = this.source.charCodeAt(this.index);
		        if (character_1.Character.isIdentifierStart(cp)) {
		            return this.scanIdentifier();
		        }
		        // Very common: ( and ) and ;
		        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
		            return this.scanPunctuator();
		        }
		        // String literal starts with single quote (U+0027) or double quote (U+0022).
		        if (cp === 0x27 || cp === 0x22) {
		            return this.scanStringLiteral();
		        }
		        // Dot (.) U+002E can also start a floating-point number, hence the need
		        // to check the next character.
		        if (cp === 0x2E) {
		            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
		                return this.scanNumericLiteral();
		            }
		            return this.scanPunctuator();
		        }
		        if (character_1.Character.isDecimalDigit(cp)) {
		            return this.scanNumericLiteral();
		        }
		        // Template literals start with ` (U+0060) for template head
		        // or } (U+007D) for template middle or template tail.
		        if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
		            return this.scanTemplate();
		        }
		        // Possible identifier start in a surrogate pair.
		        if (cp >= 0xD800 && cp < 0xDFFF) {
		            if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
		                return this.scanIdentifier();
		            }
		        }
		        return this.scanPunctuator();
		    };
		    ;
		    return Scanner;
		}());
		exports.Scanner = Scanner;


	/***/ },
	/* 9 */
	/***/ function(module, exports) {

		"use strict";
		// See also tools/generate-unicode-regex.js.
		var Regex = {
		    // Unicode v8.0.0 NonAsciiIdentifierStart:
		    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
		    // Unicode v8.0.0 NonAsciiIdentifierPart:
		    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
		};
		exports.Character = {
		    fromCodePoint: function (cp) {
		        return (cp < 0x10000) ? String.fromCharCode(cp) :
		            String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
		                String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
		    },
		    // ECMA-262 11.2 White Space
		    isWhiteSpace: function (cp) {
		        return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
		            (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
		    },
		    // ECMA-262 11.3 Line Terminators
		    isLineTerminator: function (cp) {
		        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
		    },
		    // ECMA-262 11.6 Identifier Names and Identifiers
		    isIdentifierStart: function (cp) {
		        return (cp === 0x24) || (cp === 0x5F) ||
		            (cp >= 0x41 && cp <= 0x5A) ||
		            (cp >= 0x61 && cp <= 0x7A) ||
		            (cp === 0x5C) ||
		            ((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(exports.Character.fromCodePoint(cp)));
		    },
		    isIdentifierPart: function (cp) {
		        return (cp === 0x24) || (cp === 0x5F) ||
		            (cp >= 0x41 && cp <= 0x5A) ||
		            (cp >= 0x61 && cp <= 0x7A) ||
		            (cp >= 0x30 && cp <= 0x39) ||
		            (cp === 0x5C) ||
		            ((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(exports.Character.fromCodePoint(cp)));
		    },
		    // ECMA-262 11.8.3 Numeric Literals
		    isDecimalDigit: function (cp) {
		        return (cp >= 0x30 && cp <= 0x39); // 0..9
		    },
		    isHexDigit: function (cp) {
		        return (cp >= 0x30 && cp <= 0x39) ||
		            (cp >= 0x41 && cp <= 0x46) ||
		            (cp >= 0x61 && cp <= 0x66); // a..f
		    },
		    isOctalDigit: function (cp) {
		        return (cp >= 0x30 && cp <= 0x37); // 0..7
		    }
		};


	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		var syntax_1 = __webpack_require__(2);
		var ArrayExpression = (function () {
		    function ArrayExpression(elements) {
		        this.type = syntax_1.Syntax.ArrayExpression;
		        this.elements = elements;
		    }
		    return ArrayExpression;
		}());
		exports.ArrayExpression = ArrayExpression;
		var ArrayPattern = (function () {
		    function ArrayPattern(elements) {
		        this.type = syntax_1.Syntax.ArrayPattern;
		        this.elements = elements;
		    }
		    return ArrayPattern;
		}());
		exports.ArrayPattern = ArrayPattern;
		var ArrowFunctionExpression = (function () {
		    function ArrowFunctionExpression(params, body, expression) {
		        this.type = syntax_1.Syntax.ArrowFunctionExpression;
		        this.id = null;
		        this.params = params;
		        this.body = body;
		        this.generator = false;
		        this.expression = expression;
		    }
		    return ArrowFunctionExpression;
		}());
		exports.ArrowFunctionExpression = ArrowFunctionExpression;
		var AssignmentExpression = (function () {
		    function AssignmentExpression(operator, left, right) {
		        this.type = syntax_1.Syntax.AssignmentExpression;
		        this.operator = operator;
		        this.left = left;
		        this.right = right;
		    }
		    return AssignmentExpression;
		}());
		exports.AssignmentExpression = AssignmentExpression;
		var AssignmentPattern = (function () {
		    function AssignmentPattern(left, right) {
		        this.type = syntax_1.Syntax.AssignmentPattern;
		        this.left = left;
		        this.right = right;
		    }
		    return AssignmentPattern;
		}());
		exports.AssignmentPattern = AssignmentPattern;
		var BinaryExpression = (function () {
		    function BinaryExpression(operator, left, right) {
		        var logical = (operator === '||' || operator === '&&');
		        this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
		        this.operator = operator;
		        this.left = left;
		        this.right = right;
		    }
		    return BinaryExpression;
		}());
		exports.BinaryExpression = BinaryExpression;
		var BlockStatement = (function () {
		    function BlockStatement(body) {
		        this.type = syntax_1.Syntax.BlockStatement;
		        this.body = body;
		    }
		    return BlockStatement;
		}());
		exports.BlockStatement = BlockStatement;
		var BreakStatement = (function () {
		    function BreakStatement(label) {
		        this.type = syntax_1.Syntax.BreakStatement;
		        this.label = label;
		    }
		    return BreakStatement;
		}());
		exports.BreakStatement = BreakStatement;
		var CallExpression = (function () {
		    function CallExpression(callee, args) {
		        this.type = syntax_1.Syntax.CallExpression;
		        this.callee = callee;
		        this.arguments = args;
		    }
		    return CallExpression;
		}());
		exports.CallExpression = CallExpression;
		var CatchClause = (function () {
		    function CatchClause(param, body) {
		        this.type = syntax_1.Syntax.CatchClause;
		        this.param = param;
		        this.body = body;
		    }
		    return CatchClause;
		}());
		exports.CatchClause = CatchClause;
		var ClassBody = (function () {
		    function ClassBody(body) {
		        this.type = syntax_1.Syntax.ClassBody;
		        this.body = body;
		    }
		    return ClassBody;
		}());
		exports.ClassBody = ClassBody;
		var ClassDeclaration = (function () {
		    function ClassDeclaration(id, superClass, body) {
		        this.type = syntax_1.Syntax.ClassDeclaration;
		        this.id = id;
		        this.superClass = superClass;
		        this.body = body;
		    }
		    return ClassDeclaration;
		}());
		exports.ClassDeclaration = ClassDeclaration;
		var ClassExpression = (function () {
		    function ClassExpression(id, superClass, body) {
		        this.type = syntax_1.Syntax.ClassExpression;
		        this.id = id;
		        this.superClass = superClass;
		        this.body = body;
		    }
		    return ClassExpression;
		}());
		exports.ClassExpression = ClassExpression;
		var ComputedMemberExpression = (function () {
		    function ComputedMemberExpression(object, property) {
		        this.type = syntax_1.Syntax.MemberExpression;
		        this.computed = true;
		        this.object = object;
		        this.property = property;
		    }
		    return ComputedMemberExpression;
		}());
		exports.ComputedMemberExpression = ComputedMemberExpression;
		var ConditionalExpression = (function () {
		    function ConditionalExpression(test, consequent, alternate) {
		        this.type = syntax_1.Syntax.ConditionalExpression;
		        this.test = test;
		        this.consequent = consequent;
		        this.alternate = alternate;
		    }
		    return ConditionalExpression;
		}());
		exports.ConditionalExpression = ConditionalExpression;
		var ContinueStatement = (function () {
		    function ContinueStatement(label) {
		        this.type = syntax_1.Syntax.ContinueStatement;
		        this.label = label;
		    }
		    return ContinueStatement;
		}());
		exports.ContinueStatement = ContinueStatement;
		var DebuggerStatement = (function () {
		    function DebuggerStatement() {
		        this.type = syntax_1.Syntax.DebuggerStatement;
		    }
		    return DebuggerStatement;
		}());
		exports.DebuggerStatement = DebuggerStatement;
		var Directive = (function () {
		    function Directive(expression, directive) {
		        this.type = syntax_1.Syntax.ExpressionStatement;
		        this.expression = expression;
		        this.directive = directive;
		    }
		    return Directive;
		}());
		exports.Directive = Directive;
		var DoWhileStatement = (function () {
		    function DoWhileStatement(body, test) {
		        this.type = syntax_1.Syntax.DoWhileStatement;
		        this.body = body;
		        this.test = test;
		    }
		    return DoWhileStatement;
		}());
		exports.DoWhileStatement = DoWhileStatement;
		var EmptyStatement = (function () {
		    function EmptyStatement() {
		        this.type = syntax_1.Syntax.EmptyStatement;
		    }
		    return EmptyStatement;
		}());
		exports.EmptyStatement = EmptyStatement;
		var ExportAllDeclaration = (function () {
		    function ExportAllDeclaration(source) {
		        this.type = syntax_1.Syntax.ExportAllDeclaration;
		        this.source = source;
		    }
		    return ExportAllDeclaration;
		}());
		exports.ExportAllDeclaration = ExportAllDeclaration;
		var ExportDefaultDeclaration = (function () {
		    function ExportDefaultDeclaration(declaration) {
		        this.type = syntax_1.Syntax.ExportDefaultDeclaration;
		        this.declaration = declaration;
		    }
		    return ExportDefaultDeclaration;
		}());
		exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
		var ExportNamedDeclaration = (function () {
		    function ExportNamedDeclaration(declaration, specifiers, source) {
		        this.type = syntax_1.Syntax.ExportNamedDeclaration;
		        this.declaration = declaration;
		        this.specifiers = specifiers;
		        this.source = source;
		    }
		    return ExportNamedDeclaration;
		}());
		exports.ExportNamedDeclaration = ExportNamedDeclaration;
		var ExportSpecifier = (function () {
		    function ExportSpecifier(local, exported) {
		        this.type = syntax_1.Syntax.ExportSpecifier;
		        this.exported = exported;
		        this.local = local;
		    }
		    return ExportSpecifier;
		}());
		exports.ExportSpecifier = ExportSpecifier;
		var ExpressionStatement = (function () {
		    function ExpressionStatement(expression) {
		        this.type = syntax_1.Syntax.ExpressionStatement;
		        this.expression = expression;
		    }
		    return ExpressionStatement;
		}());
		exports.ExpressionStatement = ExpressionStatement;
		var ForInStatement = (function () {
		    function ForInStatement(left, right, body) {
		        this.type = syntax_1.Syntax.ForInStatement;
		        this.left = left;
		        this.right = right;
		        this.body = body;
		        this.each = false;
		    }
		    return ForInStatement;
		}());
		exports.ForInStatement = ForInStatement;
		var ForOfStatement = (function () {
		    function ForOfStatement(left, right, body) {
		        this.type = syntax_1.Syntax.ForOfStatement;
		        this.left = left;
		        this.right = right;
		        this.body = body;
		    }
		    return ForOfStatement;
		}());
		exports.ForOfStatement = ForOfStatement;
		var ForStatement = (function () {
		    function ForStatement(init, test, update, body) {
		        this.type = syntax_1.Syntax.ForStatement;
		        this.init = init;
		        this.test = test;
		        this.update = update;
		        this.body = body;
		    }
		    return ForStatement;
		}());
		exports.ForStatement = ForStatement;
		var FunctionDeclaration = (function () {
		    function FunctionDeclaration(id, params, body, generator) {
		        this.type = syntax_1.Syntax.FunctionDeclaration;
		        this.id = id;
		        this.params = params;
		        this.body = body;
		        this.generator = generator;
		        this.expression = false;
		    }
		    return FunctionDeclaration;
		}());
		exports.FunctionDeclaration = FunctionDeclaration;
		var FunctionExpression = (function () {
		    function FunctionExpression(id, params, body, generator) {
		        this.type = syntax_1.Syntax.FunctionExpression;
		        this.id = id;
		        this.params = params;
		        this.body = body;
		        this.generator = generator;
		        this.expression = false;
		    }
		    return FunctionExpression;
		}());
		exports.FunctionExpression = FunctionExpression;
		var Identifier = (function () {
		    function Identifier(name) {
		        this.type = syntax_1.Syntax.Identifier;
		        this.name = name;
		    }
		    return Identifier;
		}());
		exports.Identifier = Identifier;
		var IfStatement = (function () {
		    function IfStatement(test, consequent, alternate) {
		        this.type = syntax_1.Syntax.IfStatement;
		        this.test = test;
		        this.consequent = consequent;
		        this.alternate = alternate;
		    }
		    return IfStatement;
		}());
		exports.IfStatement = IfStatement;
		var ImportDeclaration = (function () {
		    function ImportDeclaration(specifiers, source) {
		        this.type = syntax_1.Syntax.ImportDeclaration;
		        this.specifiers = specifiers;
		        this.source = source;
		    }
		    return ImportDeclaration;
		}());
		exports.ImportDeclaration = ImportDeclaration;
		var ImportDefaultSpecifier = (function () {
		    function ImportDefaultSpecifier(local) {
		        this.type = syntax_1.Syntax.ImportDefaultSpecifier;
		        this.local = local;
		    }
		    return ImportDefaultSpecifier;
		}());
		exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
		var ImportNamespaceSpecifier = (function () {
		    function ImportNamespaceSpecifier(local) {
		        this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
		        this.local = local;
		    }
		    return ImportNamespaceSpecifier;
		}());
		exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
		var ImportSpecifier = (function () {
		    function ImportSpecifier(local, imported) {
		        this.type = syntax_1.Syntax.ImportSpecifier;
		        this.local = local;
		        this.imported = imported;
		    }
		    return ImportSpecifier;
		}());
		exports.ImportSpecifier = ImportSpecifier;
		var LabeledStatement = (function () {
		    function LabeledStatement(label, body) {
		        this.type = syntax_1.Syntax.LabeledStatement;
		        this.label = label;
		        this.body = body;
		    }
		    return LabeledStatement;
		}());
		exports.LabeledStatement = LabeledStatement;
		var Literal = (function () {
		    function Literal(value, raw) {
		        this.type = syntax_1.Syntax.Literal;
		        this.value = value;
		        this.raw = raw;
		    }
		    return Literal;
		}());
		exports.Literal = Literal;
		var MetaProperty = (function () {
		    function MetaProperty(meta, property) {
		        this.type = syntax_1.Syntax.MetaProperty;
		        this.meta = meta;
		        this.property = property;
		    }
		    return MetaProperty;
		}());
		exports.MetaProperty = MetaProperty;
		var MethodDefinition = (function () {
		    function MethodDefinition(key, computed, value, kind, isStatic) {
		        this.type = syntax_1.Syntax.MethodDefinition;
		        this.key = key;
		        this.computed = computed;
		        this.value = value;
		        this.kind = kind;
		        this.static = isStatic;
		    }
		    return MethodDefinition;
		}());
		exports.MethodDefinition = MethodDefinition;
		var NewExpression = (function () {
		    function NewExpression(callee, args) {
		        this.type = syntax_1.Syntax.NewExpression;
		        this.callee = callee;
		        this.arguments = args;
		    }
		    return NewExpression;
		}());
		exports.NewExpression = NewExpression;
		var ObjectExpression = (function () {
		    function ObjectExpression(properties) {
		        this.type = syntax_1.Syntax.ObjectExpression;
		        this.properties = properties;
		    }
		    return ObjectExpression;
		}());
		exports.ObjectExpression = ObjectExpression;
		var ObjectPattern = (function () {
		    function ObjectPattern(properties) {
		        this.type = syntax_1.Syntax.ObjectPattern;
		        this.properties = properties;
		    }
		    return ObjectPattern;
		}());
		exports.ObjectPattern = ObjectPattern;
		var Program = (function () {
		    function Program(body, sourceType) {
		        this.type = syntax_1.Syntax.Program;
		        this.body = body;
		        this.sourceType = sourceType;
		    }
		    return Program;
		}());
		exports.Program = Program;
		var Property = (function () {
		    function Property(kind, key, computed, value, method, shorthand) {
		        this.type = syntax_1.Syntax.Property;
		        this.key = key;
		        this.computed = computed;
		        this.value = value;
		        this.kind = kind;
		        this.method = method;
		        this.shorthand = shorthand;
		    }
		    return Property;
		}());
		exports.Property = Property;
		var RegexLiteral = (function () {
		    function RegexLiteral(value, raw, regex) {
		        this.type = syntax_1.Syntax.Literal;
		        this.value = value;
		        this.raw = raw;
		        this.regex = regex;
		    }
		    return RegexLiteral;
		}());
		exports.RegexLiteral = RegexLiteral;
		var RestElement = (function () {
		    function RestElement(argument) {
		        this.type = syntax_1.Syntax.RestElement;
		        this.argument = argument;
		    }
		    return RestElement;
		}());
		exports.RestElement = RestElement;
		var ReturnStatement = (function () {
		    function ReturnStatement(argument) {
		        this.type = syntax_1.Syntax.ReturnStatement;
		        this.argument = argument;
		    }
		    return ReturnStatement;
		}());
		exports.ReturnStatement = ReturnStatement;
		var SequenceExpression = (function () {
		    function SequenceExpression(expressions) {
		        this.type = syntax_1.Syntax.SequenceExpression;
		        this.expressions = expressions;
		    }
		    return SequenceExpression;
		}());
		exports.SequenceExpression = SequenceExpression;
		var SpreadElement = (function () {
		    function SpreadElement(argument) {
		        this.type = syntax_1.Syntax.SpreadElement;
		        this.argument = argument;
		    }
		    return SpreadElement;
		}());
		exports.SpreadElement = SpreadElement;
		var StaticMemberExpression = (function () {
		    function StaticMemberExpression(object, property) {
		        this.type = syntax_1.Syntax.MemberExpression;
		        this.computed = false;
		        this.object = object;
		        this.property = property;
		    }
		    return StaticMemberExpression;
		}());
		exports.StaticMemberExpression = StaticMemberExpression;
		var Super = (function () {
		    function Super() {
		        this.type = syntax_1.Syntax.Super;
		    }
		    return Super;
		}());
		exports.Super = Super;
		var SwitchCase = (function () {
		    function SwitchCase(test, consequent) {
		        this.type = syntax_1.Syntax.SwitchCase;
		        this.test = test;
		        this.consequent = consequent;
		    }
		    return SwitchCase;
		}());
		exports.SwitchCase = SwitchCase;
		var SwitchStatement = (function () {
		    function SwitchStatement(discriminant, cases) {
		        this.type = syntax_1.Syntax.SwitchStatement;
		        this.discriminant = discriminant;
		        this.cases = cases;
		    }
		    return SwitchStatement;
		}());
		exports.SwitchStatement = SwitchStatement;
		var TaggedTemplateExpression = (function () {
		    function TaggedTemplateExpression(tag, quasi) {
		        this.type = syntax_1.Syntax.TaggedTemplateExpression;
		        this.tag = tag;
		        this.quasi = quasi;
		    }
		    return TaggedTemplateExpression;
		}());
		exports.TaggedTemplateExpression = TaggedTemplateExpression;
		var TemplateElement = (function () {
		    function TemplateElement(value, tail) {
		        this.type = syntax_1.Syntax.TemplateElement;
		        this.value = value;
		        this.tail = tail;
		    }
		    return TemplateElement;
		}());
		exports.TemplateElement = TemplateElement;
		var TemplateLiteral = (function () {
		    function TemplateLiteral(quasis, expressions) {
		        this.type = syntax_1.Syntax.TemplateLiteral;
		        this.quasis = quasis;
		        this.expressions = expressions;
		    }
		    return TemplateLiteral;
		}());
		exports.TemplateLiteral = TemplateLiteral;
		var ThisExpression = (function () {
		    function ThisExpression() {
		        this.type = syntax_1.Syntax.ThisExpression;
		    }
		    return ThisExpression;
		}());
		exports.ThisExpression = ThisExpression;
		var ThrowStatement = (function () {
		    function ThrowStatement(argument) {
		        this.type = syntax_1.Syntax.ThrowStatement;
		        this.argument = argument;
		    }
		    return ThrowStatement;
		}());
		exports.ThrowStatement = ThrowStatement;
		var TryStatement = (function () {
		    function TryStatement(block, handler, finalizer) {
		        this.type = syntax_1.Syntax.TryStatement;
		        this.block = block;
		        this.handler = handler;
		        this.finalizer = finalizer;
		    }
		    return TryStatement;
		}());
		exports.TryStatement = TryStatement;
		var UnaryExpression = (function () {
		    function UnaryExpression(operator, argument) {
		        this.type = syntax_1.Syntax.UnaryExpression;
		        this.operator = operator;
		        this.argument = argument;
		        this.prefix = true;
		    }
		    return UnaryExpression;
		}());
		exports.UnaryExpression = UnaryExpression;
		var UpdateExpression = (function () {
		    function UpdateExpression(operator, argument, prefix) {
		        this.type = syntax_1.Syntax.UpdateExpression;
		        this.operator = operator;
		        this.argument = argument;
		        this.prefix = prefix;
		    }
		    return UpdateExpression;
		}());
		exports.UpdateExpression = UpdateExpression;
		var VariableDeclaration = (function () {
		    function VariableDeclaration(declarations, kind) {
		        this.type = syntax_1.Syntax.VariableDeclaration;
		        this.declarations = declarations;
		        this.kind = kind;
		    }
		    return VariableDeclaration;
		}());
		exports.VariableDeclaration = VariableDeclaration;
		var VariableDeclarator = (function () {
		    function VariableDeclarator(id, init) {
		        this.type = syntax_1.Syntax.VariableDeclarator;
		        this.id = id;
		        this.init = init;
		    }
		    return VariableDeclarator;
		}());
		exports.VariableDeclarator = VariableDeclarator;
		var WhileStatement = (function () {
		    function WhileStatement(test, body) {
		        this.type = syntax_1.Syntax.WhileStatement;
		        this.test = test;
		        this.body = body;
		    }
		    return WhileStatement;
		}());
		exports.WhileStatement = WhileStatement;
		var WithStatement = (function () {
		    function WithStatement(object, body) {
		        this.type = syntax_1.Syntax.WithStatement;
		        this.object = object;
		        this.body = body;
		    }
		    return WithStatement;
		}());
		exports.WithStatement = WithStatement;
		var YieldExpression = (function () {
		    function YieldExpression(argument, delegate) {
		        this.type = syntax_1.Syntax.YieldExpression;
		        this.argument = argument;
		        this.delegate = delegate;
		    }
		    return YieldExpression;
		}());
		exports.YieldExpression = YieldExpression;


	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
	/* istanbul ignore next */
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var character_1 = __webpack_require__(9);
		var token_1 = __webpack_require__(7);
		var parser_1 = __webpack_require__(3);
		var xhtml_entities_1 = __webpack_require__(12);
		var jsx_syntax_1 = __webpack_require__(13);
		var Node = __webpack_require__(10);
		var JSXNode = __webpack_require__(14);
		var JSXToken;
		(function (JSXToken) {
		    JSXToken[JSXToken["Identifier"] = 100] = "Identifier";
		    JSXToken[JSXToken["Text"] = 101] = "Text";
		})(JSXToken || (JSXToken = {}));
		token_1.TokenName[JSXToken.Identifier] = 'JSXIdentifier';
		token_1.TokenName[JSXToken.Text] = 'JSXText';
		// Fully qualified element name, e.g. <svg:path> returns "svg:path"
		function getQualifiedElementName(elementName) {
		    var qualifiedName;
		    switch (elementName.type) {
		        case jsx_syntax_1.JSXSyntax.JSXIdentifier:
		            var id = (elementName);
		            qualifiedName = id.name;
		            break;
		        case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
		            var ns = (elementName);
		            qualifiedName = getQualifiedElementName(ns.namespace) + ':' +
		                getQualifiedElementName(ns.name);
		            break;
		        case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
		            var expr = (elementName);
		            qualifiedName = getQualifiedElementName(expr.object) + '.' +
		                getQualifiedElementName(expr.property);
		            break;
		    }
		    return qualifiedName;
		}
		var JSXParser = (function (_super) {
		    __extends(JSXParser, _super);
		    function JSXParser(code, options, delegate) {
		        _super.call(this, code, options, delegate);
		    }
		    JSXParser.prototype.parsePrimaryExpression = function () {
		        return this.match('<') ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
		    };
		    JSXParser.prototype.startJSX = function () {
		        // Unwind the scanner before the lookahead token.
		        this.scanner.index = this.startMarker.index;
		        this.scanner.lineNumber = this.startMarker.lineNumber;
		        this.scanner.lineStart = this.startMarker.lineStart;
		    };
		    JSXParser.prototype.finishJSX = function () {
		        // Prime the next lookahead.
		        this.nextToken();
		    };
		    JSXParser.prototype.reenterJSX = function () {
		        this.startJSX();
		        this.expectJSX('}');
		        // Pop the closing '}' added from the lookahead.
		        if (this.config.tokens) {
		            this.tokens.pop();
		        }
		    };
		    JSXParser.prototype.createJSXNode = function () {
		        this.collectComments();
		        return {
		            index: this.scanner.index,
		            line: this.scanner.lineNumber,
		            column: this.scanner.index - this.scanner.lineStart
		        };
		    };
		    JSXParser.prototype.createJSXChildNode = function () {
		        return {
		            index: this.scanner.index,
		            line: this.scanner.lineNumber,
		            column: this.scanner.index - this.scanner.lineStart
		        };
		    };
		    JSXParser.prototype.scanXHTMLEntity = function (quote) {
		        var result = '&';
		        var valid = true;
		        var terminated = false;
		        var numeric = false;
		        var hex = false;
		        while (!this.scanner.eof() && valid && !terminated) {
		            var ch = this.scanner.source[this.scanner.index];
		            if (ch === quote) {
		                break;
		            }
		            terminated = (ch === ';');
		            result += ch;
		            ++this.scanner.index;
		            if (!terminated) {
		                switch (result.length) {
		                    case 2:
		                        // e.g. '&#123;'
		                        numeric = (ch === '#');
		                        break;
		                    case 3:
		                        if (numeric) {
		                            // e.g. '&#x41;'
		                            hex = (ch === 'x');
		                            valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
		                            numeric = numeric && !hex;
		                        }
		                        break;
		                    default:
		                        valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
		                        valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
		                        break;
		                }
		            }
		        }
		        if (valid && terminated && result.length > 2) {
		            // e.g. '&#x41;' becomes just '#x41'
		            var str = result.substr(1, result.length - 2);
		            if (numeric && str.length > 1) {
		                result = String.fromCharCode(parseInt(str.substr(1), 10));
		            }
		            else if (hex && str.length > 2) {
		                result = String.fromCharCode(parseInt('0' + str.substr(1), 16));
		            }
		            else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
		                result = xhtml_entities_1.XHTMLEntities[str];
		            }
		        }
		        return result;
		    };
		    // Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
		    JSXParser.prototype.lexJSX = function () {
		        var cp = this.scanner.source.charCodeAt(this.scanner.index);
		        // < > / : = { }
		        if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
		            var value = this.scanner.source[this.scanner.index++];
		            return {
		                type: token_1.Token.Punctuator,
		                value: value,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: this.scanner.index - 1,
		                end: this.scanner.index
		            };
		        }
		        // " '
		        if (cp === 34 || cp === 39) {
		            var start = this.scanner.index;
		            var quote = this.scanner.source[this.scanner.index++];
		            var str = '';
		            while (!this.scanner.eof()) {
		                var ch = this.scanner.source[this.scanner.index++];
		                if (ch === quote) {
		                    break;
		                }
		                else if (ch === '&') {
		                    str += this.scanXHTMLEntity(quote);
		                }
		                else {
		                    str += ch;
		                }
		            }
		            return {
		                type: token_1.Token.StringLiteral,
		                value: str,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: start,
		                end: this.scanner.index
		            };
		        }
		        // ... or .
		        if (cp === 46) {
		            var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
		            var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
		            var value = (n1 === 46 && n2 === 46) ? '...' : '.';
		            var start = this.scanner.index;
		            this.scanner.index += value.length;
		            return {
		                type: token_1.Token.Punctuator,
		                value: value,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: start,
		                end: this.scanner.index
		            };
		        }
		        // `
		        if (cp === 96) {
		            // Only placeholder, since it will be rescanned as a real assignment expression.
		            return {
		                type: token_1.Token.Template,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: this.scanner.index,
		                end: this.scanner.index
		            };
		        }
		        // Identifer can not contain backslash (char code 92).
		        if (character_1.Character.isIdentifierStart(cp) && (cp !== 92)) {
		            var start = this.scanner.index;
		            ++this.scanner.index;
		            while (!this.scanner.eof()) {
		                var ch = this.scanner.source.charCodeAt(this.scanner.index);
		                if (character_1.Character.isIdentifierPart(ch) && (ch !== 92)) {
		                    ++this.scanner.index;
		                }
		                else if (ch === 45) {
		                    // Hyphen (char code 45) can be part of an identifier.
		                    ++this.scanner.index;
		                }
		                else {
		                    break;
		                }
		            }
		            var id = this.scanner.source.slice(start, this.scanner.index);
		            return {
		                type: JSXToken.Identifier,
		                value: id,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: start,
		                end: this.scanner.index
		            };
		        }
		        this.scanner.throwUnexpectedToken();
		    };
		    JSXParser.prototype.nextJSXToken = function () {
		        this.collectComments();
		        this.startMarker.index = this.scanner.index;
		        this.startMarker.lineNumber = this.scanner.lineNumber;
		        this.startMarker.lineStart = this.scanner.lineStart;
		        var token = this.lexJSX();
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.lineNumber = this.scanner.lineNumber;
		        this.lastMarker.lineStart = this.scanner.lineStart;
		        if (this.config.tokens) {
		            this.tokens.push(this.convertToken(token));
		        }
		        return token;
		    };
		    JSXParser.prototype.nextJSXText = function () {
		        this.startMarker.index = this.scanner.index;
		        this.startMarker.lineNumber = this.scanner.lineNumber;
		        this.startMarker.lineStart = this.scanner.lineStart;
		        var start = this.scanner.index;
		        var text = '';
		        while (!this.scanner.eof()) {
		            var ch = this.scanner.source[this.scanner.index];
		            if (ch === '{' || ch === '<') {
		                break;
		            }
		            ++this.scanner.index;
		            text += ch;
		            if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                ++this.scanner.lineNumber;
		                if (ch === '\r' && this.scanner.source[this.scanner.index] === '\n') {
		                    ++this.scanner.index;
		                }
		                this.scanner.lineStart = this.scanner.index;
		            }
		        }
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.lineNumber = this.scanner.lineNumber;
		        this.lastMarker.lineStart = this.scanner.lineStart;
		        var token = {
		            type: JSXToken.Text,
		            value: text,
		            lineNumber: this.scanner.lineNumber,
		            lineStart: this.scanner.lineStart,
		            start: start,
		            end: this.scanner.index
		        };
		        if ((text.length > 0) && this.config.tokens) {
		            this.tokens.push(this.convertToken(token));
		        }
		        return token;
		    };
		    JSXParser.prototype.peekJSXToken = function () {
		        var previousIndex = this.scanner.index;
		        var previousLineNumber = this.scanner.lineNumber;
		        var previousLineStart = this.scanner.lineStart;
		        this.scanner.scanComments();
		        var next = this.lexJSX();
		        this.scanner.index = previousIndex;
		        this.scanner.lineNumber = previousLineNumber;
		        this.scanner.lineStart = previousLineStart;
		        return next;
		    };
		    // Expect the next JSX token to match the specified punctuator.
		    // If not, an exception will be thrown.
		    JSXParser.prototype.expectJSX = function (value) {
		        var token = this.nextJSXToken();
		        if (token.type !== token_1.Token.Punctuator || token.value !== value) {
		            this.throwUnexpectedToken(token);
		        }
		    };
		    // Return true if the next JSX token matches the specified punctuator.
		    JSXParser.prototype.matchJSX = function (value) {
		        var next = this.peekJSXToken();
		        return next.type === token_1.Token.Punctuator && next.value === value;
		    };
		    JSXParser.prototype.parseJSXIdentifier = function () {
		        var node = this.createJSXNode();
		        var token = this.nextJSXToken();
		        if (token.type !== JSXToken.Identifier) {
		            this.throwUnexpectedToken(token);
		        }
		        return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
		    };
		    JSXParser.prototype.parseJSXElementName = function () {
		        var node = this.createJSXNode();
		        var elementName = this.parseJSXIdentifier();
		        if (this.matchJSX(':')) {
		            var namespace = elementName;
		            this.expectJSX(':');
		            var name_1 = this.parseJSXIdentifier();
		            elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
		        }
		        else if (this.matchJSX('.')) {
		            while (this.matchJSX('.')) {
		                var object = elementName;
		                this.expectJSX('.');
		                var property = this.parseJSXIdentifier();
		                elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
		            }
		        }
		        return elementName;
		    };
		    JSXParser.prototype.parseJSXAttributeName = function () {
		        var node = this.createJSXNode();
		        var attributeName;
		        var identifier = this.parseJSXIdentifier();
		        if (this.matchJSX(':')) {
		            var namespace = identifier;
		            this.expectJSX(':');
		            var name_2 = this.parseJSXIdentifier();
		            attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
		        }
		        else {
		            attributeName = identifier;
		        }
		        return attributeName;
		    };
		    JSXParser.prototype.parseJSXStringLiteralAttribute = function () {
		        var node = this.createJSXNode();
		        var token = this.nextJSXToken();
		        if (token.type !== token_1.Token.StringLiteral) {
		            this.throwUnexpectedToken(token);
		        }
		        var raw = this.getTokenRaw(token);
		        return this.finalize(node, new Node.Literal(token.value, raw));
		    };
		    JSXParser.prototype.parseJSXExpressionAttribute = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('{');
		        this.finishJSX();
		        if (this.match('}')) {
		            this.tolerateError('JSX attributes must only be assigned a non-empty expression');
		        }
		        var expression = this.parseAssignmentExpression();
		        this.reenterJSX();
		        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
		    };
		    JSXParser.prototype.parseJSXAttributeValue = function () {
		        return this.matchJSX('{') ? this.parseJSXExpressionAttribute() :
		            this.matchJSX('<') ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
		    };
		    JSXParser.prototype.parseJSXNameValueAttribute = function () {
		        var node = this.createJSXNode();
		        var name = this.parseJSXAttributeName();
		        var value = null;
		        if (this.matchJSX('=')) {
		            this.expectJSX('=');
		            value = this.parseJSXAttributeValue();
		        }
		        return this.finalize(node, new JSXNode.JSXAttribute(name, value));
		    };
		    JSXParser.prototype.parseJSXSpreadAttribute = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('{');
		        this.expectJSX('...');
		        this.finishJSX();
		        var argument = this.parseAssignmentExpression();
		        this.reenterJSX();
		        return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
		    };
		    JSXParser.prototype.parseJSXAttributes = function () {
		        var attributes = [];
		        while (!this.matchJSX('/') && !this.matchJSX('>')) {
		            var attribute = this.matchJSX('{') ? this.parseJSXSpreadAttribute() :
		                this.parseJSXNameValueAttribute();
		            attributes.push(attribute);
		        }
		        return attributes;
		    };
		    JSXParser.prototype.parseJSXOpeningElement = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('<');
		        var name = this.parseJSXElementName();
		        var attributes = this.parseJSXAttributes();
		        var selfClosing = this.matchJSX('/');
		        if (selfClosing) {
		            this.expectJSX('/');
		        }
		        this.expectJSX('>');
		        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
		    };
		    JSXParser.prototype.parseJSXBoundaryElement = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('<');
		        if (this.matchJSX('/')) {
		            this.expectJSX('/');
		            var name_3 = this.parseJSXElementName();
		            this.expectJSX('>');
		            return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
		        }
		        var name = this.parseJSXElementName();
		        var attributes = this.parseJSXAttributes();
		        var selfClosing = this.matchJSX('/');
		        if (selfClosing) {
		            this.expectJSX('/');
		        }
		        this.expectJSX('>');
		        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
		    };
		    JSXParser.prototype.parseJSXEmptyExpression = function () {
		        var node = this.createJSXChildNode();
		        this.collectComments();
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.lineNumber = this.scanner.lineNumber;
		        this.lastMarker.lineStart = this.scanner.lineStart;
		        return this.finalize(node, new JSXNode.JSXEmptyExpression());
		    };
		    JSXParser.prototype.parseJSXExpressionContainer = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('{');
		        var expression;
		        if (this.matchJSX('}')) {
		            expression = this.parseJSXEmptyExpression();
		            this.expectJSX('}');
		        }
		        else {
		            this.finishJSX();
		            expression = this.parseAssignmentExpression();
		            this.reenterJSX();
		        }
		        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
		    };
		    JSXParser.prototype.parseJSXChildren = function () {
		        var children = [];
		        while (!this.scanner.eof()) {
		            var node = this.createJSXChildNode();
		            var token = this.nextJSXText();
		            if (token.start < token.end) {
		                var raw = this.getTokenRaw(token);
		                var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
		                children.push(child);
		            }
		            if (this.scanner.source[this.scanner.index] === '{') {
		                var container = this.parseJSXExpressionContainer();
		                children.push(container);
		            }
		            else {
		                break;
		            }
		        }
		        return children;
		    };
		    JSXParser.prototype.parseComplexJSXElement = function (el) {
		        var stack = [];
		        while (!this.scanner.eof()) {
		            el.children = el.children.concat(this.parseJSXChildren());
		            var node = this.createJSXChildNode();
		            var element = this.parseJSXBoundaryElement();
		            if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
		                var opening = (element);
		                if (opening.selfClosing) {
		                    var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
		                    el.children.push(child);
		                }
		                else {
		                    stack.push(el);
		                    el = { node: node, opening: opening, closing: null, children: [] };
		                }
		            }
		            if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
		                el.closing = (element);
		                var open_1 = getQualifiedElementName(el.opening.name);
		                var close_1 = getQualifiedElementName(el.closing.name);
		                if (open_1 !== close_1) {
		                    this.tolerateError('Expected corresponding JSX closing tag for %0', open_1);
		                }
		                if (stack.length > 0) {
		                    var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
		                    el = stack.pop();
		                    el.children.push(child);
		                }
		                else {
		                    break;
		                }
		            }
		        }
		        return el;
		    };
		    JSXParser.prototype.parseJSXElement = function () {
		        var node = this.createJSXNode();
		        var opening = this.parseJSXOpeningElement();
		        var children = [];
		        var closing = null;
		        if (!opening.selfClosing) {
		            var el = this.parseComplexJSXElement({ node: node, opening: opening, closing: closing, children: children });
		            children = el.children;
		            closing = el.closing;
		        }
		        return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
		    };
		    JSXParser.prototype.parseJSXRoot = function () {
		        // Pop the opening '<' added from the lookahead.
		        if (this.config.tokens) {
		            this.tokens.pop();
		        }
		        this.startJSX();
		        var element = this.parseJSXElement();
		        this.finishJSX();
		        return element;
		    };
		    return JSXParser;
		}(parser_1.Parser));
		exports.JSXParser = JSXParser;


	/***/ },
	/* 12 */
	/***/ function(module, exports) {

		// Generated by generate-xhtml-entities.js. DO NOT MODIFY!
		"use strict";
		exports.XHTMLEntities = {
		    quot: '\u0022',
		    amp: '\u0026',
		    apos: '\u0027',
		    gt: '\u003E',
		    nbsp: '\u00A0',
		    iexcl: '\u00A1',
		    cent: '\u00A2',
		    pound: '\u00A3',
		    curren: '\u00A4',
		    yen: '\u00A5',
		    brvbar: '\u00A6',
		    sect: '\u00A7',
		    uml: '\u00A8',
		    copy: '\u00A9',
		    ordf: '\u00AA',
		    laquo: '\u00AB',
		    not: '\u00AC',
		    shy: '\u00AD',
		    reg: '\u00AE',
		    macr: '\u00AF',
		    deg: '\u00B0',
		    plusmn: '\u00B1',
		    sup2: '\u00B2',
		    sup3: '\u00B3',
		    acute: '\u00B4',
		    micro: '\u00B5',
		    para: '\u00B6',
		    middot: '\u00B7',
		    cedil: '\u00B8',
		    sup1: '\u00B9',
		    ordm: '\u00BA',
		    raquo: '\u00BB',
		    frac14: '\u00BC',
		    frac12: '\u00BD',
		    frac34: '\u00BE',
		    iquest: '\u00BF',
		    Agrave: '\u00C0',
		    Aacute: '\u00C1',
		    Acirc: '\u00C2',
		    Atilde: '\u00C3',
		    Auml: '\u00C4',
		    Aring: '\u00C5',
		    AElig: '\u00C6',
		    Ccedil: '\u00C7',
		    Egrave: '\u00C8',
		    Eacute: '\u00C9',
		    Ecirc: '\u00CA',
		    Euml: '\u00CB',
		    Igrave: '\u00CC',
		    Iacute: '\u00CD',
		    Icirc: '\u00CE',
		    Iuml: '\u00CF',
		    ETH: '\u00D0',
		    Ntilde: '\u00D1',
		    Ograve: '\u00D2',
		    Oacute: '\u00D3',
		    Ocirc: '\u00D4',
		    Otilde: '\u00D5',
		    Ouml: '\u00D6',
		    times: '\u00D7',
		    Oslash: '\u00D8',
		    Ugrave: '\u00D9',
		    Uacute: '\u00DA',
		    Ucirc: '\u00DB',
		    Uuml: '\u00DC',
		    Yacute: '\u00DD',
		    THORN: '\u00DE',
		    szlig: '\u00DF',
		    agrave: '\u00E0',
		    aacute: '\u00E1',
		    acirc: '\u00E2',
		    atilde: '\u00E3',
		    auml: '\u00E4',
		    aring: '\u00E5',
		    aelig: '\u00E6',
		    ccedil: '\u00E7',
		    egrave: '\u00E8',
		    eacute: '\u00E9',
		    ecirc: '\u00EA',
		    euml: '\u00EB',
		    igrave: '\u00EC',
		    iacute: '\u00ED',
		    icirc: '\u00EE',
		    iuml: '\u00EF',
		    eth: '\u00F0',
		    ntilde: '\u00F1',
		    ograve: '\u00F2',
		    oacute: '\u00F3',
		    ocirc: '\u00F4',
		    otilde: '\u00F5',
		    ouml: '\u00F6',
		    divide: '\u00F7',
		    oslash: '\u00F8',
		    ugrave: '\u00F9',
		    uacute: '\u00FA',
		    ucirc: '\u00FB',
		    uuml: '\u00FC',
		    yacute: '\u00FD',
		    thorn: '\u00FE',
		    yuml: '\u00FF',
		    OElig: '\u0152',
		    oelig: '\u0153',
		    Scaron: '\u0160',
		    scaron: '\u0161',
		    Yuml: '\u0178',
		    fnof: '\u0192',
		    circ: '\u02C6',
		    tilde: '\u02DC',
		    Alpha: '\u0391',
		    Beta: '\u0392',
		    Gamma: '\u0393',
		    Delta: '\u0394',
		    Epsilon: '\u0395',
		    Zeta: '\u0396',
		    Eta: '\u0397',
		    Theta: '\u0398',
		    Iota: '\u0399',
		    Kappa: '\u039A',
		    Lambda: '\u039B',
		    Mu: '\u039C',
		    Nu: '\u039D',
		    Xi: '\u039E',
		    Omicron: '\u039F',
		    Pi: '\u03A0',
		    Rho: '\u03A1',
		    Sigma: '\u03A3',
		    Tau: '\u03A4',
		    Upsilon: '\u03A5',
		    Phi: '\u03A6',
		    Chi: '\u03A7',
		    Psi: '\u03A8',
		    Omega: '\u03A9',
		    alpha: '\u03B1',
		    beta: '\u03B2',
		    gamma: '\u03B3',
		    delta: '\u03B4',
		    epsilon: '\u03B5',
		    zeta: '\u03B6',
		    eta: '\u03B7',
		    theta: '\u03B8',
		    iota: '\u03B9',
		    kappa: '\u03BA',
		    lambda: '\u03BB',
		    mu: '\u03BC',
		    nu: '\u03BD',
		    xi: '\u03BE',
		    omicron: '\u03BF',
		    pi: '\u03C0',
		    rho: '\u03C1',
		    sigmaf: '\u03C2',
		    sigma: '\u03C3',
		    tau: '\u03C4',
		    upsilon: '\u03C5',
		    phi: '\u03C6',
		    chi: '\u03C7',
		    psi: '\u03C8',
		    omega: '\u03C9',
		    thetasym: '\u03D1',
		    upsih: '\u03D2',
		    piv: '\u03D6',
		    ensp: '\u2002',
		    emsp: '\u2003',
		    thinsp: '\u2009',
		    zwnj: '\u200C',
		    zwj: '\u200D',
		    lrm: '\u200E',
		    rlm: '\u200F',
		    ndash: '\u2013',
		    mdash: '\u2014',
		    lsquo: '\u2018',
		    rsquo: '\u2019',
		    sbquo: '\u201A',
		    ldquo: '\u201C',
		    rdquo: '\u201D',
		    bdquo: '\u201E',
		    dagger: '\u2020',
		    Dagger: '\u2021',
		    bull: '\u2022',
		    hellip: '\u2026',
		    permil: '\u2030',
		    prime: '\u2032',
		    Prime: '\u2033',
		    lsaquo: '\u2039',
		    rsaquo: '\u203A',
		    oline: '\u203E',
		    frasl: '\u2044',
		    euro: '\u20AC',
		    image: '\u2111',
		    weierp: '\u2118',
		    real: '\u211C',
		    trade: '\u2122',
		    alefsym: '\u2135',
		    larr: '\u2190',
		    uarr: '\u2191',
		    rarr: '\u2192',
		    darr: '\u2193',
		    harr: '\u2194',
		    crarr: '\u21B5',
		    lArr: '\u21D0',
		    uArr: '\u21D1',
		    rArr: '\u21D2',
		    dArr: '\u21D3',
		    hArr: '\u21D4',
		    forall: '\u2200',
		    part: '\u2202',
		    exist: '\u2203',
		    empty: '\u2205',
		    nabla: '\u2207',
		    isin: '\u2208',
		    notin: '\u2209',
		    ni: '\u220B',
		    prod: '\u220F',
		    sum: '\u2211',
		    minus: '\u2212',
		    lowast: '\u2217',
		    radic: '\u221A',
		    prop: '\u221D',
		    infin: '\u221E',
		    ang: '\u2220',
		    and: '\u2227',
		    or: '\u2228',
		    cap: '\u2229',
		    cup: '\u222A',
		    int: '\u222B',
		    there4: '\u2234',
		    sim: '\u223C',
		    cong: '\u2245',
		    asymp: '\u2248',
		    ne: '\u2260',
		    equiv: '\u2261',
		    le: '\u2264',
		    ge: '\u2265',
		    sub: '\u2282',
		    sup: '\u2283',
		    nsub: '\u2284',
		    sube: '\u2286',
		    supe: '\u2287',
		    oplus: '\u2295',
		    otimes: '\u2297',
		    perp: '\u22A5',
		    sdot: '\u22C5',
		    lceil: '\u2308',
		    rceil: '\u2309',
		    lfloor: '\u230A',
		    rfloor: '\u230B',
		    loz: '\u25CA',
		    spades: '\u2660',
		    clubs: '\u2663',
		    hearts: '\u2665',
		    diams: '\u2666',
		    lang: '\u27E8',
		    rang: '\u27E9'
		};


	/***/ },
	/* 13 */
	/***/ function(module, exports) {

		"use strict";
		exports.JSXSyntax = {
		    JSXAttribute: 'JSXAttribute',
		    JSXClosingElement: 'JSXClosingElement',
		    JSXElement: 'JSXElement',
		    JSXEmptyExpression: 'JSXEmptyExpression',
		    JSXExpressionContainer: 'JSXExpressionContainer',
		    JSXIdentifier: 'JSXIdentifier',
		    JSXMemberExpression: 'JSXMemberExpression',
		    JSXNamespacedName: 'JSXNamespacedName',
		    JSXOpeningElement: 'JSXOpeningElement',
		    JSXSpreadAttribute: 'JSXSpreadAttribute',
		    JSXText: 'JSXText'
		};


	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		var jsx_syntax_1 = __webpack_require__(13);
		var JSXClosingElement = (function () {
		    function JSXClosingElement(name) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
		        this.name = name;
		    }
		    return JSXClosingElement;
		}());
		exports.JSXClosingElement = JSXClosingElement;
		var JSXElement = (function () {
		    function JSXElement(openingElement, children, closingElement) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXElement;
		        this.openingElement = openingElement;
		        this.children = children;
		        this.closingElement = closingElement;
		    }
		    return JSXElement;
		}());
		exports.JSXElement = JSXElement;
		var JSXEmptyExpression = (function () {
		    function JSXEmptyExpression() {
		        this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
		    }
		    return JSXEmptyExpression;
		}());
		exports.JSXEmptyExpression = JSXEmptyExpression;
		var JSXExpressionContainer = (function () {
		    function JSXExpressionContainer(expression) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
		        this.expression = expression;
		    }
		    return JSXExpressionContainer;
		}());
		exports.JSXExpressionContainer = JSXExpressionContainer;
		var JSXIdentifier = (function () {
		    function JSXIdentifier(name) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
		        this.name = name;
		    }
		    return JSXIdentifier;
		}());
		exports.JSXIdentifier = JSXIdentifier;
		var JSXMemberExpression = (function () {
		    function JSXMemberExpression(object, property) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
		        this.object = object;
		        this.property = property;
		    }
		    return JSXMemberExpression;
		}());
		exports.JSXMemberExpression = JSXMemberExpression;
		var JSXAttribute = (function () {
		    function JSXAttribute(name, value) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
		        this.name = name;
		        this.value = value;
		    }
		    return JSXAttribute;
		}());
		exports.JSXAttribute = JSXAttribute;
		var JSXNamespacedName = (function () {
		    function JSXNamespacedName(namespace, name) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
		        this.namespace = namespace;
		        this.name = name;
		    }
		    return JSXNamespacedName;
		}());
		exports.JSXNamespacedName = JSXNamespacedName;
		var JSXOpeningElement = (function () {
		    function JSXOpeningElement(name, selfClosing, attributes) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
		        this.name = name;
		        this.selfClosing = selfClosing;
		        this.attributes = attributes;
		    }
		    return JSXOpeningElement;
		}());
		exports.JSXOpeningElement = JSXOpeningElement;
		var JSXSpreadAttribute = (function () {
		    function JSXSpreadAttribute(argument) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
		        this.argument = argument;
		    }
		    return JSXSpreadAttribute;
		}());
		exports.JSXSpreadAttribute = JSXSpreadAttribute;
		var JSXText = (function () {
		    function JSXText(value, raw) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXText;
		        this.value = value;
		        this.raw = raw;
		    }
		    return JSXText;
		}());
		exports.JSXText = JSXText;


	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		var scanner_1 = __webpack_require__(8);
		var error_handler_1 = __webpack_require__(6);
		var token_1 = __webpack_require__(7);
		var Reader = (function () {
		    function Reader() {
		        this.values = [];
		        this.curly = this.paren = -1;
		    }
		    ;
		    // A function following one of those tokens is an expression.
		    Reader.prototype.beforeFunctionExpression = function (t) {
		        return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
		            'return', 'case', 'delete', 'throw', 'void',
		            // assignment operators
		            '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
		            '&=', '|=', '^=', ',',
		            // binary/unary operators
		            '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
		            '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
		            '<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
		    };
		    ;
		    // Determine if forward slash (/) is an operator or part of a regular expression
		    // https://github.com/mozilla/sweet.js/wiki/design
		    Reader.prototype.isRegexStart = function () {
		        var previous = this.values[this.values.length - 1];
		        var regex = (previous !== null);
		        switch (previous) {
		            case 'this':
		            case ']':
		                regex = false;
		                break;
		            case ')':
		                var check = this.values[this.paren - 1];
		                regex = (check === 'if' || check === 'while' || check === 'for' || check === 'with');
		                break;
		            case '}':
		                // Dividing a function by anything makes little sense,
		                // but we have to check for that.
		                regex = false;
		                if (this.values[this.curly - 3] === 'function') {
		                    // Anonymous function, e.g. function(){} /42
		                    var check_1 = this.values[this.curly - 4];
		                    regex = check_1 ? !this.beforeFunctionExpression(check_1) : false;
		                }
		                else if (this.values[this.curly - 4] === 'function') {
		                    // Named function, e.g. function f(){} /42/
		                    var check_2 = this.values[this.curly - 5];
		                    regex = check_2 ? !this.beforeFunctionExpression(check_2) : true;
		                }
		        }
		        return regex;
		    };
		    ;
		    Reader.prototype.push = function (token) {
		        if (token.type === token_1.Token.Punctuator || token.type === token_1.Token.Keyword) {
		            if (token.value === '{') {
		                this.curly = this.values.length;
		            }
		            else if (token.value === '(') {
		                this.paren = this.values.length;
		            }
		            this.values.push(token.value);
		        }
		        else {
		            this.values.push(null);
		        }
		    };
		    ;
		    return Reader;
		}());
		var Tokenizer = (function () {
		    function Tokenizer(code, config) {
		        this.errorHandler = new error_handler_1.ErrorHandler();
		        this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
		        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
		        this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
		        this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
		        this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
		        this.buffer = [];
		        this.reader = new Reader();
		    }
		    ;
		    Tokenizer.prototype.errors = function () {
		        return this.errorHandler.errors;
		    };
		    ;
		    Tokenizer.prototype.getNextToken = function () {
		        if (this.buffer.length === 0) {
		            var comments = this.scanner.scanComments();
		            if (this.scanner.trackComment) {
		                for (var i = 0; i < comments.length; ++i) {
		                    var e = comments[i];
		                    var comment = void 0;
		                    var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
		                    comment = {
		                        type: e.multiLine ? 'BlockComment' : 'LineComment',
		                        value: value
		                    };
		                    if (this.trackRange) {
		                        comment.range = e.range;
		                    }
		                    if (this.trackLoc) {
		                        comment.loc = e.loc;
		                    }
		                    this.buffer.push(comment);
		                }
		            }
		            if (!this.scanner.eof()) {
		                var loc = void 0;
		                if (this.trackLoc) {
		                    loc = {
		                        start: {
		                            line: this.scanner.lineNumber,
		                            column: this.scanner.index - this.scanner.lineStart
		                        },
		                        end: {}
		                    };
		                }
		                var token = void 0;
		                if (this.scanner.source[this.scanner.index] === '/') {
		                    token = this.reader.isRegexStart() ? this.scanner.scanRegExp() : this.scanner.scanPunctuator();
		                }
		                else {
		                    token = this.scanner.lex();
		                }
		                this.reader.push(token);
		                var entry = void 0;
		                entry = {
		                    type: token_1.TokenName[token.type],
		                    value: this.scanner.source.slice(token.start, token.end)
		                };
		                if (this.trackRange) {
		                    entry.range = [token.start, token.end];
		                }
		                if (this.trackLoc) {
		                    loc.end = {
		                        line: this.scanner.lineNumber,
		                        column: this.scanner.index - this.scanner.lineStart
		                    };
		                    entry.loc = loc;
		                }
		                if (token.regex) {
		                    entry.regex = token.regex;
		                }
		                this.buffer.push(entry);
		            }
		        }
		        return this.buffer.shift();
		    };
		    ;
		    return Tokenizer;
		}());
		exports.Tokenizer = Tokenizer;


	/***/ }
	/******/ ])
	});
	;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*eslint-disable no-use-before-define*/

	var common              = __webpack_require__(38);
	var YAMLException       = __webpack_require__(39);
	var DEFAULT_FULL_SCHEMA = __webpack_require__(64);
	var DEFAULT_SAFE_SCHEMA = __webpack_require__(41);

	var _toString       = Object.prototype.toString;
	var _hasOwnProperty = Object.prototype.hasOwnProperty;

	var CHAR_TAB                  = 0x09; /* Tab */
	var CHAR_LINE_FEED            = 0x0A; /* LF */
	var CHAR_SPACE                = 0x20; /* Space */
	var CHAR_EXCLAMATION          = 0x21; /* ! */
	var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
	var CHAR_SHARP                = 0x23; /* # */
	var CHAR_PERCENT              = 0x25; /* % */
	var CHAR_AMPERSAND            = 0x26; /* & */
	var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
	var CHAR_ASTERISK             = 0x2A; /* * */
	var CHAR_COMMA                = 0x2C; /* , */
	var CHAR_MINUS                = 0x2D; /* - */
	var CHAR_COLON                = 0x3A; /* : */
	var CHAR_GREATER_THAN         = 0x3E; /* > */
	var CHAR_QUESTION             = 0x3F; /* ? */
	var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
	var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
	var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
	var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
	var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
	var CHAR_VERTICAL_LINE        = 0x7C; /* | */
	var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

	var ESCAPE_SEQUENCES = {};

	ESCAPE_SEQUENCES[0x00]   = '\\0';
	ESCAPE_SEQUENCES[0x07]   = '\\a';
	ESCAPE_SEQUENCES[0x08]   = '\\b';
	ESCAPE_SEQUENCES[0x09]   = '\\t';
	ESCAPE_SEQUENCES[0x0A]   = '\\n';
	ESCAPE_SEQUENCES[0x0B]   = '\\v';
	ESCAPE_SEQUENCES[0x0C]   = '\\f';
	ESCAPE_SEQUENCES[0x0D]   = '\\r';
	ESCAPE_SEQUENCES[0x1B]   = '\\e';
	ESCAPE_SEQUENCES[0x22]   = '\\"';
	ESCAPE_SEQUENCES[0x5C]   = '\\\\';
	ESCAPE_SEQUENCES[0x85]   = '\\N';
	ESCAPE_SEQUENCES[0xA0]   = '\\_';
	ESCAPE_SEQUENCES[0x2028] = '\\L';
	ESCAPE_SEQUENCES[0x2029] = '\\P';

	var DEPRECATED_BOOLEANS_SYNTAX = [
	  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
	  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
	];

	function compileStyleMap(schema, map) {
	  var result, keys, index, length, tag, style, type;

	  if (map === null) return {};

	  result = {};
	  keys = Object.keys(map);

	  for (index = 0, length = keys.length; index < length; index += 1) {
	    tag = keys[index];
	    style = String(map[tag]);

	    if (tag.slice(0, 2) === '!!') {
	      tag = 'tag:yaml.org,2002:' + tag.slice(2);
	    }
	    type = schema.compiledTypeMap['fallback'][tag];

	    if (type && _hasOwnProperty.call(type.styleAliases, style)) {
	      style = type.styleAliases[style];
	    }

	    result[tag] = style;
	  }

	  return result;
	}

	function encodeHex(character) {
	  var string, handle, length;

	  string = character.toString(16).toUpperCase();

	  if (character <= 0xFF) {
	    handle = 'x';
	    length = 2;
	  } else if (character <= 0xFFFF) {
	    handle = 'u';
	    length = 4;
	  } else if (character <= 0xFFFFFFFF) {
	    handle = 'U';
	    length = 8;
	  } else {
	    throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
	  }

	  return '\\' + handle + common.repeat('0', length - string.length) + string;
	}

	function State(options) {
	  this.schema       = options['schema'] || DEFAULT_FULL_SCHEMA;
	  this.indent       = Math.max(1, (options['indent'] || 2));
	  this.skipInvalid  = options['skipInvalid'] || false;
	  this.flowLevel    = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
	  this.styleMap     = compileStyleMap(this.schema, options['styles'] || null);
	  this.sortKeys     = options['sortKeys'] || false;
	  this.lineWidth    = options['lineWidth'] || 80;
	  this.noRefs       = options['noRefs'] || false;
	  this.noCompatMode = options['noCompatMode'] || false;

	  this.implicitTypes = this.schema.compiledImplicit;
	  this.explicitTypes = this.schema.compiledExplicit;

	  this.tag = null;
	  this.result = '';

	  this.duplicates = [];
	  this.usedDuplicates = null;
	}

	// Indents every line in a string. Empty lines (\n only) are not indented.
	function indentString(string, spaces) {
	  var ind = common.repeat(' ', spaces),
	      position = 0,
	      next = -1,
	      result = '',
	      line,
	      length = string.length;

	  while (position < length) {
	    next = string.indexOf('\n', position);
	    if (next === -1) {
	      line = string.slice(position);
	      position = length;
	    } else {
	      line = string.slice(position, next + 1);
	      position = next + 1;
	    }

	    if (line.length && line !== '\n') result += ind;

	    result += line;
	  }

	  return result;
	}

	function generateNextLine(state, level) {
	  return '\n' + common.repeat(' ', state.indent * level);
	}

	function testImplicitResolving(state, str) {
	  var index, length, type;

	  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
	    type = state.implicitTypes[index];

	    if (type.resolve(str)) {
	      return true;
	    }
	  }

	  return false;
	}

	// [33] s-white ::= s-space | s-tab
	function isWhitespace(c) {
	  return c === CHAR_SPACE || c === CHAR_TAB;
	}

	// Returns true if the character can be printed without escaping.
	// From YAML 1.2: "any allowed characters known to be non-printable
	// should also be escaped. [However,] This isn’t mandatory"
	// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
	function isPrintable(c) {
	  return  (0x00020 <= c && c <= 0x00007E)
	      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
	      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== 0xFEFF /* BOM */)
	      ||  (0x10000 <= c && c <= 0x10FFFF);
	}

	// Simplified test for values allowed after the first character in plain style.
	function isPlainSafe(c) {
	  // Uses a subset of nb-char - c-flow-indicator - ":" - "#"
	  // where nb-char ::= c-printable - b-char - c-byte-order-mark.
	  return isPrintable(c) && c !== 0xFEFF
	    // - c-flow-indicator
	    && c !== CHAR_COMMA
	    && c !== CHAR_LEFT_SQUARE_BRACKET
	    && c !== CHAR_RIGHT_SQUARE_BRACKET
	    && c !== CHAR_LEFT_CURLY_BRACKET
	    && c !== CHAR_RIGHT_CURLY_BRACKET
	    // - ":" - "#"
	    && c !== CHAR_COLON
	    && c !== CHAR_SHARP;
	}

	// Simplified test for values allowed as the first character in plain style.
	function isPlainSafeFirst(c) {
	  // Uses a subset of ns-char - c-indicator
	  // where ns-char = nb-char - s-white.
	  return isPrintable(c) && c !== 0xFEFF
	    && !isWhitespace(c) // - s-white
	    // - (c-indicator ::=
	    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
	    && c !== CHAR_MINUS
	    && c !== CHAR_QUESTION
	    && c !== CHAR_COLON
	    && c !== CHAR_COMMA
	    && c !== CHAR_LEFT_SQUARE_BRACKET
	    && c !== CHAR_RIGHT_SQUARE_BRACKET
	    && c !== CHAR_LEFT_CURLY_BRACKET
	    && c !== CHAR_RIGHT_CURLY_BRACKET
	    // | “#” | “&” | “*” | “!” | “|” | “>” | “'” | “"”
	    && c !== CHAR_SHARP
	    && c !== CHAR_AMPERSAND
	    && c !== CHAR_ASTERISK
	    && c !== CHAR_EXCLAMATION
	    && c !== CHAR_VERTICAL_LINE
	    && c !== CHAR_GREATER_THAN
	    && c !== CHAR_SINGLE_QUOTE
	    && c !== CHAR_DOUBLE_QUOTE
	    // | “%” | “@” | “`”)
	    && c !== CHAR_PERCENT
	    && c !== CHAR_COMMERCIAL_AT
	    && c !== CHAR_GRAVE_ACCENT;
	}

	var STYLE_PLAIN   = 1,
	    STYLE_SINGLE  = 2,
	    STYLE_LITERAL = 3,
	    STYLE_FOLDED  = 4,
	    STYLE_DOUBLE  = 5;

	// Determines which scalar styles are possible and returns the preferred style.
	// lineWidth = -1 => no limit.
	// Pre-conditions: str.length > 0.
	// Post-conditions:
	//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
	//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
	//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
	function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
	  var i;
	  var char;
	  var hasLineBreak = false;
	  var hasFoldableLine = false; // only checked if shouldTrackWidth
	  var shouldTrackWidth = lineWidth !== -1;
	  var previousLineBreak = -1; // count the first line correctly
	  var plain = isPlainSafeFirst(string.charCodeAt(0))
	          && !isWhitespace(string.charCodeAt(string.length - 1));

	  if (singleLineOnly) {
	    // Case: no block styles.
	    // Check for disallowed characters to rule out plain and single.
	    for (i = 0; i < string.length; i++) {
	      char = string.charCodeAt(i);
	      if (!isPrintable(char)) {
	        return STYLE_DOUBLE;
	      }
	      plain = plain && isPlainSafe(char);
	    }
	  } else {
	    // Case: block styles permitted.
	    for (i = 0; i < string.length; i++) {
	      char = string.charCodeAt(i);
	      if (char === CHAR_LINE_FEED) {
	        hasLineBreak = true;
	        // Check if any line can be folded.
	        if (shouldTrackWidth) {
	          hasFoldableLine = hasFoldableLine ||
	            // Foldable line = too long, and not more-indented.
	            (i - previousLineBreak - 1 > lineWidth &&
	             string[previousLineBreak + 1] !== ' ');
	          previousLineBreak = i;
	        }
	      } else if (!isPrintable(char)) {
	        return STYLE_DOUBLE;
	      }
	      plain = plain && isPlainSafe(char);
	    }
	    // in case the end is missing a \n
	    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
	      (i - previousLineBreak - 1 > lineWidth &&
	       string[previousLineBreak + 1] !== ' '));
	  }
	  // Although every style can represent \n without escaping, prefer block styles
	  // for multiline, since they're more readable and they don't add empty lines.
	  // Also prefer folding a super-long line.
	  if (!hasLineBreak && !hasFoldableLine) {
	    // Strings interpretable as another type have to be quoted;
	    // e.g. the string 'true' vs. the boolean true.
	    return plain && !testAmbiguousType(string)
	      ? STYLE_PLAIN : STYLE_SINGLE;
	  }
	  // Edge case: block indentation indicator can only have one digit.
	  if (string[0] === ' ' && indentPerLevel > 9) {
	    return STYLE_DOUBLE;
	  }
	  // At this point we know block styles are valid.
	  // Prefer literal style unless we want to fold.
	  return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
	}

	// Note: line breaking/folding is implemented for only the folded style.
	// NB. We drop the last trailing newline (if any) of a returned block scalar
	//  since the dumper adds its own newline. This always works:
	//    • No ending newline => unaffected; already using strip "-" chomping.
	//    • Ending newline    => removed then restored.
	//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
	function writeScalar(state, string, level, iskey) {
	  state.dump = (function () {
	    if (string.length === 0) {
	      return "''";
	    }
	    if (!state.noCompatMode &&
	        DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
	      return "'" + string + "'";
	    }

	    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
	    // As indentation gets deeper, let the width decrease monotonically
	    // to the lower bound min(state.lineWidth, 40).
	    // Note that this implies
	    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
	    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
	    // This behaves better than a constant minimum width which disallows narrower options,
	    // or an indent threshold which causes the width to suddenly increase.
	    var lineWidth = state.lineWidth === -1
	      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

	    // Without knowing if keys are implicit/explicit, assume implicit for safety.
	    var singleLineOnly = iskey
	      // No block styles in flow mode.
	      || (state.flowLevel > -1 && level >= state.flowLevel);
	    function testAmbiguity(string) {
	      return testImplicitResolving(state, string);
	    }

	    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
	      case STYLE_PLAIN:
	        return string;
	      case STYLE_SINGLE:
	        return "'" + string.replace(/'/g, "''") + "'";
	      case STYLE_LITERAL:
	        return '|' + blockHeader(string, state.indent)
	          + dropEndingNewline(indentString(string, indent));
	      case STYLE_FOLDED:
	        return '>' + blockHeader(string, state.indent)
	          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
	      case STYLE_DOUBLE:
	        return '"' + escapeString(string, lineWidth) + '"';
	      default:
	        throw new YAMLException('impossible error: invalid scalar style');
	    }
	  }());
	}

	// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
	function blockHeader(string, indentPerLevel) {
	  var indentIndicator = (string[0] === ' ') ? String(indentPerLevel) : '';

	  // note the special case: the string '\n' counts as a "trailing" empty line.
	  var clip =          string[string.length - 1] === '\n';
	  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
	  var chomp = keep ? '+' : (clip ? '' : '-');

	  return indentIndicator + chomp + '\n';
	}

	// (See the note for writeScalar.)
	function dropEndingNewline(string) {
	  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
	}

	// Note: a long line without a suitable break point will exceed the width limit.
	// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
	function foldString(string, width) {
	  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
	  // unless they're before or after a more-indented line, or at the very
	  // beginning or end, in which case $k$ maps to $k$.
	  // Therefore, parse each chunk as newline(s) followed by a content line.
	  var lineRe = /(\n+)([^\n]*)/g;

	  // first line (possibly an empty line)
	  var result = (function () {
	    var nextLF = string.indexOf('\n');
	    nextLF = nextLF !== -1 ? nextLF : string.length;
	    lineRe.lastIndex = nextLF;
	    return foldLine(string.slice(0, nextLF), width);
	  }());
	  // If we haven't reached the first content line yet, don't add an extra \n.
	  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
	  var moreIndented;

	  // rest of the lines
	  var match;
	  while ((match = lineRe.exec(string))) {
	    var prefix = match[1], line = match[2];
	    moreIndented = (line[0] === ' ');
	    result += prefix
	      + (!prevMoreIndented && !moreIndented && line !== ''
	        ? '\n' : '')
	      + foldLine(line, width);
	    prevMoreIndented = moreIndented;
	  }

	  return result;
	}

	// Greedy line breaking.
	// Picks the longest line under the limit each time,
	// otherwise settles for the shortest line over the limit.
	// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
	function foldLine(line, width) {
	  if (line === '' || line[0] === ' ') return line;

	  // Since a more-indented line adds a \n, breaks can't be followed by a space.
	  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
	  var match;
	  // start is an inclusive index. end, curr, and next are exclusive.
	  var start = 0, end, curr = 0, next = 0;
	  var result = '';

	  // Invariants: 0 <= start <= length-1.
	  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
	  // Inside the loop:
	  //   A match implies length >= 2, so curr and next are <= length-2.
	  while ((match = breakRe.exec(line))) {
	    next = match.index;
	    // maintain invariant: curr - start <= width
	    if (next - start > width) {
	      end = (curr > start) ? curr : next; // derive end <= length-2
	      result += '\n' + line.slice(start, end);
	      // skip the space that was output as \n
	      start = end + 1;                    // derive start <= length-1
	    }
	    curr = next;
	  }

	  // By the invariants, start <= length-1, so there is something left over.
	  // It is either the whole string or a part starting from non-whitespace.
	  result += '\n';
	  // Insert a break if the remainder is too long and there is a break available.
	  if (line.length - start > width && curr > start) {
	    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
	  } else {
	    result += line.slice(start);
	  }

	  return result.slice(1); // drop extra \n joiner
	}

	// Escapes a double-quoted string.
	function escapeString(string) {
	  var result = '';
	  var char;
	  var escapeSeq;

	  for (var i = 0; i < string.length; i++) {
	    char = string.charCodeAt(i);
	    escapeSeq = ESCAPE_SEQUENCES[char];
	    result += !escapeSeq && isPrintable(char)
	      ? string[i]
	      : escapeSeq || encodeHex(char);
	  }

	  return result;
	}

	function writeFlowSequence(state, level, object) {
	  var _result = '',
	      _tag    = state.tag,
	      index,
	      length;

	  for (index = 0, length = object.length; index < length; index += 1) {
	    // Write only valid elements.
	    if (writeNode(state, level, object[index], false, false)) {
	      if (index !== 0) _result += ', ';
	      _result += state.dump;
	    }
	  }

	  state.tag = _tag;
	  state.dump = '[' + _result + ']';
	}

	function writeBlockSequence(state, level, object, compact) {
	  var _result = '',
	      _tag    = state.tag,
	      index,
	      length;

	  for (index = 0, length = object.length; index < length; index += 1) {
	    // Write only valid elements.
	    if (writeNode(state, level + 1, object[index], true, true)) {
	      if (!compact || index !== 0) {
	        _result += generateNextLine(state, level);
	      }

	      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
	        _result += '-';
	      } else {
	        _result += '- ';
	      }

	      _result += state.dump;
	    }
	  }

	  state.tag = _tag;
	  state.dump = _result || '[]'; // Empty sequence if no valid values.
	}

	function writeFlowMapping(state, level, object) {
	  var _result       = '',
	      _tag          = state.tag,
	      objectKeyList = Object.keys(object),
	      index,
	      length,
	      objectKey,
	      objectValue,
	      pairBuffer;

	  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
	    pairBuffer = '';

	    if (index !== 0) pairBuffer += ', ';

	    objectKey = objectKeyList[index];
	    objectValue = object[objectKey];

	    if (!writeNode(state, level, objectKey, false, false)) {
	      continue; // Skip this pair because of invalid key;
	    }

	    if (state.dump.length > 1024) pairBuffer += '? ';

	    pairBuffer += state.dump + ': ';

	    if (!writeNode(state, level, objectValue, false, false)) {
	      continue; // Skip this pair because of invalid value.
	    }

	    pairBuffer += state.dump;

	    // Both key and value are valid.
	    _result += pairBuffer;
	  }

	  state.tag = _tag;
	  state.dump = '{' + _result + '}';
	}

	function writeBlockMapping(state, level, object, compact) {
	  var _result       = '',
	      _tag          = state.tag,
	      objectKeyList = Object.keys(object),
	      index,
	      length,
	      objectKey,
	      objectValue,
	      explicitPair,
	      pairBuffer;

	  // Allow sorting keys so that the output file is deterministic
	  if (state.sortKeys === true) {
	    // Default sorting
	    objectKeyList.sort();
	  } else if (typeof state.sortKeys === 'function') {
	    // Custom sort function
	    objectKeyList.sort(state.sortKeys);
	  } else if (state.sortKeys) {
	    // Something is wrong
	    throw new YAMLException('sortKeys must be a boolean or a function');
	  }

	  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
	    pairBuffer = '';

	    if (!compact || index !== 0) {
	      pairBuffer += generateNextLine(state, level);
	    }

	    objectKey = objectKeyList[index];
	    objectValue = object[objectKey];

	    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
	      continue; // Skip this pair because of invalid key.
	    }

	    explicitPair = (state.tag !== null && state.tag !== '?') ||
	                   (state.dump && state.dump.length > 1024);

	    if (explicitPair) {
	      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
	        pairBuffer += '?';
	      } else {
	        pairBuffer += '? ';
	      }
	    }

	    pairBuffer += state.dump;

	    if (explicitPair) {
	      pairBuffer += generateNextLine(state, level);
	    }

	    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
	      continue; // Skip this pair because of invalid value.
	    }

	    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
	      pairBuffer += ':';
	    } else {
	      pairBuffer += ': ';
	    }

	    pairBuffer += state.dump;

	    // Both key and value are valid.
	    _result += pairBuffer;
	  }

	  state.tag = _tag;
	  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
	}

	function detectType(state, object, explicit) {
	  var _result, typeList, index, length, type, style;

	  typeList = explicit ? state.explicitTypes : state.implicitTypes;

	  for (index = 0, length = typeList.length; index < length; index += 1) {
	    type = typeList[index];

	    if ((type.instanceOf  || type.predicate) &&
	        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
	        (!type.predicate  || type.predicate(object))) {

	      state.tag = explicit ? type.tag : '?';

	      if (type.represent) {
	        style = state.styleMap[type.tag] || type.defaultStyle;

	        if (_toString.call(type.represent) === '[object Function]') {
	          _result = type.represent(object, style);
	        } else if (_hasOwnProperty.call(type.represent, style)) {
	          _result = type.represent[style](object, style);
	        } else {
	          throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
	        }

	        state.dump = _result;
	      }

	      return true;
	    }
	  }

	  return false;
	}

	// Serializes `object` and writes it to global `result`.
	// Returns true on success, or false on invalid object.
	//
	function writeNode(state, level, object, block, compact, iskey) {
	  state.tag = null;
	  state.dump = object;

	  if (!detectType(state, object, false)) {
	    detectType(state, object, true);
	  }

	  var type = _toString.call(state.dump);

	  if (block) {
	    block = (state.flowLevel < 0 || state.flowLevel > level);
	  }

	  var objectOrArray = type === '[object Object]' || type === '[object Array]',
	      duplicateIndex,
	      duplicate;

	  if (objectOrArray) {
	    duplicateIndex = state.duplicates.indexOf(object);
	    duplicate = duplicateIndex !== -1;
	  }

	  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
	    compact = false;
	  }

	  if (duplicate && state.usedDuplicates[duplicateIndex]) {
	    state.dump = '*ref_' + duplicateIndex;
	  } else {
	    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
	      state.usedDuplicates[duplicateIndex] = true;
	    }
	    if (type === '[object Object]') {
	      if (block && (Object.keys(state.dump).length !== 0)) {
	        writeBlockMapping(state, level, state.dump, compact);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + state.dump;
	        }
	      } else {
	        writeFlowMapping(state, level, state.dump);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
	        }
	      }
	    } else if (type === '[object Array]') {
	      if (block && (state.dump.length !== 0)) {
	        writeBlockSequence(state, level, state.dump, compact);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + state.dump;
	        }
	      } else {
	        writeFlowSequence(state, level, state.dump);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
	        }
	      }
	    } else if (type === '[object String]') {
	      if (state.tag !== '?') {
	        writeScalar(state, state.dump, level, iskey);
	      }
	    } else {
	      if (state.skipInvalid) return false;
	      throw new YAMLException('unacceptable kind of an object to dump ' + type);
	    }

	    if (state.tag !== null && state.tag !== '?') {
	      state.dump = '!<' + state.tag + '> ' + state.dump;
	    }
	  }

	  return true;
	}

	function getDuplicateReferences(object, state) {
	  var objects = [],
	      duplicatesIndexes = [],
	      index,
	      length;

	  inspectNode(object, objects, duplicatesIndexes);

	  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
	    state.duplicates.push(objects[duplicatesIndexes[index]]);
	  }
	  state.usedDuplicates = new Array(length);
	}

	function inspectNode(object, objects, duplicatesIndexes) {
	  var objectKeyList,
	      index,
	      length;

	  if (object !== null && typeof object === 'object') {
	    index = objects.indexOf(object);
	    if (index !== -1) {
	      if (duplicatesIndexes.indexOf(index) === -1) {
	        duplicatesIndexes.push(index);
	      }
	    } else {
	      objects.push(object);

	      if (Array.isArray(object)) {
	        for (index = 0, length = object.length; index < length; index += 1) {
	          inspectNode(object[index], objects, duplicatesIndexes);
	        }
	      } else {
	        objectKeyList = Object.keys(object);

	        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
	          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
	        }
	      }
	    }
	  }
	}

	function dump(input, options) {
	  options = options || {};

	  var state = new State(options);

	  if (!state.noRefs) getDuplicateReferences(input, state);

	  if (writeNode(state, 0, input, true, true)) return state.dump + '\n';

	  return '';
	}

	function safeDump(input, options) {
	  return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
	}

	module.exports.dump     = dump;
	module.exports.safeDump = safeDump;


/***/ }),
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(34);

	var _Test = __webpack_require__(11);

	var _Test2 = _interopRequireDefault(_Test);

	var _amAutoevent = __webpack_require__(8);

	var _amAutoevent2 = _interopRequireDefault(_amAutoevent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Actions = function () {
	  function Actions() {
	    _classCallCheck(this, Actions);
	  }

	  _createClass(Actions, [{
	    key: 'help\u3092\u30AF\u30EA\u30C3\u30AF',
	    value: function help() {
	      autoEvent.wait(600).click('test-list svg.question').exists('help section.show');
	    }
	  }, {
	    key: '\u900F\u904E\u80CC\u666F\u3092\u30AF\u30EA\u30C3\u30AF',
	    value: function _() {
	      autoEvent.wait(1000).click('help section.background').notExists('help section.show');
	    }
	  }]);

	  return Actions;
	}();

	var autoEvent = new _amAutoevent2.default();
	autoEvent.register();
	_Test2.default.start(new Actions());
	autoEvent.start();

/***/ })
/******/ ])
});
;
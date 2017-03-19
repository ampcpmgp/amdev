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


/***/ }
/******/ ]);
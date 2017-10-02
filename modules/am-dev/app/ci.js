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
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("cson");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

var check, cl, commands, config, cson, exec, execSync, fs, interval, intervalMin, json, proc, ref, start;

cson = __webpack_require__(10);

fs = __webpack_require__(2);

if (fs.existsSync(".config.cson")) {
  config = cson.load(".config.cson");
}

intervalMin = config != null ? (ref = config.ci) != null ? ref.intervalMin : void 0 : void 0;

if (!intervalMin) {
  intervalMin = 10;
}

console.log(new Date(), "process start");

interval = intervalMin * 60000;

execSync = __webpack_require__(3).execSync;

exec = __webpack_require__(3).exec;

proc = null;

json = __webpack_require__(2).readFileSync("./package.json", {
  encoding: "utf-8"
});

commands = JSON.parse(json).scripts;

start = function() {
  var preproc;
  preproc = execSync(commands.compile, {
    encoding: "utf-8"
  });
  console.log(preproc);
  return proc = exec(commands["start:server"]).once("close", (function(_this) {
    return function() {
      return start();
    };
  })(this)).stdout.on("data", function(data) {
    return console.log(data);
  });
};

check = function() {
  var error, reply;
  try {
    reply = execSync("git pull origin", {
      encoding: "utf-8"
    });
  } catch (error1) {
    error = error1;
    console.log(error);
    return;
  }
  console.log(new Date(), reply);
  if (!reply.match("Already up-to-date")) {
    console.log(new Date(), "process exit");
    return proc.kill();
  }
};

cl = function() {
  return setInterval(check, interval);
};

cl();

start();


/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(49);


/***/ })

/******/ });
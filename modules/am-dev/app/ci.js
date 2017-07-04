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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(52);


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

	module.exports = require("fs");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

	module.exports = require("child_process");

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

	module.exports = require("cson");

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

	var check, cl, commands, config, cson, exec, execSync, fs, interval, intervalMin, json, proc, ref, start;

	cson = __webpack_require__(28);

	fs = __webpack_require__(4);

	if (fs.existsSync(".config.cson")) {
	  config = cson.load(".config.cson");
	}

	intervalMin = config != null ? (ref = config.ci) != null ? ref.intervalMin : void 0 : void 0;

	if (!intervalMin) {
	  intervalMin = 10;
	}

	console.log(new Date(), "process start");

	interval = intervalMin * 60000;

	execSync = __webpack_require__(9).execSync;

	exec = __webpack_require__(9).exec;

	proc = null;

	json = __webpack_require__(4).readFileSync("./package.json", {
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


/***/ })

/******/ });
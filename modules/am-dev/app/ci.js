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

	eval("var check, cl, commands, config, cson, exec, execSync, fs, interval, intervalMin, json, proc, ref, start;\n\ncson = __webpack_require__(11);\n\nfs = __webpack_require__(4);\n\nif (fs.existsSync(\".config.cson\")) {\n  config = cson.load(\".config.cson\");\n}\n\nintervalMin = config != null ? (ref = config.ci) != null ? ref.intervalMin : void 0 : void 0;\n\nif (!intervalMin) {\n  intervalMin = 10;\n}\n\nconsole.log(new Date(), \"process start\");\n\ninterval = intervalMin * 60000;\n\nexecSync = __webpack_require__(7).execSync;\n\nexec = __webpack_require__(7).exec;\n\nproc = null;\n\njson = __webpack_require__(4).readFileSync(\"./package.json\", {\n  encoding: \"utf-8\"\n});\n\ncommands = JSON.parse(json).scripts;\n\nstart = function() {\n  var preproc;\n  preproc = execSync(commands.compile, {\n    encoding: \"utf-8\"\n  });\n  console.log(preproc);\n  return proc = exec(commands[\"start:server\"]).once(\"close\", (function(_this) {\n    return function() {\n      return start();\n    };\n  })(this)).stdout.on(\"data\", function(data) {\n    return console.log(data);\n  });\n};\n\ncheck = function() {\n  var error, error1, reply;\n  try {\n    reply = execSync(\"git pull origin\", {\n      encoding: \"utf-8\"\n    });\n  } catch (error1) {\n    error = error1;\n    console.log(error);\n    return;\n  }\n  console.log(new Date(), reply);\n  if (!reply.match(\"Already up-to-date\")) {\n    console.log(new Date(), \"process exit\");\n    return proc.kill();\n  }\n};\n\ncl = function() {\n  return setInterval(check, interval);\n};\n\ncl();\n\nstart();\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL21vZHVsZXMvYW0tZGV2L2FwcC9jaS5jb2ZmZWU/NjNiOCJdLCJzb3VyY2VzQ29udGVudCI6WyJjc29uID0gcmVxdWlyZShcImNzb25cIilcclxuZnMgPSByZXF1aXJlKFwiZnNcIilcclxuY29uZmlnID0gY3Nvbi5sb2FkKFwiLmNvbmZpZy5jc29uXCIpIGlmIGZzLmV4aXN0c1N5bmMoXCIuY29uZmlnLmNzb25cIilcclxuaW50ZXJ2YWxNaW4gPSBjb25maWc/LmNpPy5pbnRlcnZhbE1pblxyXG5pbnRlcnZhbE1pbiA9IDEwIHVubGVzcyBpbnRlcnZhbE1pblxyXG4jY29uZmlnXHJcbmNvbnNvbGUubG9nIG5ldyBEYXRlKCksIFwicHJvY2VzcyBzdGFydFwiXHJcbmludGVydmFsID0gaW50ZXJ2YWxNaW4gKiA2MDAwMCMgLyA2MCAgIyDjg4bjgrnjg4jmmYLjga/vvJXnp5LjgavvvJHlm55cclxuI3ZhcnNcclxuZXhlY1N5bmMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKS5leGVjU3luY1xyXG5leGVjID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIikuZXhlY1xyXG5wcm9jID0gbnVsbFxyXG4jY29tbWFuZHNcclxuanNvbiA9IHJlcXVpcmUoXCJmc1wiKS5yZWFkRmlsZVN5bmMoXCIuL3BhY2thZ2UuanNvblwiLCB7ZW5jb2Rpbmc6IFwidXRmLThcIn0pXHJcbmNvbW1hbmRzID0gSlNPTi5wYXJzZShqc29uKS5zY3JpcHRzXHJcbnN0YXJ0ID0gLT5cclxuICBwcmVwcm9jID0gZXhlY1N5bmMoY29tbWFuZHMuY29tcGlsZSwge2VuY29kaW5nOlwidXRmLThcIn0pXHJcbiAgY29uc29sZS5sb2cgcHJlcHJvY1xyXG4gIHByb2MgPSBleGVjKGNvbW1hbmRzW1wic3RhcnQ6c2VydmVyXCJdKVxyXG4gICAgLm9uY2UoXCJjbG9zZVwiLCA9PiBzdGFydCgpKVxyXG4gICAgLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpIC0+XHJcbiAgICAgIGNvbnNvbGUubG9nIGRhdGFcclxuICAgIClcclxuY2hlY2sgPSAtPlxyXG4gIHRyeVxyXG4gICAgcmVwbHkgPSBleGVjU3luYyhcImdpdCBwdWxsIG9yaWdpblwiLCB7ZW5jb2Rpbmc6XCJ1dGYtOFwifSlcclxuICBjYXRjaCBlcnJvclxyXG4gICAgY29uc29sZS5sb2cgZXJyb3JcclxuICAgIHJldHVyblxyXG4gIGNvbnNvbGUubG9nIG5ldyBEYXRlKCksIHJlcGx5XHJcbiAgdW5sZXNzIHJlcGx5Lm1hdGNoKFwiQWxyZWFkeSB1cC10by1kYXRlXCIpIyBvciBmYWxzZSAj5by35Yi256i85YONXHJcbiAgICBjb25zb2xlLmxvZyBuZXcgRGF0ZSgpLCBcInByb2Nlc3MgZXhpdFwiXHJcbiAgICBwcm9jLmtpbGwoKVxyXG5jbCA9IC0+IHNldEludGVydmFsKGNoZWNrLCBpbnRlcnZhbClcclxuI2V4ZVxyXG5jbCgpXHJcbnN0YXJ0KClcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9tb2R1bGVzL2FtLWRldi9hcHAvY2kuY29mZmVlXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBOzs7QUFDQTtBQUNBO0FBQUE7QUFBQTs7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFEQTtBQUxBO0FBQ0E7QUFPQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFUQTtBQUNBO0FBU0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	eval("module.exports = require(\"fs\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImZzXCI/MmUwOSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZnNcIlxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDQgNVxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	eval("module.exports = require(\"child_process\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIj80MzA4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCA0IDUgNlxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	eval("module.exports = require(\"cson\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjc29uXCI/MjNmNSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjc29uXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJjc29uXCJcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSA0IDVcbiAqKi8iXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Common, params;

	__webpack_require__(2);

	global.riot = __webpack_require__(13);

	Common = __webpack_require__(14);

	params = Common.prototype.getParams(location.href);

	(function(_this) {
	  return (function() {
	    var generate, testcases;
	    if (params["am-simple-server"]) {
	      return __webpack_require__(15);
	    } else if (params["am-coffee-time"]) {
	      return __webpack_require__(21);
	    } else {
	      generate = __webpack_require__(28);
	      testcases = __webpack_require__(33);
	      return generate(testcases);
	    }
	  });
	})(this)();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var $, Compiler, ModuleCompiler, _, exec, fs, webpack,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	fs = __webpack_require__(3);

	exec = __webpack_require__(4).exec;

	$ = __webpack_require__(5);

	webpack = __webpack_require__(6);

	_ = __webpack_require__(7);

	Compiler = __webpack_require__(8);

	window.electonReadFlg = true;

	ModuleCompiler = (function(superClass) {
	  extend(ModuleCompiler, superClass);

	  function ModuleCompiler() {
	    return ModuleCompiler.__super__.constructor.apply(this, arguments);
	  }

	  ModuleCompiler.compile = function*(arg) {
	    var baseOption, callback, coffeeFile, coffeeFiles, error, file, files, i, len, moduleDir, option, preExt, ref;
	    baseOption = arg.baseOption, moduleDir = arg.moduleDir, preExt = (ref = arg.preExt) != null ? ref : "", callback = arg.callback;
	    option = _.cloneDeep(baseOption);
	    option.resolve.root = process.cwd();
	    try {
	      files = fs.readdirSync(moduleDir);
	    } catch (error1) {
	      error = error1;
	      return callback();
	    }
	    try {
	      coffeeFiles = (function() {
	        var i, len, results;
	        results = [];
	        for (i = 0, len = files.length; i < len; i++) {
	          file = files[i];
	          if (file.match(/.coffee$/)) {
	            results.push(file);
	          }
	        }
	        return results;
	      })();
	      delete option.devtool;
	      for (i = 0, len = coffeeFiles.length; i < len; i++) {
	        coffeeFile = coffeeFiles[i];
	        option.entry = {};
	        option.entry[moduleDir + "/" + (coffeeFile.replace(/\.coffee/, preExt))] = "./" + moduleDir + "/" + coffeeFile;
	        yield webpack(option).run(function() {
	          return ModuleCompiler.compileGen.next();
	        });
	      }
	      return callback();
	    } catch (error1) {
	      error = error1;
	      console.log(error);
	      return callback();
	    }
	  };

	  ModuleCompiler.compileModules = function(dir, callback) {
	    var compileBrowserModule, compileNodeModule;
	    compileNodeModule = function() {
	      var baseOption, moduleDir;
	      baseOption = ModuleCompiler.electronOption;
	      moduleDir = "modules/" + dir;
	      ModuleCompiler.compileGen = ModuleCompiler.compile({
	        baseOption: baseOption,
	        moduleDir: moduleDir,
	        callback: function() {
	          return ModuleCompiler.compileGen.next();
	        }
	      });
	      moduleDir = "modules/" + dir + "/browser";
	      ModuleCompiler.compileGen = ModuleCompiler.compile({
	        baseOption: baseOption,
	        moduleDir: moduleDir,
	        callback: callback
	      });
	      return ModuleCompiler.compileGen.next();
	    };
	    compileBrowserModule = function() {
	      var baseOption, moduleDir, preExt;
	      baseOption = ModuleCompiler.browserOption;
	      moduleDir = "modules/" + dir + "/browser";
	      preExt = ".bundle";
	      ModuleCompiler.compileGen = ModuleCompiler.compile({
	        baseOption: baseOption,
	        moduleDir: moduleDir,
	        preExt: preExt,
	        callback: compileNodeModule
	      });
	      return ModuleCompiler.compileGen.next();
	    };
	    return compileBrowserModule();
	  };

	  ModuleCompiler.config = function() {
	    return ModuleCompiler.browserOption.plugins = [new webpack.optimize.OccurenceOrderPlugin(true), new webpack.optimize.DedupePlugin()];
	  };

	  return ModuleCompiler;

	})(Compiler);

	ModuleCompiler.config();

	$(restart).on("click", function(e) {
	  return __webpack_require__(12).ipcRenderer.send("restart");
	});

	(function() {
	  var $box, $content, $fragment, fn, i, len, module, modules;
	  modules = fs.readdirSync("./modules/");
	  $box = $(".npm-update-box");
	  $content = $(npmUpdateButton.content);
	  fn = function($content) {
	    var $buttons;
	    $content = $content.clone();
	    $buttons = $content.find("button").each(function() {
	      return $(this).attr("onclick", $(this).attr("onclick").replace(/!val!/, module));
	    }).addClass(module);
	    $buttons.filter(".patch").text(module);
	    return $fragment.append($content);
	  };
	  for (i = 0, len = modules.length; i < len; i++) {
	    module = modules[i];
	    $fragment = $(document.createDocumentFragment());
	    fn($content);
	    $box.append($fragment);
	  }
	  window.npmPublish = function(uploadModules, version) {
	    var callback, dir, j, len1, results;
	    console.log("npm upload start - " + uploadModules);
	    ea.liveReloadStopFlg === true || toggleReloadFlgButton.click();
	    results = [];
	    for (j = 0, len1 = uploadModules.length; j < len1; j++) {
	      module = uploadModules[j];
	      dir = "./modules/" + module;
	      callback = (function(_this) {
	        return function() {
	          if (!ea.publishFlg) {
	            return console.log("compile finished");
	          }
	          return exec("cd " + dir + " && npm version " + version + " && npm publish", function(e, out, err) {
	            if (err) {
	              return console.log(err);
	            }
	            return console.log(out);
	          });
	        };
	      })(this);
	      results.push(ModuleCompiler.compileModules(module, callback));
	    }
	    return results;
	  };
	  window.browserChangeReloadFlg = (function(_this) {
	    return function(e) {
	      return e.currentTarget.querySelector("span").innerHTML = ea.liveReloadStopFlg = !ea.liveReloadStopFlg;
	    };
	  })(this);
	  return window.browserPublishFlg = (function(_this) {
	    return function(e) {
	      return e.currentTarget.querySelector("span").innerHTML = ea.publishFlg = !ea.publishFlg;
	    };
	  })(this);
	})();


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("jquery");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Compiler, _, fs, fse, path, webpack;

	fs = __webpack_require__(3);

	path = __webpack_require__(9);

	fse = __webpack_require__(10);

	_ = __webpack_require__(7);

	webpack = __webpack_require__(6);

	module.exports = Compiler = (function() {
	  function Compiler() {}

	  Compiler.baseOption = {
	    output: {
	      path: path.resolve(),
	      filename: "[name].js",
	      libraryTarget: "commonjs2"
	    },
	    module: {
	      loaders: [
	        {
	          test: /\.coffee$/,
	          loader: "coffee"
	        }, {
	          test: /\.cson$/,
	          loader: "cson-loader"
	        }, {
	          test: /\.html$/,
	          loader: "html"
	        }, {
	          test: /\.json$/,
	          loader: "json"
	        }, {
	          test: /\.ya?ml$/,
	          loader: "json!yaml"
	        }
	      ],
	      postLoaders: [
	        {
	          test: /\.src\.coffee$/,
	          loader: "raw"
	        }
	      ]
	    },
	    devtool: "cheap-module-eval-source-map",
	    resolve: {
	      modulesDirectories: ["modules", "node_modules"],
	      extensions: [".coffee", ".tag", ".js", ""]
	    }
	  };

	  Compiler.nodeModules = (function() {
	    var retObj;
	    retObj = {};
	    fs.readdirSync('node_modules').filter(function(x) {
	      return ['.bin'].indexOf(x) === -1;
	    }).forEach(function(mod) {
	      return retObj[mod] = 'commonjs ' + mod;
	    });
	    return retObj;
	  })();

	  Compiler.checkNum = 0;

	  Compiler._config = function() {
	    Compiler.electronOption = _.cloneDeep(Compiler.baseOption);
	    Compiler.electronOption.target = "atom";
	    Compiler.electronOption.externals = Compiler.nodeModules;
	    Compiler.electronOption.module.loaders.push({
	      test: /\.tag$/,
	      loader: "riotjs-loader",
	      query: {
	        type: 'none'
	      }
	    });
	    Compiler.nodeOption = _.cloneDeep(Compiler.baseOption);
	    Compiler.nodeOption.target = "node";
	    Compiler.nodeOption.externals = Compiler.nodeModules;
	    Compiler.browserOption = _.cloneDeep(Compiler.baseOption);
	    Compiler.browserOption.target = "web";
	    Compiler.browserOption.module.preLoaders = [];
	    Compiler.browserOption.output.library = "[name]";
	    Compiler.browserOption.output.libraryTarget = "umd";
	    return Compiler.browserOption.module.loaders.push({
	      test: /\.tag$/,
	      loader: "riotjs-loader",
	      query: {
	        type: 'none'
	      }
	    });
	  };

	  Compiler.run = function() {
	    Compiler.setFilePath();
	    delete Compiler.electronOption.devtool;
	    delete Compiler.nodeOption.devtool;
	    delete Compiler.browserOption.devtool;
	    Compiler.electronStart = function() {};
	    if (Compiler.electronOption.entry) {
	      webpack(Compiler.electronOption).run(function(err, stats) {
	        return Compiler.callback(err, stats);
	      });
	    }
	    if (Compiler.nodeOption.entry) {
	      webpack(Compiler.nodeOption).run(function(err, stats) {
	        return Compiler.callback(err, stats);
	      });
	    }
	    if (Compiler.browserOption.entry) {
	      return webpack(Compiler.browserOption).run(function(err, stats) {
	        return Compiler.callback(err, stats);
	      });
	    }
	  };

	  Compiler.start = function() {
	    Compiler.setFilePath();
	    if (Compiler.electronOption.entry) {
	      webpack(Compiler.electronOption).watch({}, function(err, stats) {
	        return Compiler.callback(err, stats);
	      });
	    }
	    if (Compiler.nodeOption.entry) {
	      webpack(Compiler.nodeOption).watch({}, function(err, stats) {
	        return Compiler.callback(err, stats);
	      });
	    }
	    if (Compiler.browserOption.entry) {
	      return webpack(Compiler.browserOption).watch({}, function(err, stats) {
	        return Compiler.callback(err, stats);
	      });
	    }
	  };

	  Compiler.setFilePath = function() {
	    Compiler.electronOption.entry = {};
	    Compiler.nodeOption.entry = {};
	    Compiler.browserOption.entry = {};
	    __webpack_require__(11).sync("./**/@(electron|app)/test/*.coffee", {
	      ignore: "./**/@(node_modules)/**"
	    }).forEach(function(filepath) {
	      return Compiler.electronOption.entry[filepath.replace(/\.coffee$/, "").replace(/^\.\//, "")] = [filepath];
	    });
	    __webpack_require__(11).sync("./**/node/test/*.coffee", {
	      ignore: "./**/@(node_modules)/**"
	    }).forEach(function(filepath) {
	      return Compiler.nodeOption.entry[filepath.replace(/\.coffee$/, "").replace(/^\.\//, "")] = [filepath];
	    });
	    return __webpack_require__(11).sync("./**/web/test/*.coffee", {
	      ignore: "./**/@(node_modules)/**"
	    }).concat(__webpack_require__(11).sync("./**/browser/*.coffee", {
	      ignore: "./**/@(node_modules)/**"
	    })).forEach(function(filepath) {
	      return Compiler.browserOption.entry[filepath.replace(/\.coffee$/, "").replace(/^\.\//, "")] = [filepath];
	    });
	  };

	  Compiler.callback = function(err, stats) {
	    var jsonStats;
	    if (err) {
	      return console.log(err);
	    }
	    jsonStats = stats.toJson();
	    console.log(stats.toString({
	      colors: true,
	      assets: false,
	      version: false,
	      hash: false,
	      timings: false,
	      chunkModules: false
	    }));
	    if (++Compiler.checkNum === 3) {
	      return Compiler.electronStart();
	    }
	  };

	  Compiler.electronStart = function() {
	    var cmd;
	    cmd = fse.readJsonSync("package.json").scripts.electron;
	    return __webpack_require__(4).exec(cmd);
	  };

	  return Compiler;

	})();

	Compiler._config();


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("fs-extra");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("glob");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("riot");

/***/ },
/* 14 */
/***/ function(module, exports) {

	var Common,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	module.exports = Common = (function() {
	  function Common() {
	    this.getHash = bind(this.getHash, this);
	    this.getParams = bind(this.getParams, this);
	  }

	  Common.prototype.params = null;

	  Common.prototype.hashs = null;

	  Common.prototype.hashSeparator = "/";

	  Common.prototype.getParams = function(url) {
	    var i, len, param, query, ref, val;
	    if (url == null) {
	      url = location.search;
	    }
	    if (decodeURI) {
	      url = decodeURI(url);
	    }
	    query = url.replace(/.*\?([^#]*)$/, "$1");
	    this.params = {};
	    if (url !== query) {
	      ref = query.split("&");
	      for (i = 0, len = ref.length; i < len; i++) {
	        val = ref[i];
	        param = val.split("=");
	        val = param[1];
	        if (val != null) {
	          if (val.match(",")) {
	            val = val.split(",");
	          }
	        } else {
	          val = true;
	        }
	        this.params[param[0]] = val;
	      }
	    }
	    return this.params;
	  };

	  Common.prototype.getHash = function(url) {
	    var hash, i, len, ref, val;
	    if (url == null) {
	      url = location.hash;
	    }
	    hash = url.replace(/.*\#(.*)$/, "$1");
	    this.hashs = [];
	    if (url !== hash) {
	      ref = hash.split(this.hashSeparator);
	      for (i = 0, len = ref.length; i < len; i++) {
	        val = ref[i];
	        this.hashs.push(val);
	      }
	    }
	    return this.hashs;
	  };

	  return Common;

	})();


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var SimpleServer;

	SimpleServer = __webpack_require__(16);

	SimpleServer.prototype.webDir = ["./web", "./test"];

	SimpleServer.prototype.watchPath = ["./package.json"];

	SimpleServer.prototype.start();

	SimpleServer.prototype.start(8081);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var SimpleServer, chokidar, fs, glob, http, lodash, mime, sio,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	fs = __webpack_require__(3);

	http = __webpack_require__(17);

	chokidar = __webpack_require__(18);

	mime = __webpack_require__(19);

	sio = __webpack_require__(20);

	glob = __webpack_require__(11);

	lodash = __webpack_require__(7);

	module.exports = SimpleServer = (function() {
	  function SimpleServer() {
	    this.checkReloadList = bind(this.checkReloadList, this);
	    this.wsEventReload = bind(this.wsEventReload, this);
	    this.wsStart = bind(this.wsStart, this);
	  }

	  SimpleServer.prototype.livereloadJs = __dirname + "/browser/livereload.js";

	  SimpleServer.prototype.livereloadPath = "/__livereload.js";

	  SimpleServer.prototype.webDir = ["./"];

	  SimpleServer.prototype.watchPath = glob.sync("./**/web/**/*.@(html|js)", {
	    ignore: "./**/node_modules/**"
	  });

	  SimpleServer.prototype.sioOption = {};

	  SimpleServer.prototype.reloadList = [];

	  SimpleServer.prototype.start = function(httpPort, wsPort) {
	    var error, lastArg, listen, path;
	    this.httpPort = httpPort != null ? httpPort : 8080;
	    this.wsPort = wsPort != null ? wsPort : this.httpPort;
	    try {
	      path = "./modules/am-simple-server/browser/livereload.js";
	      fs.statSync(path);
	      this.livereloadJs = path;
	    } catch (error1) {
	      error = error1;
	      0;
	    }
	    this.app = http.createServer((function(_this) {
	      return function(req, res) {
	        return _this.httpServerAction(req, res);
	      };
	    })(this));
	    lastArg = arguments[arguments.length - 1];
	    listen = (function(_this) {
	      return function() {
	        return _this.app.listen(_this.httpPort, typeof lastArg === "function" ? lastArg : void 0);
	      };
	    })(this);
	    setTimeout(listen, 0);
	    return this.wsStart();
	  };

	  SimpleServer.prototype._checkExistsFile = function(file) {
	    var dir, j, len, path, webDir;
	    webDir = typeof this.webDir !== "object" ? [this.webDir] : this.webDir;
	    for (j = 0, len = webDir.length; j < len; j++) {
	      dir = webDir[j];
	      path = "" + dir + file;
	      if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
	        return path;
	      }
	    }
	    return false;
	  };

	  SimpleServer.prototype.httpServerAction = function(req, res) {
	    var data, date, ip, path, type, url;
	    url = req.url.replace(/\/{2,}/, "/").replace(/\?.*$/, "");
	    if (url[url.length - 1] === "/") {
	      url += "index.html";
	    }

	    /*get file */
	    path = this._checkExistsFile(url);
	    if (path) {
	      data = fs.readFileSync(path);
	      type = mime.lookup(path);
	      res.writeHead(200, {
	        "Content-Type": type
	      });
	      if (type === "text/html") {
	        data = data.toString("utf8") + ("<script src='" + this.livereloadPath + "'></script>");
	        data = Buffer.from(data);
	      }
	      res.end(data);
	    } else if (url === this.livereloadPath) {
	      data = fs.readFileSync(this.livereloadJs);
	      type = mime.lookup(this.livereloadJs);
	      res.writeHead(200, {
	        "Content-Type": type
	      });
	      res.end(data);
	    } else {
	      res.writeHead(404);
	      res.end("404 - file not found");
	    }

	    /*access log */
	    if (url.slice(url.length - 4, +(url.length - 1) + 1 || 9e9) === "html") {
	      ip = req.connection.remoteAddress.replace(/.*[^\d](\d+\.\d+\.\d+\.\d+$)/, "$1");
	      date = new Date().toLocaleTimeString();
	      return console.log(date + " " + ip + " " + path);
	    }
	  };

	  SimpleServer.prototype.wsStart = function() {
	    var server;
	    server = this.wsPort === this.httpPort ? this.app : this.wsPort;
	    this.websocket = sio(server, this.sioOption);
	    this.websocket.on("connection", (function(_this) {
	      return function(socket) {
	        _this.reloadList.push(socket);
	        return socket.on("test", function(msg) {
	          return console.log(msg);
	        });
	      };
	    })(this));
	    return this.wsEventReload();
	  };

	  SimpleServer.prototype.wsEventReload = function() {
	    return chokidar.watch(this.watchPath, {
	      persistent: true,
	      awaitWriteFinish: {
	        stabilityThreshold: 10,
	        pollInterval: 10
	      }
	    }).on("change", (function(_this) {
	      return function(path, stat) {
	        var j, len, ref, results, socket;
	        _this.checkReloadList();
	        ref = _this.reloadList;
	        results = [];
	        for (j = 0, len = ref.length; j < len; j++) {
	          socket = ref[j];
	          results.push(_this.sendReloadEvent(socket));
	        }
	        return results;
	      };
	    })(this));
	  };

	  SimpleServer.prototype.sendReloadEvent = function(socket) {
	    return socket.emit("reload");
	  };

	  SimpleServer.prototype.sendCssReloadEvent = function(socket, filepath) {
	    return socket.emit("css reload", fs.readFileSync(filepath, {
	      encoding: "utf-8"
	    }));
	  };

	  SimpleServer.prototype.checkReloadList = function() {
	    var arr, i, j, k, len, len1, num, ref, results, socket;
	    arr = [];
	    ref = this.reloadList;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      socket = ref[i];
	      if (socket.disconnected) {
	        arr.unshift(i);
	      }
	    }
	    results = [];
	    for (k = 0, len1 = arr.length; k < len1; k++) {
	      num = arr[k];
	      results.push(this.reloadList.splice(num, 1));
	    }
	    return results;
	  };

	  return SimpleServer;

	})();

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("chokidar");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("mime");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var LunchServer, TestLunch, fse, test,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	fse = __webpack_require__(10);

	LunchServer = __webpack_require__(22);

	TestLunch = (function(superClass) {
	  extend(TestLunch, superClass);

	  function TestLunch() {
	    return TestLunch.__super__.constructor.apply(this, arguments);
	  }

	  TestLunch.prototype.webDir = "./modules/am-coffee-time/test/web/";

	  TestLunch.prototype.watchPath = "./modules/am-coffee-time/test/web/test.js";

	  TestLunch.prototype.patternFile = "./modules/am-coffee-time/test/web/case.cson";

	  TestLunch.prototype.htmlPath = (process.cwd()) + "/modules/am-coffee-time/browser/index.html";

	  TestLunch.prototype.devJsPath = (process.cwd()) + "/modules/am-coffee-time/browser/dev.js";

	  return TestLunch;

	})(LunchServer);

	test = {
	  port: (function(_this) {
	    return function(arg) {
	      var httpPort, wsPort;
	      httpPort = arg[0], wsPort = arg[1];
	      return TestLunch.prototype.start(httpPort, wsPort);
	    };
	  })(this)
	};

	__webpack_require__(24).start(test);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var LunchServer, SimpleServer, chokidar, cson, devJs, fs, html, mime,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	fs = __webpack_require__(3);

	mime = __webpack_require__(19);

	chokidar = __webpack_require__(18);

	cson = __webpack_require__(23);

	SimpleServer = __webpack_require__(16);

	html = null;

	devJs = null;

	module.exports = LunchServer = (function(superClass) {
	  extend(LunchServer, superClass);

	  function LunchServer() {
	    this.sendTestCase = bind(this.sendTestCase, this);
	    this.httpServerAction = bind(this.httpServerAction, this);
	    this.start = bind(this.start, this);
	    return LunchServer.__super__.constructor.apply(this, arguments);
	  }

	  LunchServer.prototype.watchPath = "./web/test.js";

	  LunchServer.prototype.patternFile = "./web/case.cson";

	  LunchServer.prototype.htmlPath = __dirname + "/browser/index.html";

	  LunchServer.prototype.devJsPath = __dirname + "/browser/dev.js";

	  LunchServer.prototype.sioOption = {
	    origins: "*:*"
	  };

	  LunchServer.prototype.start = function(httpPort, wsPort) {
	    this.httpPort = httpPort != null ? httpPort : 8080;
	    this.wsPort = wsPort != null ? wsPort : this.httpPort;
	    LunchServer.__super__.start.call(this, this.httpPort, this.wsPort, (function(_this) {
	      return function() {
	        return console.log("server start, on port:" + _this.httpPort);
	      };
	    })(this));
	    html = fs.readFileSync(this.htmlPath, {
	      encoding: "utf-8"
	    });
	    devJs = fs.readFileSync(this.devJsPath, {
	      encoding: "utf-8"
	    }).replace("{__WSPORT__}", this.wsPort).replace("{__TESTJS__}", this.watchPath.replace(this.webDir, ""));
	    chokidar.watch(this.patternFile).on("change", (function(_this) {
	      return function(path) {
	        var i, len, ref, results, socket;
	        ref = _this.reloadList;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          socket = ref[i];
	          results.push(_this.sendTestCase(socket));
	        }
	        return results;
	      };
	    })(this));
	    return this.websocket.on("connection", (function(_this) {
	      return function(socket) {
	        return _this.sendTestCase(socket);
	      };
	    })(this));
	  };

	  LunchServer.prototype.httpServerAction = function(req, res) {
	    var url;
	    url = req.url.replace(/\/{2,}/, "/").replace(/\?.*$/, "");
	    res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Cache-Control', 'no-cache');
	    if (url === "/") {
	      res.writeHead(200, {
	        "Content-Type": "text/html"
	      });
	      return res.end(html);
	    } else if (url === "/dev.js") {
	      res.writeHead(200, {
	        "Content-Type": "text/javascript"
	      });
	      return res.end(devJs.replace("{__DOMAIN__}", req.headers.host));
	    }
	    return LunchServer.__super__.httpServerAction.call(this, req, res);
	  };

	  LunchServer.prototype.sendTestCase = function(socket, pattern) {
	    var ext, obj;
	    ext = this.patternFile.match(/\.([^\.]+)$/)[1];
	    obj = cson.parseFile(this.patternFile, {
	      format: ext
	    });
	    return socket.emit("pattern", obj);
	  };

	  return LunchServer;

	})(SimpleServer);

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("cson");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var $, Test, actionFuncs, getRandomColor, jquery_stylesheet;

	$ = __webpack_require__(5);

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
	        AutoEvent: __webpack_require__(26)
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
/* 25 */
/***/ function(module, exports) {

	module.exports = require("jquery-stylesheet");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var AutoEvent, AutoEventBase,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	AutoEventBase = __webpack_require__(27);

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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var WholeStatus;

	window.riot = __webpack_require__(13);

	WholeStatus = __webpack_require__(29);

	__webpack_require__(30);

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
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(31)

	riot.tag2('test-list', '<test-list-count></test-list-count> <a onclick="{toRouteHash}">base</a> <recursive-item data="{opts.testPatterns}" routing=""></recursive-item> <test-iframe name="testFrame" if="{instanceUrl}" url="{instanceUrl}" config="{WholeStatus.config}"></test-iframe>', 'test-list,[riot-tag="test-list"],[data-is="test-list"]{ display: block; background-color: white; font-size: 14px; } test-list a,[riot-tag="test-list"] a,[data-is="test-list"] a{ color: blue; text-decoration: none; cursor: pointer; display: inline-block; } test-list a:hover,[riot-tag="test-list"] a:hover,[data-is="test-list"] a:hover{ opacity: 0.4; }', '', function(opts) {
	var WholeStatus, bodyStyle;

	this.WholeStatus = WholeStatus = __webpack_require__(29);

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
	    executePath = riot.route.query().path;
	    if (!executePath) {
	      return _this.update();
	    }
	    if (!/%[0-9a-f]{2}/i.test(executePath)) {
	      executePath = encodeURI(executePath);
	    }
	    if (!WholeStatus.executablePath[executePath]) {
	      _this.instanceUrl = executePath;
	      _this.update();
	      _this.tags.testFrame.setConsoleEvent();
	      return;
	    }
	    return WholeStatus.executablePath[executePath]();
	  };
	})(this);

	this.toRouteHash = (function(_this) {
	  return function() {
	    return riot.route("");
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
	    return riot.route.start();
	  };
	})(this));

	riot.route.base(WholeStatus.thisBasePath);

	riot.route("..", this.check);

	window.addEventListener("popstate", (function(_this) {
	  return function() {
	    if (!location.href.match("\\" + WholeStatus.thisBasePath)) {
	      return history.replaceState("", null, WholeStatus.thisBasePath);
	    }
	  };
	})(this));
	});

	riot.tag2('test-list-count', '<span>{WholeStatus.successSum}/{WholeStatus.executeSum}</span>', '', '', function(opts) {
	this.WholeStatus = __webpack_require__(29);

	this.WholeStatus.on("item-update", (function(_this) {
	  return function() {
	    return _this.update();
	  };
	})(this));
	});

	riot.tag2('recursive-item', '<list-line name="lines" each="{key, data in list}" list="{this}" routing="{this.parent.opts.routing}"></list-line>', ':scope { display: block; }', '', function(opts) {
	this.list = typeof opts.data === "object" ? opts.data : {};
	});

	riot.tag2('list-line', '<div class="line{isHover && \' hover\'}"> <div class="" onmouseover="{mouseOn}" onmouseout="{mouseOut}"> <span class="bold {success: success, error: error, warn: warn}"></span> <a class="tree" href="{routing}" name="treeTask" onclick="{router}">{key}</a> <a class="single" if="{url}" href="{routerExecutionPath}" name="singleTask" onclick="{router}">{url}</a> </div> <recursive-item name="item" if="{!url}" data="{data}" routing="{routing}"></recursive-item> </div> <test-iframe name="testFrame" if="{url && status.onExecute}" url="{routerExecutionPath}" config="{WholeStatus.config}"></test-iframe>', 'list-line .bold,[riot-tag="list-line"] .bold,[data-is="list-line"] .bold{font-weight:bold} list-line .tree,[riot-tag="list-line"] .tree,[data-is="list-line"] .tree{color:#333} list-line .single,[riot-tag="list-line"] .single,[data-is="list-line"] .single{padding-left:6px} list-line .line,[riot-tag="list-line"] .line,[data-is="list-line"] .line{margin-left:10px} list-line .line.hover,[riot-tag="list-line"] .line.hover,[data-is="list-line"] .line.hover{background:rgba(0,0,255,0.05)} list-line .success,[riot-tag="list-line"] .success,[data-is="list-line"] .success{color:blue} list-line .success:after,[riot-tag="list-line"] .success:after,[data-is="list-line"] .success:after{content:"〇"} list-line .warn,[riot-tag="list-line"] .warn,[data-is="list-line"] .warn{color:gold} list-line .warn:after,[riot-tag="list-line"] .warn:after,[data-is="list-line"] .warn:after{content:"△"} list-line .error,[riot-tag="list-line"] .error,[data-is="list-line"] .error{color:red} list-line .error:after,[riot-tag="list-line"] .error:after,[data-is="list-line"] .error:after{content:"×"} list-line .step,[riot-tag="list-line"] .step,[data-is="list-line"] .step{color:#333;margin-right:10px}', '', function(opts) {
	var WholeStatus, executeIframe;

	WholeStatus = this.WholeStatus = __webpack_require__(29);

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
	    var i, len, line, lines, results, trueLine;
	    lines = _this.tags.item.tags.lines;
	    if (lines.length) {
	      results = [];
	      for (i = 0, len = lines.length; i < len; i++) {
	        line = lines[i];
	        trueLine = line.tags.lines;
	        results.push(trueLine.recursivelyExecuteTask());
	      }
	      return results;
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
	    return _this.tags.testFrame.setConsoleEvent({
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
	    return riot.route("path=" + e.target.getAttribute("href"));
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

	WholeStatus.executablePath[encodeURI(this.routing)] = (function(_this) {
	  return function() {
	    return _this.multiExecuteTask();
	  };
	})(this);

	WholeStatus.executablePath[encodeURI(this.routerExecutionPath)] = (function(_this) {
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	riot.tag2('test-iframe', '<span class="{isIos ? \'ios\' : \'no-ios\'}"> <iframe if="{!isElectron}" riot-src="{opts.url}"></iframe> <webview if="{isElectron}" riot-src="{opts.url}" nodeintegration></webview> </span>', 'test-iframe .ios,[riot-tag="test-iframe"] .ios,[data-is="test-iframe"] .ios{ display: block; -webkit-overflow-scrolling: touch; overflow: auto; position: fixed; top: 0; left: 0; width: 100%; height: 100%; } test-iframe iframe,[riot-tag="test-iframe"] iframe,[data-is="test-iframe"] iframe,test-iframe webview,[riot-tag="test-iframe"] webview,[data-is="test-iframe"] webview{ background-color: white; border: none; width: 100%; height: 100%; } test-iframe .no-ios iframe,[riot-tag="test-iframe"] .no-ios iframe,[data-is="test-iframe"] .no-ios iframe,test-iframe .no-ios webview,[riot-tag="test-iframe"] .no-ios webview,[data-is="test-iframe"] .no-ios webview{ position: fixed; left: 0px; top: 0px; }', '', function(opts) {
	var WholeStatus, ref;

	WholeStatus = __webpack_require__(29);

	this.isIos = __webpack_require__(32).ios();

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
	          callbackObj.assert(false, e.message);
	        }
	        if (e.level === 0) {
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
/* 32 */
/***/ function(module, exports) {

	module.exports = require("is_js");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = {
		"allpattern": {
			"am-simple-server": "index.html",
			"am-coffee-time": {
				"port=50001,50001": "index.html"
			}
		}
	};

/***/ }
/******/ ]);
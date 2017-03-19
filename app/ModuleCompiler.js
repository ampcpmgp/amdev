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

	var ModuleCompiler, _, fs, webpack,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	_ = __webpack_require__(2);

	webpack = __webpack_require__(3);

	fs = __webpack_require__(4);

	module.exports = ModuleCompiler = (function(superClass) {
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
	          moduleDir = "modules/" + dir + "/browser";
	          ModuleCompiler.compileGen = ModuleCompiler.compile({
	            baseOption: baseOption,
	            moduleDir: moduleDir,
	            callback: callback
	          });
	          return ModuleCompiler.compileGen.next();
	        }
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

	})(__webpack_require__(5));

	ModuleCompiler.config();


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Compiler, _, fs, fse, path, webpack;

	fse = __webpack_require__(6);

	_ = __webpack_require__(2);

	webpack = __webpack_require__(3);

	fs = __webpack_require__(4);

	path = __webpack_require__(7);

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
	          loader: "coffee-loader"
	        }, {
	          test: /\.cson$/,
	          loader: "cson-loader"
	        }, {
	          test: /\.es$/,
	          loader: "babel",
	          query: {
	            presets: ["es2015", "stage-0"]
	          }
	        }, {
	          test: /\.json$/,
	          loader: "json"
	        }, {
	          test: /\.ya?ml$/,
	          loader: "json!yaml-loader"
	        }, {
	          test: /\.tag$/,
	          exclude: /node_modules/,
	          loader: "riot-tag-loader"
	        }, {
	          test: /\.raw$/,
	          loader: "raw-loader"
	        }
	      ]
	    },
	    devtool: "cheap-module-eval-source-map",
	    resolve: {
	      modulesDirectories: ["modules", "node_modules"],
	      extensions: [".coffee", ".tag", ".es", ".js", ""]
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
	    Compiler.nodeOption = _.cloneDeep(Compiler.baseOption);
	    Compiler.nodeOption.target = "node";
	    Compiler.nodeOption.externals = Compiler.nodeModules;
	    Compiler.browserOption = _.cloneDeep(Compiler.baseOption);
	    Compiler.browserOption.target = "web";
	    Compiler.browserOption.module.preLoaders = [];
	    Compiler.browserOption.output.library = "[name]";
	    return Compiler.browserOption.output.libraryTarget = "umd";
	  };

	  Compiler.run = function() {
	    Compiler.setFilePath();
	    delete Compiler.electronOption.devtool;
	    delete Compiler.nodeOption.devtool;
	    delete Compiler.browserOption.devtool;
	    Compiler.electronStart = function() {
	      return 0;
	    };
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
	    __webpack_require__(8).sync("./**/@(electron|app)/*.@(coffee|es)", {
	      ignore: "./**/@(node_modules)/**"
	    }).forEach(function(filepath) {
	      return Compiler.electronOption.entry[filepath.replace(/\.(coffee|es)$/, "").replace(/^\.\//, "")] = [filepath];
	    });
	    __webpack_require__(8).sync("./**/node/*.@(coffee|es)", {
	      ignore: "./**/@(node_modules)/**"
	    }).forEach(function(filepath) {
	      return Compiler.nodeOption.entry[filepath.replace(/\.(coffee|es)$/, "").replace(/^\.\//, "")] = [filepath];
	    });
	    return __webpack_require__(8).sync("./**/@(web|browser)/*.@(coffee|es)", {
	      ignore: "./**/@(node_modules)/**"
	    }).forEach(function(filepath) {
	      return Compiler.browserOption.entry[filepath.replace(/\.(coffee|es)$/, "").replace(/^\.\//, "")] = [filepath];
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
	    return __webpack_require__(9).exec(cmd);
	  };

	  return Compiler;

	})();

	Compiler._config();


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("fs-extra");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("glob");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ }
/******/ ]);
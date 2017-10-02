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
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("riot");

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

var Status,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Status = (function() {
  function Status() {
    this.togglePublishFlg = bind(this.togglePublishFlg, this);
    this.toggleliveReloadFlg = bind(this.toggleliveReloadFlg, this);
    this.publishFlg = true;
    localStorage.liveReloadFlg = "true";
    riot.observable(this);
  }

  Status.prototype.toggleliveReloadFlg = function() {
    localStorage.liveReloadFlg = !localStorage.liveReloadFlg;
    return this.trigger("update");
  };

  Status.prototype.togglePublishFlg = function() {
    this.publishFlg = !this.publishFlg;
    return this.trigger("update");
  };

  return Status;

})();

module.exports = new Status();


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

var ModuleCompiler, _, fs, webpack,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = __webpack_require__(11);

webpack = __webpack_require__(27);

fs = __webpack_require__(2);

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
    return ModuleCompiler.browserOption.plugins = [new webpack.optimize.OccurrenceOrderPlugin(true), new webpack.optimize.DedupePlugin()];
  };

  return ModuleCompiler;

})(__webpack_require__(33));

ModuleCompiler.config();


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

var Compiler, _, fs, fse, path, webpack;

fse = __webpack_require__(23);

_ = __webpack_require__(11);

webpack = __webpack_require__(27);

fs = __webpack_require__(2);

path = __webpack_require__(38);

module.exports = Compiler = (function() {
  function Compiler() {}

  Compiler.baseOption = {
    output: {
      path: path.resolve(),
      filename: "[name].js",
      libraryTarget: "commonjs2"
    },
    module: {
      rules: [
        {
          test: /\.coffee$/,
          use: {
            loader: "coffee-loader"
          }
        }, {
          test: /\.cson$/,
          use: {
            loader: "cson-loader"
          }
        }, {
          test: /\.es$/,
          use: {
            loader: "babel-loader",
            query: {
              presets: ["es2015", "stage-0"]
            }
          }
        }, {
          test: /\.json$/,
          use: {
            loader: "json-loader"
          }
        }, {
          test: /\.ya?ml$/,
          use: {
            loader: "yml-loader"
          }
        }, {
          test: /\.tag\.html$/,
          use: {
            loader: "riot-tag-loader"
          }
        }, {
          test: /\.raw$/,
          use: {
            loader: "raw-loader"
          }
        }
      ]
    },
    devtool: "cheap-module-eval-source-map",
    resolve: {
      modules: ["modules", "node_modules"],
      extensions: [".coffee", ".tag.html", ".es", ".js"]
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
    Compiler.browserOption = _.cloneDeep(Compiler.baseOption);
    Compiler.browserOption.target = "web";
    Compiler.browserOption.output.library = "[name]";
    return Compiler.browserOption.output.libraryTarget = "umd";
  };

  Compiler.run = function() {
    Compiler.setFilePath();
    delete Compiler.electronOption.devtool;
    delete Compiler.browserOption.devtool;
    Compiler.electronStart = function() {
      return 0;
    };
    if (Compiler.electronOption.entry) {
      webpack(Compiler.electronOption).run(function(err, stats) {
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
    if (Compiler.browserOption.entry) {
      return webpack(Compiler.browserOption).watch({}, function(err, stats) {
        return Compiler.callback(err, stats);
      });
    }
  };

  Compiler.setFilePath = function() {
    Compiler.electronOption.entry = {};
    Compiler.browserOption.entry = {};
    __webpack_require__(5).sync("./**/{,.*/**}/{electron,app}/*.{coffee,es}", {
      ignore: "./**/{,.*/**}/node_modules/**"
    }).forEach(function(filepath) {
      return Compiler.electronOption.entry[filepath.replace(/\.(coffee|es)$/, "").replace(/^\.\//, "")] = [filepath];
    });
    return __webpack_require__(5).sync("./**/{,.*/**}/{web,browser}/*.{coffee,es}", {
      ignore: "./**/{,.*/**}/node_modules/**"
    }).forEach(function(filepath) {
      return Compiler.browserOption.entry[filepath.replace(/\.(coffee|es)$/, "").replace(/^\.\//, "")] = [filepath];
    });
  };

  Compiler.callback = function(err, stats) {
    if (err) {
      return console.log(err);
    }
    console.log(stats.toString({
      colors: true,
      assets: false,
      version: false,
      hash: false,
      timings: false,
      chunkModules: false
    }));
    if (++Compiler.checkNum === 2) {
      return Compiler.electronStart();
    }
  };

  Compiler.electronStart = function() {
    var cmd;
    cmd = fse.readJsonSync("package.json").scripts.electron;
    return __webpack_require__(3).exec(cmd);
  };

  return Compiler;

})();

Compiler._config();


/***/ }),

/***/ 38:
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

var start;

start = (function(_this) {
  return function() {
    global.riot = __webpack_require__(0);
    __webpack_require__(57);
    return riot.mount('*');
  };
})(this);

document.addEventListener("DOMContentLoaded", start);


/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('control-buttons', '<button type="button" onclick="{restart}">Browser restart</button> <button type="button" onclick="{Status.toggleliveReloadFlg}"> livereload: <span>{localStorage.liveReloadFlg === ⁗true⁗ ? ⁗on⁗: ⁗off⁗}</span> </button> <button type="button" onclick="{Status.togglePublishFlg}"> publish: <span>{Status.publishFlg ? ⁗on⁗: ⁗off⁗}</span> </button>', 'control-buttons >button:first-child,[data-is="control-buttons"] >button:first-child{display:block}', '', function(opts) {
var Status;

Status = this.Status = __webpack_require__(28);

this.restart = (function(_this) {
  return function() {
    return __webpack_require__(8).ipcRenderer.send("restart");
  };
})(this);

Status.on("update", (function(_this) {
  return function() {
    return _this.update();
  };
})(this));
});

    
  

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    __webpack_require__(56)
__webpack_require__(58)

riot.tag2('app-index', '<control-buttons></control-buttons> <npm-modules></npm-modules>', '', '', function(opts) {
});

    
  

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('npm-modules', '<div class=""> npm modules: </div> <div class="module" each="{moduleName in modules}"> <div class="name-box"> <span class="name">{moduleName}</span> <button if="{exsitsGhPage(moduleName)}" class="gh-pages" data-name="{moduleName}" onclick="{openBrowserForGhPage}"> gh-page </button> <button if="{false}" type="button" name="button" data-name="{moduleName}" onclick="{yarn}">yarn</button> </div> <section class="test"> test: <button class="browser" if="{exsitsBrowserModule(moduleName)}" data-name="{moduleName}" onclick="{openBrowser}"> browser </button> <a class="browser" if="{exsitsAppModule(moduleName)}" href="{getAppTestLinkPage(moduleName)}"> app </a> </section> <div class="update"> version update: <button type="button" data-type="patch" data-name="{moduleName}" onclick="{npmPublish}">patch</button> <button type="button" data-type="minor" data-name="{moduleName}" onclick="{npmPublish}">minor</button> <button type="button" data-type="major" data-name="{moduleName}" onclick="{npmPublish}">major</button> </div> </div>', 'npm-modules >.module,[data-is="npm-modules"] >.module{border:1px solid #ccc} npm-modules >.module>.name-box>.name,[data-is="npm-modules"] >.module>.name-box>.name{display:inline-block;padding:0 6px;border:1px solid deepskyblue;border-radius:20px} npm-modules >.module>section.test>button.browser,[data-is="npm-modules"] >.module>section.test>button.browser{background:rgba(255,255,0,0.4)}', '', function(opts) {
var ModuleCompiler, Status, exec, fs, getAppTestPage, getBrowserTestPage, getGhPage, shell;

fs = __webpack_require__(2);

shell = __webpack_require__(8).shell;

exec = __webpack_require__(3).exec;

ModuleCompiler = __webpack_require__(29);

Status = __webpack_require__(28);

getBrowserTestPage = (function(_this) {
  return function(moduleName) {
    return (_this.getDirName(moduleName)) + "/test/web/list.html";
  };
})(this);

getAppTestPage = (function(_this) {
  return function(moduleName) {
    return (_this.getDirName(moduleName)) + "/test/app/list.html";
  };
})(this);

getGhPage = (function(_this) {
  return function(moduleName) {
    return (_this.getDirName(moduleName)) + "/web/index.html";
  };
})(this);

this.getDirName = (function(_this) {
  return function(moduleName) {
    return "./modules/" + moduleName;
  };
})(this);

this.exsitsBrowserModule = (function(_this) {
  return function(moduleName) {
    return fs.existsSync(getBrowserTestPage(moduleName));
  };
})(this);

this.exsitsGhPage = (function(_this) {
  return function(moduleName) {
    return fs.existsSync(getGhPage(moduleName));
  };
})(this);

this.exsitsAppModule = (function(_this) {
  return function(moduleName) {
    return fs.existsSync(getAppTestPage(moduleName));
  };
})(this);

this.getAppTestLinkPage = (function(_this) {
  return function(moduleName) {
    return "." + (getAppTestPage(moduleName));
  };
})(this);

this.openBrowser = (function(_this) {
  return function(e) {
    var ref;
    return shell.openExternal("http://localhost:" + (((ref = ea.config.server) != null ? ref.port : void 0) || 8091) + "/" + (getBrowserTestPage(e.currentTarget.dataset.name)));
  };
})(this);

this.openBrowserForGhPage = (function(_this) {
  return function(e) {
    var ref;
    return shell.openExternal("http://localhost:" + (((ref = ea.config.server) != null ? ref.port : void 0) || 8091) + "/" + (getGhPage(e.currentTarget.dataset.name)));
  };
})(this);

this.modules = fs.readdirSync("./modules/");

this.yarn = (function(_this) {
  return function(e) {
    return exec("cd " + (_this.getDirName(e.currentTarget.dataset.name)) + " && yarn", function(e, out, err) {
      if (err) {
        return console.log(err);
      }
      return console.log(out);
    });
  };
})(this);

this.npmPublish = (function(_this) {
  return function(e) {
    var callback, moduleName, type;
    moduleName = e.currentTarget.dataset.name;
    type = e.currentTarget.dataset.type;
    Status.liveReloadFlg === true && Status.toggleliveReloadFlg();
    callback = function() {
      if (!Status.publishFlg) {
        return console.log("compile finished. and not publish.");
      }
      return exec("cd " + (_this.getDirName(moduleName)) + " && npm version " + type + " && npm publish", function(e, out, err) {
        if (err) {
          return console.log(err);
        }
        return console.log(out);
      });
    };
    return ModuleCompiler.compileModules(moduleName, callback);
  };
})(this);
});

    
  

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(44);


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })

/******/ });
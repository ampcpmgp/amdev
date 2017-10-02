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
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("riot");

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

var Status, riot;

riot = __webpack_require__(0);

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

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Status = __webpack_require__(1);

var _Status2 = _interopRequireDefault(_Status);

__webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.riot = __webpack_require__(0);

exports.default = function (testPatterns) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _Status2.default.opts = opts;
  return {
    list: window.riot.mount('test-list', { testPatterns: testPatterns })
  };
};

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    __webpack_require__(19)

riot.tag2('help', '<section class="inner {isOpen ? \'show\' : \'hide\'}"> <header> Keyboard Shortcuts </header> <div> <kbd>?</kbd><span class="detail">Open this window.</span> </div> <div> <kbd>1</kbd>-<kbd>9</kbd><span class="detail">Fold [1 - 9] depth tree node.</span> </div> <div> <kbd>0</kbd><span class="detail">Unfold all tree node.</span> </div> <footer> <a href="https://github.com/ampcpmgp/amdev/tree/master/modules/am-coffee-time" target="_blank"> <octocat></octocat> </a> </footer> </section> <section class="background {isOpen ? \'show\' : \'hide\'}" onclick="{close}"></section>', 'help>section.show,[data-is="help"]>section.show{display:block} help>section.hide,[data-is="help"]>section.hide{display:none} help>.inner,[data-is="help"]>.inner{position:fixed;top:40px;left:50%;transform:translate(-50%, 0);width:80%;min-height:300px;background:white;z-index:30;padding:16px;border-radius:10px;transition:1s} help>.inner>header,[data-is="help"]>.inner>header{padding:16px;margin:-16px -16px 16px;border-bottom:1px solid #ccc} help>.inner>div>kbd,[data-is="help"]>.inner>div>kbd{display:inline-block;padding:3px 5px;font:11px "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;line-height:10px;color:#444d56;vertical-align:middle;background-color:#fafbfc;border:solid 1px #d1d5da;border-bottom-color:#c6cbd1;border-radius:3px;box-shadow:inset 0 -1px 0 #c6cbd1} help>.inner>div>.detail,[data-is="help"]>.inner>div>.detail{margin-left:10px;font-size:12px;color:#333} help>.inner>footer>a,[data-is="help"]>.inner>footer>a{display:inline-block;position:absolute;right:10px;bottom:10px;width:80px;height:80px} help>.inner>footer>a:hover,[data-is="help"]>.inner>footer>a:hover{opacity:1} help>.background,[data-is="help"]>.background{background:rgba(0,0,0,0.4);width:100%;height:100%;position:fixed;top:0;left:0;z-index:20}', '', function(opts) {
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

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('octocat', '<svg id="svg" version="1.1" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0, 0, 400, 300" style="display: block;"> <g id="svgg"><path id="path0" d="M290.219 166.125 L 288.750 167.750 290.375 166.281 C 291.269 165.474,292.000 164.743,292.000 164.656 C 292.000 164.270,291.587 164.610,290.219 166.125 M167.748 188.415 C 167.839 188.506,167.027 189.382,165.943 190.361 C 164.858 191.341,163.265 193.034,162.402 194.124 L 160.832 196.106 162.816 195.094 C 171.319 190.756,213.598 189.951,225.011 193.910 C 233.341 196.800,239.546 202.505,242.783 210.252 C 244.024 213.221,244.175 211.910,243.087 207.609 C 241.338 200.692,236.872 193.309,232.350 189.860 L 230.589 188.517 199.086 188.383 C 181.759 188.310,167.657 188.324,167.748 188.415 M154.760 209.483 C 153.607 211.350,153.136 230.398,154.250 230.129 C 154.549 230.057,154.866 226.130,155.039 220.346 C 155.198 215.031,155.483 210.432,155.672 210.126 C 155.861 209.820,155.803 209.437,155.543 209.276 C 155.282 209.115,154.930 209.209,154.760 209.483 " stroke="none" fill="#000000" fill-rule="evenodd"></path><path id="path1" d="M150.750 106.451 C 137.881 109.757,131.758 130.609,139.210 145.750 C 148.977 165.595,170.485 155.623,170.485 131.250 C 170.485 115.891,160.898 103.843,150.750 106.451 M243.396 106.695 C 230.566 110.180,224.861 133.241,233.335 147.367 C 245.629 167.860,268.528 150.030,263.209 124.104 C 260.724 111.988,252.031 104.350,243.396 106.695 M159.000 115.779 C 166.599 119.645,168.993 134.346,163.444 143.068 C 156.448 154.063,143.493 146.932,143.335 132.000 C 143.207 119.965,151.121 111.771,159.000 115.779 M249.585 116.283 C 258.187 121.805,258.931 138.524,250.896 145.748 C 240.013 155.534,228.053 136.801,235.512 121.651 C 238.642 115.292,244.537 113.043,249.585 116.283 M147.827 121.914 C 145.899 124.046,147.317 127.000,150.268 127.000 C 152.116 127.000,153.000 125.984,153.000 123.860 C 153.000 121.347,149.525 120.039,147.827 121.914 M238.986 122.526 C 237.552 125.206,240.224 127.951,242.692 126.334 C 244.110 125.405,244.482 123.182,243.400 122.100 C 242.393 121.093,239.610 121.361,238.986 122.526 " stroke="none" fill="#fefefe" fill-rule="evenodd"></path><path id="path2" d="M104.564 11.375 C 100.352 24.162,99.792 38.639,103.075 49.845 L 104.128 53.441 101.873 56.095 C 86.100 74.667,81.487 105.670,90.169 134.750 L 91.364 138.750 73.557 139.062 C 50.530 139.466,35.347 140.707,19.500 143.483 C 16.337 144.036,13.469 144.492,13.125 144.495 C 12.781 144.498,12.500 144.979,12.500 145.565 C 12.500 146.521,12.693 146.597,14.375 146.304 C 36.496 142.443,53.715 141.004,77.750 141.006 L 92.250 141.008 93.595 144.254 L 94.939 147.500 93.586 147.500 C 71.185 147.500,13.000 156.644,13.000 160.165 C 13.000 160.895,13.262 161.057,14.125 160.859 C 14.744 160.717,19.075 159.686,23.750 158.568 C 43.234 153.907,66.620 150.703,88.540 149.692 L 95.830 149.356 97.012 151.303 C 109.060 171.150,129.917 182.750,162.000 187.446 C 168.265 188.362,171.140 188.425,202.000 188.319 L 235.250 188.205 242.500 186.862 C 273.796 181.064,292.692 169.625,300.706 151.625 L 301.652 149.500 305.286 149.500 C 323.478 149.500,355.726 153.766,377.329 159.031 C 386.755 161.328,386.000 161.235,386.000 160.107 C 386.000 159.370,384.666 158.886,378.375 157.345 C 357.601 152.254,333.159 148.824,309.673 147.702 L 302.597 147.365 303.746 144.307 L 304.895 141.250 319.072 141.096 C 343.082 140.835,361.816 142.323,384.625 146.304 C 386.264 146.590,386.500 146.508,386.500 145.652 C 386.500 142.659,345.438 138.715,318.087 139.081 L 305.424 139.250 305.693 138.000 C 305.841 137.313,306.303 135.175,306.720 133.250 C 313.666 101.172,307.706 70.120,291.320 53.022 L 288.926 50.524 289.838 46.637 C 292.030 37.293,290.954 21.845,287.365 11.125 L 285.816 6.500 281.637 6.500 C 271.630 6.500,258.536 11.362,243.575 20.632 L 238.401 23.839 234.575 22.926 C 214.265 18.078,187.184 17.950,164.750 22.596 C 160.625 23.450,156.678 24.247,155.979 24.366 C 155.039 24.527,153.093 23.577,148.479 20.707 C 133.511 11.393,120.380 6.500,110.356 6.500 L 106.170 6.500 104.564 11.375 M245.968 91.515 C 273.288 93.933,287.624 116.892,280.240 146.404 C 275.160 166.709,260.447 176.575,230.750 179.588 C 220.498 180.629,180.948 180.467,171.063 179.344 C 133.944 175.127,117.220 161.628,115.066 134.149 C 113.993 120.467,118.045 110.120,128.194 100.627 C 137.529 91.894,147.772 90.163,177.750 92.253 C 191.250 93.194,205.562 93.193,219.591 92.250 C 225.729 91.838,232.213 91.431,234.000 91.346 C 235.787 91.262,237.925 91.151,238.750 91.101 C 239.575 91.050,242.823 91.236,245.968 91.515 M79.000 181.376 C 74.913 183.418,76.611 186.207,84.704 190.742 C 91.875 194.761,95.124 198.450,101.885 210.250 C 111.906 227.739,128.829 235.033,150.250 231.097 L 153.750 230.454 153.599 223.784 L 153.447 217.114 152.037 216.832 C 149.972 216.419,149.642 215.006,151.281 213.597 C 152.020 212.961,152.912 212.551,153.263 212.686 C 153.845 212.909,154.476 211.626,154.493 210.183 C 154.497 209.834,153.332 210.088,151.464 210.843 C 134.487 217.700,120.436 212.980,109.511 196.750 C 101.085 184.233,87.243 177.258,79.000 181.376 M94.028 185.422 C 95.276 186.433,95.097 188.000,93.733 188.000 C 90.946 188.000,89.894 184.870,92.570 184.539 C 92.745 184.518,93.402 184.915,94.028 185.422 M100.389 189.778 C 101.663 190.671,101.886 192.883,100.746 193.321 C 99.886 193.651,97.583 192.299,97.170 191.221 C 96.400 189.215,98.342 188.344,100.389 189.778 M177.500 192.054 C 155.629 193.971,154.135 197.916,154.606 252.500 L 154.750 269.250 153.360 272.080 C 151.703 275.455,148.851 278.166,145.197 279.839 C 138.448 282.928,139.191 286.998,146.500 286.975 C 155.982 286.946,165.085 283.288,168.717 278.048 C 172.167 273.070,172.158 273.141,172.540 247.250 C 172.911 222.175,173.025 221.017,175.573 216.439 C 178.047 211.993,178.000 211.356,177.997 249.333 C 177.994 289.947,178.241 287.502,173.718 291.767 C 169.829 295.435,169.207 297.253,171.171 299.217 C 175.425 303.471,190.668 296.556,194.737 288.526 C 196.830 284.396,197.015 281.352,197.391 244.804 C 197.725 212.294,197.811 209.819,198.625 209.306 C 201.252 207.651,201.221 207.338,201.594 239.554 C 202.149 287.541,202.004 284.249,203.722 287.750 C 206.407 293.224,211.679 297.180,219.389 299.508 C 227.420 301.932,231.857 297.670,226.386 292.786 C 220.858 287.850,221.013 289.127,221.006 248.583 C 221.000 212.089,220.979 212.362,223.352 217.038 C 225.961 222.179,226.112 223.676,226.471 248.000 C 226.865 274.706,227.265 276.651,233.310 281.262 C 241.584 287.573,260.295 289.184,257.640 283.357 C 257.050 282.062,256.543 281.638,252.264 278.863 C 244.510 273.834,244.277 272.702,244.262 240.000 L 244.250 212.750 242.335 209.250 C 236.461 198.514,230.088 194.146,217.500 192.229 C 212.209 191.424,186.001 191.309,177.500 192.054 M107.689 197.772 C 108.848 200.791,106.729 202.306,104.486 200.063 C 102.816 198.393,102.637 197.434,103.782 196.289 C 104.697 195.374,107.122 196.294,107.689 197.772 M113.706 205.342 C 115.593 207.230,115.340 209.193,113.183 209.402 C 110.678 209.646,108.479 206.221,110.100 204.600 C 111.053 203.647,112.258 203.895,113.706 205.342 M121.489 212.245 C 124.141 213.616,123.874 216.500,121.096 216.500 C 118.487 216.500,116.450 213.161,118.375 212.040 C 119.545 211.359,119.810 211.376,121.489 212.245 M132.525 215.763 C 134.965 217.025,134.198 219.500,131.367 219.500 C 128.364 219.500,126.855 217.645,128.511 215.989 C 129.699 214.801,130.570 214.752,132.525 215.763 M144.533 216.018 C 146.932 217.301,144.434 220.394,141.516 219.754 C 140.678 219.569,139.751 218.968,139.456 218.418 C 138.325 216.305,141.907 214.612,144.533 216.018 " stroke="none" fill="#1f1d1d" fill-rule="evenodd"></path><path id="path3" d="M194.125 93.358 C 194.881 93.473,196.119 93.473,196.875 93.358 C 197.631 93.244,197.012 93.150,195.500 93.150 C 193.988 93.150,193.369 93.244,194.125 93.358 M200.125 93.358 C 200.881 93.473,202.119 93.473,202.875 93.358 C 203.631 93.244,203.012 93.150,201.500 93.150 C 199.988 93.150,199.369 93.244,200.125 93.358 M150.954 116.157 C 139.188 122.335,142.426 148.000,154.970 148.000 C 165.818 148.000,170.465 128.014,161.807 118.592 C 158.358 114.837,154.932 114.068,150.954 116.157 M240.954 116.163 C 232.487 120.632,230.868 137.256,238.152 144.935 C 244.774 151.916,254.214 146.597,256.004 134.875 C 257.903 122.438,249.309 111.753,240.954 116.163 M152.273 121.727 C 155.489 124.944,150.974 129.528,147.657 126.413 C 145.589 124.470,147.162 120.500,150.000 120.500 C 150.575 120.500,151.598 121.052,152.273 121.727 M243.500 122.000 C 244.701 123.201,244.769 124.393,243.722 125.889 C 242.612 127.473,239.801 127.424,238.739 125.803 C 236.650 122.616,240.801 119.301,243.500 122.000 M195.727 150.727 C 194.147 152.308,194.130 154.514,195.685 156.322 C 198.160 159.199,203.000 157.298,203.000 153.449 C 203.000 149.925,198.291 148.163,195.727 150.727 M188.776 163.458 C 187.176 166.047,193.834 171.467,198.641 171.489 C 203.581 171.512,209.725 166.679,208.639 163.625 C 208.268 162.582,206.506 162.920,206.036 164.125 C 203.723 170.044,194.789 170.458,191.735 164.787 C 190.824 163.095,189.396 162.454,188.776 163.458 M211.875 180.353 C 212.494 180.472,213.506 180.472,214.125 180.353 C 214.744 180.234,214.238 180.136,213.000 180.136 C 211.762 180.136,211.256 180.234,211.875 180.353 " stroke="none" fill="#ab5b51" fill-rule="evenodd"></path><path id="path4" d="M148.750 91.837 C 131.101 94.040,116.725 108.242,115.245 124.937 L 114.995 127.750 115.734 124.536 C 118.279 113.472,127.913 101.607,137.522 97.702 C 144.785 94.751,157.377 94.308,177.750 96.287 C 190.412 97.518,206.509 97.428,222.500 96.038 C 250.458 93.609,260.060 95.298,269.215 104.256 C 275.124 110.037,279.112 116.575,281.035 123.634 L 282.019 127.250 281.720 124.346 C 280.612 113.598,271.377 100.486,261.349 95.424 C 253.674 91.549,242.916 90.702,221.489 92.283 C 206.536 93.386,190.045 93.395,175.296 92.308 C 165.391 91.577,152.642 91.351,148.750 91.837 M160.000 116.656 C 160.000 116.743,160.731 117.474,161.625 118.281 L 163.250 119.750 161.781 118.125 C 160.413 116.610,160.000 116.270,160.000 116.656 M126.750 162.500 C 127.824 163.600,128.815 164.500,128.953 164.500 C 129.090 164.500,128.324 163.600,127.250 162.500 C 126.176 161.400,125.185 160.500,125.047 160.500 C 124.910 160.500,125.676 161.400,126.750 162.500 M269.726 165.125 L 267.750 167.250 269.875 165.274 C 271.851 163.435,272.230 163.000,271.851 163.000 C 271.770 163.000,270.814 163.956,269.726 165.125 M197.881 171.854 C 198.503 171.973,199.403 171.969,199.881 171.844 C 200.359 171.718,199.850 171.621,198.750 171.626 C 197.650 171.632,197.259 171.734,197.881 171.854 M195.125 180.373 C 198.081 180.462,202.919 180.462,205.875 180.373 C 208.831 180.285,206.412 180.212,200.500 180.212 C 194.588 180.212,192.169 180.285,195.125 180.373 " stroke="none" fill="#c39a86" fill-rule="evenodd"></path><path id="path5" d="M144.377 95.754 C 126.683 99.117,113.640 116.822,115.424 135.054 C 118.036 161.750,133.712 174.268,170.500 179.035 C 176.838 179.857,217.421 180.223,226.611 179.542 C 264.807 176.711,280.071 163.863,281.783 133.103 C 282.367 122.609,278.201 113.047,269.215 104.256 C 260.060 95.298,250.458 93.609,222.500 96.038 C 206.476 97.431,190.396 97.519,177.750 96.282 C 165.461 95.081,149.268 94.825,144.377 95.754 M159.000 107.638 C 172.028 113.830,174.706 139.995,163.490 151.510 C 151.935 163.374,136.017 151.635,136.017 131.250 C 136.017 114.067,147.565 102.203,159.000 107.638 M252.554 107.789 C 265.704 114.388,268.015 140.016,256.503 151.584 C 244.864 163.279,229.435 151.867,229.435 131.564 C 229.435 113.681,240.867 101.924,252.554 107.789 M143.136 131.500 C 143.136 132.738,143.234 133.244,143.353 132.625 C 143.472 132.006,143.472 130.994,143.353 130.375 C 143.234 129.756,143.136 130.262,143.136 131.500 M200.658 149.582 C 204.730 151.750,203.314 158.000,198.750 158.000 C 196.254 158.000,194.495 156.191,194.516 153.648 C 194.546 150.076,197.685 147.998,200.658 149.582 M191.742 164.487 C 193.901 167.907,197.237 169.379,200.710 168.443 C 202.748 167.895,206.000 165.020,206.000 163.768 C 206.000 162.954,207.239 162.431,208.250 162.819 C 211.036 163.888,205.916 170.311,201.284 171.558 C 196.178 172.933,188.500 168.502,188.500 164.181 C 188.500 161.790,190.137 161.945,191.742 164.487 " stroke="none" fill="#f3c9b1" fill-rule="evenodd"></path><path id="path6" d="M238.384 91.362 C 239.283 91.474,240.633 91.471,241.384 91.357 C 242.135 91.243,241.400 91.152,239.750 91.155 C 238.100 91.158,237.485 91.251,238.384 91.362 M282.116 129.000 C 282.116 129.963,282.219 130.356,282.345 129.875 C 282.470 129.394,282.470 128.606,282.345 128.125 C 282.219 127.644,282.116 128.037,282.116 129.000 M185.125 180.345 C 185.606 180.470,186.394 180.470,186.875 180.345 C 187.356 180.219,186.963 180.116,186.000 180.116 C 185.037 180.116,184.644 180.219,185.125 180.345 M215.875 180.353 C 216.494 180.472,217.506 180.472,218.125 180.353 C 218.744 180.234,218.238 180.136,217.000 180.136 C 215.762 180.136,215.256 180.234,215.875 180.353 M244.187 260.750 C 244.188 263.775,244.271 264.948,244.370 263.357 C 244.470 261.765,244.469 259.290,244.368 257.857 C 244.267 256.423,244.186 257.725,244.187 260.750 M154.691 261.750 C 154.692 265.050,154.773 266.335,154.871 264.605 C 154.969 262.876,154.968 260.176,154.869 258.605 C 154.770 257.035,154.690 258.450,154.691 261.750 M201.655 277.250 C 201.658 278.900,201.751 279.515,201.862 278.616 C 201.974 277.717,201.971 276.367,201.857 275.616 C 201.743 274.865,201.652 275.600,201.655 277.250 " stroke="none" fill="#556f79" fill-rule="evenodd"></path><path id="path7" d="M197.220 265.750 C 197.220 273.450,197.289 276.530,197.374 272.595 C 197.459 268.659,197.458 262.359,197.374 258.595 C 197.289 254.830,197.220 258.050,197.220 265.750 M201.714 263.500 C 201.714 269.688,201.786 272.219,201.873 269.125 C 201.961 266.031,201.961 260.969,201.873 257.875 C 201.786 254.781,201.714 257.313,201.714 263.500 M145.132 287.359 C 145.892 287.474,147.017 287.471,147.632 287.352 C 148.247 287.233,147.625 287.139,146.250 287.143 C 144.875 287.147,144.372 287.244,145.132 287.359 M251.632 287.359 C 252.392 287.474,253.517 287.471,254.132 287.352 C 254.747 287.233,254.125 287.139,252.750 287.143 C 251.375 287.147,250.872 287.244,251.632 287.359 " stroke="none" fill="#7caabb" fill-rule="evenodd"></path><path id="path8" d="M91.590 186.125 C 91.761 187.331,93.724 187.976,94.590 187.110 C 95.229 186.471,93.723 185.000,92.430 185.000 C 91.679 185.000,91.470 185.280,91.590 186.125 M80.592 190.056 C 77.217 199.310,77.094 203.630,80.177 204.647 C 84.220 205.981,85.227 202.398,82.980 194.671 C 81.174 188.458,81.175 188.459,80.592 190.056 M97.500 190.423 C 97.500 191.515,99.004 193.000,100.111 193.000 C 101.250 193.000,101.537 191.776,100.684 190.557 C 99.741 189.211,97.500 189.116,97.500 190.423 M103.680 196.751 C 103.216 197.960,103.928 199.926,105.045 200.524 C 106.478 201.291,107.500 200.768,107.500 199.266 C 107.500 196.978,104.381 194.925,103.680 196.751 M110.192 205.221 C 109.722 206.446,110.193 207.601,111.586 208.640 C 113.215 209.856,114.500 209.470,114.500 207.766 C 114.500 205.406,110.930 203.297,110.192 205.221 M118.232 212.528 C 117.563 213.612,118.499 215.402,120.011 215.929 C 121.964 216.610,123.000 216.193,123.000 214.725 C 123.000 212.758,119.179 210.997,118.232 212.528 M151.286 213.786 C 150.228 214.844,150.296 215.856,151.467 216.482 C 153.108 217.360,153.500 217.074,153.500 215.000 C 153.500 212.821,152.693 212.378,151.286 213.786 M128.465 216.292 C 127.569 217.372,128.405 218.614,130.417 219.191 C 132.198 219.701,133.500 218.969,133.500 217.456 C 133.500 215.648,129.724 214.775,128.465 216.292 M141.114 216.020 C 138.574 217.040,139.551 219.500,142.496 219.500 C 145.069 219.500,145.990 216.852,143.717 215.988 C 143.012 215.719,142.393 215.514,142.342 215.532 C 142.292 215.549,141.739 215.769,141.114 216.020 M197.496 265.625 C 197.491 283.861,196.725 287.830,192.282 292.630 L 190.541 294.511 192.086 296.800 C 195.528 301.900,196.816 309.032,196.977 323.875 L 197.000 326.000 199.750 326.000 L 202.500 326.000 202.500 318.033 C 202.500 307.296,203.539 302.483,207.052 296.945 L 208.514 294.641 206.696 292.695 C 205.696 291.625,204.174 289.288,203.314 287.500 L 201.750 284.250 201.588 268.125 L 201.426 252.000 199.463 252.000 L 197.500 252.000 197.496 265.625 M221.003 266.067 C 221.007 284.386,221.845 288.709,226.037 292.030 L 227.943 293.539 231.096 290.394 C 232.831 288.665,235.206 286.822,236.375 286.299 C 237.544 285.776,238.500 285.213,238.500 285.048 C 238.500 284.883,237.544 284.240,236.375 283.620 C 228.793 279.592,226.500 274.446,226.500 261.455 L 226.500 253.000 224.875 252.993 C 223.981 252.989,222.744 252.851,222.125 252.685 L 221.000 252.383 221.003 266.067 M173.125 253.331 C 172.661 253.518,172.500 255.684,172.500 261.747 C 172.500 274.445,170.452 279.054,162.845 283.473 L 160.439 284.870 163.142 286.396 C 165.931 287.970,168.718 290.379,170.106 292.415 L 170.900 293.579 173.070 292.007 C 177.553 288.759,177.991 286.547,177.996 267.125 L 178.000 253.000 175.875 253.039 C 174.706 253.061,173.469 253.192,173.125 253.331 M244.583 261.875 C 244.842 270.908,247.568 276.236,253.468 279.239 C 259.286 282.201,259.574 285.923,254.187 288.531 C 250.953 290.096,247.982 293.167,246.210 296.777 L 244.750 299.750 244.592 311.060 L 244.434 322.370 241.342 322.901 L 238.250 323.433 241.250 323.178 C 242.900 323.038,247.175 322.363,250.750 321.679 C 323.548 307.742,324.772 271.525,252.943 256.794 C 243.504 254.858,244.366 254.334,244.583 261.875 M146.504 257.281 C 77.988 271.795,79.296 307.087,148.874 321.223 L 154.500 322.366 154.500 311.478 C 154.500 296.463,152.664 292.266,144.208 287.948 C 138.568 285.068,138.928 282.512,145.420 279.344 C 152.198 276.036,154.500 271.626,154.500 261.943 C 154.500 254.950,155.301 255.417,146.504 257.281 M172.616 312.724 L 172.750 324.750 175.430 324.903 L 178.111 325.056 177.869 315.903 C 177.563 304.312,176.800 301.203,174.185 300.898 L 172.483 300.699 172.616 312.724 M222.816 302.875 C 221.461 307.084,221.000 311.028,221.000 318.407 L 221.000 325.631 222.875 325.321 C 223.906 325.150,225.762 324.975,227.000 324.931 C 228.493 324.877,228.788 324.780,227.875 324.642 L 226.500 324.434 226.500 312.467 L 226.500 300.500 225.040 300.500 C 223.739 300.500,223.497 300.759,222.816 302.875 M235.625 323.845 C 236.106 323.970,236.894 323.970,237.375 323.845 C 237.856 323.719,237.463 323.616,236.500 323.616 C 235.537 323.616,235.144 323.719,235.625 323.845 " stroke="none" fill="#9bd9ef" fill-rule="evenodd"></path><path id="path9" d="M157.655 285.602 C 154.517 286.654,146.388 287.703,144.420 287.309 C 142.421 286.909,142.649 287.241,145.233 288.492 C 152.471 291.996,154.500 297.042,154.500 311.544 C 154.500 317.570,154.675 322.500,154.889 322.500 C 155.104 322.500,158.422 322.946,162.264 323.492 C 166.106 324.038,169.981 324.488,170.875 324.492 L 172.500 324.500 172.500 312.697 L 172.500 300.894 171.250 299.911 C 169.914 298.860,169.545 296.284,170.480 294.538 C 171.390 292.836,168.028 289.222,162.638 286.111 L 160.250 284.732 157.655 285.602 M238.500 285.002 C 238.500 285.192,237.544 285.776,236.375 286.299 C 232.496 288.035,227.943 293.118,228.632 294.944 C 229.329 296.791,228.691 298.993,227.242 299.739 C 226.288 300.230,226.255 300.718,226.384 312.375 L 226.518 324.500 228.134 324.506 C 229.023 324.509,233.054 324.026,237.092 323.431 L 244.434 322.350 244.592 311.050 L 244.750 299.750 246.210 296.777 C 247.966 293.199,250.948 290.099,254.098 288.574 C 255.374 287.956,256.703 287.108,257.050 286.690 C 257.568 286.066,257.358 286.084,255.877 286.790 C 253.720 287.819,245.970 287.177,241.232 285.578 C 239.730 285.070,238.500 284.811,238.500 285.002 M187.869 296.302 C 184.967 298.289,180.591 299.977,177.345 300.362 C 176.017 300.519,175.146 300.783,175.410 300.949 C 176.797 301.818,177.644 306.945,177.874 315.859 C 178.077 323.745,178.219 324.999,178.929 325.207 C 179.381 325.339,183.646 325.603,188.408 325.794 L 197.066 326.141 196.734 317.446 C 196.358 307.614,195.648 303.690,193.431 299.185 C 191.142 294.536,190.747 294.332,187.869 296.302 M207.079 296.903 C 203.537 302.486,202.500 307.269,202.500 318.033 L 202.500 326.000 207.925 326.000 C 210.908 326.000,215.046 325.857,217.120 325.681 L 220.891 325.362 221.130 316.556 C 221.350 308.479,221.826 305.093,223.268 301.375 C 223.536 300.682,223.342 300.500,222.333 300.500 C 220.398 300.500,214.071 298.072,211.159 296.211 L 208.568 294.556 207.079 296.903 " stroke="none" fill="#7cb9e5" fill-rule="evenodd"></path></g></svg>', '', '', function(opts) {
});

    
  

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
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

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('test-iframe', '<span class="{isIos ? \'ios\' : \'no-ios\'}"> <iframe if="{!isElectron}" riot-src="{opts.url}"></iframe> <webview if="{isElectron}" riot-src="{opts.url}" nodeintegration></webview> </span>', 'test-iframe,[data-is="test-iframe"]{ z-index: 100000; position: relative; } test-iframe .ios,[data-is="test-iframe"] .ios{ display: block; -webkit-overflow-scrolling: touch; overflow: auto; position: fixed; top: 0; left: 0; width: 100%; height: 100%; } test-iframe iframe,[data-is="test-iframe"] iframe,test-iframe webview,[data-is="test-iframe"] webview{ background-color: white; border: none; width: 100%; height: 100%; } test-iframe .no-ios iframe,[data-is="test-iframe"] .no-ios iframe,test-iframe .no-ios webview,[data-is="test-iframe"] .no-ios webview{ position: fixed; left: 0px; top: 0px; }', '', function(opts) {
var WholeStatus, ref,
  slice = [].slice;

WholeStatus = __webpack_require__(1);

this.isIos = __webpack_require__(24).ios();

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

    
  

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot_route__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot_route___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_riot_route__);

    var riot = __webpack_require__(0)
    __webpack_require__(20)
__webpack_require__(18)
__webpack_require__(21)


riot.tag2('test-list', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="width:0;height:0;position:absolute;overflow:hidden;"> <defs> <symbol viewbox="0 0 1024 1024" aria-labelledby="fmsi-ant-question-circle-title" id="si-ant-question-circle"> <title id="fmsi-ant-question-circle-title">icon question-circle</title> <path d="M512 0Q373 0 255 68.5T68.5 255 0 512t68.5 257T255 955.5t257 68.5 257-68.5T955.5 769t68.5-257-68.5-257T769 68.5 512 0zm30 802q0 13-9 22.5t-23 9.5q-13 0-22.5-9.5T478 802t9.5-22.5T510 770q14 0 23 9.5t9 22.5zm66-220q-36 19-51 35t-15 46v11q0 13-9 22.5t-23 9.5q-13 0-22.5-9.5T478 674v-11q0-48 24.5-79.5T578 525q35-18 55.5-52.5T654 398q0-60-42-102t-102-42q-62 0-103 37-30 28-38 68-2 11-11 18.5t-20 7.5q-16 0-25.5-11.5T306 347q12-62 59-104 59-53 145-53 87 0 147.5 61T718 398q0 58-29.5 107.5T608 582z"></path> </symbol> </defs> </svg> <div class="header"> <svg class="logo"> <text x="0" y="16" font-size="18" fill="white">AM: coffee time ☕</text> </svg> <svg class="question" onclick="{showHelp}"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#si-ant-question-circle" fill="white"></use> </svg> </div> <div class="phantom-header"></div> <help ref="help"></help> <test-status></test-status> <a onclick="{toRouteHash}">base</a> <a onclick="{toggleParameterMode}">show all parameters</a> <recursive-item ref="item" data="{opts.testPatterns}" routing="" depth="1"></recursive-item> <test-iframe ref="testFrame" if="{instanceUrl}" url="{instanceUrl}" config="{Status.config}"></test-iframe>', 'test-list,[data-is="test-list"]{display:block;width:100%;background-color:white;font-size:14px;padding-left:12px;box-sizing:border-box} test-list>.header,[data-is="test-list"]>.header{width:100%;height:30px;background:#333;position:fixed;top:0;left:0;display:flex;align-items:center;justify-content:space-between;z-index:10} test-list>.header>svg,[data-is="test-list"]>.header>svg{height:20px;padding:4px} test-list>.header>svg.logo>text,[data-is="test-list"]>.header>svg.logo>text{font-family:"Playfair Display","Georgia",serif} test-list>.header>svg.question,[data-is="test-list"]>.header>svg.question{width:20px;margin-right:6px;cursor:pointer} test-list>.phantom-header,[data-is="test-list"]>.phantom-header{height:30px;content:" ";width:100%} test-list>a,[data-is="test-list"]>a{border:1px solid #ccc} test-list a,[data-is="test-list"] a{color:blue;text-decoration:none;cursor:pointer;display:inline-block} test-list a:hover,[data-is="test-list"] a:hover{opacity:.4}', '', function(opts) {
var Status, bodyStyle, depth, fn, i, keyboardjs;

Status = this.Status = __webpack_require__(1);

keyboardjs = __webpack_require__(26);

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
    executePath = __WEBPACK_IMPORTED_MODULE_0_riot_route___default.a.query().path;
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
    return __WEBPACK_IMPORTED_MODULE_0_riot_route___default()("");
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
    return __WEBPACK_IMPORTED_MODULE_0_riot_route___default.a.start();
  };
})(this));

__WEBPACK_IMPORTED_MODULE_0_riot_route___default.a.base(Status.thisBasePath);

__WEBPACK_IMPORTED_MODULE_0_riot_route___default()("..", this.check);

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
this.Status = __webpack_require__(1).on("item-update", (function(_this) {
  return function() {
    return _this.update();
  };
})(this));
});

riot.tag2('recursive-item', '<list-line ref="lines" if="{getStrInfo(key).name !== \'default\'}" depth="{parent.opts.depth}" routing="{parent.opts.routing}" each="{data, key in opts.data}"></list-line>', 'recursive-item,[data-is="recursive-item"]{display:block;border-left:1px solid #ccc}', '', function(opts) {
var getLines;

this.getStrInfo = __webpack_require__(4).getStrInfo;

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


riot.tag2('list-line', '<open-close-icon ref="icon" length="16" stroke="#333" if="{hasChildNode}" callback="{toggleItem}"></open-close-icon> <section class="{line: 1,hover: isHover}"> <div class="{last-execute: singleTaskExecutionPath === Status.lastExecutePath}"> <span class="bold {success: success, error: error}"></span> <a class="tree" href="{routing}" onclick="{router}" onmouseover="{mouseOn}" onmouseout="{mouseOut}">{treeName}</a> <label each="{pattern, i in patterns}" class="{focus: pattern.focus}" data-id="{i}" onclick="{changePatternEvent}"> {pattern.name} </label> <a class="single" if="{singleTaskUrl}" href="{singleTaskExecutionPath}" onclick="{router}">{singleTaskName}</a> </div> <recursive-item depth="{opts.depth - 0 + 1}" ref="item" if="{hasChildNode}" data="{data}" routing="{routing}" riot-style="display: {isItemOpen ? \'block\' : \'none\'}"></recursive-item> </section> <test-iframe ref="testFrame" if="{singleTaskUrl && status.onExecute}" url="{singleTaskExecutionPath}" config="{Status.config}"></test-iframe>', 'list-line,[data-is="list-line"]{display:block;position:relative} list-line >open-close-icon,[data-is="list-line"] >open-close-icon{position:absolute;top:0;left:-8px} list-line >.line,[data-is="list-line"] >.line{display:inline-block} list-line >.line div.last-execute,[data-is="list-line"] >.line div.last-execute{border:solid 1px;display:inline-block;padding:0 8px} list-line >.line div>label,[data-is="list-line"] >.line div>label{cursor:pointer;border:1px solid rgba(255,128,0,0.6);padding:0 6px;text-align:center;display:inline-block} list-line >.line div>label.focus,[data-is="list-line"] >.line div>label.focus{background:#ff0} list-line >.line div>label:hover,[data-is="list-line"] >.line div>label:hover{opacity:.6} list-line .bold,[data-is="list-line"] .bold{font-weight:bold} list-line .tree,[data-is="list-line"] .tree{color:#333;word-break:break-all} list-line .single,[data-is="list-line"] .single{padding-left:6px} list-line .line,[data-is="list-line"] .line{margin-left:14px} list-line .line.hover,[data-is="list-line"] .line.hover{background:rgba(0,0,255,0.05)} list-line .success,[data-is="list-line"] .success{color:blue} list-line .success:after,[data-is="list-line"] .success:after{content:"〇"} list-line .error,[data-is="list-line"] .error{color:red} list-line .error:after,[data-is="list-line"] .error:after{content:"×"} list-line .step,[data-is="list-line"] .step{color:#333;margin-right:10px}', '', function(opts) {
var Parser, Status, checkLastExecute, executeIframe, initialPattern, keyStrInfo, setObservableEvent, setRouter, valStrInfo;

Status = this.Status = __webpack_require__(1);

Parser = __webpack_require__(4);

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

this.hasChildNode = typeof this.data === 'object';

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
    __WEBPACK_IMPORTED_MODULE_0_riot_route___default()("path=" + e.target.getAttribute("href"));
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

/***/ 24:
/***/ (function(module, exports) {

module.exports = require("is_js");

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = require("keyboardjs");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

var Parser;

Parser = (function() {
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

module.exports = Parser;


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

var generate, testcases;

generate = __webpack_require__(13)["default"];

testcases = __webpack_require__(59);

generate(testcases);


/***/ }),

/***/ 59:
/***/ (function(module, exports) {

module.exports = {
	"am-module": {
		"param": "./index.html"
	}
};

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(47);


/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("riot-route");

/***/ })

/******/ });
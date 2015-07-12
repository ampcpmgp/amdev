(function() {
  var AtomApp, sample_code,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AtomApp = require("../../electron/AtomApp.js");

  this.AtomProjApp = (function(_super) {
    __extends(AtomProjApp, _super);

    function AtomProjApp() {
      AtomProjApp.__super__.constructor.call(this);
      this.start();
    }

    AtomProjApp.prototype.start = function() {
      return console.log("atom proj start");
    };

    return AtomProjApp;

  })(AtomApp);

  sample_code = function() {

    /* atom app function */
    this.renderer = new this.ExternalSite("#foo", "body", "http://google.com", "prepend", "90%", "400px");
    this.renderer.$webview.off("console-message");
    this.renderer.$webview.on("console-message", (function(_this) {
      return function(e) {
        return console.log("%c" + e.originalEvent.message, "color: purple");
      };
    })(this));
    return this.renderer.$webview.on("did-finish-load", (function(_this) {
      return function() {
        _this.renderer.webview.send("set val", "input[aria-label=検索]", "DragonBall ");
        _this.renderer.webview.send("keydown", "input[aria-label=検索]", 90);
        return setTimeout(function() {
          _this.renderer.webview.send("mouseclick", "button[aria-label='Google 検索']");
          return _this.renderer.webview.send("css", "body", "transform", "scale(0.8, 0.8)");
        }, 1500);
      };
    })(this));

    /* web app function */
  };

  module.exports = this.AtomProjApp;

}).call(this);

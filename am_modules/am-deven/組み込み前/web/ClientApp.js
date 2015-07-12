(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ClientApp = (function(_super) {
    __extends(ClientApp, _super);

    function ClientApp() {
      ClientApp.__super__.constructor.call(this);
      console.log("client app");
    }

    return ClientApp;

  })(this.NodeClient);

}).call(this);

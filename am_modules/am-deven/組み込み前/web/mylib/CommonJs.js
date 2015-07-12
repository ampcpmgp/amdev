(function() {
  this.CommonJs = (function() {
    function CommonJs() {}

    CommonJs.prototype.http_port = 8080;

    CommonJs.prototype.ws_port = 8080;

    CommonJs.prototype.get_params = function(url) {
      var param, params, query, val, _i, _len, _ref;
      params = {};
      query = url.replace(/.*\?(.*)$/, "$1");
      if (url === query) {
        return params;
      } else {
        _ref = query.split("&");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          val = _ref[_i];
          param = val.split("=");
          val = param[1];
          if (val) {
            if (val.match(",")) {
              val = val.split(",");
            }
          } else {
            val = 1;
          }
          params[param[0]] = val;
        }
        return params;
      }
    };

    return CommonJs;

  })();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = this.CommonJs;
  }

}).call(this);

(function() {
  var ReadyState, store, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, store = _ref.store;

  ReadyState = (function(_super) {
    __extends(ReadyState, _super);

    function ReadyState(message) {
      this.message = message;
    }

    return ReadyState;

  })(store.Request.state.type.Init);

  util.extend(module.exports, {
    ReadyState: ReadyState
  });

}).call(this);

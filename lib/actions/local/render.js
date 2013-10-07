(function() {
  var CommandRequest, ReadyState, RenderAction, Varying, exec, store, templater, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, store = _ref.store, templater = _ref.templater;

  Varying = require('janus').varying.Varying;

  ReadyState = require('../../models/ready-state').ReadyState;

  CommandRequest = require('../../models/command').request.Command;

  exec = require('../../util/eval').exec;

  RenderAction = (function(_super) {
    __extends(RenderAction, _super);

    function RenderAction() {
      _ref1 = RenderAction.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    RenderAction.prototype._handle = function() {
      var rend,
        _this = this;
      rend = function() {
        var ex, name, opts, parsed, subject, _, _ref2, _ref3;
        parsed = _this.request.options.input.match(/^\.render (res\d+) ?(.+)?$/);
        if (parsed == null) {
          return _this.request.setValue(store.Request.state.UserError('Invalid render syntax!'));
        }
        _ = parsed[0], name = parsed[1], opts = parsed[2];
        if (opts != null) {
          try {
            opts = exec({}, opts);
          } catch (_error) {
            ex = _error;
            return _this.request.setValue(store.Request.state.UserError(ex.message));
          }
        }
        subject = (_ref2 = _this.request.options.env[name]) != null ? (_ref3 = _ref2.value) != null ? _ref3.successOrElse(null) : void 0 : void 0;
        if (subject == null) {
          return _this.request.setValue(store.Request.state.UserError("" + name + " is not a valid result!"));
        }
        return _this.request.setValue(store.Request.state.Success(new templater.WithOptions(subject, opts != null ? opts : {
          context: 'default'
        })));
      };
      window.setTimeout(rend, 0);
      return store.Store.Handled;
    };

    return RenderAction;

  })(store.Store);

  util.extend(module.exports, {
    RenderAction: RenderAction,
    registerWith: function(library) {
      return library.register(CommandRequest, RenderAction, {
        context: 'default',
        acceptor: function(request) {
          return /^\.render/.test(request.options.input);
        }
      });
    }
  });

}).call(this);

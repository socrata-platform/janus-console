(function() {
  var CommandRequest, EvalAction, Varying, exec, store, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, store = _ref.store;

  Varying = require('janus').varying.Varying;

  CommandRequest = require('../../models/command').request.Command;

  exec = require('../../util/eval').exec;

  EvalAction = (function(_super) {
    __extends(EvalAction, _super);

    function EvalAction() {
      _ref1 = EvalAction.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    EvalAction.prototype._handle = function() {
      var ev,
        _this = this;
      ev = function() {
        var currentPage, ex, k, locals, v, _ref2, _ref3, _ref4, _ref5;
        currentPage = (_ref2 = _this.options.pageHistory) != null ? _ref2.at(-1) : void 0;
        locals = {
          window: {},
          document: {},
          pageViewHistory: _this.options.pageHistory,
          pageView: currentPage,
          pageModel: currentPage != null ? currentPage.subject : void 0,
          allStores: _this.options.storeHistory,
          activeStores: (_ref3 = _this.options.storeHistory) != null ? _ref3.filter(function(_store) {
            return _store.request.map(function(state) {
              return !(state instanceof store.Request.state.type.Complete);
            });
          }) : void 0
        };
        _ref4 = _this.request.options.env;
        for (k in _ref4) {
          v = _ref4[k];
          locals[k] = v != null ? (_ref5 = v.value) != null ? _ref5.successOrElse(null) : void 0 : void 0;
        }
        try {
          return _this.request.setValue(store.Request.state.Success(exec(locals, _this.request.options.input)));
        } catch (_error) {
          ex = _error;
          return _this.request.setValue(store.Request.state.UserError(ex.message));
        }
      };
      setTimeout(ev, 0);
      return store.Store.Handled;
    };

    return EvalAction;

  })(store.Store);

  util.extend(module.exports, {
    EvalAction: EvalAction,
    registerWith: function(library) {
      return library.register(CommandRequest, EvalAction, {
        context: 'default',
        priority: -1
      });
    }
  });

}).call(this);

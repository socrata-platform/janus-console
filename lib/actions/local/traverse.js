(function() {
  var CommandRequest, List, Model, ReadyState, TraverseAction, Varying, exec, store, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, store = _ref.store, Model = _ref.Model, (_ref1 = _ref.collection, List = _ref1.List);

  Varying = require('janus').varying.Varying;

  ReadyState = require('../../models/ready-state').ReadyState;

  CommandRequest = require('../../models/command').request.Command;

  exec = require('../../util/eval').exec;

  TraverseAction = (function(_super) {
    __extends(TraverseAction, _super);

    function TraverseAction() {
      _ref2 = TraverseAction.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    TraverseAction.prototype._handle = function() {
      var verse,
        _this = this;
      verse = function() {
        var currentPage, firstPart, k, locals, objs, parts, recurse, v, _ref3, _ref4, _ref5;
        parts = _this.request.options.input.match(/[@#=][^@#=]+/g);
        if ((parts == null) || parts.length === 0) {
          return _this.request.setValue(store.Request.state.UserError('Invalid traversal syntax.'));
        } else {
          currentPage = (_ref3 = _this.options.pageHistory) != null ? _ref3.at(-1) : void 0;
          locals = {
            page: currentPage != null ? currentPage.subject : void 0
          };
          _ref4 = _this.request.options.env;
          for (k in _ref4) {
            v = _ref4[k];
            locals[k] = v != null ? (_ref5 = v.value) != null ? _ref5.successOrElse(null) : void 0 : void 0;
          }
          objs = [];
          recurse = function(idx) {
            return function(obj) {
              var ex, part;
              part = parts[idx];
              objs[idx] = obj;
              if (part == null) {
                return store.Request.state.Success(obj);
              } else if (part.charAt(0) === '=') {
                if (idx !== (parts.length - 1)) {
                  return store.Request.state.UserError('Cannot assign value multiple times!');
                } else if (idx < 2) {
                  return store.Request.state.UserError('Not sure what to assign to! Make sure you have specified a target and its key.');
                } else if (_this.request.options.final === true) {
                  try {
                    objs[idx - 2].set(parts[idx - 1].substring(1), exec(locals, part.substring(1)));
                    return store.Request.state.Success(objs[idx - 2].watch(parts[idx - 1].substring(1)));
                  } catch (_error) {
                    ex = _error;
                    return store.Request.state.UserError(ex.message);
                  }
                } else {
                  return new ReadyState("Press <enter> to assign your value to " + parts[idx - 1] + " on " + parts[idx - 2]);
                }
              } else if (part.charAt(0) === '#') {
                if (obj instanceof Model) {
                  return obj.watch(part.substring(1)).map(recurse(idx + 1));
                } else {
                  return store.Request.state.UserError('Trying to traverse into an attr on a non-Model.');
                }
              } else if (part.charAt(0) === '@') {
                if (obj instanceof List) {
                  return obj.watchAt(parseFloat(part.substring(1))).map(recurse(idx + 1));
                } else {
                  return store.Request.state.UserError('Trying to traverse into an index on a non-List.');
                }
              } else {
                return store.Request.state.UserError('How did this happen?');
              }
            };
          };
          firstPart = parts.shift().substring(1);
          return _this.request.setValue(recurse(0)(locals[firstPart]));
        }
      };
      window.setTimeout(verse, 0);
      return store.Store.Handled;
    };

    return TraverseAction;

  })(store.Store);

  util.extend(module.exports, {
    TraverseAction: TraverseAction,
    registerWith: function(library) {
      return library.register(CommandRequest, TraverseAction, {
        context: 'default',
        acceptor: function(request) {
          return /^#/.test(request.options.input);
        }
      });
    }
  });

}).call(this);

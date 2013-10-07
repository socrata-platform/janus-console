(function() {
  var Model, Repl, Repls, attribute, collection, command, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Model = _ref.Model, attribute = _ref.attribute, collection = _ref.collection;

  command = require('./command');

  Repl = (function(_super) {
    var _ref2;

    __extends(Repl, _super);

    function Repl() {
      _ref1 = Repl.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Repl.attribute('history', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref2 = _Class.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      _Class.collectionClass = command.Commands;

      _Class.prototype["default"] = function() {
        return new command.Commands([
          new command.Command({
            idx: 0
          })
        ]);
      };

      _Class.prototype.writeDefault = true;

      return _Class;

    })(attribute.CollectionAttribute));

    Repl.bind('current').from('history').flatMap(function(history) {
      return history.watchAt(-1);
    });

    Repl.prototype.newCommand = function() {
      var cmd, history;
      history = this.get('history');
      history.at(-1).set('final', true);
      cmd = new command.Command({
        idx: history.list.length,
        env: this._genEnv()
      });
      return history.add(cmd);
    };

    Repl.prototype._genEnv = function() {
      var i, result, _command, _i, _len, _ref3;
      result = {};
      _ref3 = this.get('history').list;
      for (i = _i = 0, _len = _ref3.length; _i < _len; i = ++_i) {
        _command = _ref3[i];
        result["res" + i] = _command.watch('result');
      }
      return result;
    };

    return Repl;

  }).call(this, Model);

  Repls = (function(_super) {
    __extends(Repls, _super);

    function Repls() {
      _ref2 = Repls.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Repls.modelClass = Repl;

    return Repls;

  })(collection.List);

  util.extend(module.exports, {
    Repl: Repl,
    Repls: Repls
  });

}).call(this);

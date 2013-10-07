(function() {
  var Command, CommandRequest, Commands, Model, attribute, collection, reference, store, util, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Model = _ref.Model, attribute = _ref.attribute, collection = _ref.collection, reference = _ref.reference, store = _ref.store;

  Command = (function(_super) {
    var _ref2;

    __extends(Command, _super);

    function Command() {
      _ref1 = Command.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Command.attribute('input', attribute.TextAttribute);

    Command.attribute('final', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref2 = _Class.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      _Class.prototype["default"] = function() {
        return false;
      };

      return _Class;

    })(attribute.BooleanAttribute));

    Command.bind('result').from('input').and('idx').and('env').and('final').flatMap(function(input, idx, env, final) {
      var request;
      request = new CommandRequest({
        input: input,
        idx: idx,
        env: env,
        final: final
      });
      return new reference.RequestReference(request, null, {
        map: function(_) {
          return _;
        }
      });
    });

    return Command;

  })(Model);

  Commands = (function(_super) {
    __extends(Commands, _super);

    function Commands() {
      _ref2 = Commands.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Commands.modelClass = Command;

    return Commands;

  })(collection.List);

  CommandRequest = (function(_super) {
    __extends(CommandRequest, _super);

    function CommandRequest() {
      _ref3 = CommandRequest.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    CommandRequest.prototype.deserialize = function(_) {
      return _;
    };

    return CommandRequest;

  })(store.Request);

  util.extend(module.exports, {
    Command: Command,
    Commands: Commands,
    request: {
      Command: CommandRequest
    }
  });

}).call(this);

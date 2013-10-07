(function() {
  var CommandRequest, InspectAction, ReadyState, Varying, store, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, store = _ref.store;

  Varying = require('janus').varying.Varying;

  ReadyState = require('../../models/ready-state').ReadyState;

  CommandRequest = require('../../models/command').request.Command;

  InspectAction = (function(_super) {
    __extends(InspectAction, _super);

    function InspectAction() {
      _ref1 = InspectAction.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    InspectAction.prototype._handle = function() {
      var spect,
        _this = this;
      spect = function() {
        var console;
        if (_this.request.options.final === false) {
          return _this.request.setValue(new ReadyState('Press <enter> to inspect. In inspection mode, click the object you\'d like to learn about.'));
        } else {
          _this.request.setValue(store.Request.state.Pending);
          console = $('.janusConsole');
          console.hide();
          return $('body').one('click', function(event) {
            var target;
            event.preventDefault();
            target = $(event.target);
            while (target.length > 0 && (target.data().view == null)) {
              target = target.parent();
            }
            if (target.length === 0) {
              _this.request.setValue(store.Request.state.UserError('No Janus views found in your click context.'));
            } else {
              _this.request.setValue(store.Request.state.Success(target.data().view));
            }
            console.show();
            return console.find('.consolePrompt input').focus();
          });
        }
      };
      window.setTimeout(spect, 0);
      return store.Store.Handled;
    };

    return InspectAction;

  })(store.Store);

  util.extend(module.exports, {
    InspectAction: InspectAction,
    registerWith: function(library) {
      return library.register(CommandRequest, InspectAction, {
        context: 'default',
        acceptor: function(request) {
          return request.options.input === '.inspect';
        }
      });
    }
  });

}).call(this);

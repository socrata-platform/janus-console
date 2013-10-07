(function() {
  var $, DomView, PendingTemplate, PendingView, ReadyState, ReadyTemplate, ReadyView, Request, SuccessTemplate, SuccessView, Templater, UserErrorTemplate, UserErrorView, reference, templater, util, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Templater = _ref.Templater, templater = _ref.templater, DomView = _ref.DomView, (_ref1 = _ref.store, Request = _ref1.Request), reference = _ref.reference;

  ReadyState = require('../../models/ready-state').ReadyState;

  $ = require('../../util/dollar');

  ReadyTemplate = (function(_super) {
    __extends(ReadyTemplate, _super);

    function ReadyTemplate() {
      _ref2 = ReadyTemplate.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    ReadyTemplate.prototype._dom = function() {
      return $('<span class="literal readyState"></span>');
    };

    ReadyTemplate.prototype._binding = function() {
      var binding;
      binding = ReadyTemplate.__super__._binding.call(this);
      return binding.find('.readyState').text().fromSelf().flatMap(function(state) {
        var _ref3;
        return (_ref3 = state.message) != null ? _ref3 : 'Press <enter> to execute.';
      });
    };

    return ReadyTemplate;

  })(Templater);

  ReadyView = (function(_super) {
    __extends(ReadyView, _super);

    function ReadyView() {
      _ref3 = ReadyView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    ReadyView.prototype.templateClass = ReadyTemplate;

    return ReadyView;

  })(DomView);

  PendingTemplate = (function(_super) {
    __extends(PendingTemplate, _super);

    function PendingTemplate() {
      _ref4 = PendingTemplate.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    PendingTemplate.prototype._dom = function() {
      return $('<span class="literal">..working..</span>');
    };

    return PendingTemplate;

  })(Templater);

  PendingView = (function(_super) {
    __extends(PendingView, _super);

    function PendingView() {
      _ref5 = PendingView.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    PendingView.prototype.templateClass = PendingTemplate;

    return PendingView;

  })(DomView);

  UserErrorTemplate = (function(_super) {
    __extends(UserErrorTemplate, _super);

    function UserErrorTemplate() {
      _ref6 = UserErrorTemplate.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    UserErrorTemplate.prototype._dom = function() {
      return $('<span class="literal error">Error: <span class="message"></span></span>');
    };

    UserErrorTemplate.prototype._binding = function() {
      var binding;
      binding = UserErrorTemplate.__super__._binding.call(this);
      return binding.find('.message').text().fromSelf().flatMap(function(state) {
        var _ref7;
        return (_ref7 = state.error) != null ? _ref7 : '(unknown)';
      });
    };

    return UserErrorTemplate;

  })(Templater);

  UserErrorView = (function(_super) {
    __extends(UserErrorView, _super);

    function UserErrorView() {
      _ref7 = UserErrorView.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    UserErrorView.prototype.templateClass = UserErrorTemplate;

    return UserErrorView;

  })(DomView);

  SuccessTemplate = (function(_super) {
    __extends(SuccessTemplate, _super);

    function SuccessTemplate() {
      _ref8 = SuccessTemplate.__super__.constructor.apply(this, arguments);
      return _ref8;
    }

    SuccessTemplate.prototype._dom = function() {
      return $('<div class="success"/>');
    };

    SuccessTemplate.prototype._binding = function() {
      var binding;
      binding = SuccessTemplate.__super__._binding.call(this);
      return binding.find('.success').render(this.options.app, {
        context: 'repl'
      }).fromSelf().flatMap(function(state) {
        var result;
        if (state instanceof Request.state.type.Success) {
          result = state.result;
          if (result instanceof reference.RequestReference && result.value instanceof reference.RequestResolver) {
            result.value.resolve(this.parentBinder.options.app.get('mainApp'));
          } else if (result instanceof Request) {
            this.parentBinder.options.app.get('mainApp').getStore(result).handle();
          }
        }
        return state.successOrElse(null);
      });
    };

    return SuccessTemplate;

  })(Templater);

  SuccessView = (function(_super) {
    __extends(SuccessView, _super);

    function SuccessView() {
      _ref9 = SuccessView.__super__.constructor.apply(this, arguments);
      return _ref9;
    }

    SuccessView.prototype.templateClass = SuccessTemplate;

    return SuccessView;

  })(DomView);

  util.extend(module.exports, {
    ReadyTemplate: ReadyTemplate,
    ReadyView: ReadyView,
    PendingTemplate: PendingTemplate,
    PendingView: PendingView,
    SuccessTemplate: SuccessTemplate,
    SuccessView: SuccessView,
    registerWith: function(library) {
      library.register(ReadyState, ReadyView, {
        context: 'repl'
      });
      library.register(Request.state.type.Pending, PendingView, {
        context: 'repl'
      });
      library.register(Request.state.type.UserError, UserErrorView, {
        context: 'repl'
      });
      return library.register(Request.state.type.Success, SuccessView, {
        context: 'repl'
      });
    }
  });

}).call(this);

(function() {
  var $, DomView, Repl, ReplTemplate, ReplView, Templater, markup, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView, Templater = _ref.Templater;

  Repl = require('../../models/repl').Repl;

  markup = require('./repl.html');

  $ = require('../../util/dollar');

  ReplTemplate = (function(_super) {
    __extends(ReplTemplate, _super);

    function ReplTemplate() {
      _ref1 = ReplTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ReplTemplate.prototype._dom = function() {
      return $(markup);
    };

    ReplTemplate.prototype._binding = function() {
      var binding;
      binding = ReplTemplate.__super__._binding.call(this);
      binding.find('.scrollback').render(this.options.app).from('history').end().classed('hide').from('history').flatMap(function(history) {
        return history != null ? history.watchAt(0).map(function(first) {
          return first.watch('input').map(function(input) {
            return (input == null) || input === '';
          });
        }) : void 0;
      });
      return binding.find('.prompt').render(this.options.app, {
        context: 'edit'
      }).from('current');
    };

    return ReplTemplate;

  })(Templater);

  ReplView = (function(_super) {
    __extends(ReplView, _super);

    function ReplView() {
      _ref2 = ReplView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    ReplView.prototype.templateClass = ReplTemplate;

    ReplView.prototype._wireEvents = function() {
      var dom,
        _this = this;
      dom = this.artifact();
      return dom.on('keypress', '.prompt input', function(event) {
        if (event.which === 13) {
          _this.subject.newCommand();
        }
        return dom.find('.prompt input').focus();
      });
    };

    return ReplView;

  })(DomView);

  util.extend(module.exports, {
    ReplTemplate: ReplTemplate,
    ReplView: ReplView,
    registerWith: function(library) {
      return library.register(Repl, ReplView);
    }
  });

}).call(this);

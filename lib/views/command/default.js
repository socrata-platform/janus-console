(function() {
  var $, Command, CommandTemplate, CommandView, DomView, Templater, collection, markup, util, varying, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, collection = _ref.collection, varying = _ref.varying, DomView = _ref.DomView, Templater = _ref.Templater;

  Command = require('../../models/command').Command;

  markup = require('./default.html');

  $ = require('../../util/dollar');

  CommandTemplate = (function(_super) {
    __extends(CommandTemplate, _super);

    function CommandTemplate() {
      _ref1 = CommandTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    CommandTemplate.prototype._dom = function() {
      return $(markup);
    };

    CommandTemplate.prototype._binding = function() {
      var binding;
      binding = CommandTemplate.__super__._binding.call(this);
      binding.find('.commandNumber').text().from('idx').flatMap(function(idx) {
        return "cmd" + idx;
      });
      binding.find('.commandText').text().from('input');
      binding.find('.resultNumber').text().from('idx').flatMap(function(idx) {
        return "res" + idx;
      });
      return binding.find('.resultBody').render(this.options.app, {
        context: 'repl'
      }).from('result');
    };

    return CommandTemplate;

  })(Templater);

  CommandView = (function(_super) {
    __extends(CommandView, _super);

    function CommandView() {
      _ref2 = CommandView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    CommandView.prototype.templateClass = CommandTemplate;

    return CommandView;

  })(DomView);

  util.extend(module.exports, {
    CommandTemplate: CommandTemplate,
    CommandView: CommandView,
    registerWith: function(library) {
      return library.register(Command, CommandView);
    }
  });

}).call(this);

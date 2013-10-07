(function() {
  var $, Command, CommandEditTemplate, CommandEditView, DomView, Templater, collection, markup, util, varying, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, collection = _ref.collection, varying = _ref.varying, DomView = _ref.DomView, Templater = _ref.Templater;

  Command = require('../../models/command').Command;

  markup = require('./edit.html');

  $ = require('../../util/dollar');

  CommandEditTemplate = (function(_super) {
    __extends(CommandEditTemplate, _super);

    function CommandEditTemplate() {
      _ref1 = CommandEditTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    CommandEditTemplate.prototype._dom = function() {
      return $(markup);
    };

    CommandEditTemplate.prototype._binding = function() {
      var binding;
      binding = CommandEditTemplate.__super__._binding.call(this);
      binding.find('.consolePrompt').render(this.options.app, {
        context: 'edit'
      }).fromAttribute('input');
      return binding.find('.caret, .consolePrompt').classed('invalid').from('result').flatMap(function(result) {
        return result != null ? result.invalid : void 0;
      });
    };

    return CommandEditTemplate;

  })(Templater);

  CommandEditView = (function(_super) {
    __extends(CommandEditView, _super);

    function CommandEditView() {
      _ref2 = CommandEditView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    CommandEditView.prototype.templateClass = CommandEditTemplate;

    return CommandEditView;

  })(DomView);

  util.extend(module.exports, {
    CommandEditTemplate: CommandEditTemplate,
    CommandEditView: CommandEditView,
    registerWith: function(library) {
      return library.register(Command, CommandEditView, {
        context: 'edit'
      });
    }
  });

}).call(this);

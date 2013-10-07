(function() {
  var $, DomView, FunctionTemplate, FunctionView, Templater, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Templater = _ref.Templater, DomView = _ref.DomView;

  $ = require('../../util/dollar');

  FunctionTemplate = (function(_super) {
    __extends(FunctionTemplate, _super);

    function FunctionTemplate() {
      _ref1 = FunctionTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    FunctionTemplate.prototype._dom = function() {
      return $('<span class="literal function"></span>');
    };

    FunctionTemplate.prototype._binding = function() {
      var binding;
      binding = FunctionTemplate.__super__._binding.call(this);
      return binding.find('.function').text().fromSelf().flatMap(function(f) {
        return 'Function: ' + f.toString();
      });
    };

    return FunctionTemplate;

  })(Templater);

  FunctionView = (function(_super) {
    __extends(FunctionView, _super);

    function FunctionView() {
      _ref2 = FunctionView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    FunctionView.prototype.templateClass = FunctionTemplate;

    return FunctionView;

  })(DomView);

  util.extend(module.exports, {
    FunctionTemplate: FunctionTemplate,
    FunctionView: FunctionView,
    registerWith: function(library) {
      return library.register(Function, FunctionView, {
        context: 'repl'
      });
    }
  });

}).call(this);

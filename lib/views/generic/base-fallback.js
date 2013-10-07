(function() {
  var $, Base, BaseFallbackTemplate, BaseFallbackView, DomView, Model, Templater, domViewIdent, ident, modelIdent, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, DomView = _ref.DomView, Templater = _ref.Templater, Base = _ref.Base, Model = _ref.Model;

  $ = require('../../util/dollar');

  ident = function(obj) {
    if (obj instanceof Model) {
      return modelIdent(obj);
    } else if (obj instanceof DomView) {
      return domViewIdent(obj);
    } else {
      return "instance of " + obj.constructor.name;
    }
  };

  modelIdent = function(model) {
    var detail, main, part;
    main = "instance of model " + model.constructor.name;
    detail = (function() {
      var _i, _len, _ref1, _results;
      _ref1 = [model.get('id') != null ? "id:" + (model.get('id')) : void 0, model.get('name') != null ? "name:" + (model.get('name')) : void 0];
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        part = _ref1[_i];
        if (part != null) {
          _results.push(part);
        }
      }
      return _results;
    })();
    if (detail.length === 0) {
      return main;
    } else {
      return "" + main + " {" + (detail.join('; ')) + "}";
    }
  };

  domViewIdent = function(view) {
    return "instance of view " + view.constructor.name + " bound against " + (ident(view.subject));
  };

  BaseFallbackTemplate = (function(_super) {
    __extends(BaseFallbackTemplate, _super);

    function BaseFallbackTemplate() {
      _ref1 = BaseFallbackTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    BaseFallbackTemplate.prototype._dom = function() {
      return $('<span class="literal fallback"></span>');
    };

    BaseFallbackTemplate.prototype._binding = function() {
      var binding;
      binding = BaseFallbackTemplate.__super__._binding.call(this);
      return binding.find('.fallback').text().fromSelf().flatMap(ident);
    };

    return BaseFallbackTemplate;

  })(Templater);

  BaseFallbackView = (function(_super) {
    __extends(BaseFallbackView, _super);

    function BaseFallbackView() {
      _ref2 = BaseFallbackView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    BaseFallbackView.prototype.templateClass = BaseFallbackTemplate;

    return BaseFallbackView;

  })(DomView);

  util.extend(module.exports, {
    BaseFallbackTemplate: BaseFallbackTemplate,
    BaseFallbackView: BaseFallbackView,
    registerWith: function(library) {
      return library.register(Base, BaseFallbackView, {
        context: 'repl',
        priority: -1
      });
    }
  });

}).call(this);

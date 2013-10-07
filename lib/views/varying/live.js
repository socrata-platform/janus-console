(function() {
  var $, DomView, Templater, VaryingLiveTemplate, VaryingLiveView, collection, markup, util, varying, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, collection = _ref.collection, varying = _ref.varying, DomView = _ref.DomView, Templater = _ref.Templater;

  markup = require('./live.html');

  $ = require('../../util/dollar');

  VaryingLiveTemplate = (function(_super) {
    __extends(VaryingLiveTemplate, _super);

    function VaryingLiveTemplate() {
      _ref1 = VaryingLiveTemplate.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    VaryingLiveTemplate.prototype._dom = function() {
      return $(markup);
    };

    VaryingLiveTemplate.prototype._binding = function() {
      var binding;
      binding = VaryingLiveTemplate.__super__._binding.call(this);
      return binding.find('.varyingLive').render(this.options.app).fromAux('history');
    };

    return VaryingLiveTemplate;

  })(Templater);

  VaryingLiveView = (function(_super) {
    __extends(VaryingLiveView, _super);

    function VaryingLiveView() {
      _ref2 = VaryingLiveView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    VaryingLiveView.prototype.templateClass = VaryingLiveTemplate;

    VaryingLiveView.prototype.initialize = function() {
      var _this = this;
      this._valueHistory = new collection.List();
      return this.subject.on('changed', function(newValue) {
        return _this._valueHistory.add(newValue);
      });
    };

    VaryingLiveView.prototype._auxData = function() {
      return {
        history: this._valueHistory
      };
    };

    return VaryingLiveView;

  })(DomView);

  util.extend(module.exports, {
    VaryingLiveTemplate: VaryingLiveTemplate,
    VaryingLiveView: VaryingLiveView,
    registerWith: function(library) {
      return library.register(varying.Varying, VaryingLiveView, {
        context: 'live'
      });
    }
  });

}).call(this);

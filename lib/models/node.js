(function() {
  var Model, Node, Nodes, attribute, collection, util, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('janus'), util = _ref.util, Model = _ref.Model, attribute = _ref.attribute, collection = _ref.collection;

  Node = (function(_super) {
    var _ref2;

    __extends(Node, _super);

    function Node() {
      _ref1 = Node.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Node.attribute('children', (function(_super1) {
      __extends(_Class, _super1);

      function _Class() {
        _ref2 = _Class.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      _Class.collectionClass = Nodes;

      return _Class;

    })(attribute.CollectionAttribute));

    return Node;

  }).call(this, Model);

  Nodes = (function(_super) {
    __extends(Nodes, _super);

    function Nodes() {
      _ref2 = Nodes.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Nodes.modelClass = Node;

    return Nodes;

  })(collection.List);

  util.extend(module.exports, {
    Node: Node,
    Nodes: Nodes
  });

}).call(this);

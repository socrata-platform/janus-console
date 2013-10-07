(function() {
  var util;

  util = require('janus').util;

  util.extend(module.exports, {
    exec: function(locals, statement) {
      var context, f, k, names, sandbox, that, v, values, _;
      names = (function() {
        var _results;
        _results = [];
        for (k in locals) {
          _results.push(k);
        }
        return _results;
      })();
      values = (function() {
        var _results;
        _results = [];
        for (_ in locals) {
          v = locals[_];
          _results.push(v);
        }
        return _results;
      })();
      that = {};
      context = Array.prototype.concat.call(that, names, "return " + statement);
      sandbox = new (Function.prototype.bind.apply(Function, context));
      context = Array.prototype.concat.call(that, values);
      f = Function.prototype.bind.apply(sandbox, context);
      return f();
    }
  });

}).call(this);

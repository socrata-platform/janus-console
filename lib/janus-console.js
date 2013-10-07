(function() {
  var util;

  util = require('janus').util;

  util.extend(module.exports, {
    models: {
      command: require('./models/command'),
      repl: require('./models/repl'),
      readyState: require('./models/ready-state'),
      node: require('./models/node')
    },
    actions: {
      local: {
        inspect: require('./actions/local/inspect'),
        traverse: require('./actions/local/traverse'),
        render: require('./actions/local/render'),
        "eval": require('./actions/local/eval')
      },
      registerWith: function(library, env) {
        var action, _, _ref, _results;
        _ref = this[env];
        _results = [];
        for (_ in _ref) {
          action = _ref[_];
          _results.push(typeof action.registerWith === "function" ? action.registerWith(library) : void 0);
        }
        return _results;
      }
    },
    views: {
      command: {
        "default": require('./views/command/default'),
        edit: require('./views/command/edit')
      },
      repl: {
        repl: require('./views/repl/repl')
      },
      generic: {
        requestState: require('./views/generic/request-state'),
        func: require('./views/generic/function'),
        baseFallback: require('./views/generic/base-fallback')
      },
      varying: {
        live: require('./views/varying/live')
      },
      registerWith: function(library) {
        var model, view, _, _results;
        _results = [];
        for (_ in this) {
          model = this[_];
          _results.push((function() {
            var _results1;
            _results1 = [];
            for (_ in model) {
              view = model[_];
              _results1.push(typeof view.registerWith === "function" ? view.registerWith(library) : void 0);
            }
            return _results1;
          })());
        }
        return _results;
      }
    },
    setHook: require('./util/hook')
  });

}).call(this);

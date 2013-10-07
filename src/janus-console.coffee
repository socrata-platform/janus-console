util = require('janus').util

util.extend(module.exports,

  models:
    command: require('./models/command')
    repl: require('./models/repl')
    readyState: require('./models/ready-state')

    node: require('./models/node')
    #timeline: require('./models/timeline')

  actions:
    local:
      inspect: require('./actions/local/inspect')
      traverse: require('./actions/local/traverse')
      render: require('./actions/local/render')
      eval: require('./actions/local/eval')

    registerWith: (library, env) -> action.registerWith?(library) for _, action of this[env]

  views:
    command:
      default: require('./views/command/default')
      edit: require('./views/command/edit')

    repl:
      repl: require('./views/repl/repl')

    #node:
      #repl: require('./views/node/repl')

    generic:
      requestState: require('./views/generic/request-state')
      func: require('./views/generic/function')
      baseFallback: require('./views/generic/base-fallback')

    varying:
      live: require('./views/varying/live')

    registerWith: (library) -> view.registerWith?(library) for _, view of model for _, model of this

  setHook: require('./util/hook')

)


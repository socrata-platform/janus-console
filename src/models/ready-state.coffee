{ util, store } = require('janus')

class ReadyState extends store.Request.state.type.Init
  constructor: (@message) ->

util.extend(module.exports,
  ReadyState: ReadyState
)


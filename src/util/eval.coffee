{ util } = require('janus')

util.extend module.exports,

  # NOTE: wrap calls to this w/ a try block!
  exec: (locals, statement) ->
    # adapted from http://jsfiddle.net/C3Kw7/
    names = (k for k of locals)
    values = (v for _, v of locals)

    that = {}
    context = Array.prototype.concat.call(that, names, "return #{statement}")
    sandbox = new (Function.prototype.bind.apply(Function, context))
    context = Array.prototype.concat.call(that, values)
    f = Function.prototype.bind.apply(sandbox, context)
    f()


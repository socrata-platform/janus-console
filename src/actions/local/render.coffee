{ util, store, templater } = require('janus')
Varying = require('janus').varying.Varying

ReadyState = require('../../models/ready-state').ReadyState
CommandRequest = require('../../models/command').request.Command
{ exec } = require('../../util/eval')

class RenderAction extends store.Store
  _handle: ->
    rend = =>
      parsed = this.request.options.input.match(/^\.render (res\d+) ?(.+)?$/)
      return this.request.setValue(store.Request.state.UserError('Invalid render syntax!')) unless parsed?
      [ _, name, opts ] = parsed

      if opts?
        try
          opts = exec({}, opts)
        catch ex
          return this.request.setValue(store.Request.state.UserError(ex.message))

      subject = this.request.options.env[name]?.value?.successOrElse(null)
      return this.request.setValue(store.Request.state.UserError("#{name} is not a valid result!")) unless subject?

      #if this.request.options.final is true # hmm shoot i'd need access to app to do otherwise here.
      this.request.setValue(store.Request.state.Success(new templater.WithOptions(subject, opts ? { context: 'default' })))

    window.setTimeout(rend, 0)

    store.Store.Handled

util.extend(module.exports,
  RenderAction: RenderAction

  registerWith: (library) -> library.register(CommandRequest, RenderAction, context: 'default', acceptor: (request) -> /^\.render/.test(request.options.input))
)




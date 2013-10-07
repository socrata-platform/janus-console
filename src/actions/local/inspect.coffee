{ util, store } = require('janus')
Varying = require('janus').varying.Varying

ReadyState = require('../../models/ready-state').ReadyState
CommandRequest = require('../../models/command').request.Command

class InspectAction extends store.Store
  _handle: ->
    spect = =>
      if this.request.options.final is false
        this.request.setValue(new ReadyState('Press <enter> to inspect. In inspection mode, click the object you\'d like to learn about.'))
      else
        this.request.setValue(store.Request.state.Pending)

        console = $('.janusConsole')
        console.hide()

        $('body').one 'click', (event) =>
          event.preventDefault()

          target = $(event.target)
          target = target.parent() while target.length > 0 and !target.data().view?

          if target.length is 0
            this.request.setValue(store.Request.state.UserError('No Janus views found in your click context.'))
          else
            this.request.setValue(store.Request.state.Success(target.data().view))

          console.show()
          console.find('.consolePrompt input').focus()

    window.setTimeout(spect, 0)

    store.Store.Handled

util.extend(module.exports,
  InspectAction: InspectAction

  registerWith: (library) -> library.register(CommandRequest, InspectAction, context: 'default', acceptor: (request) -> request.options.input is '.inspect')
)


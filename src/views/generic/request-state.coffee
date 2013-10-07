{ util, Templater, templater, DomView, store: { Request }, reference } = require('janus')

ReadyState = require('../../models/ready-state').ReadyState
$ = require('../../util/dollar')


class ReadyTemplate extends Templater
  _dom: -> $('<span class="literal readyState"></span>')

  _binding: ->
    binding = super()
    binding.find('.readyState').text().fromSelf().flatMap((state) -> state.message ? 'Press <enter> to execute.')

class ReadyView extends DomView
  templateClass: ReadyTemplate


class PendingTemplate extends Templater
  _dom: -> $('<span class="literal">..working..</span>')

class PendingView extends DomView
  templateClass: PendingTemplate


class UserErrorTemplate extends Templater
  _dom: -> $('<span class="literal error">Error: <span class="message"></span></span>')

  _binding: ->
    binding = super()
    binding.find('.message').text().fromSelf().flatMap((state) -> state.error ? '(unknown)')

class UserErrorView extends DomView
  templateClass: UserErrorTemplate


class SuccessTemplate extends Templater
  _dom: -> $('<div class="success"/>')

  _binding: ->
    binding = super()
    binding.find('.success').render(this.options.app, context: 'repl')
      .fromSelf()
      .flatMap (state) ->
        if state instanceof Request.state.type.Success
          result = state.result

          # autofire requests.
          if result instanceof reference.RequestReference and result.value instanceof reference.RequestResolver
            result.value.resolve(this.parentBinder.options.app.get('mainApp'))
          else if result instanceof Request
            this.parentBinder.options.app.get('mainApp').getStore(result).handle()

        state.successOrElse(null)

class SuccessView extends DomView
  templateClass: SuccessTemplate


util.extend(module.exports,
  ReadyTemplate: ReadyTemplate
  ReadyView: ReadyView

  PendingTemplate: PendingTemplate
  PendingView: PendingView

  SuccessTemplate: SuccessTemplate
  SuccessView: SuccessView

  registerWith: (library) ->
    library.register(ReadyState, ReadyView, context: 'repl')
    library.register(Request.state.type.Pending, PendingView, context: 'repl')
    library.register(Request.state.type.UserError, UserErrorView, context: 'repl')
    library.register(Request.state.type.Success, SuccessView, context: 'repl')
)


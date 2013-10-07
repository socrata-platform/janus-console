{ util, DomView, Templater } = require('janus')

Repl = require('../../models/repl').Repl

markup = require('./repl.html')
$ = require('../../util/dollar')

class ReplTemplate extends Templater
  _dom: -> $(markup)

  _binding: ->
    binding = super()

    binding.find('.scrollback')
      .render(this.options.app).from('history').end()
      .classed('hide').from('history').flatMap((history) -> history?.watchAt(0).map((first) -> first.watch('input').map((input) -> !input? or input is '')))

    binding.find('.prompt').render(this.options.app, context: 'edit').from('current')

class ReplView extends DomView
  templateClass: ReplTemplate

  _wireEvents: ->
    dom = this.artifact()

    dom.on 'keypress', '.prompt input', (event) =>
      this.subject.newCommand() if event.which is 13
      dom.find('.prompt input').focus()

util.extend(module.exports,
  ReplTemplate: ReplTemplate
  ReplView: ReplView

  registerWith: (library) -> library.register(Repl, ReplView)
)


{ util, collection, varying, DomView, Templater } = require('janus')

Command = require('../../models/command').Command

markup = require('./default.html')
$ = require('../../util/dollar')

class CommandTemplate extends Templater
  _dom: -> $(markup)

  _binding: ->
    binding = super()

    binding.find('.commandNumber').text().from('idx').flatMap((idx) -> "cmd#{idx}")
    binding.find('.commandText').text().from('input')
    binding.find('.resultNumber').text().from('idx').flatMap((idx) -> "res#{idx}")
    binding.find('.resultBody').render(this.options.app, context: 'repl').from('result')

class CommandView extends DomView
  templateClass: CommandTemplate

util.extend(module.exports,
  CommandTemplate: CommandTemplate
  CommandView: CommandView

  registerWith: (library) -> library.register(Command, CommandView)
)


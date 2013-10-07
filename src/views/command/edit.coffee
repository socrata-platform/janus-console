{ util, collection, varying, DomView, Templater } = require('janus')

Command = require('../../models/command').Command

markup = require('./edit.html')
$ = require('../../util/dollar')

class CommandEditTemplate extends Templater
  _dom: -> $(markup)

  _binding: ->
    binding = super()

    binding.find('.consolePrompt').render(this.options.app, context: 'edit').fromAttribute('input')

    binding.find('.caret, .consolePrompt').classed('invalid').from('result').flatMap((result) -> result?.invalid)

class CommandEditView extends DomView
  templateClass: CommandEditTemplate

util.extend(module.exports,
  CommandEditTemplate: CommandEditTemplate
  CommandEditView: CommandEditView

  registerWith: (library) -> library.register(Command, CommandEditView, context: 'edit')
)


{ util, Templater, DomView } = require('janus')

$ = require('../../util/dollar')

class FunctionTemplate extends Templater
  _dom: -> $('<span class="literal function"></span>')

  _binding: ->
    binding = super()
    binding.find('.function').text().fromSelf().flatMap((f) -> 'Function: ' + f.toString())

class FunctionView extends DomView
  templateClass: FunctionTemplate

util.extend(module.exports,
  FunctionTemplate: FunctionTemplate
  FunctionView: FunctionView

  registerWith: (library) -> library.register(Function, FunctionView, context: 'repl')
)


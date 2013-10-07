{ util, DomView, Templater, Base, Model } = require('janus')

$ = require('../../util/dollar')

ident = (obj) ->
  if obj instanceof Model
    modelIdent(obj)
  else if obj instanceof DomView
    domViewIdent(obj)
  else
    "instance of " + obj.constructor.name

modelIdent = (model) ->
  main = "instance of model #{model.constructor.name}"
  detail =
    part for part in [
      "id:#{model.get('id')}" if model.get('id')?
      "name:#{model.get('name')}" if model.get('name')?
    ] when part?

  if detail.length is 0
    main
  else
    "#{main} {#{detail.join('; ')}}"

domViewIdent = (view) -> "instance of view #{view.constructor.name} bound against #{ident(view.subject)}"

class BaseFallbackTemplate extends Templater
  _dom: -> $('<span class="literal fallback"></span>')

  _binding: ->
    binding = super()
    binding.find('.fallback').text().fromSelf().flatMap(ident)

class BaseFallbackView extends DomView
  templateClass: BaseFallbackTemplate


util.extend(module.exports,
  BaseFallbackTemplate: BaseFallbackTemplate
  BaseFallbackView: BaseFallbackView

  registerWith: (library) -> library.register(Base, BaseFallbackView, context: 'repl', priority: -1)
)


{ util, collection, varying, DomView, Templater } = require('janus')

markup = require('./live.html')
$ = require('../../util/dollar')

class VaryingLiveTemplate extends Templater
  _dom: -> $(markup)

  _binding: ->
    binding = super()

    binding.find('.varyingLive').render(this.options.app).fromAux('history')

class VaryingLiveView extends DomView
  templateClass: VaryingLiveTemplate

  initialize: ->
    this._valueHistory = new collection.List()
    this.subject.on('changed', (newValue) => this._valueHistory.add(newValue))

  _auxData: -> { history: this._valueHistory }

util.extend(module.exports,
  VaryingLiveTemplate: VaryingLiveTemplate
  VaryingLiveView: VaryingLiveView

  registerWith: (library) -> library.register(varying.Varying, VaryingLiveView, context: 'live')
)


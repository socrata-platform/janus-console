{ util, store } = require('janus')
Varying = require('janus').varying.Varying

CommandRequest = require('../../models/command').request.Command
{ exec } = require('../../util/eval')

class EvalAction extends store.Store
  _handle: ->
    ev = =>
      currentPage = this.options.pageHistory.at(-1)
      locals =
        window: {}
        document: {}
        pageViewHistory: this.options.pageHistory
        pageView: currentPage
        pageModel: currentPage?.subject
        allStores: this.options.storeHistory
        activeStores: this.options.storeHistory.filter((_store) -> _store.request.map((state) -> !(state instanceof store.Request.state.type.Complete)))

      for k, v of this.request.options.env
        locals[k] = v?.value?.successOrElse(null)

      try
        this.request.setValue(store.Request.state.Success(exec(locals, this.request.options.input)))

      catch ex
        this.request.setValue(store.Request.state.UserError(ex.message))

    setTimeout(ev, 0)

    store.Store.Handled

util.extend(module.exports,
  EvalAction: EvalAction

  registerWith: (library) -> library.register(CommandRequest, EvalAction, context: 'default', priority: -1)
)


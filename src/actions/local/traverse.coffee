{ util, store, Model, collection: { List } } = require('janus')
Varying = require('janus').varying.Varying

ReadyState = require('../../models/ready-state').ReadyState
CommandRequest = require('../../models/command').request.Command
{ exec } = require('../../util/eval')

class TraverseAction extends store.Store
  _handle: ->
    verse = =>
      parts = this.request.options.input.match(/[@#=][^@#=]+/g)

      if !parts? or parts.length is 0
        this.request.setValue(store.Request.state.UserError('Invalid traversal syntax.'))
      else
        currentPage = this.options.pageHistory.at(-1)

        locals =
          page: currentPage?.subject

        for k, v of this.request.options.env
          locals[k] = v?.value?.successOrElse(null)

        objs = []
        recurse = (idx) => (obj) =>
          part = parts[idx]
          objs[idx] = obj

          if !part?
            store.Request.state.Success(obj)
          else if part.charAt(0) is '='
            if idx isnt (parts.length - 1)
              store.Request.state.UserError('Cannot assign value multiple times!')
            else if idx < 2
              store.Request.state.UserError('Not sure what to assign to! Make sure you have specified a target and its key.')
            else if this.request.options.final is true
              try
                objs[idx - 2].set(parts[idx - 1].substring(1), exec(locals, part.substring(1)))
                store.Request.state.Success(objs[idx - 2].watch(parts[idx - 1].substring(1)))
              catch ex
                store.Request.state.UserError(ex.message)
            else
              new ReadyState("Press <enter> to assign your value to #{parts[idx - 1]} on #{parts[idx - 2]}")
          else if part.charAt(0) is '#'
            if obj instanceof Model
              obj.watch(part.substring(1)).map(recurse(idx + 1))
            else
              store.Request.state.UserError('Trying to traverse into an attr on a non-Model.')
          else if part.charAt(0) is '@'
            if obj instanceof List
              obj.watchAt(parseFloat(part.substring(1))).map(recurse(idx + 1))
            else
              store.Request.state.UserError('Trying to traverse into an index on a non-List.')
          else
            store.Request.state.UserError('How did this happen?')

        firstPart = parts.shift().substring(1)
        this.request.setValue(recurse(0)(locals[firstPart]))

    window.setTimeout(verse, 0)

    store.Store.Handled

util.extend(module.exports,
  TraverseAction: TraverseAction

  registerWith: (library) -> library.register(CommandRequest, TraverseAction, context: 'default', acceptor: (request) -> /^#/.test(request.options.input))
)



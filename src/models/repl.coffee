{ util, Model, attribute, collection } = require('janus')

command = require('./command')

class Repl extends Model

  @attribute 'history', class extends attribute.CollectionAttribute
    @collectionClass: command.Commands

    default: -> new command.Commands([ new command.Command( idx: 0 ) ])
    writeDefault: true

  @bind('current').from('history').flatMap((history) -> history.watchAt(-1))

  newCommand: ->
    history = this.get('history')
    history.at(-1).set('final', true)

    cmd = new command.Command( idx: history.list.length, env: this._genEnv() )
    history.add(cmd)

  _genEnv: ->
    result = {}
    result["res#{i}"] = _command.watch('result') for _command, i in this.get('history').list
    result

class Repls extends collection.List
  @modelClass: Repl

util.extend(module.exports,
  Repl: Repl
  Repls: Repls
)


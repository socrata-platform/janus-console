{ util, Model, attribute, collection, reference, store } = require('janus')

class Command extends Model
  @attribute('input', attribute.TextAttribute)

  @attribute 'final', class extends attribute.BooleanAttribute
    default: -> false

  @bind('result')
    .from('input')
    .and('idx')
    .and('env')
    .and('final')
    .flatMap (input, idx, env, final) ->
      request = new CommandRequest( input: input, idx: idx, env: env, final: final )
      new reference.RequestReference(request, null, map: (_) -> _)

class Commands extends collection.List
  @modelClass: Command


class CommandRequest extends store.Request
  deserialize: (_) -> _


util.extend(module.exports,
  Command: Command
  Commands: Commands

  request:
    Command: CommandRequest
)


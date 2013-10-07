util = require('janus').util

Repl = require('../models/repl').Repl
ReplView = require('../views/repl/repl').ReplView
$ = require('./dollar')

module.exports = (app) ->
  window.jrepl = repl = new Repl()
  replView = new ReplView(repl, app: app)
  replDom = replView.artifact()
  replView.wireEvents()

  tildeTime = 0
  $('body')
    .append(replDom)
    .on 'keydown', (event) ->
      if event.which is 192
        now = (new Date()).getTime()
        if now - tildeTime < 250 and !replDom.hasClass('shown')
          event.preventDefault()
          replDom.toggleClass('shown')

          # focus but don't scroll.
          [ x, y ] = [ window.scrollX, window.scrollY ]
          replDom.find('.consolePrompt input').focus()
          window.scrollTo(x, y)

        tildeTime = now

      if event.which is 27 and replDom.hasClass('shown')
        replDom.removeClass('shown')
        replDom.find('.consolePrompt input').blur()

  null


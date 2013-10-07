(function() {
  var $, Repl, ReplView, util;

  util = require('janus').util;

  Repl = require('../models/repl').Repl;

  ReplView = require('../views/repl/repl').ReplView;

  $ = require('./dollar');

  module.exports = function(app) {
    var repl, replDom, replView, tildeTime;
    window.jrepl = repl = new Repl();
    replView = new ReplView(repl, {
      app: app
    });
    replDom = replView.artifact();
    replView.wireEvents();
    tildeTime = 0;
    $('body').append(replDom).on('keydown', function(event) {
      var now, x, y, _ref;
      if (event.which === 192) {
        now = (new Date()).getTime();
        if (now - tildeTime < 250 && !replDom.hasClass('shown')) {
          event.preventDefault();
          replDom.toggleClass('shown');
          _ref = [window.scrollX, window.scrollY], x = _ref[0], y = _ref[1];
          replDom.find('.consolePrompt input').focus();
          window.scrollTo(x, y);
        }
        tildeTime = now;
      }
      if (event.which === 27 && replDom.hasClass('shown')) {
        replDom.removeClass('shown');
        return replDom.find('.consolePrompt input').blur();
      }
    });
    return null;
  };

}).call(this);

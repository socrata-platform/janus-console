(function() {
  module.exports = typeof window === 'undefined' ? require('zepto-node')(require('domino').createWindow()) : window.jQuery;

}).call(this);

module.exports = (grunt) ->

  # build config
  grunt.initConfig(
    clean:
      lib:
        src: 'lib/**'

    coffee:
      compile:
        expand: true
        cwd: 'src/'
        src: [ '**/*.coffee' ]
        dest: 'lib/'
        ext: '.js'

    jade:
      all:
        expand: true
        cwd: 'src/'
        src: '**/*.jade'
        dest: 'lib'
        ext: '.html.js'

    copy:
      js:
        expand: true
        cwd: 'src/'
        src: '**/*.js'
        dest: 'lib/'

    simplemocha:
      options:
        ui: 'bdd'
        reporter: 'spec'

      all:
        src: 'test/**/*.coffee'

    docco:
      build:
        cwd: 'src/'
        src: '**/*.coffee'
        dest: 'docs/'
  )

  # load plugins
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-simple-mocha')

  require('./tasks/jade')(grunt)

  # tasks
  grunt.registerTask('default', [ 'clean:lib', 'coffee:compile', 'jade:all', 'copy:js' ])
  grunt.registerTask('test', [ 'default', 'simplemocha:all' ])


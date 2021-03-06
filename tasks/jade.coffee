
# a quick task to compile jade templates into includable js files.
module.exports = (grunt) ->
  grunt.registerMultiTask 'jade', 'Compile jade into js wrapped html', ->
    for file in this.files
      file.src.filter((path) ->
        if !grunt.file.exists(path)
          grunt.log.warn("Source file '#{path}' was not found.")
          false
        else
          true
      ).forEach((path) ->
        try
          markup = require('jade').compile(grunt.file.read(path))()
        catch ex
          grunt.log.error(ex)
          grunt.fail.warn("Jade could not compile '#{path}'.")

        grunt.file.write(file.dest, "(function(){module.exports = '#{markup}';})();")
        grunt.log.writeln("File #{file.dest} created.")
      )


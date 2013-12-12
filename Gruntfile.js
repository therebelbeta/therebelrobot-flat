"use strict";

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    
    // Config stuff
    project: {
      javascript: {
        ours: ['source/js/app.js', 'source/js/**/*.js'],
        lib:  ['source/bower_components/jquery/jquery.min.js', 'source/bower_components/angular/angular.min.js', 'source/bower_components/angular/angular-route.min.js', 'source/bower_components/**/*.min.js']
      },
      secret: grunt.file.readJSON('./secret.json'),
      pkg: grunt.file.readJSON('./package.json')
    },
    less: {
      build: {
        files: {
          "app/css/style.css": "source/less/main.less"
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty:true
        },
        files: {
          "app/index.html": ["source/jade/index.jade"],
          "app/templates/states/main.html": ["source/jade/templates/states/main.jade"],
          "app/templates/states/about.html": ["source/jade/templates/states/about.jade"],
          "app/templates/states/contact.html": ["source/jade/templates/states/contact.jade"],
          "app/templates/states/cv.html": ["source/jade/templates/states/cv.jade"],
          "app/templates/states/projects.html": ["source/jade/templates/states/projects.jade"],
          "app/templates/states/stack.html": ["source/jade/templates/states/stack.jade"]
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      styles: {
        files: ['**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true,
        }
      },
      jade: {
        files: ['**/*.jade'],
        tasks: ['jade'],
        options: {
          nospawn: true,
        }
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['default']
      },
      javascript: {
        files: '<%= project.javascript.ours %>',
        tasks: ['jshint', 'ngtemplates', 'concat']
      },
      javascriptLib: {
        files: '<%= project.javascript.lib %>',
        tasks: ['jshint', 'ngtemplates', 'concat']
      }
    },
    concat: {
      javascript_ours: {
        options: {
          banner: '"use strict";\n' 
        },
        src: '<%= project.javascript.ours %>',
        dest: 'app/js/main.js'
      },
      javascript_lib: {
        src: '<%= project.javascript.lib %>',
        dest: 'app/js/lib.js'
      }
    },
    jshint: {
      options: {
        strict: false,
        laxbreak: true,
        debug: true,
        globals: {
          angular: true,
          $: true,
          _: true
        }
      },
      all: '<%= project.javascript.ours %>' 
    },
    concurrent: {
      target: {
        tasks: ['watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  
  // Default task(s).
  grunt.registerTask('default', ['less', 'jshint', 'concat', 'jade', 'concurrent']);
};
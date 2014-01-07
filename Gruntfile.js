"use strict";

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    
    // Config stuff
    project: {
      javascript: {
        ours: ['app/js/app.js', 'app/js/**/*.js'],
        lib:  ['app/bower_components/jquery/jquery.min.js', 'app/bower_components/angular/angular.min.js', 'app/bower_components/**/*.min.js']
      },
      secret: grunt.file.readJSON('./secret.json'),
      pkg: grunt.file.readJSON('./package.json')
    },

    // Tasks
    clean: {
      build: ['build']
    },

    copy: {
      build: {
        files: [
          {expand: false, src: 'app/css/style.css',              dest: 'build/css/style.css'},
          {expand: true,  cwd: 'app/img/',          src: ['**'], dest: 'build/img/'},
          {expand: true,  cwd: 'app/fonts/',        src: ['**'], dest: 'build/fonts/'},
          {expand: false, src: ['app/jsmin/main.js'],               dest: 'build/jsmin/main.js'},
          {expand: false, src: ['app/jsmin/lib.js'],                dest: 'build/jsmin/lib.js'},
          {expand: false, src: ['app/index.html'],               dest: 'build/index.html'}
        ]
      }
    },
    less: {
      build: {
        files: {
          "app/css/style.css": "app/less/main.less"
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
      },
      templates: {
        files: ['app/templates/**/*.html'],
        tasks: ['ngtemplates', 'concat']
      }
    },
    concat: {
      javascript_ours: {
        options: {
          banner: '"use strict";\n' 
        },
        src: '<%= project.javascript.ours %>',
        dest: 'app/jsmin/main.js'
      },
      javascript_lib: {
        src: '<%= project.javascript.lib %>',
        dest: 'app/jsmin/lib.js'
      }
    },
    ngtemplates: {
      target: {
        options: {
          concat: 'javascript_ours',
          module: '<%= project.pkg.name %>',
          base: 'app/templates/'
        },
        src: 'app/templates/**/*.html',
        dest: 'app/jsmin/templates.js'
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
    ngmin: {
      build: {
        files: [{
          src: 'build/jsmin/main.js',
          dest: 'build/jsmin/main.js'
        }]
      }
    },
    uglify: {
      build: {
        files: {
          'build/jsmin/main.js': ['build/jsmin/main.js']
        }
      }
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
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-concurrent');
  
  // Default task(s).
  grunt.registerTask('default', ['less', 'jshint', 'ngtemplates', 'concat', 'concurrent']);
  grunt.registerTask('build',   ['less', 'jshint', 'ngtemplates', 'concat', 'clean:build', 'copy:build', 'ngmin', 'uglify']);
};

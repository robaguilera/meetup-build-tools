'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      watch: {
        files: 'styles/sass/**/*.scss',
        tasks: ['clean', 'sass:dev']
      },
      sass: {
        dev: {
          files: {
            'styles/css/app.css': 'styles/sass/app.scss'
          }
        },
      },
      clean: {
        css: ['styles/css/*.css']
      },
      autoprefixer: {
        options: {
          browsers: ['last 2 versions']
        },
        dev: {
          options: {
            map: {
              prev: 'styles/sass/'
            }
          },
          src: 'styles/css/app.css'
        }
      },
      browserSync: {
        bsFiles: {
          src: [
            "styles/css/*.css",
            "*.html"
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: './'
          }
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['browserSync', 'watch']);
};

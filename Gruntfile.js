module.exports = function(grunt) {
    "use strict";
  
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
      eslint: {
        all: [
          "public/*.js",
          "public/js/*.js",
          "server/*.js",
          "Gruntfile.js",
        ]
      },
      watch: {
        files: ["public/**/*", "server/**/*", "!**/node_modules/**"],
        tasks: ["default", "express"],
        options: {
          spawn: false,
          interrupt: true,
          livereload: true
        }
      },
      express: {
        web: {
          options: {
            script: "server/index.js",
            port: 3000
          }
        }
      }
    });
  
    // Load NPM Tasks
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-express-server");
  
    // Register task(s).
    grunt.registerTask("default", ["eslint"]);
    grunt.registerTask("serve", ["default", "express", "watch"]);
  };
  
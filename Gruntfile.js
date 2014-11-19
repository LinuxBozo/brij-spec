'use strict';

module.exports = function (grunt) {

    //npm install
    grunt.registerTask('npm_install', 'install dependencies', function() {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('npm install', {cwd: './'}, function(err, stdout) {
            console.log(stdout);
            cb();
        });
    });

    grunt.registerTask('open_coverage', 'open coverage report in default browser', function() {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('open coverage/lcov-report/index.html', {cwd: './'}, function(err, stdout) {
            console.log(stdout);
            cb();
        });
    });


    grunt.initConfig({

        //clean node_modules directory except for grunt
        clean: {
            options:{
//               force: true
            },
            node_modules:["node_modules/*","!node_modules/grunt*"],
            coverage:["coverage/*"]

        },

        env: {
            options: {
            },
            test: {
                NODE_ENV: 'test',
                XUNIT_FILE: 'coverage/TESTS-all.xml'
            }
        },

        mochaTest: {
            test: {
                options:  {
                    reporter: 'spec-xunit-file',
                    timeout: 15000
                },
                src: ['test/**/*.js']
            }
        },

        mocha_istanbul: {
            coverage: {
                src: 'test', // the folder name for the tests
                options: {
                    recursive: true,
                    //quiet: true,
                    excludes: [],
                    mochaOptions: [
                        '--reporter', 'spec-xunit-file'
                    ]
                }
            }
        },

        jshint: {
            files: [
                'validate.js',
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-develop');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-release');

    // Register group tasks
    grunt.registerTask('clean_all', [ 'clean:node_modules', 'clean:coverage', 'npm_install' ]);
    grunt.registerTask('test', ['env:test', 'clean:coverage', 'jshint', 'mocha_istanbul']);
    grunt.registerTask('coverage', ['env:test', 'clean:coverage', 'jshint', 'mocha_istanbul', 'open_coverage' ]);

};

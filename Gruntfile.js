module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "path/to/result.css": "path/to/source.less"
                }
            },
            production: {
                files: {
                    "css/minimalTimeline.css": "less/minimalTimeline.less",
                    "css/style.css": "less/style.less"
                }
            }
        },
        cssmin: {
            options: {
                processImport: false,
                rebase: false
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 4 versions', 'ie 8']
            },
            build: {
                src: ['css/minimalTimeline.css', 'css/style.css']
            }
        },
        uglify: {
            build: {
                files: {
                    'js/minimalTimeline.min.js': ['js/minimalTimeline.js']
                }
            }
        }
    });

    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['less', 'autoprefixer', 'cssmin', 'uglify']);
};

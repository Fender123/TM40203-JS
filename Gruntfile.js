module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        stylus: {
            compile: {
                files: {
                    'app.css': 'app.styl'
                }
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true, src: ['app/**'], dest: 'dist/'
                    },
                    {
                        expand: true, src: ['index.html'], dest: 'dist/'
                    },
                    {
                        expand: true, src: ['bower_components'], dest: 'dist/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('dist', ['stylus', 'copy']);
};
var grunt = require('grunt');

function FlatenTask() {
    grunt.file.delete('dist');
    grunt.file.mkdir('dist');
    grunt.file.recurse('src', function(abspath, rootdir, subdir, filename) {
        if (subdir) {
            grunt.file.copy(abspath, 'dist/' + (subdir + '/' + filename).replace('/', '_'));
        } else {
            grunt.file.copy(abspath, 'dist/' + filename);
        }
    });
}

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screeps');
    grunt.registerTask('flaten', FlatenTask);
    grunt.registerTask('default', ['flaten', 'screeps']);
    grunt.initConfig({
        screeps: {
            options: {
                email: 'dsabelnikov@gmail.com',
                password: '1AWkSCv&k',
                branch: 'default'
            },
            dist: {
                src: [ 'dist/*.js' ]
            }
        }
    });
}

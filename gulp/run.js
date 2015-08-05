var fs      = require('fs'),
    argv    = require('yargs').argv,
    os      = require('os'),
    inject  = require('gulp-inject'),
    runType = argv.run || ''; // react.angular.backbone.vue

module.exports = function (gulp, $) {

    gulp.task('react', ['sass', 'connect', 'watch'], function () {

    });

    gulp.task('angular', ['sass', 'connect', 'watch'], function () {
        
    });

    gulp.task('backbone', ['sass', 'connect', 'watch'], function () {
        
    });

    gulp.task('vue', ['sass', 'connect', 'watch'], function () {
        
    });


    gulp.task('run', ['clean'], function () {

        switch (runType) {
            case 'react':
                gulp.start('react'); // react
            break;

            case 'angular':
                gulp.start('angular'); // angular
            break;

            case 'backbone':
                gulp.start('backbone'); // backbone
            break;

            case 'vue':
                gulp.start('backbone'); // vue
            break;
        }

    });

};
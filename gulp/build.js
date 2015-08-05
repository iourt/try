var fs    = require('fs'),
    argv  = require('yargs').argv,
    os    = require('os'),
    veros = os.platform();

module.exports = function (gulp, $) {

    // sass编译成CSS
    gulp.task('sass', function () {

        return gulp.src(cssFiles)
            .pipe($.plumber())
            .pipe($.sass())
            .on('error', $.lessReporter)
            .pipe($.autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe($.size())
            .pipe(gulp.dest(cssDest));
            // .pipe($.livereload());
    });


    gulp.task('connect', function () {
        var url = '',
            port = 9999;

        $.connect.server({
            root: "./source/",
            port: port,
            livereload: true
        });

        switch (veros) {
            case 'win32':
                url = 'start http://localhost:' + port;
            break;

            case 'darwin':
                url = 'open http://localhost:' + port;
            break;
        }

        gulp.src('')
            .pipe($.shell(url));
    });


    gulp.task('watch', function() {
        $.livereload.listen();

        gulp.src([
                './mockup/**/*.less',
                '!./mockup/package/all.less'
            ])
            .pipe($.plumber())
            .pipe($.watch(['./mockup/**/*.less', '!./mockup/package/all.less'], function() {
                gulp.src(cssFiles)
                    .pipe($.plumber())
                    .pipe($.less())
                    .on('error', $.lessReporter)
                    .pipe($.autoprefixer({
                        browsers: ['last 2 versions']
                    }))
                    .pipe($.size())
                    .pipe(gulp.dest(cssDest))
                    .pipe($.livereload());
            }));

        gulp.src('./mockup/**/*.html')
            .pipe($.watch('./mockup/**/*.html'))
            .pipe($.livereload());
    });

};
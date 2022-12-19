var gulp = require('gulp'),
    bourbon = require('bourbon').includePaths,
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

gulp.task('sass', () =>
    gulp.src("assets/sass/*.sass")
        .pipe(sass({
            includePaths: ['styles'].concat(bourbon),
            outputStyle: 'compressed',
            noCache: true
        }))
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream())
)

gulp.task('build-js', () =>
    gulp.src('assets/js/scripts.js')
        .pipe(minify())
        .pipe(gulp.dest('assets/js'))
)

gulp.task('serve', gulp.parallel('sass', function() {
    browserSync.init({
        server: "./"
    })

    gulp.watch("assets/js/*.js", gulp.series('build-js'))
    gulp.watch("assets/sass/*.sass", gulp.series('sass'))
    gulp.watch("*.html").on('change', browserSync.reload)
}))

gulp.task('build-images', () =>
    gulp.src('assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/img/'))
)

gulp.task('build-sass', () =>
    gulp.src("assets/sass/*.sass")
        .pipe(sass({
            includePaths: ['styles'].concat(bourbon),
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest("assets/css"))
)

gulp.task('build', gulp.series('build-sass', 'build-js', 'build-images'))

gulp.task('default', gulp.series('serve'))

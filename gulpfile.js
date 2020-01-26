const gulp = require('gulp');
const gulpWatch = require('gulp-watch');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const flatten = require('gulp-flatten');

const taskPug = gulp.task('pug', _ =>
    gulp
        .src('./src/*.pug')
        .pipe(
            pug()
        )
        .pipe(
            gulp.dest('./dist')
        )
);

const taskSass = gulp.task('sass', _ =>
    gulp
        .src('./src/styles/styles.scss')
        .pipe(
            sass()
                .on('error', sass.logError)
        )
        .pipe(
            gulp.dest('./dist')
        )
);

const taskImages = gulp.task('images', _ =>
    gulp
        .src('./src/assets/**/*.*')
        .pipe(flatten())
        .pipe(
            gulp.dest('./dist/images')
        )
);

const taskWatch = gulp.task('watch', _ => {
        gulp.watch('./src/**/*.scss', gulp.series('sass'));
        gulp.watch('./src/**/*.pug', gulp.series('pug'));
});

gulp.task('start', gulp.series('pug', 'sass', 'images', 'watch'));

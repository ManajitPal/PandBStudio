'use strict';

const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const webp = require('gulp-webp');
const minify = require('gulp-minify');
const merge = require('merge-stream');

gulp.task('default', () => {

    runSequence(
        'clean',
        ['images', 'scripts', 'styles', 'pages'],
        'start'
    );

    gulp.watch('src/**/*.html', ['pages-watch']);
    gulp.watch('src/sass/**/*.scss', ['styles-watch']);
    gulp.watch('src/js/**/*.js', ['scripts-watch']);

});

gulp.task('clean', () => del(['dist']));

gulp.task('start', ()=> {
    browserSync.init({
        server: './dist/'
    });
});

gulp.task('pages', () => {
	return gulp.src('src/**/*.html')
		.pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
		.pipe(gulp.dest('dist/'));

});

gulp.task('pages-watch', ['pages'], (done) => {
    browserSync.reload();
    done();
});

gulp.task('styles', () => {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(csso())
		.pipe(gulp.dest('dist/css'));

});

gulp.task('styles-watch', ['styles'], (done) => {
    browserSync.reload();
    done();
});

gulp.task('scripts', (done) => {

	let js = gulp.src('src/js/**/*.js')
            .pipe(minify())
            .pipe(gulp.dest('dist/js'));

    let sw = gulp.src('src/*.js')
            .pipe(minify())
            .pipe(gulp.dest('dist/'));

    return merge(js, sw);	
});

gulp.task('scripts-watch', ['scripts'], (done) => {
    browserSync.reload();
    done();
});

gulp.task('images', () => {

    let img = gulp.src('src/img/**/*.jpg')
                .pipe(imagemin({
                    progressive: true,
                    interlaced: true,
                    optimizationLevel: 5,
                    svgoPlugins: [{removeViewBox: true}]
                }))
                .pipe(webp())
                .pipe(gulp.dest('dist/img'));

    let logo = gulp.src('src/icons/*.svg')
                .pipe(gulp.dest('dist/icons/'))

    return merge(img, logo);

});
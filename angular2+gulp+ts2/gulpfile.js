'use strict';

const browserSync = require('browser-sync').create();

// task runner
const gulp = require('gulp');
const rename = require('gulp-rename');

// helper task
const runSequence = require('run-sequence').use(gulp);
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

// js bundler
const webpack = require('webpack');

// sass
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const isProd = ( process.env.NODE_ENV === 'production' );

// options
const path = require('./_config/path');
const browserslist = require('./_config/browserslist');
const webpackConfig = require('./_config/webpack.config');

if (!isProd) {

    delete webpackConfig.devtool;
    webpackConfig.watch = true;

    webpackConfig.plugins = ( webpackConfig.plugins || [] ).concat([
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'}
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {warnings: false}
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);

}

gulp.task('browser-sync', () => {

    browserSync.init({
        server: {
            baseDir: path.DEST.HTML + '/',
            directory: true
        },
        startPath: './'
    });

});

gulp.task('webpack', (done) => {

    webpack(webpackConfig, (error, status) => {

        const time = ( status.endTime - status.startTime ) * 0.001;
        console.log('webpack after', time.toFixed(2) + ' sec');
        browserSync.reload();
        done();

    });

});

gulp.task('sass', () => {

    return gulp.src( path.SRC.SCSS + '/**/*.scss')
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( sass({outputStyle: 'compressed', sourceComments: false}).on('error', sass.logError) )
        .pipe( autoprefixer(browserslist) )
        .pipe( sourcemaps.write('./') )
        .pipe( plumber.stop() )
        .pipe( gulp.dest(path.DEST.CSS) );

});

gulp.task('watch', () => {

    gulp.watch(['../index.html'], () => {
        browserSync.reload();
    });

    gulp.watch([ path.SRC.SCSS + '/**/*.scss'], () => {
        runSequence('sass', browserSync.reload);
    });

});


gulp.task('build', (callback) => {

    return runSequence(['sass', 'webpack'], callback);

});

gulp.task('default', (callback) => {

    return runSequence(['browser-sync', 'watch'], ['sass', 'webpack'], callback);

});
'use strict';

let browserSync = require('browser-sync').create();

// load all plugins in 'devDependencies' into the variable $
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies']
});
const pkg = require('./package.json');

// status
let isProd = ( process.env.NODE_ENV === 'production' );

// options
const path = pkg.paths;
const PORT = { serve: pkg.serve.port[process.env.NODE_ENV], live: pkg.serve.port['live'] };
const browserslist = require('./_config/browserslist');
const webpackConfig = require('./_config/webpack.config');

const log = (color, msg) => $.logs(color, $.cool() + ' ･｡ﾟ.*･｡ﾟ ' + msg);
const onError = (err) => console.log(err);

const banner = [
    "/**",
    " * @project        <%= pkg.name %>",
    " * @author         <%= pkg.author %>",
    " * @build          " + $.moment().format("llll") + " ET",
    " * @release        " + $.gitRevSync.long() + " [" + $.gitRevSync.branch() + "]",
    " * @copyright      Copyright (c) " + $.moment().format("YYYY") + ", <%= pkg.copyright %>",
    " *",
    " */",
    ""
].join("\n");

gulp.task('browser-sync', function () {

  return $.browserSync.init({
    port: PORT.live,
    proxy: `localhost:${PORT.serve}`,
    startPath: '/'
  });

});

gulp.task('nodemon', (cb) => {

  let stream = $.nodemon({
    script: 'app.js',
    env: { 'NODE_ENV': process.env.NODE_ENV },
    ext: 'js ejs',
    // watch: ['app.js', 'routes/', 'config/', 'models/', 'views/'],
    watch: ['app.js'],
    ignore: ['webpack.config.js', 'path.js', 'browserslist.js'],
    tasks: function (changedFiles) {
      let tasks = [];
      changedFiles.forEach(function (file) {
        let filename = file.split('/');
        filename = filename[filename.length - 1];
        log('magenta', `file changed : ${filename}`);
        // if (path.extname(file) === '.js' && !~tasks.indexOf('lint')) tasks.push('lint')
        // if (path.extname(file) === '.css' && !~tasks.indexOf('cssmin')) tasks.push('cssmin')
      });
      return tasks;
    }
  });

  stream.on('start', function () {
    $.gutil.log(gutil.colors.green($.cool() + ' Nodemon server started!'));
    if ($.browserSync.active) $.browserSync.reload();
  }).on('restart', function () {
    $.gutil.log($.gutil.colors.blue($.cool() + ' Nodemon server restarted!'));
  }).on('crash', function () {
    $.gutil.log($.gutil.colors.red($.cool() + ' Nodemon has crashed!'));
    stream.emit('restart', 10);  // restart the server in 10 seconds
  });

  $.opn(`http://localhost:${PORT.serve}`);
  return stream;

});

gulp.task('webpack', function (done) {

  if (!isProd) {
    log('red', 'Development Mode');
    webpackConfig.devtool = 'cheap-source-map';
    webpackConfig.watch = true;
  } else {
    log('green', 'Production Mode');
  }

  webpack(webpackConfig, function (err, stats) {

    if (err) throw new $.gutil.PluginError("webpack", err);

    let time = ( stats.endTime - stats.startTime ) * 0.001;
    log('cyan', 'webpack compile: ' + time.toFixed(2) + ' sec');

  });

  if (done) done();
});

gulp.task('sass', () => {

  log("-> Compiling scss");
  return gulp.src(path.SRC.SCSS + '/**/*.scss')
      .pipe( $.plumber({errorHandler: onError}) )
      .pipe( $.sourcemaps.init({loadMaps: true}) )
      .pipe( $.sass({
              outputStyle: 'compressed',
              sourceComments: false,
              includePaths: pkg.paths.scss
          })
          .on("error", $.sass.logError) )
      .pipe( $.cached("sass_compile") )
      .pipe( $.autoprefixer(browserslist) )
      .pipe( $.sourcemaps.write("./") )
      .pipe( $.size({gzip: true, showFiles: true}) )
      .pipe( gulp.dest(path.DEST.CSS) );

});

gulp.task("css", ["scss"], () => {

    log("-> Building css");
    return gulp.src(path.DEST.CSS + '/**/*.css')
        .pipe( $.plumber({ errorHandler: onError }) )
        .pipe( $.newer({ dest: path.DEST.CSS }) )
        .pipe( $.print() )
        .pipe( $.sourcemaps.init({loadMaps: true}))
        .pipe( $.cssnano({
            discardComments: {
                removeAll: true
            },
            discardDuplicates: true,
            discardEmpty: true,
            minifyFontValues: true,
            minifySelectors: true
        }) )
        .pipe( $.header(banner, {pkg: pkg}) )
        .pipe( $.sourcemaps.write("./") )
        .pipe( $.size({gzip: true, showFiles: true}) )
        .pipe( gulp.dest(path.DEST.CSS) )
        .pipe( $.filter("**/*.css") );

});

// Prism js 작업 - prismjs(번역주: 소스코드 하이라이트) 자바스크립트와 컨피그 파일을 하나의 번들로 합칩니다
gulp.task("prism-js", () => {
    log("-> Building prism.min.js...");
    return gulp.src(pkg.globs.prismJs)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.newer({dest: pkg.paths.build.js + "prism.min.js"}))
        .pipe($.concat("prism.min.js"))
        .pipe($.uglify())
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(pkg.paths.build.js));
});


gulp.task('watch', () => {

    gulp.watch([path.SRC.HTML + '/**/*.html'], (cb) => {

      let filename = cb.path.split('/');
      filename = filename[filename.length - 1];

      log('cyan', `${cb.type} : ${filename}`);
      if ($.browserSync.active) $.browserSync.reload();

    });

    gulp.watch([path.SRC.SCSS + '/**/*.scss'], (cb) => {

      let filename = cb.path.split('/'),
        type = cb.type;

      filename = filename[filename.length - 1];

      log('cyan', `Detected change: ${filename}`);
      return $.runSequence('sass');

    });

});


gulp.task('build', (callback) => {

    $.del([path.DEST.RESOURCES])
      .then(paths => {
        log('red', `deleted build files and folders:\n${paths}`);
        $.runSequence(['sass', 'webpack'], cb);
      });

});




gulp.task('default', (callback) => {

  const banner = [
      "/**",
      " * @project        <%= pkg.name %>",
      " * @author         <%= pkg.author %>",
      " * @build          " + $.moment().format("llll") + " ET",
      " * @release        " + $.gitRevSync.long() + " [" + $.gitRevSync.branch() + "]",
      " * @copyright      Copyright (c) " + $.moment().format("YYYY") + ", <%= pkg.copyright %>",
      " *",
      " */",
      ""
  ].join("\n");

  console.log(`

                                   |
                                 /---\\
                                 : = :
                                 :   :
               :,','. '.         :   :---\\
  ..,,,',.',',;,'.';'.'.'.,.'.'..:.  :   :
  TASK runner start.
  `);

  let prompt = new $.Prompt({
    name: 'select_task',
    message: 'Please choose what you want.',
    choices: [
      '1) Run Development Mode',
      '2) Production Build',
      '3) open live-sync server',
      '-) Exit',
    ]
  });

  prompt.ask(function (answer) {

    switch ( answer.split(')')[0] ) {
      case '1':
        runSequence(['build'], ['watch', 'nodemon'], ['browser-sync']);
        break;
      case '2':
        isProd = true;
        runSequence(['build'], () => log('green', 'Build was Complete.'));
        break;
      case '3':
        runSequence(['nodemon']);
        if (browserSync.active) browserSync.reload();
        else runSequence(['browser-sync']);
        break;
      default:
        log('green', 'Exit task runner.');
        break;
    }

  });

  // // runSequence(['build'], ['nodemon', 'watch'], cb);

});

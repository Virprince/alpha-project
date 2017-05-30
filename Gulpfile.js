var gulp =              require('gulp'),
    gulpSass =          require('gulp-sass'),
    sourcemaps =        require('gulp-sourcemaps'),
    connect =           require('gulp-connect'),
    rename =            require("gulp-rename"),
    minifycss =         require('gulp-minify-css'),
    postcss =           require('gulp-postcss'),
    autoprefixer =      require('gulp-autoprefixer'),
    concat =            require('gulp-concat'),
    uglify =            require('gulp-uglify'),
    plumber =           require('gulp-plumber');



// VARIABLES
var basePath = {
    src: 'dev/',
    dest: 'dist/'
};
var srcAssets = {
    styles: basePath.src + 'scss',
    scripts: basePath.src + 'js',
    templates: basePath.src + 'templates',
    images: basePath.src + 'images'
};
var destAssets = {
    styles: basePath.dest + 'css',
    scripts: basePath.dest + 'js',
    templates: basePath.dest,
    images: basePath.dest + 'images'
};

var plugins = autoprefixer({browsers: ['last 1 version']})

gulp.task('connect', function() {
   return connect.server({
      //   port:8080,
        livereload:true
    });
});

gulp.task('templates', function() {
	return gulp.src(srcAssets.templates +'/**/*')
		.pipe(plumber())
		.pipe(gulp.dest(basePath.dest))
		.pipe(connect.reload());
});

gulp.task('styles', function () {
     // Find all `.scss` files
    gulp.src(srcAssets.styles + '/**/*scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      // Run Sass on those files
      .pipe(gulpSass().on('error', gulpSass.logError))
      // Write the resulting CSS in the output folder
      // css postcss
		.pipe( postcss(plugins) )
      .pipe(gulp.dest(destAssets.styles))
      // rename for min
		.pipe(rename({ suffix: '.min' }))
		// run min
		.pipe(minifycss({ keepSpecialComments: 1, processImport: false }))
      .pipe(sourcemaps.write('.'))
      // Write the resulting CSS in the output folder
      .pipe(gulp.dest(destAssets.styles))
      .pipe(connect.reload());
})

gulp.task('scripts', function() {
	return gulp.src(srcAssets.scripts +'/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(gulp.dest(destAssets.scripts))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(destAssets.scripts))
      .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(srcAssets.styles +'/**/*.scss', ['styles']);
    gulp.watch(srcAssets.templates + '/**/*', ['templates']);
    gulp.watch(srcAssets.scripts +'/**/*.js', ['scripts']);
});

gulp.task('dev',['connect','styles','templates', 'scripts','watch']);

gulp.task('default',['connect','styles','templates','watch']);

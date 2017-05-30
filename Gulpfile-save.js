var gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    connect = require('gulp-connect');


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

gulp.task('connect', function() {
   return connect.server({
      //   port:8080,
        livereload:true
    });
});

gulp.task('liverReloadSassTask', function () {
     // Find all `.scss` files
    gulp.src(srcAssets.styles + '/**/*scss')
        // Run Sass on those files
        .pipe(gulpSass().on('error', gulpSass.logError))
        // Write the resulting CSS in the output folder
        .pipe(gulp.dest(destAssets.styles))
        .pipe(connect.reload());
})

gulp.task('liverReloadSassWatchTask', function () {
    gulp.watch(srcAssets.styles +'/**/*.scss', ['liverReloadSassTask']);
});

gulp.task('default',['connect','liverReloadSassTask','liverReloadSassWatchTask']);

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', () =>
  gulp.src('./src/**/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./src'))
);

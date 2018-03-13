const gulp = require(`gulp`);
const sass = require(`gulp-sass`);

gulp.task(`styles`, () => {
  gulp.src(`src/**/*.scss`)
    .pipe(sass().on(`error`, sass.logError))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
});

gulp.task(`watch`, () => {
  gulp.watch(`src/**/*.scss`, [`styles`]);
});

gulp.task(`default`, [`watch`]);
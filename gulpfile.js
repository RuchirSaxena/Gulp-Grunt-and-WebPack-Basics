const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
    --Top Level Functions ---
    gulp.task -Define tasks
    gulp.src  -Point tofiles to use
    gulp.dest -Points to folder to output
    gulp.watch -Watch files and folders for changes

*/

//Logs Message Task
gulp.task('message', function () {
    return console.log('Gulp is running...');
});
//To run =>  gulp message   in the git bash terminal
gulp.task('default', function () {
    return console.log('Gulp is running...');
});
//To run =>  gulp   in the git bash terminal coz we have made it as a default task

//copy All HTML files
gulp.task('copyHtml', function () {
    gulp.src('src/*.html') //For development
        .pipe(gulp.dest('dist')); //for production 
});

gulp.task('copyJs', function () {
    gulp.src('src/*.js') //For development
        .pipe(gulp.dest('dist')); //for production 
});

//optimize Images using imageMin Pulgin
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);

//minify js files
gulp.task('minifyJs', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//complile Sass to css folder
gulp.task('sass', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

//concating js files
gulp.task('concatJs', function(){
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//running all the task together
gulp.task('default', [
    'message',
    'copyHtml',
    'imageMin',
   // 'minifyJs',
    'sass',
    'concatJs'
]);

//Warching all the task and if there are any changes in any created task then that task will run automatically
gulp.task('watch',function () {
    gulp.watch('src/js/*.js',['scripts']);
    gulp.watch('src/sass/*.scss',['sass']);
    gulp.watch('src/images/*',['imageMin']);
    gulp.watch('src/*.html',['copyHtml']);
});
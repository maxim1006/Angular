"use strict";

const config     = require('./gulp/config');

let gulp         = require('gulp');
let plugins      = require('gulp-load-plugins')(config.plugins);
let exec         = require('child_process').exec;
let del          = require("del");
let newSoyConfig = {};



/*HTML tasks*/
gulp.task('html2js', () =>
    gulp.src(config.html.src, {base: './'})
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.html2js({
            moduleName: "HtmlTemplates"
        }))
        .pipe(plugins.concat(config.html.templateName))
        .pipe(gulp.dest(config.html.dest))
);

gulp.task('html2js:prod', () =>
    gulp.src(config.html.src, {base: './'})
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(plugins.html2js({
            moduleName: "HtmlTemplates"
        }))
        .pipe(plugins.concat(config.html.templateName))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.html.dest))
);




/*Less tasks*/
gulp.task('less', () =>
    gulp.src(config.less.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(config.less.dest))
);

gulp.task('less:prod', ["clean:prod"], () =>
    gulp.src(config.less.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(plugins.minifyCSS())
        .pipe(plugins.rev())
        .pipe(gulp.dest(config.less.dest))
        .pipe(plugins.rev.manifest({
            base: './',
            merge: true // merge with the existing manifest (if one exists)
        }))
        .pipe(gulp.dest(config.less.dest))
);





//JS tasks
gulp.task('js', ['html2js'], () =>
        gulp.src(config.js.src)
            .pipe(plugins.plumber({
                errorHandler: onPlumberError
            }))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat(config.js.outputFileName))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(config.js.dest))
);

gulp.task('js:prod', ['html2js:prod'], () =>
        gulp.src(config.js.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.concat(config.js.outputFileName))
        .pipe(plugins.ngannotate())
        .pipe(plugins.uglify())
        .pipe(plugins.rev())
        .pipe(gulp.dest(config.js.dest))
        .pipe(plugins.rev.manifest({
                base: './',
                merge: true // merge with the existing manifest (if one exists)
        }))
        .pipe(gulp.dest(config.js.dest))
);





//Img tasks
gulp.task('uri', function() {
    return gulp.src(config.uri.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.uri({
            customClass: function (className, file) {
                return 'icon_' + className + '()'; // add prefix
            },
            template: {
                file: config.uri.template
            }
        }))
        .pipe(plugins.concat("icons.less"))
        .pipe(gulp.dest(config.uri.dest));
});

gulp.task('imagemin', ["clean"], () => {
    return gulp.src(config.imagemin.src)
          .pipe(plugins.imagemin({
              optimizationLevel: 5
          }))
          .pipe(gulp.dest(config.imagemin.dest));
});





//copy in prod task
gulp.task('copy', ["uri", "less:prod", "js:prod"], function() {
    return gulp.src(config.copy.src, {base: './'})
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(gulp.dest(config.copy.dest));
});





//htmlRevisionInject
gulp.task('htmlRevisionInject', ['copy'], function() {
    return gulp.src(config.manifest.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.revreplace({manifest: gulp.src(config.manifest.files)}))
        .pipe(gulp.dest(config.manifest.dest));
});





//clean tasks
gulp.task("clean", ['htmlRevisionInject'], () => {
    return del(config.del.temp);
});

gulp.task("clean:prod", () => {
    return del(config.del.prod, {
        force: true
    });
});





//Watchers
gulp.task('watch', function() {
    gulp.watch(config.watch.less, ['less']);
    gulp.watch(config.watch.uri, ['uri']);
    gulp.watch(config.watch.scripts, ['js']);
    gulp.watch(config.watch.html, ['js']);
});



//Tests
let tests = () => {
    exec('karma start', (err, stdout, stderr) => {
        console.log("stdout", stdout);

        if (!err) {
            exec('gulp prod', (err, stdout, stderr) => {
                console.log(stdout);
                console.log("gulp prod is finished");
            });
        }
    });
};







//General tasks
gulp.task('default', ['watch']);
gulp.task('prod', ['imagemin']);
gulp.task('prod:tests', tests);






/*HELPERS*/
process.on('uncaughtException', function(err) {
    console.error(err.message, err.stack, err.errors);
    process.exit(255);
});

gulp.on('err', function(gulpErr) {
    if (gulpErr.err) {
        console.error("Gulp error details", [gulpErr.err.message, gulpErr.err.stack, gulpErr.err.errors].filter(Boolean));
    }
});

function onPlumberError(error) {
    console.log(error);
    this.emit('end');
}

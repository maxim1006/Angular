"use strict";

let fs = require('mz/fs');
let path = require('path');
let serve = require('koa-static');
let glob = require('glob');
let koa = require('koa');
let Router = require('koa-router');
let cors = require('kcors');
let bodyParser = require('koa-bodyparser');

let app = koa();
let router = new Router();

let names = [];



glob("./components/**/*.html", function (err, files) {
    if (err) throw err;

    files.forEach(function(el, idx, arr) {
        var splittedPath = el.split('/');
        names.push(splittedPath[splittedPath.length - 2]);
    });

    //console.log(names);
});



router
    .get('/names', function*(next) {
        this.body = names;
    })
    .post('/names', function*(next) {
        var name = this.request.body.name;

        createComponent(name).then(() => {
            console.log('done');
        });

        names.push(name);

        this.body = names;
    });



/*Helpers*/
function createComponent(name) {
    return fs.mkdir(path.join("./components/", name))
        .then(() => {
            console.log(name, "directory is created");
            return fs.writeFile(path.join("./components/", name, "index.html"), getIndexFileTemplate(name));
        })
        .then(() => {
            console.log(name, "file is created");
            //console.log(+new Date);
        })
        .catch(function(err) {
            console.log("Error", err);
        });
}

function getIndexFileTemplate(name) {
    return `
    <!doctype html>
    <html ng-app="app">
    <head>
        <meta charset="UTF-8">
        <title>` + name +`</title>
    </head>
    <body>

        <h1>Компонент ` + name + `</h1>

    </body>
    </html>
`;
}



app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(serve('.'));

app.listen(2000);
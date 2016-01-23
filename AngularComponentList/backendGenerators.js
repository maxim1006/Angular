"use strict";

let fs = require('mz/fs');
let path = require('path');
let serve = require('koa-static');
let glob = require('glob');
let koa = require('koa');
let Router = require('koa-router');
let cors = require('kcors');
let bodyParser = require('koa-bodyparser');
let moment = require("moment");
let co = require("co");

let app = koa();
let router = new Router();



router
    .get('/names', function*(next) {
        this.body = yield* datify(yield* getNames());
    })
    .post('/names', function*(next) {
        yield* createComponent(this.request.body.name);

        this.body = yield* datify(yield* getNames());
    });



/*Helpers*/
function* getNames() {

    var names = [];

    return yield new Promise((res, rej) => {
        glob("./components/**/*.html", function (err, files) {
            if (err) rej(err);

            files.forEach(function(el, idx, arr) {
                var splittedPath = el.split('/');

                names.push({
                    name: splittedPath[splittedPath.length - 2]
                });
            });

            res(names);

        });
    });
}


function* datify(names) {
    var arr = [];

    for (let i = 0; i < names.length; i++) {
        arr.push({
            name: names[i].name,
            date: yield* getDate(names[i].name)
        });
    }

    return arr;
}


function* getDate(name) {
    let date = yield fs.stat(path.join("./components/", name));

    return moment(+date.birthtime).format("D/MM/YY/H:m:s");
}


function* createComponent(name) {
    yield fs.mkdir(path.join("./components/", name));
    yield fs.writeFile(path.join("./components/", name, "index.html"), getIndexFileTemplate(name));
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
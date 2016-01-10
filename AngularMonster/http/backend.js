"use strict";

var koa = require('koa');
var Router = require('koa-router');
var cors = require('kcors');
var bodyParser = require('koa-bodyparser');

var app = koa();

var router = new Router();

var names = [
    {name: 'Max'},
    {name: 'Aliya'},
    {name: 'Anton'}
];

router
    .get('/names', function*(next) {
        this.body = names;
    })
    .post('/names', function*(next) {
        console.log(this.request.body);
        names.push(this.request.body);
        this.body = names;
    });

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

app.listen(2000);
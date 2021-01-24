"use strict";
exports.__esModule = true;
exports.routes = void 0;
var controllers = require("./controllers");
exports.routes = [
    {
        method: 'post',
        path: '/api/book',
        handler: controllers.createBook
    },
    {
        method: 'get',
        path: '/api/book',
        handler: controllers.getBook
    },
    {
        method: 'get',
        path: '/api/books',
        handler: controllers.getAllBooks
    },
    {
        method: 'get',
        path: '/api/authors',
        handler: controllers.getAllAuthors
    },
    {
        method: 'post',
        path: '/api/bookstatus',
        handler: controllers.getBookStatus
    },
    {
        method: 'get',
        path: '/api/bookstatus',
        handler: controllers.updateBookStatus
    },
];

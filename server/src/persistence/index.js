"use strict";
exports.__esModule = true;
exports.repository = void 0;
var my_sql_1 = require("./my-sql");
// import { InMemory } from './in-memory';
var createRepo = function () {
    // if (process.env.NODE_ENV !== 'test') {
    //     return new DynamoClient();
    // }
    console.log('it does create repo');
    return new my_sql_1.MySqlClient();
};
exports.repository = createRepo();

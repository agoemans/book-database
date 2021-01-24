"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MySqlClient = void 0;
var mysql = require('mysql');
var MySqlClient = /** @class */ (function () {
    function MySqlClient() {
        var _this = this;
        this.connector = mysql.createConnection({
            host: process.env.HOST,
            database: process.env.DATABASE,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD
        });
        this.query = function (sql, args) {
            return new Promise(function (resolve, reject) {
                _this.connector.query(sql, args, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
            });
        };
        this.createBook = function (book) { return __awaiter(_this, void 0, void 0, function () {
            var authorId, values, query, bookResult, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.TITLE_TABLE_NAME) {
                            throw Error('Book table is not defined');
                        }
                        return [4 /*yield*/, this.createAuthor({
                                firstName: book.firstName,
                                lastName: book.lastName
                            })];
                    case 1:
                        authorId = _a.sent();
                        values = [book.isbn, book.title, authorId];
                        query = "INSERT \n            IGNORE INTO \n            " + process.env.TITLE_TABLE_NAME + " \n            (isbn, title, author_id) \n            VALUES (?, ?, ?)";
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.query(query, values)];
                    case 3:
                        bookResult = _a.sent();
                        return [2 /*return*/, bookResult];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error('Could not create book: ' + err_1);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getBook = function (title) { return __awaiter(_this, void 0, void 0, function () {
            var values, query, bookResult, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.TITLE_TABLE_NAME) {
                            throw Error('Book table is not defined');
                        }
                        values = [title];
                        query = "SELECT\n        t.isbn,\n            t.title,\n            a.first_name,\n            a.last_name\n        FROM\n        " + process.env.TITLE_TABLE_NAME + " t        \n        INNER JOIN " + process.env.AUTHOR_TABLE_NAME + " a\n        ON t.author_id = a.author_id\n        WHERE title=? LIMIT 1";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.query(query, values)];
                    case 2:
                        bookResult = _a.sent();
                        return [2 /*return*/, bookResult.map(function (book) { return ({
                                isbn: book.isbn,
                                title: book.title,
                                firstName: book.first_name,
                                lastName: book.last_name
                            }); })];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error('Could not get specific book: ' + err_2);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAllBooks = function () { return __awaiter(_this, void 0, void 0, function () {
            var query, booksResult, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.TITLE_TABLE_NAME) {
                            throw Error('Book table name is not defined');
                        }
                        query = "SELECT\n        t.isbn,\n            t.title,\n            a.first_name,\n            a.last_name\n        FROM\n        " + process.env.TITLE_TABLE_NAME + " t\n        INNER JOIN " + process.env.AUTHOR_TABLE_NAME + " a\n        ON t.author_id = a.author_id";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.query(query)];
                    case 2:
                        booksResult = _a.sent();
                        return [2 /*return*/, booksResult.map(function (book) { return ({
                                isbn: book.isbn,
                                title: book.title,
                                firstName: book.first_name,
                                lastName: book.last_name
                            }); })];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error('Could not get all books: ' + err_3);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.createAuthor = function (author) { return __awaiter(_this, void 0, void 0, function () {
            var existingAuthorResults, values, query, newAuthorResults, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.AUTHOR_TABLE_NAME) {
                            throw Error('Author table is not defined');
                        }
                        return [4 /*yield*/, this.getAuthor(author.firstName, author.lastName)];
                    case 1:
                        existingAuthorResults = _a.sent();
                        if (!(existingAuthorResults.length > 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, existingAuthorResults[0].authorId];
                    case 2:
                        values = [author.firstName, author.lastName];
                        query = "INSERT IGNORE INTO " + process.env.AUTHOR_TABLE_NAME + " (first_name, last_name) VALUES (?, ?);";
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.query(query, values)];
                    case 4:
                        newAuthorResults = _a.sent();
                        return [2 /*return*/, newAuthorResults.insertId];
                    case 5:
                        err_4 = _a.sent();
                        throw new Error('Could not get specific authors: ' + err_4);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getAuthor = function (firstName, lastName) { return __awaiter(_this, void 0, void 0, function () {
            var values, query, authorResults, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.AUTHOR_TABLE_NAME) {
                            throw Error('Author table name is not defined');
                        }
                        values = [firstName, lastName];
                        query = "SELECT * FROM " + process.env.AUTHOR_TABLE_NAME + " WHERE first_name=? AND last_name=? LIMIT 1;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.query(query, values)];
                    case 2:
                        authorResults = _a.sent();
                        return [2 /*return*/, authorResults.map(function (author) { return ({
                                firstName: author.first_name,
                                lastName: author.last_name,
                                authorId: author.author_id
                            }); })];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error('Could not get specific authors: ' + err_5);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAllAuthors = function () { return __awaiter(_this, void 0, void 0, function () {
            var query, authorsResult, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.AUTHOR_TABLE_NAME) {
                            throw Error('Author table name is not defined');
                        }
                        query = "SELECT * FROM " + process.env.AUTHOR_TABLE_NAME;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.query(query)];
                    case 2:
                        authorsResult = _a.sent();
                        return [2 /*return*/, authorsResult.map(function (author) { return ({
                                firstName: author.first_name,
                                lastName: author.last_name
                            }); })];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error('Could not get all authors: ' + err_6);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getBookStatus = function (title) { return __awaiter(_this, void 0, void 0, function () {
            var values, query, bookStatusResults, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.BOOK_STATUS_TABLE_NAME) {
                            throw Error('Book status table name is not defined');
                        }
                        values = [title];
                        query = "SELECT \n                t.isbn,\n                t.title,\n                a.first_name,\n                a.last_name,\n                s.borrowed,\n                s.borrow_name\n            FROM\n                " + process.env.TITLE_TABLE_NAME + " t    \n            INNER JOIN " + process.env.AUTHOR_TABLE_NAME + " a \n                ON t.author_id = a.author_id\n            INNER JOIN " + process.env.BOOK_STATUS_TABLE_NAME + " s \n                ON t.isbn = s.isbn\n            WHERE t.title=? LIMIT 1";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.query(query, values)];
                    case 2:
                        bookStatusResults = _a.sent();
                        return [2 /*return*/, bookStatusResults.map(function (bookStatus) { return ({
                                title: bookStatus.title,
                                firstName: bookStatus.first_name,
                                lastName: bookStatus.last_name,
                                borrowed: bookStatus.borrowed,
                                borrowerName: bookStatus.borrow_name
                            }); })];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error('Could not get book status: ' + err_7);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.createBookStatus = function (bookStatus) { return __awaiter(_this, void 0, void 0, function () {
            var values, query, bookStatusResults, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.BOOK_STATUS_TABLE_NAME) {
                            throw Error('Book status table name is not defined');
                        }
                        values = [bookStatus.isbn, bookStatus.borrowed, bookStatus.borrowName, bookStatus.isbn, bookStatus.borrowed, bookStatus.borrowName];
                        query = "INSERT INTO \n            " + process.env.BOOK_STATUS_TABLE_NAME + " \n            (isbn, borrowed, borrow_name) \n            VALUES (?, ?, ?)\n            ON DUPLICATE KEY UPDATE\n            isbn = ?,\n            borrowed = ?,\n            borrow_name = ?;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.query(query, values)];
                    case 2:
                        bookStatusResults = _a.sent();
                        return [2 /*return*/, bookStatusResults.insertId];
                    case 3:
                        err_8 = _a.sent();
                        throw new Error('Could not create book status: ' + err_8);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateBookStatus = function (bookStatus) { return __awaiter(_this, void 0, void 0, function () {
            var values, query, bookStatusResults, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.BOOK_STATUS_TABLE_NAME) {
                            throw Error('Book status table name is not defined');
                        }
                        values = [bookStatus.title, bookStatus.borrowed, bookStatus.borrowName];
                        query = "INSERT INTO " + process.env.BOOK_STATUS_TABLE_NAME + "\n            (isbn, borrowed, borrow_name)\n        SELECT\n            bs.isbn,\n            bs.borrowed,\n            bs.borrow_name\n        FROM  " + process.env.BOOK_STATUS_TABLE_NAME + " bs\n        INNER JOIN " + process.env.TITLE_TABLE_NAME + " t ON t.isbn=bs.isbn\n        WHERE t.title=?\n        ON DUPLICATE KEY UPDATE\n        isbn=t.isbn,\n        borrowed=?,\n        borrow_name=?";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.query(query, values)];
                    case 2:
                        bookStatusResults = _a.sent();
                        return [2 /*return*/, bookStatusResults.insertId];
                    case 3:
                        err_9 = _a.sent();
                        throw new Error('Could not update book status: ' + err_9);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        console.log('when does this start', process.env.HOST, process.env.DBUSER);
        this.connector.connect(function (err) {
            if (err)
                throw err;
            console.log("Connected!");
        });
    }
    return MySqlClient;
}());
exports.MySqlClient = MySqlClient;

// import { BookModel, BookStatusModel, AuthorModel } from '../models';
//
// import {
//     CreateBookRequest,
//     CreateAuthorRequest,
//     UpdateBookRequest,
//     UpdateAuthorRequest,
//     UpdateBookStatusRequest,
//     Repository,
// } from './types';
//
// const mysql = require('mysql');
//
// export class MySqlClient implements Repository {
// // export class MySqlClient {
//     connector = mysql.createConnection({
//         host: process.env.HOST,
//         database: process.env.DATABASE,
//         user: process.env.DBUSER,
//         password : process.env.DBPASSWORD
//     });
//
//     constructor() {
//         this.connector.connect((err: any) => {
//             if (err) throw err;
//             console.log("Connected!");
//         });
//     }
//
//     createBook = (isbn: string, title: string, firstName: string, lastName: string) => {
//         if (!process.env.TITLE_TABLE_NAME) {
//             throw Error('Book table is not defined');
//         }
//
//         return new Promise( (resolve: any, reject: any) => {
//             this.createAuthor(firstName, lastName)
//                 .then( (authorId: string)=> {
//                     const query = `INSERT IGNORE INTO ${process.env.TITLE_TABLE_NAME} (isbn, title, author_id) VALUES (${isbn}, '${title}', ${authorId})`;
//                     this.connector.query(query, (error, results) => {
//                         if (error) {
//                             reject(`Failed to create book ${error.message}`)
//                         }
//                         resolve(results)
//                     });
//                 });
//         });
//     };
//
//     getBook = (title: string): Promise<BookModel> => {
//         if (!process.env.TITLE_TABLE_NAME) {
//             throw Error('Book table is not defined');
//         }
//
//         // SELECT EXISTS(SELECT 1 FROM bookdb.authors WHERE last_name = 'Austen' AND first_name='Jane');
//
//         const query = `SELECT * FROM ${process.env.TITLE_TABLE_NAME} WHERE title='${title}';`;
//
//         return new Promise( (resolve: any, reject: any) => {
//             this.connector.query(query, (error, results) => {
//                 if (error) {
//                     reject(`Failed to create book ${error.message}`)
//                 }
//                 resolve(results)
//             });
//         });
//     };
//
//     getAllBooks = async () => {
//         if (!process.env.TITLE_TABLE_NAME) {
//             throw Error('Book table name is not defined');
//         }
//
//         const query = `SELECT * FROM ${process.env.TITLE_TABLE_NAME}`;
//         const res = await this.connector.query(query, (error, results, fields) => {
//             if (error) {
//                 return console.error(error.message);
//             }
//         });
//
//         return res;
//     };
//
//     createAuthor = (firstName: string, lastName: string) => {
//         if (!process.env.AUTHOR_TABLE_NAME) {
//             throw Error('Author table is not defined');
//         }
//
//         return new Promise( (resolve: any, reject: any) => {
//             this.getAuthor (firstName, lastName)
//                 .then( (authorResults: any)=> {
//                     if(authorResults.length > 0) {
//                         resolve(authorResults[0].author_id);
//
//                     } else {
//                         let query: string = `INSERT IGNORE INTO ${process.env.AUTHOR_TABLE_NAME} (first_name, last_name) VALUES ('${firstName}', '${lastName}');`;
//                         this.connector.query(query, (error, results) => {
//                             if (error) {
//                                 reject(`Failed to create user ${error.message}`)
//                             }
//                             resolve(results.insertId)
//                         });
//                     }
//                 });
//         });
//     };
//
//     getAuthor = (firstName: string, lastName: string): Promise<AuthorModel> => {
//         if (!process.env.AUTHOR_TABLE_NAME) {
//             throw Error('Author table name is not defined');
//         }
//
//         // SELECT EXISTS(SELECT 1 FROM bookdb.authors WHERE last_name = 'Austen' AND first_name='Jane');
//
//         const query = `SELECT * FROM ${process.env.AUTHOR_TABLE_NAME} WHERE first_name='${firstName}' AND last_name='${lastName}';`;
//
//         return new Promise( (resolve: any, reject: any) => {
//             this.connector.query(query, (error, results) => {
//                 if (error) {
//                     reject(`Failed to create user ${error.message}`)
//                 }
//                 resolve(results)
//             });
//         });
//     };
//
//     getAllAuthors = async () => {
//         if (!process.env.AUTHOR_TABLE_NAME) {
//             throw Error('User table name is not defined');
//         }
//
//         const query = `SELECT * FROM ${process.env.AUTHOR_TABLE_NAME}`;
//         const res = await this.connector.query(query, (error, results) => {
//             if (error) {
//                 return console.error(error.message);
//             }
//             console.log(results);
//         });
//
//         return res;
//     };
//
//     getBookStatus = (isbn: string): Promise<BookStatusModel> => {
//         if (!process.env.BOOK_STATUS_TABLE_NAME) {
//             throw Error('Book status table name is not defined');
//         }
//
//         // SELECT EXISTS(SELECT 1 FROM bookdb.authors WHERE last_name = 'Austen' AND first_name='Jane');
//
//         const query = `SELECT * FROM ${process.env.BOOK_STATUS_TABLE_NAME} WHERE isbn='${isbn}';`;
//
//         return new Promise( (resolve: any, reject: any) => {
//             this.connector.query(query, (error, results) => {
//                 if (error) {
//                     reject(`Failed to create book status ${error.message}`)
//                 }
//                 if(results.length > 0) {
//                     resolve(results[0].isbn)
//                 } else {
//                     resolve(isbn)
//                 }
//
//             });
//         });
//     };
//
//
//     createBookStatus = (isbn: string, borrowed: boolean, borrowName: number) => {
//         if (!process.env.BOOK_STATUS_TABLE_NAME) {
//             throw Error('Book status table name is not defined');
//         }
//
//         // SELECT EXISTS(SELECT 1 FROM bookdb.authors WHERE last_name = 'Austen' AND first_name='Jane');
//
//         return new Promise( (resolve: any, reject: any) => {
//             this.getBookStatus(isbn)
//                 .then((id: any) => {
//
//                     let query: string = `INSERT INTO ${process.env.BOOK_STATUS_TABLE_NAME} (isbn, borrowed, borrow_name) VALUES ('${id}', ${borrowed}, '${borrowName}');`;
//
//                     this.connector.query(query, (error, results) => {
//                         if (error) {
//                             reject(`Failed to update book status ${error.message}`)
//                         }
//                         resolve(results)
//                     });
//                 });
//
//         });
//     };
//
// }
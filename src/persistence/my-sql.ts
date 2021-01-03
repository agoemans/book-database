import { BookModel, BookStatusModel, AuthorModel } from '../models';

import {
    CreateBookRequest,
    CreateAuthorRequest,
    CreateBookStatusRequest,
    UpdateBookRequest,
    UpdateAuthorRequest,
    UpdateBookStatusRequest,
    Repository,
} from './types';

const mysql = require('mysql');

export class MySqlClient implements Repository {
// export class MySqlClient {
    connector = mysql.createConnection({
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: process.env.DBUSER,
        password : process.env.DBPASSWORD
    });

    constructor() {
        this.connector.connect((err: any) => {
            if (err) throw err;
            console.log("Connected!");
        });
    }

    //todo
    // set up routes in app.ts

    query = ( sql: string, args?: any ): Promise<unknown> => {
        return new Promise( ( resolve: any, reject: any ) => {
            this.connector.query( sql, args, ( err: any, rows: any ) => {
                if ( err ) {
                    reject( err );
                }
                resolve( rows );
            } );
        } );
    };


    createBook = async (book: CreateBookRequest) => {
        if (!process.env.TITLE_TABLE_NAME) {
            throw Error('Book table is not defined');
        }

        const authorId: string = await this.createAuthor({
            firstName: book.firstName,
            lastName: book.lastName
        });

        const values = [book.isbn, book.title, authorId];

        const query =
            `INSERT 
            IGNORE INTO 
            ${process.env.TITLE_TABLE_NAME} 
            (isbn, title, author_id) 
            VALUES (?, ?, ?)`;

        const bookResult = await this.query(query, values)
            .catch( (err: any) => {throw new Error('Could not create book: ' + err )});

        return bookResult;
    };

    getBook = async (title: string) => {
        if (!process.env.TITLE_TABLE_NAME) {
            throw Error('Book table is not defined');
        }

        const values = [title];

        const query = `SELECT
        t.isbn,
            t.title,
            a.first_name,
            a.last_name
        FROM
        ${process.env.TITLE_TABLE_NAME} t        
        INNER JOIN ${process.env.AUTHOR_TABLE_NAME} a
        ON t.author_id = a.author_id
        WHERE title=? LIMIT 1`;

        const bookResult: any = await this.query(query, values)
            .catch( (err: any) => {throw new Error('Could not get specific book: ' + err )});

        return bookResult.map( (book: any) => <BookModel>{
            isbn: book.isbn,
            title: book.title,
            firstName: book.first_name,
            lastName: book.last_name
        });
    };

    getAllBooks = async () => {
        if (!process.env.TITLE_TABLE_NAME) {
            throw Error('Book table name is not defined');
        }

        const query = `SELECT
        t.isbn,
            t.title,
            a.first_name,
            a.last_name
        FROM
        ${process.env.TITLE_TABLE_NAME} t
        INNER JOIN ${process.env.AUTHOR_TABLE_NAME} a
        ON t.author_id = a.author_id`;

        const booksResult: any = await this.query(query)
            .catch( (err: any) => {throw new Error('Could not get all books: ' + err )});

        return booksResult.map( (book: any) => <BookModel>{
            isbn: book.isbn,
            title: book.title,
            firstName: book.first_name,
            lastName: book.last_name
        });
    };

    createAuthor = async (author: CreateAuthorRequest): Promise<string> => {
        if (!process.env.AUTHOR_TABLE_NAME) {
            throw Error('Author table is not defined');
        }

        const existingAuthorResults = await this.getAuthor(author.firstName, author.lastName) as {
            authorId: string
        }[];

        if(existingAuthorResults.length > 0) {
            return existingAuthorResults[0].authorId;
        } else {
            const values = [author.firstName, author.lastName];
            const query: string = `INSERT IGNORE INTO ${process.env.AUTHOR_TABLE_NAME} (first_name, last_name) VALUES (?, ?);`;

            const newAuthorResults: any = await this.query(query, values)
                .catch( (err: any) => {throw new Error('Could not get specific authors: ' + err )});

            return newAuthorResults.insertId;
        }
    };

    getAuthor = async (firstName: string, lastName: string) => {
        if (!process.env.AUTHOR_TABLE_NAME) {
            throw Error('Author table name is not defined');
        }

        const values = [firstName, lastName];
        const query = `SELECT * FROM ${process.env.AUTHOR_TABLE_NAME} WHERE first_name=? AND last_name=? LIMIT 1;`;

        const authorResults: any = await this.query(query, values)
            .catch( (err: any) => {throw new Error('Could not get specific authors: ' + err )});

        return authorResults.map( (author: any) => <AuthorModel>{
            firstName: author.first_name,
            lastName: author.last_name,
            authorId: author.author_id
        });
    };

    getAllAuthors = async () => {
        if (!process.env.AUTHOR_TABLE_NAME) {
            throw Error('Author table name is not defined');
        }

        const query = `SELECT * FROM ${process.env.AUTHOR_TABLE_NAME}`;

        const authorsResult:any = await this.query(query)
            .catch( (err: any) => {throw new Error('Could not get all authors: ' + err )});

        return authorsResult.map( (author: any) => <AuthorModel>{
            firstName: author.first_name,
            lastName: author.last_name
        });
    };

    getBookStatus = async (title: string) => {
        if (!process.env.BOOK_STATUS_TABLE_NAME) {
            throw Error('Book status table name is not defined');
        }

        const values = [title];

        const query =
            `SELECT 
                t.isbn,
                t.title,
                a.first_name,
                a.last_name,
                s.borrowed,
                s.borrow_name
            FROM
                ${process.env.TITLE_TABLE_NAME} t    
            INNER JOIN ${process.env.AUTHOR_TABLE_NAME} a 
                ON t.author_id = a.author_id
            INNER JOIN ${process.env.BOOK_STATUS_TABLE_NAME} s 
                ON t.isbn = s.isbn
            WHERE t.title=? LIMIT 1`;

        const bookStatusResults: any = await this.query(query, values)
            .catch( (err: any) => {throw new Error('Could not get book status: ' + err )});

        return bookStatusResults.map( (bookStatus: any) => <BookStatusModel>{
            title: bookStatus.title,
            firstName: bookStatus.first_name,
            lastName: bookStatus.last_name,
            borrowed: bookStatus.borrowed,
            borrowerName: bookStatus.borrow_name
        });
    };


    createBookStatus = async (bookStatus: CreateBookStatusRequest) => {
        if (!process.env.BOOK_STATUS_TABLE_NAME) {
            throw Error('Book status table name is not defined');
        }

        const values = [bookStatus.isbn, bookStatus.borrowed, bookStatus.borrowName, bookStatus.isbn, bookStatus.borrowed, bookStatus.borrowName];
        const query: string =
            `INSERT INTO 
            ${process.env.BOOK_STATUS_TABLE_NAME} 
            (isbn, borrowed, borrow_name) 
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE
            isbn = ?,
            borrowed = ?,
            borrow_name = ?;`;

        const bookStatusResults: any = await this.query(query, values)
            .catch( (err: any) => {throw new Error('Could not create book status: ' + err )});

        return  bookStatusResults.insertId;
    };

    updateBookStatus = async (bookStatus: UpdateBookStatusRequest) => {
        if (!process.env.BOOK_STATUS_TABLE_NAME) {
            throw Error('Book status table name is not defined');
        }

        const values = [bookStatus.title, bookStatus.borrowed, bookStatus.borrowName];
        const query: string =
        `INSERT INTO ${process.env.BOOK_STATUS_TABLE_NAME}
            (isbn, borrowed, borrow_name)
        SELECT
            bs.isbn,
            bs.borrowed,
            bs.borrow_name
        FROM  ${process.env.BOOK_STATUS_TABLE_NAME} bs
        INNER JOIN ${process.env.TITLE_TABLE_NAME} t ON t.isbn=bs.isbn
        WHERE t.title=?
        ON DUPLICATE KEY UPDATE
        isbn=t.isbn,
        borrowed=?,
        borrow_name=?`;

        const bookStatusResults: any = await this.query(query, values)
            .catch( (err: any) => {throw new Error('Could not update book status: ' + err )});

        return  bookStatusResults.insertId;
    };

}
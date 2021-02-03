import { BookModel, BookStatusModel, AuthorModel } from '../models';

import {
    CreateBookRequest,
    CreateAuthorRequest,
    CreateBookStatusRequest,
    UpdateBookStatusRequest,
    Repository,
} from './types';

const mysql = require('mysql');

export class MySqlClient implements Repository {
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

        try {
            const bookResult = await this.query(query, values);

            return bookResult;

        } catch(err: any) {
            throw new Error('Could not create book: ' + err );
        }
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
            a.last_name,
            bs.borrowed
        FROM
        ${process.env.TITLE_TABLE_NAME} t, ${process.env.AUTHOR_TABLE_NAME} a, ${process.env.BOOK_STATUS_TABLE_NAME} bs  
        WHERE t.author_id = a.author_id and title=? and t.isbn=bs.isbn LIMIT 1`;

        try {
            const bookResult: any = await this.query(query, values);

            return bookResult.map( (book: any) => <BookModel>{
                isbn: book.isbn,
                title: book.title,
                firstName: book.first_name,
                lastName: book.last_name,
                borrowed: book.boolean
            });

        } catch(err: any) {
            throw new Error('Could not get specific book: ' + err );
        }
    };

    getAllBooks = async () => {
        if (!process.env.TITLE_TABLE_NAME) {
            throw Error('Book table name is not defined');
        }

        const query = `SELECT
            t.title,
            a.first_name,
            a.last_name,
            bs.borrowed
        FROM
        ${process.env.TITLE_TABLE_NAME} t, ${process.env.AUTHOR_TABLE_NAME} a, ${process.env.BOOK_STATUS_TABLE_NAME} bs
        WHERE t.author_id = a.author_id and t.isbn=bs.isbn`;

        try {
            const booksResult: any = await this.query(query);

            return booksResult.map( (book: any) => <BookModel>{
                isbn: book.isbn,
                title: book.title,
                firstName: book.first_name,
                lastName: book.last_name,
                borrowed: book.borrowed
            });

        } catch(err: any) {
            throw new Error('Could not get all books: ' + err );
        }
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

            try {
                const newAuthorResults: any = await this.query(query, values);

                return newAuthorResults.insertId;

            } catch(err: any) {
                throw new Error('Could not get specific authors: ' + err );
            }
        }
    };

    getAuthor = async (firstName: string, lastName: string) => {
        if (!process.env.AUTHOR_TABLE_NAME) {
            throw Error('Author table name is not defined');
        }

        const values = [firstName, lastName];
        const query = `SELECT * FROM ${process.env.AUTHOR_TABLE_NAME} WHERE first_name=? AND last_name=? LIMIT 1;`;

        try {
            const authorResults: any = await this.query(query, values);

            return authorResults.map( (author: any) => <AuthorModel>{
                firstName: author.first_name,
                lastName: author.last_name,
                authorId: author.author_id
            });

        } catch(err: any) {
            throw new Error('Could not get specific authors: ' + err );
        }
    };

    getAllAuthors = async () => {
        if (!process.env.AUTHOR_TABLE_NAME) {
            throw Error('Author table name is not defined');
        }

        const query = `SELECT * FROM ${process.env.AUTHOR_TABLE_NAME}`;

        try {
            const authorsResult: any = await this.query(query);

            return authorsResult.map( (author: any) => <AuthorModel>{
                firstName: author.first_name,
                lastName: author.last_name
            });

        } catch(err: any) {
            throw new Error('Could not get all authors: ' + err );
        }
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

        try {
            const bookStatusResults: any = await this.query(query, values);

            return bookStatusResults.map( (bookStatus: any) => <BookStatusModel>{
                title: bookStatus.title,
                firstName: bookStatus.first_name,
                lastName: bookStatus.last_name,
                borrowed: bookStatus.borrowed,
                borrowerName: bookStatus.borrow_name
            });

        } catch(err: any) {
            throw new Error('Could not get book status: ' + err );
        }
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

        try {
            const bookStatusResults: any = await this.query(query, values);

            return  bookStatusResults.insertId;

        } catch(err: any) {
            throw new Error('Could not create book status: ' + err );
        }
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

        try {
            const bookStatusResults: any = await this.query(query, values);

            return  bookStatusResults.insertId;

        } catch(err: any) {
            throw new Error('Could not update book status: ' + err );
        }
    };

}
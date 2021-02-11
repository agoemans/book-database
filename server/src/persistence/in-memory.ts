import { BookModel, BookStatusModel, AuthorModel } from '../models';

import {
    CreateBookRequest,
    CreateAuthorRequest,
    CreateBookStatusRequest,
    UpdateBookStatusRequest
} from './types';

import {Repository} from './repository';

import {books, authors, bookStatus} from './testData';

export class InMemory implements Repository {

    books: BookModel[] = books;

    authors: AuthorModel[]  = authors;

    bookStatus: BookStatusModel[] = bookStatus;

    query = ( sql: string, args?: any ): Promise<unknown> => {
        return ;
    };

    createBook = async (book: CreateBookRequest) => {
        const existingBook = this.books.find((b) => b.isbn === book.isbn);

        if (!existingBook) {
            this.books.push({ ...book, borrowed: false });
        }

        return book.isbn;
    };

    getBook = async (title: string) => {
        const book = this.books.find((b) => b.title === title);

        if (!book) {
            throw new Error('Book not found');
        }
        return book as BookModel;
    };

    getAllBooks = async () => this.books;

    createAuthor = async (author: CreateAuthorRequest) => {
        const existingAuthor = this.authors.find((a) => a.firstName === author.firstName && a.lastName === author.lastName);

        if (!existingAuthor) {
            const authorId : number = Date.now();
            this.authors.push({ ...author, authorId });
            return authorId;
        }

        return existingAuthor.authorId;

    };

    getAuthor = async (firstName: string, lastName: string) => {
        const existingAuthor = this.authors.find((a) => a.firstName === firstName && a.lastName === lastName);

        if (!existingAuthor) {
            throw new Error('Could not get specific author');
        }

        return existingAuthor;
    };

    getAllAuthors = async () => this.authors;

    getBookStatus = async (title: string) => {
        const bookStatus = this.bookStatus.find((bs) => bs.title == title);

        if (!bookStatus) {
            throw new Error('Could not get book status');
        }

        return bookStatus;
    };

    createBookStatus = async (bookStatus: CreateBookStatusRequest) => {
        const book = this.books.find((b) => b.isbn === bookStatus.isbn);

        if (!book) {
            throw new Error('Could not create book status, book does not exist');
        }

        this.bookStatus.push({ ...book, borrowName: null});
    };

    updateBookStatus = async (bookStatus: UpdateBookStatusRequest) => {
        const existingBookStatus = this.bookStatus.find((bs) => bs.title === bookStatus.title);

        if (!existingBookStatus) {
            throw new Error('Could not create book status, book does not exist');
        }

        const {borrowed, borrowName} = bookStatus;
        existingBookStatus.borrowed = borrowed;
        existingBookStatus.borrowName = borrowName;

        this.books.map((b) => b.title === bookStatus.title ? b.borrowed = bookStatus.borrowed: b);

        return bookStatus.title;
    }
}
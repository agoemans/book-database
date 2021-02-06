import { BookModel, BookStatusModel, AuthorModel } from '../models';

import {
    CreateBookRequest,
    CreateAuthorRequest,
    CreateBookStatusRequest,
    UpdateBookStatusRequest
} from './types';


export interface Repository {
    query: ( sql: string, args?: any ) => Promise<unknown>;

    createBook: (book: CreateBookRequest) => Promise<unknown>;

    getBook: (title: string) => Promise<BookModel>;

    // updateBook: (id: string, org: UpdateBookRequest) => Promise<unknown>;
    //
    // deleteBook: (id: string) => Promise<unknown>;

    getAllBooks: () => Promise<BookModel[]>;
    // getAllBooks: () => Promise<unknown>;

    createAuthor: (author: CreateAuthorRequest) => Promise<unknown>;

    getAuthor: (firstName: string, lastName: string) => Promise<AuthorModel>;

    // updateAuthor: (id: string, org: UpdateAuthorRequest) => Promise<unknown>;

    getAllAuthors: () => Promise<AuthorModel[]>;

    getBookStatus: (title: string) => Promise<BookStatusModel>;

    createBookStatus: (bookStatus: CreateBookStatusRequest) => Promise<unknown>;

    updateBookStatus: (book: UpdateBookStatusRequest) => Promise<unknown>;
}
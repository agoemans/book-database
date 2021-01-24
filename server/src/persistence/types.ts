import { BookModel, BookStatusModel, AuthorModel } from '../models';

export interface CreateBookRequest {
    isbn: string;
    title: string;
    firstName: string;
    lastName: string;
}

export interface UpdateBookRequest {
    isbn: string;
    title: string;
    firstName: string;
    lastName: string;
}

export interface CreateAuthorRequest {
    firstName: string;
    lastName: string;
}

export interface UpdateAuthorRequest {
    authorId: string;
    firstName: string;
    lastName: string;
}

export interface CreateBookStatusRequest {
    isbn: string;
    borrowed: boolean;
    borrowName: string;
}

export interface UpdateBookStatusRequest {
    title: string;
    borrowed: boolean;
    borrowName: string;
}

export interface Repository {
    query: ( sql: string, args?: any ) => Promise<unknown>;

    createBook: (book: CreateBookRequest) => Promise<unknown>;

    getBook: (title: string) => Promise<BookModel>;

    // updateBook: (id: string, org: UpdateBookRequest) => Promise<unknown>;
    //
    // deleteBook: (id: string) => Promise<unknown>;

    getAllBooks: () => Promise<Record<string, BookModel>>;
    // getAllBooks: () => Promise<unknown>;

    createAuthor: (author: CreateAuthorRequest) => Promise<unknown>;

    getAuthor: (firstName: string, lastName: string) => Promise<AuthorModel>;

    // updateAuthor: (id: string, org: UpdateAuthorRequest) => Promise<unknown>;

    getAllAuthors: () => Promise<Record<string, AuthorModel>>;

    getBookStatus: (isbn: string) => Promise<BookStatusModel>;

    createBookStatus: (bookStatus: CreateBookStatusRequest) => Promise<unknown>;

    updateBookStatus: (book: UpdateBookStatusRequest) => Promise<unknown>;
}
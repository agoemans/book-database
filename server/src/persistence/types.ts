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
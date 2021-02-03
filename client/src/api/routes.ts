
import {Book, BookStatus} from '../types';

//todo toggle between production and dev
const url = "http://localhost:3000";

let requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '',
    mode: 'cors'
};

export const getAllBooks = async () => {
    const allBooks = await fetch(`${url}/api/books`);

    return allBooks.text();
};

export const createBook = async (book: Book) => {
    requestOptions['body'] = JSON.stringify(book);

    return await fetch(`${url}/api/book`, requestOptions);
};

export const updateBookStatus = async (bookStatus: BookStatus) => {
    requestOptions['body'] = JSON.stringify(bookStatus);

    return await fetch(`${url}/api/bookstatus`, requestOptions)
};
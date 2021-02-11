import {
    createBook,
    getBookStatus,
    getAllBooks,
    updateBookStatus
} from '../routes/controllers';

import { Request, Response } from 'express';

import {repository} from '../persistence';

const newRequest = (params: unknown, body?: unknown) =>
    (({ body, params } as unknown) as Request);

const newResponse = () =>
    (({
        status: jest.fn(),
        send: jest.fn()
    } as unknown) as Response);

test('Creates a new book and its book status', async () => {
    const bookResponse = newResponse();

    const book = {
        isbn: '111',
        title: 'This is real test',
        firstName: 'Chucky',
        lastName: 'Dumdum'
    };

    await createBook(newRequest(null, book), bookResponse);

    const books: any = await repository.getAllBooks();

    const bookStatusResponse = newResponse();

    await getBookStatus(newRequest(null, book), bookStatusResponse);

    const bookStatus: any = await repository.getBookStatus(book.title);

    expect(bookResponse.status).toHaveBeenCalledWith(201);
    expect(books).toHaveLength(3);
    expect(bookResponse.status).toHaveBeenCalledWith(201);
    expect(bookStatus.title).toEqual(book.title);
});

test('Fetches all books', async () => {
    const response = newResponse();

    await getAllBooks(newRequest(null, null), response);

    const books: any = await repository.getAllBooks();

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledWith(
        expect.objectContaining(books)
    );
});

test('Update book status', async () => {
    const response = newResponse();

    const book = {
        title: 'This is real test',
        borrowed: true,
        borrowName: 'Dumdum'
    };

    await updateBookStatus(newRequest(null, book), response);

    const bookStatus: any = await repository.getBookStatus(book.title);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(bookStatus.borrowed).toEqual(true);
});
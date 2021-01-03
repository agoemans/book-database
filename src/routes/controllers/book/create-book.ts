import { Request, Response } from 'express';

import { repository } from '../../../persistence';

interface CreateBookRequest {
    isbn: string;
    title: string;
    firstName: string;
    lastName: string;
}

export const createBook = async (req: Request, res: Response) => {
    const book = req.body as CreateBookRequest;

    if (
        !book.firstName &&
        !book.lastName &&
        !book.title &&
        !book.isbn
    ) {
        res.status(400);
        res.send({ error: 'No fields specified to update' });
    }

    try {
        const createBookResults = await repository.createBook(book);

        await repository.createBookStatus({
            isbn: book.isbn,
            borrowed: false,
            borrowName: null
        });

        res.status(201);
        res.send('Creating a book!');
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ error: 'An unknown error occured' });
    }
};
import { Request, Response } from 'express';

import { repository } from '../../../persistence';

interface GetBookRequest {
    title: string;
}

export const getBook = async (req: Request, res: Response) => {
    const book = req.body as GetBookRequest;

    if (
        !book.title
    ) {
        res.status(400);
        res.send({ error: 'No fields specified to update' });
    }

    try {
        const getBookResults = await repository.getBook(book.title);

        res.status(201);
        res.send('Got a book!');
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ error: 'An unknown error occured' });
    }
};
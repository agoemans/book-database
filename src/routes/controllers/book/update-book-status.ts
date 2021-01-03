import { Request, Response } from 'express';

import { repository } from '../../../persistence';

interface UpdateBookStatus {
    title: string;
    borrowed: boolean;
    borrowName: string;
}

export const updateBookStatus = async (req: Request, res: Response) => {
    const book = req.body as UpdateBookStatus;

    if (
        !book.title &&
        !book.borrowed &&
        !book.borrowName
    ) {
        res.status(400);
        res.send({ error: 'No fields specified to update' });
    }

    try {
        const getBookStatusResults = await repository.updateBookStatus(book);

        res.status(201);
        res.send('Got book status!');
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ error: 'An unknown error occured' });
    }
};
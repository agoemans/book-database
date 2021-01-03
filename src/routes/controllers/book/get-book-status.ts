import { Request, Response } from 'express';

import { repository } from '../../../persistence';

interface GetBookStatus {
    title: string;
}

export const getBookStatus = async (req: Request, res: Response) => {

    const book = req.body as GetBookStatus;

    if (
        !book.title
    ) {
        res.status(400);
        res.send({ error: 'No fields specified to update' });
    }

    try {
        const getBookStatusResults = await repository.getBookStatus(book.title);

        console.log(getBookStatusResults);

        res.status(201);
        res.send('Got book status!');
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ error: 'An unknown error occured' });
    }
};
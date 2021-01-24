import { Request, Response } from 'express';

import { repository } from '../../../persistence';

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const getBookResults = await repository.getAllBooks();
        res.status(201);
        res.send(getBookResults);

    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ error: 'An unknown error occured' });
    }
};
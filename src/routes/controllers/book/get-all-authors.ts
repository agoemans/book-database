import { Request, Response } from 'express';

import { repository } from '../../../persistence';

export const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const getAuthorResults = await repository.getAllAuthors();

        console.log(getAuthorResults);

        res.status(201);
        res.send('Got all authors!');
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ error: 'An unknown error occured' });
    }
};
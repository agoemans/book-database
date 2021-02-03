import { Request, Response } from 'express';

import * as controllers from './controllers';

export interface Route {
    method: 'get' | 'post' | 'delete';
    path: string;
    handler: (req: Request, res: Response) => unknown;
}

export const routes: Route[] = [
    {
        method: 'post',
        path: '/api/book',
        handler: controllers.createBook
    },
    {
        method: 'get',
        path: '/api/books',
        handler: controllers.getAllBooks
    },
    {
        method: 'post',
        path: '/api/bookstatus',
        handler: controllers.updateBookStatus
    },
];
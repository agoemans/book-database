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
        path: '/api/book/:book',
        handler: controllers.createBook
    },
    {
        method: 'get',
        path: '/api/book/:bookTitle',
        handler: controllers.getBook
    },
    {
        method: 'get',
        path: '/api/books',
        handler: controllers.getAllBooks
    }
    // {
    //     method: 'get',
    //     path: '/api/author/:firstName',
    //     handler: controllers.getAuthor
    // },
    // {
    //     method: 'get',
    //     path: '/api/authors',
    //     handler: controllers.getAuthors
    // },
];
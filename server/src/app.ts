require('dotenv').config();

import express from 'express';
import {routes} from './routes'

const cors = require('cors');
const app = express();

const startApp = () => {
        app.use(cors({
        origin: 'http://localhost:8080',
        optionsSuccessStatus: 200
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    if (process.env.NODE_ENV === 'development') {
        app.listen(process.env.PORT, () => {
            return console.log(`server is listening on ${process.env.PORT}`);
        });
    }
};

const createRoutes = () => {
    routes.forEach((route) => {
        app[route.method](route.path, route.handler);
    });
};


startApp();
createRoutes();



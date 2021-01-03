import express from 'express';

const dotenv = require('dotenv');
dotenv.config();

import {repository} from './persistence'

import {createBook, getAllAuthors, getBook, getAllBooks, getBookStatus, updateBookStatus} from './routes/controllers';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});

app.get('/books', (req, res) => {
    res.send('Looking for books!');
    repository.getAllBooks();
});

app.get('/createBook', (req, res) => {
    req.body = {
            title: 'This is Thud',
            isbn: '12098533',
            firstName: 'Leroy',
            lastName: 'Jenkins'
        };

    createBook(req, res). then( () => {
       // res.send('Creating a book!');
    });

    console.log(req.body);
});

app.get('/getAllAuthors', (req, res) => {
    // res.send('Get all authors!');
    getAllAuthors(req, res). then( () => {
    });
});

app.get('/getBook', (req, res) => {
    req.body = {
        title: 'Another Test',
    };
    getBook(req, res). then( () => {
    });
});

app.get('/getAllBooks', (req, res) => {
    getAllBooks(req, res). then( () => {
    });
});

app.get('/getBookStatus', (req, res) => {
    req.body = {
        title: 'This is a test book 2'
    };
    getBookStatus(req, res). then( () => {
    });
});

app.get('/getBookStatus', (req, res) => {
    req.body = {
        title: 'This is a test book 2'
    };
    getBookStatus(req, res). then( () => {
    });
});

app.get('/updateBookStatus', (req, res) => {
    req.body = {
        title: 'This is a test book 2',
        borrowed: false,
        borrowName: null
    };
    updateBookStatus(req, res). then( () => {
    });
});

app.listen(process.env.PORT, () => {
    return console.log(`server is listening on ${process.env.PORT}`);
});
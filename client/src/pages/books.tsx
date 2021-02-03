import React, { useState, useEffect } from 'react';

import AddABookButton from './elements/add-book-button';
import BooksHeader from './elements/books-header';
import BookRow from './elements/book-row';
import {getAllBooks} from "../api/routes";
import {Book} from '../types';

export default function Books() {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        const books: any = async () => {
            const results = await getAllBooks();
            setBookList(JSON.parse(results));
        };

        books();
    }, [setBookList]);

    return (
        <div className="books-content">
            <h1>List of all the books</h1>
            <AddABookButton/>
            <BooksHeader/>
            {bookList.map(( d: Book, idx: number) =>
                <BookRow key={idx} title={d.title} firstName={d.firstName} lastName={d.lastName} borrowed={d.borrowed}/>
            )}
        </div>
    );
}
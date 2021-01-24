import React, { useState, useEffect } from 'react';

import {
    useHistory,
} from "react-router-dom";

import BookInput from './elements/book-input';

import {createBook} from '../api/routes';

export default function CreateBook() {
    const [title, setTitle] = useState('');
    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [isbn, setISBN] = useState('');

    const history = useHistory();

    function handleReset() {
        history.push('/books');
    }

    async function handleSubmit (event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        await createBook({
            title, isbn, firstName, lastName
        });
        await history.push('/books');
    }

    function handleTitleChange(inputValue: string) {
        setTitle(inputValue);
    }

    function handleISBNChange(inputValue: string) {
        setISBN(inputValue);
    }

    function handleFNameChange(inputValue: string) {
        setFName(inputValue);
    }

    function handleLNameChange(inputValue: string) {
        setLName(inputValue);
    }

    function handleChange(event: React.FormEvent<HTMLFormElement>) {}


    return (
        <div className="create-book-content">
            <h1>Create a book</h1>
            <form className="book-form" onSubmit={handleSubmit} onReset={handleReset} onChange={handleChange}>
                <BookInput labelName="Title:" placeholder="Name of the book" sendIdHandler={handleTitleChange}/>
                <BookInput labelName="ISBN:" placeholder="The isbn number" sendIdHandler={handleISBNChange}/>
                <BookInput labelName="First Name:" placeholder="First name of the author" sendIdHandler={handleFNameChange}/>
                <BookInput labelName="Last Name:" placeholder="Last name of the author" sendIdHandler={handleLNameChange}/>

                <div className="submit-button-container">
                    <input className="submit-button"  type="reset" value="Cancel" />
                    <input className="submit-button"  type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}
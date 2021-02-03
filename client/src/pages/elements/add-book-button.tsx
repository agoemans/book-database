import React from 'react';

import { BsPlus } from 'react-icons/bs';
import {
    Link
} from "react-router-dom";

export default function AddABookButton() {
    return (
        <div className="add-book-button">
            <Link to='/book'>
                <BsPlus />
                <div> Add a book </div>
            </Link>
        </div>
    );
}

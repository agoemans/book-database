import React, { useState, useEffect } from 'react';

export default function BooksHeader() {

    return (
        <div className="books-header">
            <h4 className="books-header-title">Title</h4>
            <h4 className="books-header-firstname">First Name</h4>
            <h4 className="books-header-lastname">Last Name</h4>
            <h4 className="books-header-status">Borrowed</h4>
        </div>
    );
}
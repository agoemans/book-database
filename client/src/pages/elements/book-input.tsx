import React, { useState, useEffect } from 'react';

import {BookInput} from '../../types';

export default function BookInput(props: BookInput) {
    const {labelName, placeholder} = props;
    const [value, setValue] = useState('');

    return (
        <label className="book-label">
            <h2>{labelName}</h2>
            <input className="book-input"
                   type="text"
                   placeholder={placeholder}
                   value={value}
                   onChange={(event) => {
                       setValue(event.target.value);
                       props.sendIdHandler(event.target.value);
                   }}/>
        </label>
    );
}

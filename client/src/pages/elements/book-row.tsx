import React, { useState, useEffect } from 'react';

import {updateBookStatus} from '../../api/routes';
import {BookRow} from '../../types';

export default function BookRow(props: BookRow) {
    const {title, firstName, lastName, borrowed} = props;
    const [value, setValue] = useState({checked: borrowed});

    async function handleChange() {
        let checked: boolean = !value.checked;
        setValue({checked});
        await updateBookStatus({
            title,
            borrowed: checked,
            borrowName: null
        });
    }

    return (
        <div className="book">
            <h2 className="books-header-title">{title}</h2>
            <h2 className="books-header-firstname">{firstName}</h2>
            <h2 className="books-header-lastname">{lastName}</h2>
            <label className="toggle-switch">
                <input type="checkbox" checked={value.checked} onChange={handleChange}/>
                <span className="switch" />
            </label>
        </div>
    );
}
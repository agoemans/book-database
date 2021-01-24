import React, { useState } from 'react';

import './css/app.css';
import {
    Switch,
    Route,
    BrowserRouter as Router
} from "react-router-dom";

import Books from './pages/books';
import CreateBook from "./pages/create-book";

export const App = () => {
    const [hasError, setErrors] = useState(false);

    return (
        <Router>
            <div className="app">
                <div className="app-content">
                    <Switch>
                        <Route path="/book">
                            <CreateBook/>
                        </Route>
                        <Route path="/books">
                            <Books />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
};

import React from 'react';
// import logo from 'src/logo.svg';
import 'src/App.css';
import { AppHeader } from 'src/components/AppHeader/AppHeader';
import { Router } from '@reach/router';
import { Courses } from 'src/components/Courses/Courses';
import { User } from 'src/components/User/User';

function App() {
    return (
        <div>
            <AppHeader />
            <Router>
                <Courses path="courses" />
                <User path="users/:id" />
            </Router>
        </div>
    );
}

export default App;

import React from 'react';
import { AppHeader } from 'src/components/AppHeader/AppHeader';
import { Courses } from 'src/components/Courses/Courses';
import { Router } from '@reach/router';
import { User } from 'src/components/User/User';

export function App() {
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

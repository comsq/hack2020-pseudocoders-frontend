import React, { useEffect } from 'react';
import styles from 'src/App.module.css';
import 'src/App.css';
import { AppHeader } from 'src/components/AppHeader/AppHeader';
import { navigate, Router } from '@reach/router';
import { Courses } from 'src/components/Courses/Courses';
import { Login } from 'src/components/Login/Login';
import { LocalStorageSafe } from 'src/helpers/LocalStorageSafe';
import { IUser, UserStore } from 'src/stores/User';
import { IndexPage } from 'src/components/IndexPage/IndexPage';
import { NotFound } from 'src/components/NotFound/NotFound';

function App() {
    useEffect(() => {
        const user = LocalStorageSafe.getItem<IUser>('user');
        if (!user) {
            navigate('/login');
        } else {
            UserStore.setUser(user);
        }

        UserStore.setCheckLogin();
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader />
            <Router className={styles.router}>
                <IndexPage path="/" />
                <Courses path="/courses" />
                <Login path="login" />
                <NotFound default />
            </Router>
        </div>
    );
}

export default App;

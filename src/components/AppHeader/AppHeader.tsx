import { Link } from '@reach/router';
import React from 'react';
import styles from './AppHeader.css';

export function AppHeader() {
    const id = 1;
    return (
        <div className={styles.appHeader}>
            <Link to="/courses">Курсы</Link>
            <Link to={`/users/${id}`}>Профиль</Link>
        </div>
    );
}

import { Link } from '@reach/router';
import React from 'react';
import styles from 'src/components/AppHeader/AppHeader.module.css';
import { UserStore } from 'src/stores/User';
import { observer } from 'mobx-react-lite';
import { User } from 'src/components/User/User';

function _AppHeader() {
    if (!UserStore.user) {
        return null;
    }

    return (
        <div className={styles.appHeader}>
            <Link to="/courses">Курсы</Link>

            <User />
        </div>
    );
}

export const AppHeader = observer(_AppHeader);

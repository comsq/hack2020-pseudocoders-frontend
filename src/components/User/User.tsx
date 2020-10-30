import React from 'react';
import styles from 'src/components/User/User.module.css';
import { observer } from 'mobx-react-lite';
import { UserStore } from 'src/stores/User';
import { Button } from 'antd';
import { navigate } from '@reach/router';

function _User() {
    const user = UserStore.user;

    function onLogOut() {
        UserStore.setUser(null);
        navigate('/');
    }

    return (
        <div className={styles.user}>
            <div className={styles.email}>{user?.email}</div>
            <Button className={styles.logOutButton} onClick={onLogOut}>
                Выйти
            </Button>
        </div>
    );
}

export const User = observer(_User);

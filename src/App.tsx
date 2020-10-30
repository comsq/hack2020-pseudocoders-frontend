import React, { useEffect } from 'react';
import styles from 'src/App.module.css';
import 'src/App.css';
import { navigate, Router, RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';

import { Login } from 'src/components/Login/Login';
import { LocalStorageSafe } from 'src/helpers/LocalStorageSafe';
import { IUser, UserStore, UserType } from 'src/stores/User';
import { NotFound } from 'src/components/NotFound/NotFound';
import { TeacherTasks } from 'src/components/TeacherPage/TeacherTasks/TeacherTasks';
import { TeacherStudents } from 'src/components/TeacherPage/TeacherStudents/TeacherStudents';
import { TeacherMonitor } from 'src/components/TeacherPage/TeacherMonitor/TeacherMonitor';

function _App() {
    useEffect(() => {
        const user = LocalStorageSafe.getItem<IUser>('user');
        if (!user) {
            navigate('/login');
        } else {
            UserStore.setUser(user);
        }

        UserStore.setCheckLogin();
    }, []);

    const IndexComponent = TeacherTasks;

    return (
        <div className={styles.app}>
            <Router className={styles.router}>
                {UserStore.user?.type === UserType.teacher && (
                    <>
                        <TeacherTasks path="tasks" />
                        <TeacherStudents path="students" />
                        <TeacherMonitor path="monitoring" />
                    </>
                )}
                <IndexComponent path="/" />
                <Login path="login" />
                <NotFound default />
            </Router>
        </div>
    );
}

const App = observer<RouteComponentProps>(_App);

export default App;

import React, { useEffect } from 'react';
import styles from 'src/App.module.css';
import 'src/App.css';
import { navigate, Router, RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';

import { Login } from 'src/components/Login/Login';
import { LocalStorageSafe } from 'src/helpers/LocalStorageSafe';
import { IUser, UserStore, UserType } from 'src/stores/User';
import { NotFound } from 'src/components/NotFound/NotFound';
import { TeacherCreateTask } from 'src/components/Create';
import { TeacherStudents } from 'src/components/TeacherPage/TeacherStudents/TeacherStudents';
import { CommonMonitor } from 'src/components/CommonMonitor/CommonMonitor';
import { Task } from 'src/components/Task/Task';
import { CommonTasks } from 'src/components/CommonTasks/CommonTasks';

function _App() {
    useEffect(() => {
        const user = LocalStorageSafe.getItem<IUser>('user');
        if (!user) {
            navigate('/login');
        } else {
            UserStore.setUser(user);
        }

        UserStore.setCheckLogin();
    }, [UserStore.user?.id]);

    return (
        <div className={styles.app}>
            <Router className={styles.router}>
                {UserStore.user?.type === UserType.teacher && (
                    <>
                        <TeacherCreateTask path="/task/:slug/edit" />
                        <TeacherCreateTask path="/create" />
                        <TeacherStudents path="/students" />
                    </>
                )}
                <CommonMonitor path="/monitoring" />
                <CommonTasks path="/" />
                <CommonTasks path="/tasks" />
                <Login path="/login" />
                <Task path="/task/:slug" />
                <NotFound default />
            </Router>
        </div>
    );
}

const App = observer<RouteComponentProps>(_App);

export default App;

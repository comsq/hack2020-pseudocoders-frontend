import React, { useEffect } from 'react';
import styles from 'src/components/User/User.module.css';
import { observer } from 'mobx-react-lite';
import { UserStore } from 'src/stores/User';
import { Button } from 'antd';
import { navigate } from '@reach/router';
import { CreateStore } from 'src/stores/Create';
import { TaskStore } from 'src/stores/Task';
import { MonitorStore } from 'src/components/CommonMonitor/MonitorStore';
import { GroupStore } from 'src/components/TeacherPage/TeacherStudents/GroupStore';

function _User() {
    const user = UserStore.user;
    const editor = UserStore.editor;
    const isEditorRunning = editor?.status === 'running';
    const editorButtonMessage = isEditorRunning ? 'Остановить редактор' : 'Запустить редактор';
    const isEditorChanging = editor?.isLoading;

    useEffect(() => {
        if (user) {
            UserStore.editorStatus(user.id);
        }
    }, [user]);

    function onLogOut() {
        [UserStore, CreateStore, TaskStore, MonitorStore, GroupStore].forEach((store) => store.reset());
        localStorage.clear();
        navigate('/');
    }

    function onStart() {
        if (user) {
            UserStore.startEditor(user.id);
        }
    }

    function onStop() {
        if (user) {
            UserStore.stopEditor(user.id);
        }
    }

    return (
        <div className={styles.user}>
            <div className={styles.email}>{user?.email}</div>
            <Button
                className={styles.editorButton}
                onClick={isEditorRunning ? onStop : onStart}
                danger={isEditorRunning}
                loading={isEditorChanging}
            >
                {!isEditorChanging && editorButtonMessage}
            </Button>
            <Button className={styles.logOutButton} onClick={onLogOut}>
                Выйти
            </Button>
        </div>
    );
}

export const User = observer(_User);

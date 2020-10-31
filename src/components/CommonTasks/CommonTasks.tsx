import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';
import { UserStore, UserType } from 'src/stores/User';
import { WrapperUser } from 'src/components/WrapperUser/WrapperUser';
import { TeacherPage } from 'src/components/TeacherPage/TeacherPage';
import { StudentPage } from 'src/components/StudentPage/StudentPage';
import { TasksPage } from './TasksPage';

function _CommonTasks() {
    const role = UserStore.user?.type;
    const Component = role === UserType.teacher ? TeacherPage : StudentPage;
    return (
        <WrapperUser>
            <Component path="tasks">
                <TasksPage />
            </Component>
        </WrapperUser>
    );
}

export const CommonTasks = observer<RouteComponentProps>(_CommonTasks);

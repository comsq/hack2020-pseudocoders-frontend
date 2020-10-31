import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';
import { WrapperUser } from 'src/components/WrapperUser/WrapperUser';
import { TeacherPage } from 'src/components/TeacherPage/TeacherPage';
import { TasksPage } from './TasksPage';

function _CommonTasks() {
    return (
        <WrapperUser>
            <TeacherPage path="tasks">
                <TasksPage />
            </TeacherPage>
        </WrapperUser>
    );
}

export const CommonTasks = observer<RouteComponentProps>(_CommonTasks);

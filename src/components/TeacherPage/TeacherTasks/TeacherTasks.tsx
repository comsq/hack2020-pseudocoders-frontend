import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';

import { WrapperUser } from 'src/components/WrapperUser/WrapperUser';
import { TeacherPage } from 'src/components/TeacherPage/TeacherPage';

function _TeacherTasks() {
    return (
        <WrapperUser>
            <TeacherPage path="tasks">
                <div>tasks</div>
            </TeacherPage>
        </WrapperUser>
    );
}

export const TeacherTasks = observer<RouteComponentProps>(_TeacherTasks);

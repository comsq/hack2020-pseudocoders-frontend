import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';

import { WrapperUser } from 'src/components/WrapperUser/WrapperUser';
import { TeacherPage } from 'src/components/TeacherPage/TeacherPage';
import { Create } from './Create';

function _TeacherCreateTask() {
    console.log('here');
    return (
        <WrapperUser>
            <TeacherPage path="tasks">
                <Create />
            </TeacherPage>
        </WrapperUser>
    );
}

export const TeacherCreateTask = observer<RouteComponentProps>(_TeacherCreateTask);

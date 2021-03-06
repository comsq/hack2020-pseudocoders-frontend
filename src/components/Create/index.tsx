import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';
import { WrapperUser } from 'src/components/WrapperUser/WrapperUser';
import { TeacherPage } from 'src/components/TeacherPage/TeacherPage';
import { Create } from './Create';

function _TeacherCreateTask(props: any) {
    return (
        <WrapperUser>
            <TeacherPage path="tasks">
                <Create {...props} />
            </TeacherPage>
        </WrapperUser>
    );
}

export const TeacherCreateTask = observer<RouteComponentProps>(_TeacherCreateTask);

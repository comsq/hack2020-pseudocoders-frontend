import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';

import { WrapperUser } from 'src/components/WrapperUser/WrapperUser';
import { TeacherPage } from 'src/components/TeacherPage/TeacherPage';

function _TeacherStudents() {
    return (
        <WrapperUser>
            <TeacherPage path="students">
                <div>students</div>
            </TeacherPage>
        </WrapperUser>
    );
}

export const TeacherStudents = observer<RouteComponentProps>(_TeacherStudents);

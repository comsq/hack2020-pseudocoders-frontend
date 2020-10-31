import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';

import { WrapperUser } from 'src/components/WrapperUser/WrapperUser';
import { TeacherPage } from 'src/components/TeacherPage/TeacherPage';
import { GroupsPage } from 'src/components/TeacherPage/TeacherStudents/GroupsPage';

function _TeacherStudents() {
    return (
        <WrapperUser>
            <TeacherPage path="students">
                <GroupsPage />
            </TeacherPage>
        </WrapperUser>
    );
}

export const TeacherStudents = observer<RouteComponentProps>(_TeacherStudents);

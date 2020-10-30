import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';

import { WrapperUser } from 'src/components/WrapperUser/WrapperUser';
import { TeacherPage } from 'src/components/TeacherPage/TeacherPage';
import { MonitorPage } from './MonitorPage';

function _TeacherMonitor() {
    return (
        <WrapperUser>
            <TeacherPage path="monitoring">
                <MonitorPage />
            </TeacherPage>
        </WrapperUser>
    );
}

export const TeacherMonitor = observer<RouteComponentProps>(_TeacherMonitor);

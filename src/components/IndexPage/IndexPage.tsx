import { Redirect, RouteComponentProps } from '@reach/router';
import React from 'react';
import { UserStore } from 'src/stores/User';
import { observer } from 'mobx-react-lite';
import { Spin } from 'antd';

function _IndexPage() {
    if (!UserStore.checkLogin) {
        return <Spin />;
    }
    if (UserStore.checkLogin && !UserStore.user) {
        return <Redirect to={'/login'} noThrow />;
    }

    return <Redirect to={'/courses'} noThrow />;
}

export const IndexPage = observer<RouteComponentProps>(_IndexPage);

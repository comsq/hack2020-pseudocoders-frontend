import { Redirect, RouteComponentProps } from '@reach/router';
import React from 'react';
import { UserStore } from 'src/stores/User';
import { observer } from 'mobx-react-lite';
import { Spin } from 'antd';

interface IWrapperUser {
    children: React.ReactElement;
}

type TWrapperUserObserver = IWrapperUser & RouteComponentProps;

function _WrapperUser({ children }: IWrapperUser) {
    if (!UserStore.checkLogin) {
        return <Spin />;
    }
    if (UserStore.checkLogin && !UserStore.user) {
        return <Redirect to={'/login'} noThrow />;
    }

    return children;
}

export const WrapperUser = observer<TWrapperUserObserver>(_WrapperUser);

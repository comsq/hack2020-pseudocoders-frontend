import React from 'react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from '@reach/router';

function _NotFound() {
    return <div>Страница не найдена</div>;
}

export const NotFound = observer<RouteComponentProps>(_NotFound);

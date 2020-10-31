import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from '@reach/router';
import { PageSpinner } from 'src/components/PageSpinner/PageSpinner';

function _NotFound() {
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setNotFound(true);
        }, 5000);
    }, []);

    return notFound ? <>Страница не найдена</> : <PageSpinner />;
}

export const NotFound = observer<RouteComponentProps>(_NotFound);

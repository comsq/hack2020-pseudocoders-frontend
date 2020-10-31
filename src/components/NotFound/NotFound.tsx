import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from '@reach/router';
import { PageSpinner } from 'src/components/PageSpinner/PageSpinner';

function _NotFound() {
    const [notFound, setNotFound] = useState(false);
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        setTimeout(() => {
            if (isMounted.current) {
                setNotFound(true);
            }
        }, 5000);
    }, []);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return notFound ? <>Страница не найдена</> : <PageSpinner />;
}

export const NotFound = observer<RouteComponentProps>(_NotFound);

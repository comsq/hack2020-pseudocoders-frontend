import React from 'react';
import styles from 'src/components/Courses/Courses.module.css';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from '@reach/router';

type Props = RouteComponentProps;
function _User(props: Props) {
    console.info(props);
    return <div className={styles.user}>Я Юзер</div>;
}

export const User = observer(_User);

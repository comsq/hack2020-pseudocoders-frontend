import React, { useEffect } from 'react';
import styles from 'src/components/Courses/Courses.module.css';
import { CoursesStore } from 'src/stores/Courses';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from '@reach/router';

function _Courses() {
    useEffect(() => {
        CoursesStore.list.loadIfNotLoaded();
    }, []);

    if (CoursesStore.list.isLoading) {
        return <>загрузка</>;
    }

    if (CoursesStore.list.hasError) {
        return <>ошибка</>;
    }

    return (
        <div className={styles.courses}>
            {CoursesStore.list.data.map((course, index) => {
                return (
                    <div key={index} className={styles.course}>
                        <div>{course.name}</div>
                        <div className={styles.description}>
                            {course.description}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export const Courses = observer<RouteComponentProps>(_Courses);

import { TeacherPage } from 'src/components/TeacherPage/TeacherPage';
import { StudentPage } from 'src/components/StudentPage/StudentPage';
import { PageSpinner } from 'src/components/PageSpinner/PageSpinner';
import styles from 'src/components/Task/Task.module.css';
import { UserStore, UserType } from 'src/stores/User';
import { RouteComponentProps } from '@reach/router';
import { TaskStore } from 'src/stores/Task';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';

function _TaskPage() {
    useEffect(() => {
        (async () => {
            await TaskStore.getTask('Uralskie-bifshteksy');
        })();
    }, []);

    const role = UserStore.user?.type;
    const Component = role === UserType.teacher ? TeacherPage : StudentPage;

    return (
        <Component path="tasks">
            {TaskStore.task ? (
                <div className={styles.container}>
                    {TaskStore.task.name && <h1 className={styles.title}>{TaskStore.task.name}</h1>}
                    <div className={styles.authorBlock}>
                        {TaskStore.task.author && (
                            <p className={styles.author}>
                                {TaskStore.task.author.first_name} {TaskStore.task.author.first_name} (
                                {TaskStore.task.author.login})
                            </p>
                        )}
                        {TaskStore.task.languages && (
                            <div className={styles.languages}>
                                {TaskStore.task.languages.map((lang, idx) => (
                                    <div className={styles.languageItem} key={idx}>
                                        {lang.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {TaskStore.task.description && (
                        <div
                            style={{ padding: '30px 0' }}
                            className="ql-editor"
                            dangerouslySetInnerHTML={{ __html: TaskStore.task.description }}
                        />
                    )}
                    {TaskStore.task.tests && (
                        <>
                            <p className={styles.paragraph}>ПРИМЕРЫ ТЕСТОВ:</p>
                            {TaskStore.task.tests.slice(0, 3).map(({ input, output }, idx) => (
                                <div className={styles.test} key={idx}>
                                    <div className={styles.file}>
                                        <p className={styles.fileTitle}>input.txt</p>
                                        <div
                                            className={styles.fileContent}
                                            dangerouslySetInnerHTML={{ __html: input }}
                                        />
                                    </div>
                                    <div className={styles.file}>
                                        <p className={styles.fileTitle}>output.txt</p>
                                        <div
                                            className={styles.fileContent}
                                            dangerouslySetInnerHTML={{ __html: output }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            ) : (
                <PageSpinner />
            )}
        </Component>
    );
}

export const Task = observer<RouteComponentProps>(_TaskPage);

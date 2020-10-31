import { TeacherPage } from 'src/components/TeacherPage/TeacherPage';
import { PageSpinner } from 'src/components/PageSpinner/PageSpinner';
import styles from 'src/components/Task/Task.module.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserStore, UserType } from 'src/stores/User';
import { RouteComponentProps } from '@reach/router';
import { TaskStore } from 'src/stores/Task';
import { observer } from 'mobx-react-lite';
import 'react-quill/dist/quill.snow.css';
import { Button, Select } from 'antd';

const { Option } = Select;

function _TaskPage({ slug }: any) {
    const port = UserStore.editor?.port;
    const login = UserStore.user?.login;
    const [lang, setLanguage] = useState('');

    useEffect(() => {
        (async () => {
            await TaskStore.getTask(slug);
        })();
    }, []);

    const handleSendTask = useCallback(() => {
        console.log('lang', lang);
        (async () => {
            // @ts-ignore;
            await TaskStore.sendTask(UserStore.user?.id, TaskStore.task.id, lang);
            window.location.pathname = '/monitoring';
        })();
    }, [lang, UserStore.user, TaskStore.task]);

    const role = UserStore.user?.type;
    const Component = TeacherPage;

    const tagsLanguages = useMemo(
        () =>
            TaskStore.task?.languages.map((language) => (
                <Option value={language.id} key={language.id}>
                    {language.name}
                </Option>
            )),
        [TaskStore.task],
    );

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
                            {TaskStore.task.tests.map(({ input, output }, idx) => (
                                <React.Fragment key={idx}>
                                    <p className={styles.testName}>Test {idx + 1}</p>
                                    <div className={styles.test}>
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
                                </React.Fragment>
                            ))}
                        </>
                    )}
                    <div className={styles.buttonBlock}>
                        {role === UserType.student ? (
                            <>
                                <div className={styles.selectCheckTask}>
                                    <Button
                                        className={styles.chekTaskButton}
                                        onClick={handleSendTask}
                                        disabled={!UserStore.user?.id || !lang || !TaskStore.task.id}
                                        type="primary"
                                    >
                                        Сдать задачу
                                    </Button>
                                    <Select className={styles.selectLang} onChange={setLanguage} defaultValue="">
                                        {tagsLanguages}
                                    </Select>
                                </div>
                                <Button
                                    className={styles.buttonEditor}
                                    disabled={!(port && login)}
                                    href={`http://api.pseudocoders.online:${port}/?folder=/home/${login}/project/${slug}`}
                                    type="primary"
                                >
                                    Открыть редактор кода
                                </Button>
                            </>
                        ) : (
                            <Button href={`task/${slug}/edit`} type="primary">
                                Редактировать задачу
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <PageSpinner />
            )}
        </Component>
    );
}

export const Task = observer<RouteComponentProps>(_TaskPage);

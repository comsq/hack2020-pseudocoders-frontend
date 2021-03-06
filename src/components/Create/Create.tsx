/* eslint-disable sonarjs/cognitive-complexity,max-lines */
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import styles from 'src/components/Create/Create.module.css';
import { CreateStore, ILanguage } from 'src/stores/Create';
import { TaskStore } from 'src/stores/Task';
import { UserStore } from 'src/stores/User';
import { observer } from 'mobx-react-lite';
import { navigate, RouteComponentProps } from '@reach/router';
import ReactQuill from 'react-quill';
import { Input, Button, message } from 'antd';

import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css';
import { useDebouncedCallback } from 'use-debounce';

import TestBlock from './TestBlock';
import { Select } from 'src/antd-extended/Select';

const { Option } = Select;

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        [
            {
                color: [
                    '#FFFFFF',
                    '#000000',
                    '#3072C4',
                    '#228007',
                    '#CE0014',
                    '#D97E00',
                    '#7A1871',
                    '#F2F2F2',
                    '#808080',
                    '#1D85D0',
                    '#3F9726',
                    '#D70C17',
                    '#F69C00',
                    '#B254AA',
                ],
            },
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
        ],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'code'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'code',
    'color',
];

const localStorageName = 'TASK_NAME';
const localStorageDescription = 'TASK_DESCRIPTION';
const localStorageLanguages = 'TASK_LANGUAGES';
const localStorageTests = 'TASK_TESTS';
const localStorageSave = 'IS_SAVE';

const saveInLocalStorage = (name: string, value: string) => {
    localStorage.setItem(name, JSON.stringify(value));
};

const getLocalStorageValue = (nameLocalStorage: string, defaultValue: any = '') => {
    const valueString = localStorage.getItem(nameLocalStorage);
    if (valueString) {
        return JSON.parse(valueString);
    }

    return defaultValue;
};

interface Test {
    input?: string;
    output?: string;
}

export type ChangeTests = (value: string, index: number, nameFile: 'input' | 'output') => void;

function _Create({ slug }: any) {
    const [description, setDescription] = useState(getLocalStorageValue(localStorageDescription));

    const [tests, setTests] = useState<Test[]>(getLocalStorageValue(localStorageTests, [{ input: '', output: '' }]));

    const [name, setName] = useState(getLocalStorageValue(localStorageName));

    const [languages, setLanguages] = useState(getLocalStorageValue(localStorageLanguages, []));

    const onSaveTask = useCallback(() => {
        (async () => {
            const data = {
                author: UserStore.user?.id,
                name: getLocalStorageValue(localStorageName),
                languages: getLocalStorageValue(localStorageLanguages),
                description: getLocalStorageValue(localStorageDescription),
                tests: getLocalStorageValue(localStorageTests),
            };
            const status = slug ? await CreateStore.editTask(data, slug) : await CreateStore.saveTask(data);
            if (status >= 200 && status < 300) {
                TaskStore.list.load();
                message.success('Задача сохранена!');
                const keys = [
                    localStorageName,
                    localStorageDescription,
                    localStorageLanguages,
                    localStorageTests,
                    localStorageSave,
                ];
                keys.forEach((key) => {
                    localStorage.removeItem(key);
                });
                navigate('/tasks');
            } else {
                message.error('Произошла ошибка, попробуйте ещё раз');
            }
        })();
    }, []);

    const debouncedSaveInLocalStorage = useDebouncedCallback((nameVariable, value) => {
        saveInLocalStorage(nameVariable, value);
    }, 300);

    const changeName = useCallback(
        (value) => {
            setName(value);
            debouncedSaveInLocalStorage.callback(localStorageName, value);
        },
        [setName],
    );

    const onChangeName = useCallback(
        (e) => {
            const value = e.target.value;
            changeName(value);
        },
        [setName],
    );

    const onChangeDescription = useCallback(
        (value) => {
            setDescription(value);
            debouncedSaveInLocalStorage.callback(localStorageDescription, value);
        },
        [setDescription],
    );

    const onChangeLanguages = useCallback((value) => {
        setLanguages(value);
        debouncedSaveInLocalStorage.callback(localStorageLanguages, value);
    }, []);

    const changeTests = useCallback((newTests) => {
        setTests(newTests);
        debouncedSaveInLocalStorage.callback(localStorageTests, newTests);
    }, []);

    const onChangeTests: ChangeTests = useCallback(
        (value: string, index: number, nameFile: 'input' | 'output') => {
            const newTests = [...tests];
            newTests[index][nameFile] = value;
            changeTests(newTests);
        },
        [tests],
    );

    useEffect(() => {
        (async () => {
            await CreateStore.getLanguages();
        })();

        if (slug) {
            (async () => {
                await TaskStore.getTask(slug);
                console.log('TaskStore.task?.id ', TaskStore.task?.id, 'UserStore.user?.id', UserStore.user?.id);
                console.log('description', TaskStore.task?.description);
                if (TaskStore.task?.author.id === UserStore.user?.id) {
                    TaskStore.task?.name && changeName(TaskStore.task.name);
                    TaskStore.task?.description && onChangeDescription(TaskStore.task.description);
                    TaskStore.task?.languages && onChangeLanguages(TaskStore.task.languages);
                    TaskStore.task?.tests && changeTests(TaskStore.task.tests);
                }
            })();
        }
    }, []);

    const addTest = useCallback(() => {
        setTests([...tests, { input: '', output: '' }]);
    }, [setTests, tests]);

    const removeTest = (idx: number) => {
        return () => {
            const newTests = tests.filter((_, i) => i !== idx);
            setTests(newTests);
            debouncedSaveInLocalStorage.callback(localStorageTests, newTests);
        };
    };

    const tagsLanguages = useMemo(
        () =>
            CreateStore.languages.map((language: ILanguage) => (
                <Option value={language.slug} key={language.slug}>
                    {language.name}
                </Option>
            )),
        [CreateStore.languages],
    );

    if (slug && TaskStore.task?.author.id !== UserStore.user?.id) {
        return null;
    }

    return (
        <div className={styles.createTask}>
            <div className={styles.container}>
                <h1 className={styles.title}>{slug ? 'Редактирование задачи' : 'Создание задачи'}</h1>
                <p className={styles.description}>
                    Добавьте заголовок и описание задачи. Для красочности вы можете использовать разные цвета, добавлять
                    картинки, списки и код.
                </p>
                {
                    <div className={styles.languges}>
                        <div className={styles.langugesTitle}>ЯЗЫКИ ПРОГРАММИРОВАНИЯ</div>
                        <Select
                            className={styles.selectLanguages}
                            mode="multiple"
                            size="middle"
                            placeholder="Please select"
                            defaultValue={languages}
                            onChange={onChangeLanguages}
                            style={{ minWidth: '200px' }}
                        >
                            {tagsLanguages}
                        </Select>
                    </div>
                }
                <div style={{ marginBottom: 16 }}>
                    <Input
                        value={name}
                        required
                        onChange={onChangeName}
                        addonBefore="НАЗВАНИЕ ЗАДАЧИ"
                        placeholder="Бифштексы..."
                    />
                </div>
                <div className="text-editor">
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                {(description || name) && (
                    <div className={styles.preview}>
                        <h3 className={styles.paragraph}>Предпросмотр</h3>
                        <h2>{name}</h2>
                        <div
                            style={{ padding: 0 }}
                            className="ql-editor"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    </div>
                )}

                <h3 className={styles.paragraph}>Добавить тесты</h3>
                {tests.map((item: Test, idx: number) => (
                    <TestBlock key={idx} idx={idx} {...item} onChangeTests={onChangeTests} onDelete={removeTest(idx)} />
                ))}
                <Button className={styles.addButton} onClick={addTest} icon={<PlusOutlined />}>
                    Добавить тест
                </Button>
                <div className={styles.saveButtonBlock}>
                    <Button
                        type="primary"
                        onClick={onSaveTask}
                        loading={!slug && CreateStore.saveProcess}
                        icon={<SaveOutlined />}
                    >
                        {slug ? 'Сохранить изменения' : 'Сохранить задачу'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export const Create = observer<RouteComponentProps>(_Create);

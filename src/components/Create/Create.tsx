import React, { useMemo, useCallback, useEffect, useState } from 'react';
import styles from 'src/components/Create/Create.module.css';
import { CreateStore } from 'src/stores/Create';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from '@reach/router';
import ReactQuill from 'react-quill';
import { Input, Select, Button } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css';
import { useDebouncedCallback } from 'use-debounce';

import TestBlock from './TestBlock';

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

const ALL_LANGUAGES = [
    { name: 'C++', slug: 'cpp' },
    { name: 'Pascal', slug: 'pascal' },
    { name: 'Python', slug: 'python' },
];

interface Test {
    input?: string;
    output?: string;
}

export type ChangeTests = (value: string, index: number, nameFile: 'input' | 'output') => void;

function _Create() {
    useEffect(() => {
        CreateStore.list.loadIfNotLoaded();
    }, []);

    const [description, setDescription] = useState(getLocalStorageValue(localStorageDescription));

    const [tests, setTests] = useState<Test[]>(getLocalStorageValue(localStorageTests, [{ input: '', output: '' }]));

    const [name, setName] = useState(getLocalStorageValue(localStorageName));

    const [languages, setLanguages] = useState(getLocalStorageValue(localStorageLanguages, null));

    const debouncedSaveInLocalStorage = useDebouncedCallback((nameVariable, value) => {
        saveInLocalStorage(nameVariable, value);
    }, 1000);

    const onChangeName = useCallback(
        (e) => {
            const value = e.target.value;
            setName(value);
            debouncedSaveInLocalStorage.callback(localStorageName, value);
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

    const onChangeTests: ChangeTests = useCallback(
        (value: string, index: number, nameFile: 'input' | 'output') => {
            const newTests = [...tests];
            console.log(index, newTests);
            newTests[index][nameFile] = value;

            setTests(newTests);
            debouncedSaveInLocalStorage.callback(localStorageTests, newTests);
        },
        [tests],
    );

    const addTest = useCallback(() => {
        setTests([...tests, { input: '', output: '' }]);
    }, [setTests, tests]);

    const saveTask = useCallback(() => {
        console.log('save');
    }, []);

    const tagsLanguages = useMemo(
        () =>
            ALL_LANGUAGES.map((language) => (
                <Option value={language.slug} key={language.slug}>
                    {language.name}
                </Option>
            )),
        [],
    );

    return (
        <div className={styles.courses}>
            <div className={styles.container}>
                <h1 className={styles.title}>Создание задачи</h1>
                <p className={styles.description}>
                    Добавьте заголовок и описание задачи. Для красочности вы можете возможность использовать разные
                    цвета, добавлять картинки, списки и код
                </p>
                <div className={styles.languges}>
                    <div className={styles.langugesTitle}>ЯЗЫКИ ПРОГРАММИРОВАНИЯ</div>
                    <Select
                        className={styles.selectLanguages}
                        mode="tags"
                        size="middle"
                        placeholder="Please select"
                        defaultValue={languages}
                        onChange={onChangeLanguages}
                        style={{ minWidth: '200px' }}
                    >
                        {tagsLanguages}
                    </Select>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Input
                        value={name}
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
                    <TestBlock key={idx} idx={idx} {...item} onChangeTests={onChangeTests} />
                ))}
                <Button className={styles.addButton} onClick={addTest} icon={<PlusOutlined />}>
                    Добавить тест
                </Button>
                <div className={styles.saveButtonBlock}>
                    <Button type="primary" onClick={saveTask} icon={<SaveOutlined />}>
                        Сохранить задачу
                    </Button>
                </div>
            </div>
        </div>
    );
}

export const Create = observer<RouteComponentProps>(_Create);
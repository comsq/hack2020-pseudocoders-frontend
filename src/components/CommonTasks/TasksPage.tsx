import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from '@reach/router';
import { ColumnsType } from 'antd/lib/table';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { UserStore, UserType, UserUtils } from 'src/stores/User';
import { ITask, TaskStore } from 'src/stores/Task';
import { PageSpinner } from 'src/components/PageSpinner/PageSpinner';
import { ArrayHelper } from 'src/helpers/ArrayHelper';
import styles from 'src/components/CommonTasks/TasksPage.module.css';

// eslint-disable-next-line sonarjs/cognitive-complexity
function _TasksPage() {
    const user = UserStore.user;
    useEffect(() => {
        (async () => {
            if (user) {
                await TaskStore.getListByUser(UserStore.user?.id as number);
            }
        })();
    }, [user]);

    const tasks = TaskStore.listUser;

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchColumn] = useState<keyof RecordType | ''>('');
    const searchInput = useRef() as React.MutableRefObject<Input | null>;

    function getStringSorter(key: keyof RecordType) {
        return (data1: RecordType, data2: RecordType) => String(data1[key]).localeCompare(String(data2[key]));
    }

    function getColumns(): ColumnsType<RecordType> {
        const array = [
            {
                title: 'Задача',
                dataIndex: 'name',
            },
            UserStore.user?.type === UserType.student && {
                title: 'Автор задачи',
                dataIndex: 'author',
                sorter: getStringSorter('author'),
                ...getColumnSearchProps('author'),
            },
            {
                title: 'Языки',
                dataIndex: 'languages',
                sorter: getStringSorter('languages'),
                ...getColumnSearchProps('languages'),
            },
            UserStore.user?.type === UserType.student && {
                title: 'Вердикт',
                dataIndex: 'verdict',
                sorter: getStringSorter('verdict'),
                ...getColumnSearchProps('verdict'),
            },
        ].filter(Boolean);

        return ArrayHelper.clearNullable(array);
    }

    function calculateVerdict(verdict: any) {
        if (verdict) {
            return verdict;
        }

        return 'no solution';
    }

    function getDataSource() {
        return (tasks as ITask[]).map(({ author, languages, name, slug, verdict, id }) => {
            const prepareVerdict = user?.type === UserType.teacher ? undefined : <div>{calculateVerdict(verdict)}</div>;

            return {
                author: UserUtils.getFullName(author),
                name: <Link to={`/task/${slug}`}>{name}</Link>,
                languages: languages.map((language) => language.name).join(' '),
                verdict: prepareVerdict,
                key: id,
            };
        });
    }

    function getColumnSearchProps(dataIndex: keyof RecordType) {
        return {
            filterDropdown({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) {
                return (
                    <div style={{ padding: 8 }}>
                        <Input
                            ref={searchInput}
                            placeholder={`Поиск по ${dataIndex}`}
                            value={selectedKeys[0]}
                            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            className={styles.searchInput}
                        />
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                                icon={<SearchOutlined />}
                                size="small"
                                className={styles.searchButton}
                            >
                                Поиск
                            </Button>
                            <Button
                                onClick={() => handleReset(clearFilters)}
                                size="small"
                                className={styles.searchButton}
                            >
                                Сбросить
                            </Button>
                        </Space>
                    </div>
                );
            },
            filterIcon(filtered: boolean) {
                return <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />;
            },
            onFilter: (value: any, record: any) =>
                record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
            onFilterDropdownVisibleChange: (visible: boolean) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
            render(text: string) {
                return searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightClassName={styles.highlight}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                );
            },
        };
    }

    function handleSearch(selectedKeys: string[], confirm: () => void, dataIndex: keyof RecordType) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchColumn(dataIndex);
    }

    function handleReset(clearFilters: () => void) {
        clearFilters();
        setSearchText('');
    }

    type RecordType = ReturnType<typeof getDataSource>[number];

    if (!tasks) {
        return <PageSpinner />;
    }

    return (
        <div>
            <Table<RecordType>
                locale={{
                    emptyText: 'пустой список',
                }}
                dataSource={getDataSource()}
                columns={getColumns()}
            />
        </div>
    );
}

export const TasksPage = observer<RouteComponentProps>(_TasksPage);

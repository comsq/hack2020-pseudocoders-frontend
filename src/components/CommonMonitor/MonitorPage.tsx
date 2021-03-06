import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useRef, useState } from 'react';
import styles from 'src/components/CommonMonitor/MonitorPage.module.css';
import { observer } from 'mobx-react-lite';
import { Button, Input, Progress, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { MonitorStore, TaskStatus } from 'src/components/CommonMonitor/MonitorStore';
import { PageSpinner } from 'src/components/PageSpinner/PageSpinner';
import { UserStore, UserType, UserUtils } from 'src/stores/User';
import { ArrayHelper } from 'src/helpers/ArrayHelper';

// eslint-disable-next-line sonarjs/cognitive-complexity
function _MonitorPage() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchColumn] = useState<keyof RecordType | ''>('');
    const searchInput = useRef() as React.MutableRefObject<Input | null>;
    const isTeacher = UserStore.user?.type === UserType.teacher;

    useEffect(() => {
        MonitorStore.list.addConsumer();

        return () => {
            MonitorStore.list.removeConsumer();
        };
    }, []);

    if (MonitorStore.list.isLoading) {
        return <PageSpinner />;
    }

    if (MonitorStore.list.hasError) {
        return <>Монитор недоступен</>;
    }

    function getStringSorter(key: keyof RecordType) {
        return (data1: RecordType, data2: RecordType) => String(data1[key]).localeCompare(String(data2[key]));
    }

    function getColumns(): ColumnsType<RecordType> {
        return ArrayHelper.clearNullable([
            {
                title: 'Дата',
                dataIndex: 'date',
                sorter: (data1, data2) => Number(data1.dateObj) - Number(data2.dateObj),
            },
            isTeacher
                ? {
                      title: 'Ученик',
                      dataIndex: 'userName',
                      sorter: getStringSorter('userName'),
                      ...getColumnSearchProps('userName'),
                  }
                : {
                      title: 'Автор задачи',
                      dataIndex: 'userName',
                      sorter: getStringSorter('userName'),
                      ...getColumnSearchProps('userName'),
                  },
            {
                title: 'Задача',
                dataIndex: 'taskName',
                sorter: getStringSorter('taskName'),
                ...getColumnSearchProps('taskName'),
            },
            {
                title: 'Язык',
                dataIndex: 'language',
                sorter: getStringSorter('language'),
                ...getColumnSearchProps('language'),
            },
            {
                title: 'Результат',
                dataIndex: 'status',
            },
            {
                title: 'Количество пройденных тестов',
                dataIndex: 'testCount',
            },
        ]);
    }

    function getDataSource() {
        return MonitorStore.list.data.map(
            ({ date, user, task, task_author, language, id, passed_tests_count, tests_count, status }) => {
                const dateObj = new Date(date);
                const percent = Math.round((passed_tests_count * 100) / tests_count);

                return {
                    key: id,
                    dateObj,
                    date: `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`,
                    userName: UserUtils.getFullName(isTeacher ? user : task_author),
                    taskName: task.name,
                    language: language.name,
                    testCount: `${passed_tests_count}/${tests_count}`,
                    status: (
                        <div className={styles.status}>
                            <Progress type="circle" width={30} percent={percent} status={getStatusString(status)} />
                            <div className={styles[status]}>{status}</div>
                        </div>
                    ),
                };
            },
        );
    }

    function getStatusString(status: TaskStatus) {
        switch (status) {
            case TaskStatus.ok:
                return 'success';
            case TaskStatus.running:
                return 'active';
            default:
                return 'exception';
        }
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

    return (
        <div className={styles.courses}>
            <Table<RecordType>
                locale={{
                    emptyText: isTeacher ? 'Ученики еще не отправляли решения' : 'Вы еще не отправляли решения',
                }}
                dataSource={getDataSource()}
                columns={getColumns()}
            />
        </div>
    );
}

export const MonitorPage = observer<RouteComponentProps>(_MonitorPage);

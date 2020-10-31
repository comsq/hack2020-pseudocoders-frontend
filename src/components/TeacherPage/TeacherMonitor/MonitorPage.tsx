import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useRef, useState } from 'react';
import styles from 'src/components/TeacherPage/TeacherMonitor/MonitorPage.module.css';
import { observer } from 'mobx-react-lite';
import { MonitorStore, TaskStatus } from 'src/components/TeacherPage/TeacherMonitor/MonitorStore';
import { Button, Input, Progress, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { PageSpinner } from 'src/components/PageSpinner/PageSpinner';
import { UserUtils } from 'src/stores/User';

// eslint-disable-next-line sonarjs/cognitive-complexity
function _MonitorPage() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchColumn] = useState<keyof RecordType | ''>('');
    const searchInput = useRef() as React.MutableRefObject<Input | null>;

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
        return [
            {
                title: 'Дата',
                dataIndex: 'date',
                sorter: (data1, data2) => Number(data1.dateObj) - Number(data2.dateObj),
            },
            {
                title: 'Ученик',
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
                sorter: getStringSorter('status'),
            },
            {
                title: 'Количество пройденных тестов',
                dataIndex: 'testCount',
            },
        ];
    }

    function getDataSource() {
        return MonitorStore.list.data.map(
            ({ date, user, task, language, id, passed_tests_count, tests_count, status }) => {
                const dateObj = new Date(date);
                const percent = Math.round((passed_tests_count * 100) / tests_count);
                return {
                    key: id,
                    dateObj,
                    date: `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`,
                    userName: UserUtils.getFullName(user),
                    taskName: task.name,
                    language: language.name,
                    testCount: `${passed_tests_count}/${tests_count}`,
                    status: (
                        <div className={styles.status}>
                            <div className={styles[status]}>{status}</div>
                            <Progress
                                type="circle"
                                width={30}
                                percent={percent}
                                status={getStatusString(percent, status)}
                            />
                        </div>
                    ),
                };
            },
        );
    }

    function getStatusString(percent: number, status: TaskStatus) {
        if (percent < 100 && status !== TaskStatus.running) {
            return 'exception';
        }

        if (percent === 100) {
            return 'success';
        }

        return 'active';
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
            <Table<RecordType> dataSource={getDataSource()} columns={getColumns()} />
        </div>
    );
}

export const MonitorPage = observer<RouteComponentProps>(_MonitorPage);
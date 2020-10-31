import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Group, GroupStore } from 'src/components/TeacherPage/TeacherStudents/GroupStore';
import { PageSpinner } from 'src/components/PageSpinner/PageSpinner';
import styles from './GroupsPage.module.css';
import { Form, Select } from 'antd';
const { Option } = Select;

function _GroupsPage() {
    const [currentGroup, setCurrentGroup] = useState<Group>();
    useEffect(() => {
        waitDefaultGroup();
    }, []);

    async function waitDefaultGroup() {
        await GroupStore.list.loadIfNotLoaded();
        setCurrentGroup(GroupStore.list.data?.[0]);
    }

    if (GroupStore.list.isLoading) {
        return <PageSpinner />;
    }

    if (GroupStore.list.hasError) {
        return <>Группы недоступны</>;
    }

    console.info(GroupStore.list.data);

    function renderDropdownGroups() {
        const options = GroupStore.list.data.map((group) => {
            return (
                <Option key={group.id} value={group.id}>
                    {group.name}
                </Option>
            );
        });
        return (
            <Form.Item label="Группа учеников">
                <Select defaultValue={currentGroup?.id} style={{ width: 300 }} onChange={handleChange}>
                    {options}
                </Select>
            </Form.Item>
        );
    }

    function handleChange(value: number) {
        setCurrentGroup(GroupStore.list.data.find((group) => group.id === value));
    }

    return <div className={styles.groups}>{renderDropdownGroups()}</div>;
}

export const GroupsPage = observer(_GroupsPage);

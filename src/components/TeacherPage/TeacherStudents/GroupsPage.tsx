import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Group, GroupStore } from 'src/components/TeacherPage/TeacherStudents/GroupStore';
import { PageSpinner } from 'src/components/PageSpinner/PageSpinner';
import styles from './GroupsPage.module.css';
import { Form, List, Select, PageHeader, Button, Modal, Input, message } from 'antd';
import { UserStore, UserUtils } from 'src/stores/User';
import { TaskStore } from 'src/stores/Task';
import { LocalStorageSafe } from 'src/helpers/LocalStorageSafe';
const { Option } = Select;

type Values = {
    name: string;
    studentIds: number[];
    taskIds: number[];
};

// eslint-disable-next-line sonarjs/cognitive-complexity
function _GroupsPage() {
    const localStorageCurrentGroupKey = 'currentGroupId';
    const [currentGroup, setCurrentGroup] = useState<Group>();
    const [visibleCreateGroupModal, setVisibleCreateGroupModal] = useState(false);
    const [visibleEditGroupModal, setVisibleEditGroupModal] = useState(false);
    const isEditMode = visibleEditGroupModal;

    useEffect(() => {
        waitDefaultGroup();
    }, []);

    async function waitDefaultGroup() {
        const currentGroupId = LocalStorageSafe.getItem<number>(localStorageCurrentGroupKey);
        let currentGroup = GroupStore.list.data?.find((group) => group.id === currentGroupId);
        currentGroup && setCurrentGroup(currentGroup);
        await GroupStore.list.loadWithSavingState();
        await UserStore.list.loadWithSavingState();
        await TaskStore.list.loadWithSavingState();
        if (!currentGroup) {
            currentGroup = currentGroupId
                ? GroupStore.list.data.find((group) => group.id === currentGroupId)
                : GroupStore.list.data?.[0];
        }
        setCurrentGroup(currentGroup);
    }

    if (GroupStore.list.isLoading || UserStore.list.isLoading || TaskStore.list.isLoading || !currentGroup) {
        return <PageSpinner />;
    }

    if (GroupStore.list.hasError) {
        return <>Группы недоступны</>;
    }

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
                <Select value={currentGroup?.id} style={{ width: 300 }} onChange={handleChange}>
                    {options}
                </Select>
            </Form.Item>
        );
    }

    function handleChange(value: number) {
        const curGroup = GroupStore.list.data.find((group) => group.id === value);
        setCurrentGroup(curGroup);
        LocalStorageSafe.setItem(localStorageCurrentGroupKey, curGroup?.id);
    }

    async function onCreate(values: Values) {
        const { name, studentIds, taskIds } = values;
        try {
            let group = null;
            if (isEditMode) {
                group = await GroupStore.editGroup(currentGroup!.id, {
                    name,
                    users: studentIds,
                    tasks: taskIds,
                });
            } else {
                group = await GroupStore.createGroup({
                    name,
                    users: studentIds,
                    tasks: taskIds,
                    owner: UserStore.user!.id,
                    slug: name + Math.random(),
                });
            }
            setVisibleCreateGroupModal(false);
            setVisibleEditGroupModal(false);
            group && setCurrentGroup(group);

            const successText = isEditMode ? `Группа ${name} успешно изменена!` : `Группа ${name} успешно создана!`;
            message.success(successText);
        } catch (error) {
            console.info(error);
            const statusText = error.response?.statusText;
            const errorText = error.response?.status === 401 ? 'Пользователь не найден' : statusText || error.message;
            message.error(`Не удалось ${isEditMode ? 'изменить' : 'создать'} группу. ${errorText}`);
        }
    }

    function onCancel() {
        setVisibleCreateGroupModal(false);
        setVisibleEditGroupModal(false);
    }

    function renderCreateGroupModal() {
        const title = isEditMode ? `Редактирование группы ${currentGroup?.name}` : 'Создание группы';
        const initialValues: Values | undefined =
            isEditMode && currentGroup
                ? {
                      name: currentGroup.name,
                      taskIds: currentGroup.tasks,
                      studentIds: currentGroup.users,
                  }
                : undefined;

        return (
            <Modal
                onCancel={onCancel}
                title={title}
                footer={null}
                visible={visibleCreateGroupModal || visibleEditGroupModal}
                destroyOnClose
            >
                <Form name="basic" initialValues={initialValues} onFinish={onCreate}>
                    <Form.Item
                        label="Имя группы"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Введите имя группы',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="studentIds"
                        label="Ученики"
                        rules={[{ required: true, message: 'Выберите хотя бы одного ученика' }]}
                    >
                        <Select placeholder="Выберите учеников" mode="multiple">
                            {UserStore.list.data.map((user) => (
                                <Option key={user.id} value={user.id}>
                                    {UserUtils.getFullName(user)}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="taskIds"
                        label="Задачи"
                        rules={[{ required: true, message: 'Выберите хотя бы одну задачу' }]}
                    >
                        <Select placeholder="Выберите задачи" mode="multiple">
                            {TaskStore.list.data.map((task) => (
                                <Option key={task.id} value={task.id}>
                                    {task.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <div className={styles.footer}>
                        <Form.Item>
                            <Button loading={GroupStore.isLoading} type="primary" htmlType="submit">
                                {isEditMode ? 'Сохранить' : 'Создать'}
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={onCancel}>Отмена</Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        );
    }

    return (
        <div className={styles.groups}>
            {renderCreateGroupModal()}
            <div className={styles.subHeader}>
                {renderDropdownGroups()}
                <Button onClick={() => setVisibleEditGroupModal(true)}>Редактировать группу</Button>
                <Button type="primary" onClick={() => setVisibleCreateGroupModal(true)}>
                    Создать группу
                </Button>
            </div>
            <div className={styles.studentsAndTasks}>
                <List
                    locale={{
                        emptyText: 'В этой группе нет учеников',
                    }}
                    header={<PageHeader title="Список учеников в группе" />}
                    className={styles.students}
                    itemLayout="horizontal"
                    dataSource={UserStore.list.data.filter((user) => currentGroup.users.includes(user.id))}
                    renderItem={(user) => <List.Item>{UserUtils.getFullName(user)}</List.Item>}
                />
                <List
                    locale={{
                        emptyText: 'В этой группе нет задач',
                    }}
                    header={<PageHeader title="Задачи в группе" />}
                    className={styles.tasks}
                    itemLayout="horizontal"
                    dataSource={TaskStore.list.data.filter((task) => currentGroup.tasks.includes(task.id))}
                    renderItem={(task) => <List.Item>{task.name}</List.Item>}
                />
            </div>
        </div>
    );
}

export const GroupsPage = observer(_GroupsPage);

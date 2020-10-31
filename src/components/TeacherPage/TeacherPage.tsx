import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { DefaultLayout } from 'src/components/DefaultLayout/DefaultLayout';
import { UserStore } from 'src/stores/User';

interface ITeacherPage {
    path: string;
    children: React.ReactNode;
}

const menuItems = [
    {
        title: 'Задачи',
        path: 'tasks',
    },
    {
        title: 'Ученики',
        path: 'students',
    },
    {
        title: 'Монитор',
        path: 'monitoring',
    },
];

function _TeacherPage({ path, children }: ITeacherPage) {
    const extMenuItems = Array.from(menuItems);

    if (UserStore.editor?.status === 'running') {
        extMenuItems.push({
            title: 'Редактор',
            path: `http://api.pseudocoders.online:${UserStore.editor.port}`,
        });
    }

    const startIndexMenuItem = extMenuItems.findIndex((item) => item.path === path);

    if (startIndexMenuItem === -1) {
        throw new Error('invalid path');
    }

    const [indexMenuItem, setIndexMenuItem] = useState(startIndexMenuItem);

    return (
        <DefaultLayout menuItems={extMenuItems} indexMenuItem={indexMenuItem} setIndexMenuItem={setIndexMenuItem}>
            {children}
        </DefaultLayout>
    );
}

export const TeacherPage = observer(_TeacherPage);

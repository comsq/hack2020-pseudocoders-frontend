import React, { useState } from 'react';

import { DefaultLayout } from 'src/components/DefaultLayout/DefaultLayout';

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

export function TeacherPage({ path, children }: ITeacherPage) {
    const startIndexMenuItem = menuItems.findIndex((item) => item.path === path);

    if (startIndexMenuItem === -1) {
        throw new Error('invalid path');
    }

    const [indexMenuItem, setIndexMenuItem] = useState(startIndexMenuItem);

    return (
        <DefaultLayout menuItems={menuItems} indexMenuItem={indexMenuItem} setIndexMenuItem={setIndexMenuItem}>
            {children}
        </DefaultLayout>
    );
}

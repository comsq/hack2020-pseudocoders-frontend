import React, { useState } from 'react';
import { DefaultLayout } from 'src/components/DefaultLayout/DefaultLayout';

interface IStudentPage {
    path: string;
    children: React.ReactNode;
}

const menuItems = [
    {
        title: 'Задачи',
        path: '/tasks',
    },
    {
        title: 'Монитор',
        path: '/monitoring',
    },
];

export function StudentPage({ path, children }: IStudentPage) {
    const startIndexMenuItem = menuItems.findIndex((item) => item.path.replace('/', '') === path);

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

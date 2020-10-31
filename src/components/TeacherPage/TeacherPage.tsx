import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { DefaultLayout } from 'src/components/DefaultLayout/DefaultLayout';
import { UserStore } from 'src/stores/User';
import { ArrayHelper } from 'src/helpers/ArrayHelper';

interface ITeacherPage {
    path: string;
    children: React.ReactNode;
}

function _TeacherPage({ path, children }: ITeacherPage) {
    function getMenuItems() {
        return ArrayHelper.clearNullable([
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
            UserStore.editor?.status === 'running' && {
                title: 'Редактор',
                path: `http://api.pseudocoders.online:${UserStore.editor.port}`,
            },
        ]);
    }

    const menuItems = getMenuItems();
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

export const TeacherPage = observer(_TeacherPage);

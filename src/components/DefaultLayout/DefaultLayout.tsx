import React from 'react';
import { Layout, Menu } from 'antd';
import { navigate } from '@reach/router';

import { User } from 'src/components/User/User';

import logo from 'src/components/DefaultLayout/logo.png';
import styles from 'src/components/DefaultLayout/DefaultLayout.module.css';

const { Header, Content, Footer } = Layout;

interface IMenuItem {
    title: string;
    path: string;
}

interface IDefaultLayout {
    children: React.ReactNode;
    indexMenuItem: number;
    menuItems: IMenuItem[];
    setIndexMenuItem: (index: number) => void;
}

export function DefaultLayout({ children, indexMenuItem, menuItems, setIndexMenuItem }: IDefaultLayout) {
    return (
        <Layout>
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[`${indexMenuItem}`]}>
                    <Menu.Item key="logo">
                        <img alt="logo" className={styles.logo} src={logo} />
                    </Menu.Item>
                    {menuItems.map((item, index) => (
                        <Menu.Item
                            key={`${index}`}
                            onClick={() => {
                                setIndexMenuItem(index);
                                navigate(item.path);
                            }}
                        >
                            {item.title}
                        </Menu.Item>
                    ))}
                    <User />
                </Menu>
            </Header>
            <Content className={styles.content}>{children}</Content>
            <Footer className={styles.footer}>Pseudocoders ©2020</Footer>
        </Layout>
    );
}

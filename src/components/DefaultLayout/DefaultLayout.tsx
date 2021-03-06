import React from 'react';
import { Layout, Menu } from 'antd';
import { navigate } from '@reach/router';

import { User } from 'src/components/User/User';

import icon from 'src/components/DefaultLayout/icon.svg';
import styles from 'src/components/DefaultLayout/DefaultLayout.module.css';
import { WindowHelper } from 'src/helpers/WindowHelper';

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
                    <Menu.Item key="logo" className={styles.logoItem} onClick={() => navigate('/')}>
                        <div className={styles.logoBlock}>
                            <img alt="logo" className={styles.logoIcon} src={icon} />{' '}
                            <p className={styles.logoText}>Pseudocoders</p>
                        </div>
                    </Menu.Item>
                    {menuItems.map((item, index) => (
                        <Menu.Item
                            key={`${index}`}
                            onClick={() => {
                                setIndexMenuItem(index);
                                const isExternalLink = item.path.startsWith('http');
                                if (isExternalLink) {
                                    WindowHelper.open(item.path, '_blank');
                                } else {
                                    navigate(`/${item.path}`);
                                }
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

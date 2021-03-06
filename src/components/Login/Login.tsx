import React, { useEffect } from 'react';
import styles from 'src/components/Login/Login.module.css';
import { Form, Input, Button, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { navigate, RouteComponentProps } from '@reach/router';
import { UserStore } from 'src/stores/User';

type Values = {
    login: string;
    password: string;
};

function _Login() {
    useEffect(() => {
        if (UserStore.user) {
            navigate('/');
        }
    }, [UserStore.user]);

    async function onFinish(values: Values) {
        try {
            await UserStore.login(values);
        } catch (error) {
            console.info(error);
            const statusText = error.response?.statusText;
            const errorText = error.response?.status === 401 ? 'Пользователь не найден' : statusText || error.message;
            message.error(`Не удалось войти. ${errorText}`);
        }
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    return (
        <div className={styles.loginWrapper}>
            <Form {...layout} name="basic" onFinish={onFinish}>
                <Form.Item
                    label="Login"
                    name="login"
                    rules={[
                        {
                            required: true,
                            message: 'Введите login',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Введите пароль',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export const Login = observer<RouteComponentProps>(_Login);

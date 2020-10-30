import React from 'react';
import styles from 'src/components/PageSpinner/PageSpinner.module.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export function PageSpinner() {
    return (
        <div className={styles.spinnerWrapper}>
            <Spin indicator={<LoadingOutlined className={styles.indicator} spin />} />
        </div>
    );
}

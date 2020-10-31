import React, { useCallback } from 'react';
import styles from 'src/components/Create/Create.module.css';
import { Input } from 'antd';
const { TextArea } = Input;

const TestBlock = ({ input, output, idx, onChangeTests }: any) => {
    const onChange = useCallback(
        (name: 'input' | 'output') => (e: any) => {
            onChangeTests(e.target.value, idx, name);
        },
        [],
    );

    return (
        <>
            <p className={styles.testHide}>Тест {idx + 1}</p>
            <div className={styles.test}>
                <div className={styles.file}>
                    <p className={styles.fileName}>input.txt</p>
                    <TextArea value={input} rows={4} onChange={onChange('input')} />
                </div>
                <div className={styles.file}>
                    <p className={styles.fileName}>output.txt</p>
                    <TextArea value={output} rows={4} onChange={onChange('output')} />
                </div>
            </div>
        </>
    );
};

export default TestBlock;
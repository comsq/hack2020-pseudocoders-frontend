import React from 'react';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';

export function Select<V extends SelectValue = SelectValue>(props: SelectProps<V>) {
    return (
        <AntSelect
            showSearch
            notFoundContent="Совпадений не найдено"
            filterOption={(input, option) => {
                return option?.children.toLowerCase().includes(input.toLowerCase());
            }}
            {...props}
        />
    );
}

Select.Option = AntSelect.Option;

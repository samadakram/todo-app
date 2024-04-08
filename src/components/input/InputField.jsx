import { forwardRef } from 'react';
import { Input } from 'antd';

const InputField = ({ text, onChangeText }) => (
    <>
        <Input
            value={text}
            onChange={onChangeText}
            size='large'
            placeholder='Add Item...'
        />
    </>
);

export default InputField;
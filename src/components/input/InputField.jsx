import { Input } from 'antd';

const InputField = ({ text, onChangeText, size }) => (
    <>
        <Input
            value={text}
            onChange={onChangeText}
            size={size}
            placeholder='Add Item...'
        />
    </>
);

export default InputField;
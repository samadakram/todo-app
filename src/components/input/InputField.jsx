import { Input } from 'antd';

const InputField = ({ text, onChangeText, size, handleKeyPress }) => (
    <>
        <Input
            value={text}
            onChange={onChangeText}
            size={size}
            placeholder='Add Item...'
            onKeyDown={handleKeyPress}
        />
    </>
);

export default InputField;
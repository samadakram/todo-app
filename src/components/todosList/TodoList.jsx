import { Button, Checkbox } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import './TodoList.css';
import InputField from '../input/InputField';

function TodoList({ tasks, hanleChecked, handleDelete, handleEdit, handleUpdate, editingTaskId, editedText, handleEditedTextChange }) {

    return (
        <>
            {
                tasks.map((task, index) => {
                    return (
                        <div className='list' key={index}>
                            <div style={{ width: '10%', textAlign: 'center', alignSelf: 'center' }}>
                                <Checkbox defaultChecked={task.isCompleted} onChange={() => hanleChecked(task.id)} />
                            </div>
                            <div style={{ width: '70%', alignSelf: 'center' }}>
                                {
                                    editingTaskId === task.id ? (
                                        <InputField
                                            size={'medium'}
                                            text={editedText}
                                            onChangeText={handleEditedTextChange}
                                        />
                                    )
                                        :
                                        (<p className={task.isCompleted ? 'completed' : "false"}>{task.task}</p>)
                                }
                            </div>
                            <div style={{ width: '20%' }} className='ButtonContainer'>
                                <div>
                                    {
                                        editingTaskId === task.id ?
                                            <Button icon={<SaveOutlined />} onClick={() => handleUpdate(task.id)} />
                                            :
                                            <Button icon={<EditOutlined />} onClick={() => handleEdit(task.id)} />
                                    }
                                </div>
                                <div>
                                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(task.id)} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default TodoList
import { Button, Checkbox } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './TodoList.css';

function TodoList({ tasks, hanleChecked, handleDelete }) {

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
                                <p className={task.isCompleted ? 'completed' : "false"}>{task.task}</p>
                            </div>
                            <div style={{ width: '20%' }} className='ButtonContainer'>
                                <div>
                                    <Button icon={<EditOutlined />}  />
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
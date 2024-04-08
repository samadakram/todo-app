import { useRef, useState } from "react";
import Header from "../../components/header/Header"
import InputField from "../../components/input/InputField"
import TodoList from "../../components/todosList/TodoList"
import { Button, message, Empty } from 'antd';
import { generateUUID, log } from "../../lib/utils";
import './Todos.css';

function Todos() {

    const [text, setText] = useState('');
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editFieldText, setEditFieldText] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const success = (content) => {
        messageApi.open({
            type: 'success',
            content: content,
        });
    };

    const error = (content) => {
        messageApi.open({
            type: 'error',
            content: content,
        });
    };

    const warning = (content) => {
        messageApi.open({
            type: 'warning',
            content: content,
        });
    };


    const handleChange = (e) => {
        setText(e.target.value);
    }

    const hanleChecked = (id) => {
        console.log("ID: ", id);
        let updatedTodo = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, isCompleted: !task.isCompleted }
            }
            return task;
        });

        console.log('updated: ', updatedTodo);

        setTasks(updatedTodo);
        localStorage.setItem("tasks", JSON.stringify(updatedTodo));
    }

    const addTodo = () => {
        if (text != '') {
            let tempList = [...tasks];
            let taskObj = {
                id: generateUUID(),
                task: text,
                isCompleted: false
            }
            tempList.push(taskObj);
            let Str = JSON.stringify(tempList);
            console.log('Stringify: ', Str);
            localStorage.setItem('tasks', Str);
            setTasks(JSON.parse(Str));
            success('Task Added!');
            setText('');
        } else {
            warning('Please Write Something!');
        }
    }

    const deleteTodo = (id) => {
        console.log(id);
        let index = tasks.findIndex(task => task.id === id);
        log('index: ', index);
        if (index !== -1) {
            let tempList = [...tasks];
            tempList.splice(index, 1);
            setTasks(tempList);
            localStorage.setItem('tasks', JSON.stringify(tempList));
            success('Task Deleted Successfully!');
        } else {
            error('Task not found!');
        }
    }

    const editTodo = (id) => {
        setEditingTaskId(id);
        let index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            setEditFieldText(tasks[index].task);
        } else {
            error('Task not found!');
        }
    }

    const handleEditedTextChange = (e) => {
        setEditFieldText(e.target.value);
    }

    const updateTodo = (id) => {
        let updatedItem = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, task: editFieldText };
            }
            return task;
        });

        setTasks(updatedItem);
        localStorage.setItem("tasks", JSON.stringify(updatedItem));
        setEditingTaskId(null);
    }

    return (
        <div>
            {contextHolder}
            <Header />
            <div className="headContainer">
                <InputField
                    text={text}
                    onChangeText={handleChange}
                    size={'large'}
                />
                <Button onClick={addTodo}>
                    ADD
                </Button>
            </div>
            <div className="listContainer">
                {
                    tasks && tasks.length == 0 ?
                        <Empty description={'No Task Found!'} />
                        :
                        <TodoList
                            tasks={tasks}
                            hanleChecked={hanleChecked}
                            handleDelete={deleteTodo}
                            handleEdit={editTodo}
                            handleUpdate={updateTodo}
                            editingTaskId={editingTaskId}
                            editedText={editFieldText}
                            handleEditedTextChange={handleEditedTextChange}
                        />
                }
            </div>
        </div>
    )
}

export default Todos
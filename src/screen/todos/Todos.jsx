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
    const [isChecked, setIsChecked] = useState(false);
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

    return (
        <div>
            {contextHolder}
            <Header />
            <div className="headContainer">
                <InputField
                    text={text}
                    onChangeText={handleChange}
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
                            isChecked={isChecked}
                            hanleChecked={hanleChecked}
                            handleDelete={deleteTodo}
                        />
                }
            </div>
        </div>
    )
}

export default Todos
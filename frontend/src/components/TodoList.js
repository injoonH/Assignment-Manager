import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './TodoList.css';

export default function TodoList() {
    const [todoItems, setTodoItems] = useState([]);

    useEffect(() => {
        axios.get('/api/todo')
        .then(res => {
            setTodoItems(res.data);
        });
    }, []);

    const addTodo = () => {
        const time = document.getElementsByClassName('todolist__form__time')[0].value;
        let text = document.getElementsByClassName('todolist__form__text')[0].innerText;
        if (time === '' || text === '') return;
        document.getElementsByClassName('todolist__form__time')[0].value = '';
        document.getElementsByClassName('todolist__form__text')[0].innerText = '';
        console.log('Time:', time);
        console.log('Text:', text);

        axios.post('/api/todo', {
            date: time,
            color: '#e9967a',
            content: text
        })
        .then(() => axios.get('/api/todo'))
        .then(res => {
            setTodoItems(res.data);
        });
    }

    const toggleDone = (item) => {
        console.log('item', item);
        axios.put(`/api/todo/${item._id}/${item.done}/toggledone`)
        .then(() => axios.get('/api/todo'))
        .then(res => {
            setTodoItems(res.data);
        });
    };

    const removeTodo = (item) => {
        axios.delete(`/api/todo/${item._id}`)
        .then(() => axios.get('/api/todo'))
        .then(res => {
            setTodoItems(res.data);
        });
    };

    const todoItemElements = todoItems.map(el => (
        <TodoItem
            key={el.id}
            date={el.date}
            color={el.color}
            content={el.content}
            done={el.done}
            toggleDone={() => toggleDone(el)}
            removeTodo={() => removeTodo(el)}
        />
    ));

    return (
        <div className="todolist">
            <div className="todolist__container">
                {todoItemElements}
            </div>
            <div className="todolist__form">
                <input className="todolist__form__time" type="time" required></input>
                <div className="todolist__form__text" contentEditable="true" placeholder="Todo"></div>
                <button className="todolist__form__submit" onClick={addTodo}>Add</button>
            </div>
        </div>
    );
}

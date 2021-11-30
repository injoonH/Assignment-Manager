import React, { useEffect } from 'react';
import axios from 'axios';
import { getCurDate } from './Helper';
import TodoItem from './TodoItem';
import './TodoList.css';

export default function TodoList({todoItems, setTodoItems}) {
    useEffect(() => {
        axios.get(`/api/todo/${getCurDate()}`)
        .then(res => {
            setTodoItems(res.data);
        });
    }, []);

    const togglePalette = () => {
        const palette = document.getElementsByClassName('todolist__form__palette')[0];
        palette.classList.toggle('invisible');
    };

    const changeColor = (el) => {
        const curColor = document.getElementsByClassName('todolist__form__color')[0];
        curColor.style.backgroundColor = el.target.style.backgroundColor;
    };

    const addTodo = () => {
        const color = document.getElementsByClassName('todolist__form__color')[0].style.backgroundColor;
        const time = document.getElementsByClassName('todolist__form__time')[0].value;
        const text = document.getElementsByClassName('todolist__form__text')[0].innerText;
        if (time === '' || text === '') return;
        document.getElementsByClassName('todolist__form__time')[0].value = '';
        document.getElementsByClassName('todolist__form__text')[0].innerText = '';
        axios.post('/api/todo', {
            color: color,
            time: time,
            content: text,
            date: getCurDate()
        })
        .then(() => axios.get(`/api/todo/${getCurDate()}`))
        .then(res => {
            setTodoItems(res.data);
        });
    };

    const toggleDone = (item) => {
        axios.put(`/api/todo/${item._id}/${item.done}/toggledone`)
        .then(() => axios.get(`/api/todo/${getCurDate()}`))
        .then(res => {
            setTodoItems(res.data);
        });
    };

    const removeTodo = (item) => {
        axios.delete(`/api/todo/${item._id}`)
        .then(() => axios.get(`/api/todo/${getCurDate()}`))
        .then(res => {
            setTodoItems(res.data);
        });
    };

    const todoItemElements = todoItems.sort((a, b) => a.time.localeCompare(b.time)).map(el => (
        <TodoItem
            key={el._id}
            time={el.time}
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
                <div className="todolist__form__palette invisible">
                    <div className="todolist__form__palette__color" style={{backgroundColor:"#e74c3c"}} onClick={(el) => {changeColor(el); togglePalette();}}></div>
                    <div className="todolist__form__palette__color" style={{backgroundColor:"#e67e22"}} onClick={(el) => {changeColor(el); togglePalette();}}></div>
                    <div className="todolist__form__palette__color" style={{backgroundColor:"#f1c40f"}} onClick={(el) => {changeColor(el); togglePalette();}}></div>
                    <div className="todolist__form__palette__color" style={{backgroundColor:"#2ecc71"}} onClick={(el) => {changeColor(el); togglePalette();}}></div>
                    <div className="todolist__form__palette__color" style={{backgroundColor:"#3498db"}} onClick={(el) => {changeColor(el); togglePalette();}}></div>
                    <div className="todolist__form__palette__color" style={{backgroundColor:"#9b59b6"}} onClick={(el) => {changeColor(el); togglePalette();}}></div>
                </div>
                <div className="todolist__form__color-container">
                    <div className="todolist__form__color" style={{backgroundColor:"#e74c3c"}} onClick={togglePalette}></div>
                </div>
                <input className="todolist__form__time" type="time" required></input>
                <div className="todolist__form__text" contentEditable="true" placeholder="Todo"></div>
                <button className="todolist__form__submit" onClick={addTodo}>Add</button>
            </div>
        </div>
    );
}

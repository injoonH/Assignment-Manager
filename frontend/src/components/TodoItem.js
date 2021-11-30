import React from 'react';
import './TodoItem.css';

export default function TodoItem(props) {
    const colorStyle = { backgroundColor: props.color };
    let checkClass, contentClass, timeClass;
    if (props.done) {
        checkClass = 'fas fa-undo-alt';
        contentClass = 'todolist__container__item__content-done';
        timeClass = 'todolist__container__item__time-done';
    } else {
        checkClass = 'fas fa-check';
        contentClass = 'todolist__container__item__content';
        timeClass = 'todolist__container__item__time';
    }

    return (
        <div className="todolist__container__item">
            <div className="todolist__container__item__color" style={colorStyle}></div>
            <div className={timeClass}>{props.time}</div>
            <p className={contentClass}>{props.content}</p>
            <div className="todolist__container__item__check" onClick={props.toggleDone}>
                <i className={checkClass}></i>
            </div>
            <div className="todolist__container__item__remove" onClick={props.removeTodo}>
                <i className="fas fa-minus"></i>
            </div>
        </div>
    );
}
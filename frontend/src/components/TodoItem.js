import React from 'react';
import './TodoItem.css';

export default function TodoItem(props) {
    const colorStyle = { backgroundColor: props.color };
    let checkClass, contentClass, dateClass;
    if (props.done) {
        checkClass = 'fas fa-undo-alt';
        contentClass = 'todolist__container__item__content-done';
        dateClass = 'todolist__container__item__date-done';
    } else {
        checkClass = 'fas fa-check';
        contentClass = 'todolist__container__item__content';
        dateClass = 'todolist__container__item__date';
    }

    return (
        <div className="todolist__container__item">
            <div className="todolist__container__item__color" style={colorStyle}></div>
            <div className={dateClass}>{props.date}</div>
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
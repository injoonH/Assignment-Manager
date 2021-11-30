import React, { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';

function App() {
    const [todoItems, setTodoItems] = useState([]);

    return (
        <div id="main">
            <Calendar key="calendar" setTodoItems={setTodoItems} />
            <TodoList key="todolist" todoItems={todoItems} setTodoItems={setTodoItems} />
        </div>
    );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';

function App() {
    const [todoItems, setTodoItems] = useState([]);
    const [todoChangeFlag, setTodoChangeFlag] = useState(false);

    const toggleDarkMode = () => {
        document.getElementById('main').classList.toggle('darkmode');
    }

    return (
        <div id="main">
            <i class="fas fa-adjust darkmode-button" onClick={toggleDarkMode}></i>
            <Calendar setTodoItems={setTodoItems} todoChangeFlag={todoChangeFlag} setTodoChangeFlag={setTodoChangeFlag} />
            <TodoList todoItems={todoItems} setTodoItems={setTodoItems} setTodoChangeFlag={setTodoChangeFlag} />
        </div>
    );
}

export default App;

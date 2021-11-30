import React from 'react';
import './App.css';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';

function App() {
    return (
        <div id="main">
            <Calendar />
            <TodoList />
        </div>
    );
}

export default App;

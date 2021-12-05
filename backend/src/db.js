import TodoModel from './models/todo.js';

function getAll(date, callback) {
    TodoModel.find({ date: date }, (err, res) => {
        if (err) {
            console.log('Error:', err);
            callback([]);
        } else {
            callback(res);
        }
    });
}

function add(req, callback) {
    const newTodoItem = new TodoModel(req);
    newTodoItem.save((err, res) => {
        callback(res);
    });
}

function toggleDone(id, done, callback) {
    TodoModel.updateOne({_id: id}, {done: !done}, () => {
        callback();
    });
}

function removeTodo(id, callback) {
    TodoModel.deleteOne({_id: id}, (err) => {
        callback();
    });
}

export default {
    getAll,
    add,
    removeTodo,
    toggleDone
};
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    color: String,
    time: String,
    content: String,
    date: String,
    done: { type: Boolean, default: false }
}, {timestamps: true});

const TodoModel = mongoose.model('Todo', todoSchema);

export default TodoModel;
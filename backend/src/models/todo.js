import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    date: String,
    color: String,
    content: String,
    done: { type: Boolean, default: false }
}, {timestamps: true});

const TodoModel = mongoose.model('Todo', todoSchema);

export default TodoModel;
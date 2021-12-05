import express from 'express';
import mongoose from 'mongoose';
import todoRouter from './routes/todo.js';

const app = express();
const port = 8080;

// mongoose.connect('mongodb://localhost:27017/todo', {
mongoose.connect('mongodb://root:ehdgoanfrhkqorentksdlakfmrhekfgehfhr@ssal.sparcs.org:35000/todo?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('DB Connected');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todo', todoRouter);

app.get('/', (req, res) => {
    res.status(418).send('Hi');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
});
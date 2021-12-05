import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRouter from './routes/todo.js';

const app = express();

const whitelist = ['http://ssal.sparcs.org:32000',
                   'http://ssal.sparcs.org:34000',
                   'http://ssal.sparcs.org:36000',
                   'http://ssal.sparcs.org:38000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1)
            callback(null, true);
        else
            callback(new Error('Not allowed origin'));
    }
};

app.use(cors(corsOptions));
// app.use(cors());

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

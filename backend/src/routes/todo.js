import { Router } from 'express';
import db from '../db.js';
const router = Router();

router.get('/:date', (req, res) => {
    console.log('Hello from todo router');
    db.getAll(req.params.date, items => {
        res.json(items);
    });
});

router.post('/', (req, res) => {
    db.add(req.body, (newTodoItem) => {
        res.json(newTodoItem);
    });
});

router.put('/:id/:done/toggledone', (req, res) => {
    db.toggleDone(req.params.id, JSON.parse(req.params.done), () => {
        res.status(200).send();
    });
});

router.delete('/:id', (req, res) => {
    db.removeTodo(req.params.id, () => {
        res.status(200).send();
    });
})

export default router;
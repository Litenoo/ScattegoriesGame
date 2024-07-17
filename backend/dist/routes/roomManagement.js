import express from 'express';
import { v4 as uuid } from 'uuid';
import nameGenerator from './middleware/nameGenerator.js';
const router = express.Router();
const rooms = [];
router.post('/createRoom', async (req, res) => {
});
router.post('/joinRoom', (req, res) => {
    try {
        const uid = uuid();
        const userName = nameGenerator();
        res.cookie('userInfo', { username: userName, id: uuid() }, { secure: true, httpOnly: true });
        res.status(201).send(uid);
    }
    catch (err) {
    }
});
export default router;

import express from 'express';
import { createShowtime, getAllShowtimes } from '../controllers/showtimeController.js';

const router = express.Router()

router.get('/getAllShowtimes', getAllShowtimes)
router.post('/createShowtime', createShowtime)

export default router
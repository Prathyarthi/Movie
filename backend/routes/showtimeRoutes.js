import express from 'express';
import { createShowtime, getAllShowtimes } from '../controllers/showtimeController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.get('/getAllShowtimes', getAllShowtimes)
router.post('/createShowtime', isLoggedIn, createShowtime)

export default router
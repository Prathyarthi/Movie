import express from 'express';
import { createBooking, getAllBookings } from '../controllers/bookingController';
const router = express.Router();

router.get('/getAllBookings', getAllBookings);
router.post('/createBooking', createBooking);

export default router
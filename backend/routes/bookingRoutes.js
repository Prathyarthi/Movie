import express from 'express';
import { createBooking, getAllBookings } from '../controllers/bookingController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/getAllBookings', isLoggedIn, getAllBookings);
router.post('/createBooking', isLoggedIn, createBooking);

export default router
import express from 'express';
import { createTheatre, getAllTheatres } from '../controllers/theatreController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/getAllTheatres', isLoggedIn, getAllTheatres);
router.post('/createTheatre', isLoggedIn, createTheatre);

export default router
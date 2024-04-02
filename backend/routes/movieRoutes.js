import express from 'express';
import { createMovie, getAllMovies } from '../controllers/movieController.js';
import { adminMiddleware, isLoggedIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/getAllMovies', getAllMovies);
router.post('/createMovie', isLoggedIn, adminMiddleware('admin'), createMovie);

export default router
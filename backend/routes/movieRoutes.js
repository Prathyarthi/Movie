import express from 'express';
import { createMovie, getAllMovies } from '../controllers/movieController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/getAllMovies', getAllMovies);
router.post('/createMovie', isLoggedIn, createMovie);

export default router
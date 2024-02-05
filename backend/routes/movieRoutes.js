import express from 'express';
import { createMovie, getAllMovies } from '../controllers/movieController.js';
const router = express.Router();

router.get('/getAllMovies', getAllMovies);
router.post('/createMovie', createMovie);

export default router
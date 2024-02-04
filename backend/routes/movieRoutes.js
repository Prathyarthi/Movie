import express from 'express';
import { getAllMovies } from '../controllers/movieController';
const router = express.Router();

router.post('/getAllMovies', getAllMovies);

export default router
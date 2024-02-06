import express from 'express';
import { createTheatre, getAllTheatres } from '../controllers/theatreController.js';
const router = express.Router();

router.get('/getAllTheatres', getAllTheatres);
router.post('/createTheatre', createTheatre);

export default router
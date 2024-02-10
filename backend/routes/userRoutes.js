import express from 'express'
import { getUser, logout, signin, signup } from '../controllers/userController.js'
import { isLoggedIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/getUser', isLoggedIn, getUser)
router.delete('/logout', isLoggedIn, logout)

export default router
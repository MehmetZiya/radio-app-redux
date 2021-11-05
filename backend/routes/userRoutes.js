import express from 'express'
const router = express.Router()

import { authUser, registerUser } from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.route('/').post(registerUser)

export default router

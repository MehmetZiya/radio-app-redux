import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  addToFav,
  updateUser,
  deleteFav,
  getFav,
} from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.put('/edit', protect, updateUser)
router.put('/delete', protect, deleteFav)
router.route('/favList').post(protect, addToFav).get(protect, getFav)

export default router

import express from 'express'

import { addFavoriteToUser } from '../controllers/favoriteControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(addFavoriteToUser, protect)

export default router

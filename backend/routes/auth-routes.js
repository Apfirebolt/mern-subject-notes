import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
} from '../controllers/auth-controller.js'

import { protect, admin } from '../middleware/auth-middleware.js'

router.route('/register').post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)

export default router

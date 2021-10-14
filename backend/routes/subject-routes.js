import express from 'express'
const router = express.Router()
import {
  addSubject,
  deleteSubject,
  updateSubject,
  getSubject,
  getAllSubjects
} from '../controllers/subject-controller.js'

import { protect } from '../middleware/auth-middleware.js'

router
  .route('/')
  .get(protect, getAllSubjects)
  .post(protect, addSubject)
router
  .route('/:id')
  .get(protect, getSubject)
  .put(protect, updateSubject)
  .delete(protect, deleteSubject)

export default router

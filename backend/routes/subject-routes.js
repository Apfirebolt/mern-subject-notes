import express from 'express'
const router = express.Router()
import {
  addSubject,
  deleteSubject,
  updateSubject,
  getSubject,
  getAllSubjects,
  getTopicToSubject,
  addTopicToSubject,
  deleteTopicFromSubject,
  updateTopicToSubject,
  addNoteToTopic,
  deleteNoteFromTopic,
  updateNoteToTopic
} from '../controllers/subject-controller.js'

import { protect } from '../middleware/auth-middleware.js'
import { validateSubject } from '../middleware/validate-subject.js'

router
  .route('/')
  .get(protect, getAllSubjects)
  .post(protect, validateSubject, addSubject)
router
  .route('/:id')
  .get(protect, getSubject)
  .put(protect, updateSubject)
  .delete(protect, deleteSubject)
router
  .route('/:id/topics')
  .post(protect, addTopicToSubject)
router
  .route('/:id/topics/:topicId')
  .get(protect, getTopicToSubject)
  .put(protect, updateTopicToSubject)
  .delete(protect, deleteTopicFromSubject)
router
  .route('/:id/topics/:topicId')
  .post(protect, addNoteToTopic)
router
  .route('/:id/topics/:topicId/notes/:noteId')
  .put(protect, updateNoteToTopic)
  .delete(protect, deleteNoteFromTopic)

export default router

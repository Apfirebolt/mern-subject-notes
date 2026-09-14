import express from 'express';
const router = express.Router();
import {
  getSubjects,
  createSubject,
  getSubjectById,
  updateSubject,
  deleteSubject,
  addTopicToSubject,
  addNoteToTopic,
  deleteTopicFromSubject,
  updateTopicFromSubject
} from '../controllers/subjectController.js';
import { protect } from '../middleware/authMiddleware.js';

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Get all subjects for the logged-in user
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: List of subjects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mathematics
 *     responses:
 *       201:
 *         description: Subject created successfully
 */
router.route('/').get(protect, getSubjects).post(protect, createSubject);

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject found
 *       404:
 *         description: Subject not found
 *   put:
 *     summary: Update a subject name
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Advanced Mathematics
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *       404:
 *         description: Subject not found
 *   delete:
 *     summary: Delete a subject
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Subject deleted successfully
 *       404:
 *         description: Subject not found
 */
router.route('/:id').get(protect, getSubjectById).put(protect, updateSubject).delete(protect, deleteSubject);

/**
 * @swagger
 * /api/subjects/{id}/topics:
 *   post:
 *     summary: Add a new topic to a subject
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - topicName
 *               - topicDescription
 *             properties:
 *               topicName:
 *                 type: string
 *                 example: Calculus
 *               topicDescription:
 *                 type: string
 *                 example: Introduction to limits and derivatives
 *     responses:
 *       201:
 *         description: Topic added successfully
 *       404:
 *         description: Subject not found
 */
router.route('/:id/topics').post(protect, addTopicToSubject);

/**
 * @swagger
 * /api/subjects/{id}/topics/{topicId}:
 *   delete:
 *     summary: Delete a topic from a subject
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Topic deleted successfully
 *       404:
 *         description: Subject or Topic not found
 */
router.route('/:id/topics/:topicId').delete(protect, deleteTopicFromSubject).put(protect, updateTopicFromSubject);

/**
 * @swagger
 * /api/subjects/{id}/topics/{topicId}:
 *   put:
 *     summary: Update a topic from a subject
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - topicName
 *               - topicDescription
 *             properties:
 *               topicName:
 *                 type: string
 *                 example: Calculus
 *               topicDescription:
 *                 type: string
 *                 example: Introduction to limits and derivatives
 *     responses:
 *       200:
 *         description: Topic updated successfully
 *       404:
 *         description: Subject or Topic not found
 */
router.route('/:id/topics/:topicId').put(protect, updateTopicFromSubject);

/**
 * @swagger
 * /api/subjects/{subjectId}/topics/{topicId}/notes:
 *   post:
 *     summary: Add a note to a specific topic
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - heading
 *               - content
 *             properties:
 *               heading:
 *                 type: string
 *                 example: Limits Definition
 *               content:
 *                 type: string
 *                 example: "# Limits\nA limit is the value that a function approaches..."
 *     responses:
 *       201:
 *         description: Note added successfully
 *       404:
 *         description: Subject or Topic not found
 */
router.route('/:subjectId/topics/:topicId/notes').post(protect, addNoteToTopic);

export default router;
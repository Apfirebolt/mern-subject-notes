import express from "express";
import {
  authUser,
  registerUser,
  getUsers,
  getProfile,
  updateProfile,
  changePassword
} from "../controllers/authController.js";

const router = express.Router();
import { protect } from "../middleware/authMiddleware.js"; 

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Registration successful. Returns user data and JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Invalid user data.
 */
router.route("/").post(registerUser).get(getUsers);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate and log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Login successful. Returns user data and JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Invalid email or password.
 */
router.post("/login", authUser);

/**
 * @swagger
 * /api/auth/profile:
 *   security:
 *     - bearerAuth: []
 *   parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *         type: string
 *       required: true
 *       description: Bearer token for authentication
 *   put:
 *     summary: Update the profile of the authenticated user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               isAdmin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       401:
 *         description: Unauthorized or invalid current password.
 *   get:
 *     summary: Get the profile of the authenticated user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Returns the profile of the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 isAdmin:
 *                   type: boolean
 *       401:
 *         description: Unauthorized.
 */
router.put("/profile", protect, updateProfile);
router.get("/profile", protect, getProfile);
router.put("/change-password", protect, changePassword);

/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     summary: Change the password of the authenticated user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: oldpassword123
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: newstrongpassword123
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       401:
 *         description: Unauthorized or invalid current password.
 */

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Returns a list of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   isAdmin:
 *                     type: boolean
 */
router.get("/users", getUsers);

export default router;

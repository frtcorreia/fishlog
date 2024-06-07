import { Router } from "express";
import {
  updateUser,
  forgotPassword,
  resetPassword,
  activateUser,
} from "../controllers/user.controller";
import {
  upload,
  uploadToCloudinary,
} from "../middlewares/cloudinary.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /user/update/{id}:
 *   put:
 *     tags:
 *      - User
 *     summary: UPDATE angler
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@google.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secretpassword
 *               photo:
 *                 type: string
 *                 format: binary
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Angler updated successfully
 *       400:
 *         description: Invalid Data
 */
router.put(
  "/update/:id",
  authMiddleware,
  upload.single("photo"),
  uploadToCloudinary,
  updateUser
);
/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     tags:
 *      - User
 *     summary: Password Recovery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       401:
 *         description: Invalid Email
 */
router.post("/forgot-password", forgotPassword);
/**
 * @swagger
 * /user/reset-password:
 *   post:
 *     tags:
 *      - User
 *     summary: Password Reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: 09acb2040f9e518c3f9ae8f7152dc22d94d4f39c
 *               newPassword:
 *                 type: password
 *                 example: 123456
 *     responses:
 *       200:
 *         description: reset done successfully
 *       401:
 *         description: Invalid Credentials
 */
router.post("/reset-password", resetPassword);

/**
 * @swagger
 * /user/activate-user:
 *   post:
 *     tags:
 *      - User
 *     summary: Activate User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: 09acb2040f9e518c3f9ae8f7152dc22d94d4f39c
 *     responses:
 *       200:
 *         description: reset done successfully
 *       401:
 *         description: Invalid Credentials
 */
router.post("/activate-user", activateUser);

export default router;

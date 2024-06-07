import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import {
  upload,
  uploadToCloudinary,
} from "../middlewares/cloudinary.middleware";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Register new angler
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
 *     responses:
 *       201:
 *         description: Angler updated successfully
 *       400:
 *         description: Invalid Data
 */
router.post("/register", upload.single("photo"), uploadToCloudinary, register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login
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
 *               password:
 *                 type: string
 *                 example: secretpassword
 *     responses:
 *       200:
 *         description: Login successfully
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

export default router;

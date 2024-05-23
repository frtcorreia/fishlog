import { Router } from "express";
import {
  addCapture,
  getAllCaptures,
  getCapturesById,
  updateCaptureById,
  deleteCaptureById,
} from "../controllers/capture.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CaptureDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         weight:
 *           type: number
 *           nullable: true
 *           example: 4.5
 *         size:
 *           type: number
 *           nullable: true
 *           example: 30
 *         photo:
 *           type: string
 *           nullable: true
 *           format: binary
 *         timestamp:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: 2023-04-23T18:25:43.511Z
 *         locationId:
 *           type: integer
 *           nullable: true
 *           example: 2
 *         weatherId:
 *           type: integer
 *           nullable: true
 *           example: 3
 *         waterId:
 *           type: integer
 *           nullable: true
 *           example: 4
 *         baitId:
 *           type: integer
 *           nullable: true
 *           example: 5
 *         userId:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Big fish caught near the lake."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: 2023-04-23T18:25:43.511Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: 2023-04-23T18:25:43.511Z
 */

/**
 * @swagger
 * /capture:
 *   post:
 *     summary: Register new capture
 *     tags: [Capture]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CaptureDto'
 *     responses:
 *       201:
 *         description: Saved successfully
 *       400:
 *         description: Invalid Data
 */
router.post("/", addCapture);

/**
 * @swagger
 * /capture:
 *   get:
 *     summary: Returns a list of captures
 *     tags: [Capture]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Capture list returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CaptureDto'
 *       400:
 *         description: Error when fetching captures
 */
router.get("/", getAllCaptures);
/**
 * @swagger
 * /capture/{id}:
 *   get:
 *     summary: Returns a specific capture by ID
 *     tags: [Capture]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Capture ID
 *     responses:
 *       200:
 *         description: Capture returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CaptureDto'
 *       404:
 *         description: Capture not found
 */
router.get("/:id", getCapturesById);
/**
 * @swagger
 * /capture/{id}:
 *   put:
 *     summary: Update a specific capture by ID
 *     tags: [Capture]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Capture ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CaptureDto'
 *     responses:
 *       200:
 *         description: Capture updated successfully
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Capture not found
 */
router.put("/:id", updateCaptureById);
/**
 * @swagger
 * /capture/{id}:
 *   delete:
 *     summary: Deletes a specific capture by ID
 *     tags: [Capture]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Capture ID
 *     responses:
 *       204:
 *         description: Capture deleted successfully
 *       404:
 *         description: Capture not found
 */
router.delete("/:id", deleteCaptureById);

export default router;

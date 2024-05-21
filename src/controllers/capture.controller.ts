import { Router } from "express";
import {
  createCapture,
  deleteCapture,
  getCaptureId,
  getCaptures,
  updateCapture,
} from "../services/capture.service";

const router = Router();

router.post("/", async (req: any, res) => {
  const {
    weight,
    size,
    photo,
    timestamp,
    location,
    weather,
    water,
    bait,
    description,
  } = req.body;
  try {
    const userId = req.user;
    const capture = await createCapture({
      weight,
      size,
      photo,
      timestamp: new Date(),
      location,
      weather,
      water,
      bait,
      userId,
      description,
    });
    res.status(200).json(capture);
  } catch (e) {
    res.status(400).json("error");
  }
});

router.get("/", async (req: any, res) => {
  try {
    const userId = req.user;
    const captures = await getCaptures(userId);
    res.status(200).json(captures);
  } catch (e) {
    res.status(400).json("error");
  }
});

router.get("/:id", async (req: any, res) => {
  const { id } = req.params;
  try {
    const userId = req.user;
    const capture = await getCaptureId(Number(id), userId);
    res.status(200).json(capture);
  } catch (e) {
    res.status(400).json("error");
  }
});

router.put("/:id", async (req: any, res) => {
  const { id } = req.params;
  const {
    weight,
    size,
    photo,
    timestamp,
    location,
    weather,
    water,
    bait,
    description,
  } = req.body;

  try {
    const userId = req.user;
    const capture = await updateCapture(Number(id), userId, {
      weight,
      size,
      photo,
      timestamp,
      location,
      weather,
      water,
      bait,
      userId,
      description,
    });
    res.status(200).json(capture);
  } catch (e) {
    res.status(400).json("error");
  }
});

router.delete("/:id", async (req: any, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const userId = req.user;
    const result = await deleteCapture(id, userId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json("error");
  }
});

export default router;

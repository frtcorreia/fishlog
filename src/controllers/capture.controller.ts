import { Router } from "express";
import {
  createCapture,
  deleteCapture,
  getCaptureId,
  getCaptures,
  updateCapture,
} from "../services/capture.service";

const router = Router();

const addCapture = async (req: any, res: any) => {
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
};

const getAllCaptures = async (req: any, res: any) => {
  try {
    const userId = req.user;
    const captures = await getCaptures(userId);
    res.status(200).json(captures);
  } catch (e) {
    res.status(400).json("error");
  }
};

const getCapturesById = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const userId = req.user;
    const capture = await getCaptureId(Number(id), userId);
    res.status(200).json(capture);
  } catch (e) {
    res.status(400).json("error");
  }
};

const updateCaptureById = async (req: any, res: any) => {
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
};

const deleteCaptureById = async (req: any, res: any) => {
  const id = parseInt(req.params.id, 10);
  try {
    const userId = req.user;
    const result = await deleteCapture(id, userId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json("error");
  }
};

export {
  addCapture,
  getAllCaptures,
  getCapturesById,
  updateCaptureById,
  deleteCaptureById,
};

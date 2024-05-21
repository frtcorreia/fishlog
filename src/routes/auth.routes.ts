import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import upload from "../middlewares/upload.middleware";

const router = Router();

router.post("/register", upload.single("photo"), register);
router.post("/login", login);

export default router;

import express, { Router, Request, Response } from "express";
import cors from "cors";
import { authMiddleware } from "./middlewares/auth.middleware";
import authRoutes from "./routes/auth.routes";
import capturesRoutes from "./routes/captures.routes";
import userRoutes from "./routes/user.routes";
import { setupSwagger } from "./swagger";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();
const route = Router();

setupSwagger(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(require("express-status-monitor")());
app.use(errorHandler);

app.use("/auth", authRoutes);
app.use("/capture", authMiddleware, capturesRoutes);
app.use("/user", userRoutes);

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to fishtracker-pro API" });
});

app.use(route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

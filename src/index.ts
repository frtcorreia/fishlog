import express, { Router, Request, Response } from "express";
import cors from "cors";
import { authMiddleware } from "./middlewares/auth.middleware";
import authRoutes from "./routes/auth.routes";
import capturesRoutes from "./routes/captures.routes";
import { setupSwagger } from "./swagger";

const app = express();
const route = Router();

setupSwagger(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/capture", authMiddleware, capturesRoutes);

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to FishLog API" });
});

app.use(route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

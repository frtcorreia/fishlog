import express from "express";
import { json } from "body-parser";
import controllersController from "./controllers/capture.controller";
import { authMiddleware } from "./middlewares/auth.middleware";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(json());

app.use("/auth", authRoutes);
app.use("/capture", authMiddleware, controllersController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

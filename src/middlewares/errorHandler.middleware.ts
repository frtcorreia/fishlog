import { Request, Response, NextFunction } from "express";
import { CustomError } from "../helpers/errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};

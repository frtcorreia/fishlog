import { randomBytes } from "crypto";

export const generateToken = () => {
  return randomBytes(20).toString("hex");
};

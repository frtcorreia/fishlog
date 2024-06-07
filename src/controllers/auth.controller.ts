import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient";
import { generateToken } from "../helpers/tokenGenerator";
import { sendEmail } from "../middlewares/email.middleware";

const register = async (req: Request, res: any) => {
  const { name, email, password, imageUrl } = req.body;
  const activationToken = generateToken();
  const activationExpires = new Date(Date.now() + 3600000);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        photo: imageUrl,
        isActive: false,
        roleId: 2,
        activationToken,
        activationExpires,
      },
    });

    const activationUrl = `${process.env.ENVIRONMENT_FE}/activate-account?token=${activationToken}`;
    await sendEmail(
      email,
      "Account Activation",
      `Please use the following link to activate your account: ${activationUrl}`
    );
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "User could not be created" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email, isActive: true },
      include: { role: true },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role.description },
      process.env.JWT_SECRET || "",
      { expiresIn: "24h" }
    );
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: "Login failed" });
  }
};

export { register, login };

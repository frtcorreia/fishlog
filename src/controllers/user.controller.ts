import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { sendEmail } from "../middlewares/email.middleware";
import { generateToken } from "../helpers/tokenGenerator";
import prisma from "../prismaClient";

const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, photo, isActive } = req.body;
    const { id } = req.params;
    const userId = Number(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ error: `User with ID ${id} not found` });
    }

    const userUpdated = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        password: password && (await bcrypt.hash(password, 10)),
        photo,
        isActive,
      },
    });

    return res.status(200).json(userUpdated);
  } catch (error) {
    res.status(400).json({ error: "updateUser failed" });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const token = generateToken();
    const tokenExpiry = new Date(Date.now() + 3600000);

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: token,
        passwordResetExpires: tokenExpiry,
      },
    });

    const resetUrl = `${process.env.ENVIRONMENT_FE}/reset-password?token=${token}`;
    await sendEmail(
      email,
      "Password Reset",
      `Please use the following link to reset your password: ${resetUrl}`
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const activateUser = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        activationToken: token,
        activationExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isActive: true,
        activationToken: null,
        activationExpires: null,
      },
    });

    res.status(200).json({ message: "Account activated successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { updateUser, forgotPassword, resetPassword, activateUser };

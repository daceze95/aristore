import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils";
import { JwtPayload } from "jsonwebtoken";
import { USER_DATABASE } from "../controllers/userController";
import { AuthRequest } from "../interface";

interface Payload extends JwtPayload { fullName: string; email: string}

const authMiddleWare= (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.slice(7);

  if (!token) {
    res.status(401).json({
      status: "error",
      message: "You're not authorized to perform this action!",
      error: "Unauthorized!",
    });
  }

  try {
    const verifiedToken = verifyJwt(token as string) as Payload;

    const existingUser = USER_DATABASE.find(
      (user) => user.email === verifiedToken.email
    );

    if (!existingUser) {
      res.status(404).json({
        status: "error",
        message: "User doesn't exist.",
        error: "User not found!",
      });
    }

    req.user = verifiedToken;

    next();
  } catch (error: any) {
    res.status(401).json({
      status: "error",
      message: "Invalid token! Outer error",
      details: error.message,
    });
  }
};

export default authMiddleWare;

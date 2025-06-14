import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils";
import { JwtPayload } from "jsonwebtoken";
// import { USER_DATABASE } from "../controllers/userController";

interface Payload extends JwtPayload {
  fullName: string;
  email: string;
}

const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        message: "Invalid token format",
      });
    }

    const decoded = verifyJwt(token!) as Payload;

    // do this for sensitive actions. No DB checks for basic routes
    // const existingUser = USER_DATABASE.find(
    //   (user) => user.email === decoded.email
    // );

    // if (!existingUser) {
    //   res.status(404).json({
    //     status: "error",
    //     message: "User doesn't exist.",
    //     error: "User not found!",
    //   });
    // }

    req.user = decoded;

    next();
  } catch (error: any) {
    res.status(401).json({
      status: "error",
      message: "Expired or invalid token!",
    });
  }
};

export default authMiddleWare;

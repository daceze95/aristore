///* <reference types="../types/express" />*/

import { Request, Response } from "express";
import { decryptPassword, signToken, hashPassword } from "../utils";

export const USER_DATABASE: { fullName: string; email: string; password: string }[] =
  [];

export const userHealthController = (req: Request, res: Response) => {
  try {
    res.status(200).send("<h1><center>Welcome to User</center></h1>");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const signup = async (req: Request, res: Response) => {
  const { fullName, password, email } = req.body;

  //TODO: verify user input

  const newUser = {
    fullName: req.body.fullName as string,
    password: await hashPassword(password),
    email: req.body.email as string,
  };

  USER_DATABASE.push(newUser);

  try {
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "INTERNAL SERVER ERROR",
      error,
    });
  }
};
export const login = async (req: Request, res: Response) => {
  const { fullName, password, email } = req.body;

  //TODO: verify user input

  try {
    const existingUser = USER_DATABASE.find((user) => user.email === email);

    if (existingUser && email === existingUser.email) {
      const verifyPassword = await decryptPassword(
        password,
        existingUser.password
      );
      if (verifyPassword) {
        const { password, ...others } = existingUser;
        const token = signToken(others);
        res.status(200).json({ message: "User login successful", token });
      } else {
        res
          .status(400)
          .json({ message: "Invalid password or email. Please try again." });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "NOT FOUND",
        error: "user not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "INTERNAL SERVER ERROR",
      error,
    });
  }
};

export const getInventory = (req: Request, res: Response) => {
  const {email, fullName} = req.user!;

  res.status(200).json({
    inventory: {
      shirt: 100,
      shoe: 10,
      pants: 20,
      user: {email, fullName}
    },
  });
};

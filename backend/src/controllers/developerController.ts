import { NextFunction, Request, Response } from "express";
import { developerService } from "../services";

export const verifyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const passwordMatch = await developerService.verifyPassword(
      req.body.password
    );
    res.json(passwordMatch);
  } catch (err) {
    next(err);
  }
};

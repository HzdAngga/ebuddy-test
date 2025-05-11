import { NextFunction, Request, Response } from "express";
import { verify } from "../helpers/jwt";
import { userModel } from "../models/users";

export async function authentication(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers?.authorization;
    const token = authorization?.split(" ")?.[1];
    const decoded = verify(String(token));
    const userArr = await userModel.getByEmail(decoded as string);
    const user = userArr?.[0]?.data();
    if (!user) throw { msg: "Authentication is failed" };
    next();
  } catch (error) {
    next(error);
  }
}

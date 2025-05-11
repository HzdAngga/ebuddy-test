import { Request, Response } from "express";
import { checking, hashing } from "../helpers/bcrypt";
import { getToken } from "../helpers/jwt";

class UserControllers {
  async login(req: Request, res: Response) {
    const body = req?.body;
    const email = body?.email;
    const password = body?.password;

    const foundUser = { email: "john@mail.com", password: hashing("changeme") };
    try {
      if (!checking(password, foundUser?.password)) {
        throw { msg: "Wrong email or password" };
      }
      const payload = {
        email,
      };
      const token = getToken(payload);
      res.status(200).json({ token, msg: "Successfully login!" });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export const userControllers = new UserControllers();

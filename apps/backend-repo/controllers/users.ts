import { NextFunction, Request, Response } from "express";
import { checking } from "../helpers/bcrypt";
import { getToken } from "../helpers/jwt";
import { userModel } from "../models/users";

class UserControllers {
  async login(req: Request, res: Response) {
    const body = req?.body;
    const email = body?.email;
    const password = body?.password;

    const userArr = await userModel.getByEmail(email);
    const foundUser = userArr?.[0]?.data();
    try {
      if (!foundUser || !checking(password, foundUser?.password)) {
        throw { msg: "Wrong email or password" };
      }
      const payload = email;
      const token = getToken(payload);
      res.status(200).json({ token, msg: "Successfully login!" });
    } catch (error) {
      res.status(400).json(error);
    }
  }
  async fetchAllUsers(_req: Request, res: Response) {
    try {
      const dbData = await userModel.getAll();
      const data = dbData?.map((doc) => ({
        id: doc?.id,
        ...doc?.data(),
      }));
      res
        .status(200)
        .json({ msg: "Successfully fetch all users!", users: data });
    } catch (error) {
      res.status(400).json(error);
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const updateData = req?.body;

      if (updateData?.highestRents !== undefined) {
        console.log("trigger");
        // update all highestRent in db and recalculating rankingScore
        await userModel.recalculateDocs(updateData?.highestRents);
      }

      await userModel.updateById(updateData);

      res.status(200).json({ msg: "Successfully update user!" });
    } catch (error) {
      res.status(400).json(error);
    }
  }
  async seed(_req: Request, res: Response, next: NextFunction) {
    try {
      console.log("hai lagi2");
      await userModel.seed();
      res
        .status(200)
        .json({ msg: "Successfully seeding data in firebase db!" });
    } catch (error) {
      next(error);
    }
  }
}

export const userControllers = new UserControllers();

import { validationResult } from "express-validator";
import User from "@models/user";
import { NextFunction, Request, Response } from "express";
import Dygnosis from "@models/dygnosis";

export const createDygnosis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let _user_id = req.userID;
    let user = await User.findById(_user_id);
    if (user === null) {
      return res.status(401).json({ message: "invalid token, user not found" });
    } else if (user.userType != "admin") {
      return res.status(401).json({ message: "only admin can access it" });
    } else {
      let errors: any = validationResult(req);
      if (errors.isEmpty() === false) {
        return res.status(422).json({ errors });
      }
      let { dygnosis } = req.body;
      let dygnosis_ = await Dygnosis.findOne({
        dygnosis: dygnosis,
      });
      if (dygnosis_ != null) {
        return res.status(422).json({ message: "dygnosis already exists" });
      }
      dygnosis_ = new Dygnosis();
      dygnosis_.dygnosis = dygnosis;
      await dygnosis_.save();
      return res.json({ dygnosis: dygnosis_ });
    }
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllDygnoses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let user_id = req.userID;
    let user = await User.findById(user_id);
    if (user === null) {
      return res.status(401).json({ message: "invalid token no user found" });
    } else {
      let dygnoses = await Dygnosis.find();
      return res.json({ dygnoses });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

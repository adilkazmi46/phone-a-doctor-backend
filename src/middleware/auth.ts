import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import moment from "moment";

export const createJWT = (user: any) => {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  if (process.env.TOKEN_SECRET)
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
    });
};

export const ensureAuthenticated = async (req: any, res: any, next: any) => {
  if (!req.header("Authorization")) {
    return res.status(401).send({
      message: "not authenticated",
    });
  }

  var token = await req.header("Authorization").split(" ")[1];
  var payload: any = null;
  try {
    if (process.env.TOKEN_SECRET) {
      payload = await decodeJWT(token);
    }
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).json({ message: "token has expired" });
  }
  req.userID = payload.sub;
  next();
};

export const decodeJWT = async (token: any) => {
  if (process.env.TOKEN_SECRET) {
    let payload = await jwt.verify(token, process.env.TOKEN_SECRET);
    return payload;
  }
};

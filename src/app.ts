import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { expressjwt, ExpressJwtRequest } from "express-jwt";
import "module-alias/register";

dotenv.config();
const app: Express = express();
const server = require("http").createServer(app); //create the server

const port = process.env.PORT;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use(express.json());

let mongo_db_url: any = process.env.Mongo_DB_URL;

mongoose
  .connect(encodeURI(mongo_db_url))
  .then((res) => {
    console.log("connected with  monodb");
  })
  .catch((err: any) => {
    console.log("error====", err);
  });

app.use(
  "/protected",
  expressjwt({ algorithms: ["HS256"], secret: process.env.TOKEN_SECRET || "" }),
  function (req, res, next) {
    //@ts-ignore
    console.log("req=", req.auth.sub);
    //@ts-ignore
    if (!req.auth.sub) return res.sendStatus(401);
    next();
  },
  express.static("assets/protected")
);
app.use("/public", express.static("assets/public"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var doctorRouter = require("./routes/doctor");
var patientRouter = require("./routes/patient");
var appointmentRouter = require("./routes/appointment");
var medicineRouter = require("./routes/medicine");
var complainRouter = require("./routes/complain");
var dygnosisRouter = require("./routes/dygnosis");
var otpRouter = require("./routes/otp");
//@ts-ignore
app.get("/api/protected/*");
app.use("/api/user", usersRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/patient", patientRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/medicine", medicineRouter);
app.use("/api/dygnosis", dygnosisRouter);
app.use("/api/utils", indexRouter);
app.use("/api/complain", complainRouter);

app.use("/api/otp", otpRouter);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

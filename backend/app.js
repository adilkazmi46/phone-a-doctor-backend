"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_jwt_1 = require("express-jwt");
require("module-alias/register");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = require("http").createServer(app); //create the server
const port = process.env.PORT;
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let mongo_db_url = process.env.Mongo_DB_URL;
mongoose_1.default
    .connect(encodeURI(mongo_db_url))
    .then((res) => {
    console.log("connected with  monodb");
})
    .catch((err) => {
    console.log("error====", err);
});
app.use("/protected", (0, express_jwt_1.expressjwt)({ algorithms: ["HS256"], secret: process.env.TOKEN_SECRET || "" }), function (req, res, next) {
    //@ts-ignore
    console.log("req=", req.auth.sub);
    //@ts-ignore
    if (!req.auth.sub)
        return res.sendStatus(401);
    next();
}, express_1.default.static("assets/protected"));
app.use("/public", express_1.default.static("assets/public"));
app.get("/", (req, res) => {
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

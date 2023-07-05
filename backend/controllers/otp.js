"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resend_otp = exports.verify_otp = void 0;
const user_1 = __importDefault(require("@models/user"));
const express_validator_1 = require("express-validator");
const otpGenerator = require("otp-generator");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const verify_otp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = yield (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty() === false) {
            return res.status(422).json({ errors });
        }
        else {
            //@ts-ignore
            let user_id = req.userID;
            let user = yield user_1.default.findById(user_id);
            if (user === null) {
                return res
                    .status(404)
                    .json({ message: "user not found, invalid token" });
            }
            let { otp } = req.body;
            if (user.otp != otp) {
                return res.status(422).json({ message: "invalid otp code" });
            }
            user.is_verified = true;
            yield user.save();
            return res.json({ user });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.verify_otp = verify_otp;
const resend_otp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let user_id = req.userID;
        let user = yield user_1.default.findById(user_id).select("-password");
        if (user === null) {
            return res.status(404).json({ message: "user not found, invalid token" });
        }
        let otp = yield otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        yield client.messages
            .create({
            body: `This is otp code ${otp} for doctor-24-7 app`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: user.phone_number,
        })
            .then((message) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("message=", message);
            console.log(message);
            user.otp = otp;
            user.is_verified = false;
            yield user.save();
        }));
        return res.json({ resend: true });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.resend_otp = resend_otp;

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
exports.addRelativePatient = exports.getPatientAttributes = exports.savePatientInformation = exports.updatePatientProfile = exports.uploadProfilePic = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("@models/user"));
const timeZones = require("timezones-list");
const uploadProfilePic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        let _user = req.userID;
        let file = req.file;
        console.log("file=", file);
        if (file === undefined) {
            return res.status(422).json({ message: "profile pic requied" });
        }
        let user = yield user_1.default.findOne({ _id: _user }).select("-password");
        if (user === null) {
            res.status(401).json({ message: "invalid token,user not found" });
        }
        else if (user.userType != "patient") {
            res.status(401).json({ message: "only patients can access" });
        }
        else {
            user.profile_pic = {
                url: "/patients/" + file.filename,
                name: file.filename,
            };
            yield user.save();
            res.json({ user: user });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.uploadProfilePic = uploadProfilePic;
const updatePatientProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = yield (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty() === false) {
            //@ts-ignore
            return res
                .status(422) //@ts-ignore
                .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
        }
        let { gender, language, city, country, address, division, area, height_ft, height_inches, email, weight, is_under_doctor_care, diseases_or_conditions, dob, bloodGroup, timezone_code, timezone_utc, } = req.body;
        //@ts-ignore
        let _user = req.userID;
        console.log("user id=====", _user);
        let user = yield user_1.default.findOne({ _id: _user })
            .select("-password")
            .select("-password");
        if (user === null) {
            res.status(401).json({ message: "invalid token,user not found" });
        }
        else if (user.userType != "patient") {
            res.status(401).json({ message: "only patients can access" });
        }
        else {
            if (user.patient === null) {
                return res.status(401).json({
                    message: "unautorized access, no doctor found against the user id",
                });
            }
            user.language = language;
            user.country = country;
            user.city = city;
            user.division = division;
            user.area = area;
            user.address = address;
            user.dob = dob;
            user.email = email;
            user.gender = gender;
            user.timezone = {
                code: timezone_code,
                utc: timezone_utc,
            };
            user.patient.diseases_or_conditions = diseases_or_conditions;
            user.patient.bloodGroup = bloodGroup;
            user.patient.height = {
                ft: height_ft,
                inches: height_inches,
            };
            user.patient.weight = weight;
            user.patient.is_under_doctor_care = is_under_doctor_care;
            yield user.save();
            return res.json({ user: user });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updatePatientProfile = updatePatientProfile;
const savePatientInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("req_body=",req.body);
        // return res.json({body:req.body});
        let errors = yield (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty() === false) {
            //@ts-ignore
            return res
                .status(422) //@ts-ignore
                .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
        }
        let { gender, language, height_ft, height_inches, email, weight, is_under_doctor_care, diseases_or_conditions, dob, bloodGroup, isSkiped, timezone_code, timezone_utc, } = req.body;
        console.log("body=", req.body);
        if (isSkiped === false) {
            console.log("email=", email);
        }
        //@ts-ignore
        let _user = req.userID;
        let user = yield user_1.default.findOne({ _id: _user }).select("-password");
        if (user === null) {
            res.status(401).json({ message: "invalid token,user not found" });
        }
        else if (user.userType != "patient") {
            res.status(401).json({ message: "only patients can access" });
        }
        else {
            if (user.patient === null) {
                return res.status(401).json({
                    message: "unautorized access, no doctor found against the user id",
                });
            }
            user.language = language;
            user.dob = dob;
            user.email = isSkiped === true ? "" : email;
            user.gender = gender;
            user.timezone = {
                utc: timezone_utc,
                code: timezone_code,
            };
            //  user.is_profile_created = true;
            user.is_information_completed = true;
            user.patient.diseases_or_conditions = diseases_or_conditions;
            user.patient.bloodGroup = bloodGroup;
            user.patient.height = {
                ft: height_ft,
                inches: height_inches,
            };
            user.patient.weight = weight;
            user.patient.is_under_doctor_care = is_under_doctor_care;
            yield user.save();
            return res.json({ user: user });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.savePatientInformation = savePatientInformation;
// export const save_patient_information = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let errors = validationResult(req);
//     if (errors.isEmpty() === false) {
//       return res.status(422).json(errors);
//     }
//     //@ts-ignore
//     let userID = req.userID;
//     let user = await User.findById(userID).select("-password");
//     if (user === null) {
//       return res
//         .status(401)
//         .json({ message: "invalid token, user not found." });
//     }
//     if (user.userType != "patient") {
//       return res.status(401).json({ message: "only patients can access it" });
//     }
//     let { email, title } = req.body;
//     let patient = await Patient.findOne({
//       user_id: user._id,
//     });
//     // doctor.title = title;
//     // await doctor.save();
//     // user.email = email;
//     user.is_information_completed = true;
//     await user.save();
//     return res.json({ patient: patient, user: user });
//   } catch (err: any) {
//     return res.status(500).json({ message: err.message });
//   }
// };
const getPatientAttributes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let userID = req.userID;
        let user = yield user_1.default.findById(userID);
        if (user === null) {
            return res.status(401).json({ message: "invalid token, no user found" });
        }
        if (user.userType != "patient") {
            return res.status(401).json({ message: "only patient can access it" });
        }
        if (user.patient === null) {
            return res
                .status(401)
                .json({ message: "only owner can access it,patient not found" });
        }
        return res.json({ user });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getPatientAttributes = getPatientAttributes;
const addRelativePatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let userID = req.userID;
        let user = yield user_1.default.findById(userID).select("-password");
        if (user === null) {
            return res.status(401).json({ message: "invalid token, no user found" });
        }
        if (user.userType != "patient") {
            return res.status(401).json({ message: "only patient can access it" });
        }
        if (user.patient === null) {
            return res
                .status(401)
                .json({ message: "only owner can access it,patient not found" });
        }
        if (user.is_profile_created === false ||
            user.is_information_completed === false ||
            user.is_verified === false) {
            return res
                .status(401)
                .json({ message: "user must complete it's profile first" });
        }
        let { gender, height_ft, height_inches, weight, is_under_doctor_care, diseases_and_conditions, dob, bloodGroup, full_name, } = req.body;
        yield user.relative_patients.push({
            gender: gender,
            height: {
                ft: height_ft,
                inches: height_inches,
            },
            weight: weight,
            full_name: full_name,
            is_under_doctor_care: is_under_doctor_care,
            diseases_and_conditions: diseases_and_conditions,
            dob: dob,
            bloodGroup: bloodGroup,
        });
        yield user.save();
        return res.json({ user });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.addRelativePatient = addRelativePatient;

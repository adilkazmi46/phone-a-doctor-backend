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
exports.searchDoctor = exports.gotAllDoctorsForeign = exports.gotAllDoctorsLocal = exports.getDoctorAttributes = exports.save_doctor_information = exports.updateAvailability = exports.uploadProfilePic = exports.updatePersonalProfile = exports.updateProfessionalProfile = exports.UpdateDoctorBankDetails = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("@models/user"));
const moment_1 = __importDefault(require("moment"));
const medical_specialities_1 = __importDefault(require("@models/medical_specialities"));
const medical_categories_1 = __importDefault(require("@models/medical_categories"));
const mongoose = require("mongoose");
const timeZones = require("timezones-list");
var aws = require("aws-sdk");
var s3 = new aws.S3({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: "us-west-1",
});
const UpdateDoctorBankDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty() === false) {
            return res
                .status(422) //@ts-ignore
                .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
        }
        let { bank_name, bank_address, swift_code, mobile_account, account_holder_name, account_number, branch, } = req.body;
        //@ts-ignore
        let _user = req.userID;
        let user = yield user_1.default.findOne({
            _id: _user,
        });
        if (_user === null) {
            return res.status(401).json({ message: "invalid token user not found" });
        }
        else if (user.userType != "doctor") {
            return res.status(401).json({
                message: "only doctor can access",
            });
        }
        else {
            user.doctor.bank_details.address = bank_address;
            user.doctor.bank_details.name = bank_name;
            user.doctor.bank_details.branch = branch;
            user.doctor.bank_details.swift_code = swift_code;
            user.doctor.bank_details.account_holder_name = account_holder_name;
            user.doctor.bank_details.mobile_account = mobile_account;
            user.doctor.bank_details.account_number = account_number;
            user.doctor.is_bank_details_completed = true;
            yield user.save();
            res.status(200).json({ user: user });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.UpdateDoctorBankDetails = UpdateDoctorBankDetails;
const updateProfessionalProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty() === false) {
            return res
                .status(422) //@ts-ignore
                .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
        }
        if (req.files.gov_id_front === undefined ||
            req.files.gov_id_back === undefined ||
            req.files.certificate_file === undefined) {
            if (req.files.gov_id_front) {
                s3.deleteObject({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: req.files.gov_id_front[0].key,
                }, (err, data) => {
                    console.error(err);
                    console.log(data);
                });
            }
            if (req.files.gov_id_back) {
                s3.deleteObject({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: req.files.gov_id_back[0].key,
                }, (err, data) => {
                    console.error(err);
                    console.log(data);
                });
            }
            if (req.files.certificate_file) {
                s3.deleteObject({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: req.files.certificate_file[0].key,
                }, (err, data) => {
                    console.error(err);
                    console.log(data);
                });
            }
            return res.status(422).json({
                image_error: `Gov id front, Gov id back and certificate images are required!`,
            });
        }
        if (req.image_error) {
            return res.json({ image_error: req.image_error });
        }
        let { degree, institute, certificate_number, gov_id_number, medical_field, medical_speciality, medical_category, experience, consultation_fee, follow_up_fee, chamber_or_hospital_address, is_24_7, about, } = req.body;
        console.log("req body=", req.body);
        let files = req.files;
        let { gov_id_front, gov_id_back, certificate_file } = files;
        let user = yield user_1.default.findOne({
            _id: req.userID,
        });
        if (user === null) {
            return res.status(401).json({ message: "invalid token user not found" });
        }
        else if (user.userType != "doctor") {
            return res.status(401).json({
                message: "only doctor can access it",
            });
        }
        else {
            if (user.doctor === null) {
                return res
                    .status(401)
                    .json({ message: "doctor not found against this user id" });
            }
            else {
                let _medical_speciality = yield medical_specialities_1.default.findOne({
                    speciality: medical_speciality,
                });
                if (_medical_speciality === null) {
                    return res
                        .status(422)
                        .json({ message: "invalid medical speciality value" });
                }
                let _medical_category = yield medical_categories_1.default.findOne({
                    category: medical_category,
                });
                if (_medical_category === null) {
                    return res
                        .status(422)
                        .json({ message: "invalid medical category value" });
                }
                user.doctor.degree = degree;
                user.doctor.institute = institute;
                user.doctor.chamberORhospitalAddress = chamber_or_hospital_address;
                if (user.doctor.medical_certificate.url) {
                    console.log("certificate assets" + user.doctor.medical_certificate.url);
                    yield s3.deleteObject({
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: user.doctor.medical_certificate.key,
                    }, (err, data) => {
                        console.error(err);
                        console.log(data);
                    });
                }
                user.doctor.medical_certificate = {
                    key: certificate_file[0].key,
                    url: certificate_file[0].location,
                    name: certificate_file[0].originalname,
                    certificate_number: certificate_number,
                };
                if (user.doctor.gov_id.gov_id_back.url) {
                    console.log("back assets" + user.doctor.gov_id.gov_id_back.url);
                    yield s3.deleteObject({
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: user.doctor.gov_id.gov_id_back.key,
                    }, (err, data) => {
                        console.error(err);
                        console.log(data);
                    });
                }
                if (user.doctor.gov_id.gov_id_front.url) {
                    console.log("front assets" + user.doctor.gov_id.gov_id_front.url);
                    yield s3.deleteObject({
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: user.doctor.gov_id.gov_id_front.key,
                    }, (err, data) => {
                        console.error(err);
                        console.log(data);
                    });
                }
                user.doctor.gov_id = {
                    gov_id_number: gov_id_number,
                    gov_id_back: {
                        key: gov_id_back[0].key,
                        url: gov_id_back[0].location,
                        name: gov_id_back[0].originalname,
                    },
                    gov_id_front: {
                        key: gov_id_front[0].key,
                        url: gov_id_front[0].location,
                        name: gov_id_front[0].originalname,
                    },
                };
                console.log("consultation fee=", consultation_fee);
                console.log("is_24_7=", new Boolean(is_24_7));
                user.doctor.experience = parseInt(experience);
                //parseInt(experience);
                console.log("experience_=", user.doctor.experience);
                user.doctor.is_24_7 = is_24_7;
                user.doctor.consultation_fee = consultation_fee;
                user.doctor.follow_up_fee = follow_up_fee;
                user.doctor.medical_field = medical_field;
                user.doctor.medical_category = medical_category;
                user.doctor.medical_speciality = medical_speciality;
                user.doctor.is_professional_profile_created = true;
                user.doctor.about = about;
                yield user.save();
                user.is_profile_created = true;
                yield user.save();
                res.json({ user: user });
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateProfessionalProfile = updateProfessionalProfile;
const updatePersonalProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty() === false) {
            return res
                .status(422) //@ts-ignore
                .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
        }
        let { city, division, email, dob, gender, address, country, language, area, timezone_utc, title, full_name, timezone_code, } = req.body;
        //@ts-ignore
        let _user = req.userID;
        let user = yield user_1.default.findOne({
            _id: _user,
        }).select("-password");
        //res.json({ _user, body: req.body });
        if (user === null) {
            return res.status(401).json({ message: "invalid token user not found" });
        }
        else if (user.userType != "doctor") {
            return res.status(401).json({ message: "unauthorized access" });
        }
        else {
            if (user.doctor === null) {
                return res.status(401).json({
                    message: "unautorized access, no doctor found against the user id",
                });
            }
            let timezone = timeZones.default.filter((item, index) => {
                return item.tzCode === timezone_code && item.utc === timezone_utc;
            });
            console.log("timezone length===", timezone.length, timezone);
            if (timezone.length === 0) {
                return res.status(422).json({
                    errors: [{ msg: "invalid timzone code or utc", param: "timzone" }],
                });
            }
            user.city = city;
            // _user.title = title;
            if (area && area.length > 0) {
                user.area = area;
            }
            user.full_name = full_name;
            user.address = address;
            user.email = email;
            user.timezone = {
                code: timezone[0].tzCode,
                utc: timezone[0].utc,
            };
            user.country = country;
            user.gender = gender;
            user.dob = dob;
            if (division && division.length > 0) {
                user.division = division;
            }
            user.language = language;
            user.doctor.title = title;
            user.doctor.is_personal_profile_created = true;
            yield user.save();
            return res.json({ user: user });
        }
    }
    catch (err) {
        res.status(500).json({ messsage: err.message });
    }
});
exports.updatePersonalProfile = updatePersonalProfile;
const uploadProfilePic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        console.log("req=", req.files);
        //@ts-ignore
        let user = req.userID;
        let file = req.file;
        console.log("file=", file);
        if (file === undefined) {
            return res.status(422).json({ message: "profile pic requied" });
        }
        let _user = yield user_1.default.findOne({
            _id: user,
        }).select("-password");
        if (_user === null) {
            return res.status(401).json({ message: "invalid token user not found" });
        }
        else if (_user.userType != "doctor") {
            return res.status(401).json({
                message: "only doctor can access",
            });
        }
        else {
            _user.profile_pic = {
                url: file.location,
                name: file.filename,
            };
            yield _user.save();
            return res.json({ user: _user });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.uploadProfilePic = uploadProfilePic;
const updateAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = yield (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty() === false) {
        //@ts-ignore
        return res
            .status(422) //@ts-ignore
            .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
    }
    try {
        //@ts-ignore
        let _user = req.userID;
        let user = yield user_1.default.findOne({
            _id: _user,
        });
        if (user === null) {
            return res.status(401).json({ message: "invalid token user not found" });
        }
        else if (user.userType != "doctor") {
            return res.status(401).json({
                message: "only doctor can access",
            });
        }
        else {
            let { available_days, from_time, to_time } = req.body;
            // return res.json({ body: req.body });
            if (from_time === to_time) {
                return res
                    .status(422)
                    .json({ message: "to_time must be greater than from_time" });
            }
            var time1 = from_time.split(":");
            var time2 = to_time.split(":");
            // return res.json({ available_days, time2, time1 });
            let start_time = "12:00 am";
            let end_time = "11:59pm";
            let slotInterval = 30;
            //Format the time
            let startTime = (0, moment_1.default)(start_time, "hh:mm a");
            //Format the end time and the next day to it
            let endTime = (0, moment_1.default)(end_time, "hh:mm a").add(1, "days");
            //Times
            let allTimes = [];
            //Loop over the times - only pushes time with 30 minutes interval
            while (startTime <= endTime) {
                //Push times
                allTimes.push(startTime.format("hh:mm a"));
                //Add interval of 30 minutes
                startTime.add(slotInterval, "minutes");
            }
            console.log(allTimes);
            let slot_1_index, slot_2_index;
            yield allTimes.map((item, index) => {
                if (to_time.toLowerCase() === item) {
                    slot_2_index = index;
                }
                if (from_time.toLowerCase() === item) {
                    slot_1_index = index;
                }
            });
            //@ts-ignore
            if (slot_2_index > slot_1_index) {
                console.log("you can continue");
                //  return doctor;
                user.doctor.availability.available_days = available_days;
                //@ts-ignore
                user.doctor.availability.slots.from = allTimes[slot_1_index];
                //@ts-ignore
                user.doctor.availability.slots.to = allTimes[slot_2_index];
                user.doctor.is_availability_details_completed = true;
                yield user.save();
                console.log("doctor=", user.doctor);
                return res.json({ user });
            }
            else {
                return res
                    .status(422)
                    .json({ message: "to_time must be greater than from_time" });
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateAvailability = updateAvailability;
const save_doctor_information = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty() === false) {
            //@ts-ignore
            return res
                .status(422) //@ts-ignore
                .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
        }
        //@ts-ignore
        let userID = req.userID;
        let user = yield user_1.default.findById(userID).select("-password");
        if (user === null) {
            return res
                .status(401)
                .json({ message: "invalid token, user not found." });
        }
        if (user.userType != "doctor") {
            return res.status(401).json({ message: "only doctor can access it" });
        }
        let { email, title, isSkipedEmail } = req.body;
        console.log("user=", user._id, userID);
        console.log("doctor=", user.doctor);
        if (user.doctor === null) {
            return res
                .status(401)
                .json({ message: "doctor not found", id: userID, user: user._id });
        }
        //return res.json({doctor});
        user.doctor.title = title;
        yield user.save();
        user.email = isSkipedEmail === true ? "" : email;
        user.is_information_completed = true;
        yield user.save();
        console.log("user inforamtion completed=", user.is_information_completed);
        return res.json({ user: user });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.save_doctor_information = save_doctor_information;
const getDoctorAttributes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let userID = req.userID;
        let user = yield user_1.default.findById(userID).select("-password");
        if (user === null) {
            return res.status(401).json({ message: "invalid token, no user found" });
        }
        if (user.userType != "doctor") {
            return res.status(401).json({ message: "only doctors can access it" });
        }
        if (user.doctor === null) {
            return res
                .status(401)
                .json({ message: "only owner can access it,doctor not found" });
        }
        return res.json({ user });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getDoctorAttributes = getDoctorAttributes;
const gotAllDoctorsLocal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let userID = req.userID;
        console.log("userID=", userID);
        let user = yield user_1.default.findById(userID);
        if (user === null) {
            return res.status(401).json({ message: "invalid token, no user found" });
        }
        if (user.userType != "patient") {
            return res.status(401).json({ message: "only patient can access it" });
        }
        let users = yield user_1.default.find({
            userType: "doctor",
            is_profile_created: true,
            "timezone.code": {
                $eq: user.timezone.code,
            },
        }).select("-password");
        return res.json({ users: users });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.gotAllDoctorsLocal = gotAllDoctorsLocal;
const gotAllDoctorsForeign = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let userID = req.userID;
        console.log("userID=", userID);
        let user = yield user_1.default.findById(userID);
        if (user === null) {
            return res.status(401).json({ message: "invalid token, no user found" });
        }
        if (user.userType != "patient") {
            return res.status(401).json({ message: "only patient can access it" });
        }
        let users = yield user_1.default.find({
            userType: "doctor",
            is_profile_created: true,
            "timezone.code": {
                $ne: user.timezone.code,
            },
        }).select("-password ");
        return res.json({ users: users });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.gotAllDoctorsForeign = gotAllDoctorsForeign;
// export const like_doctor = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let errors = validationResult(req);
//     if (errors.isEmpty() === false) {
//       //@ts-ignore
//       return res
//         .status(422) //@ts-ignore
//         .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
//     }
//     //@ts-ignore
//     let userID = req.userID;
//     console.log("userID=", userID);
//     let user = await User.findById(userID);
//     if (user === null) {
//       return res.status(401).json({ message: "invalid token, no user found" });
//     }
//     if (user.userType != "patient") {
//       return res.status(401).json({ message: "only patient can access it" });
//     }
//     //@ts-ignore
//     let { doctor_id } = req.body;
//     let doctor = await Doctor.findById(doctor_id);
//     if (doctor === null) {
//       return res
//         .status(401)
//         .json({ message: "invalid doctor is, no doctor found" });
//     }
//     let is_liked = await Doctor.findOne({
//       likes: userID,
//     });
//     if (is_liked === null) {
//       await doctor.likes.push(userID);
//       await doctor.save();
//       return res.json({ doctor, liked: true });
//     } else {
//       return res.status(422).json({ message: "already liked doctor" });
//     }
//   } catch (err: any) {
//     return res.status(500).json({ message: err.message });
//   }
// };
// export const unlike_doctor = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let errors = validationResult(req);
//     if (errors.isEmpty() === false) {
//       return res.status(422).json({
//         //@ts-ignore
//         message: errors.errors[0].param + " " + errors.errors[0].msg,
//       });
//     }
//     //@ts-ignore
//     let userID = req.userID;
//     console.log("userID=", userID);
//     let user = await User.findById(userID);
//     if (user === null) {
//       return res.status(401).json({ message: "invalid token, no user found" });
//     }
//     if (user.userType != "patient") {
//       return res.status(401).json({ message: "only patient can access it" });
//     }
//     //@ts-ignore
//     let { doctor_id } = req.body;
//     let doctor = await Doctor.findById(doctor_id);
//     if (doctor === null) {
//       return res
//         .status(401)
//         .json({ message: "invalid doctor is, no doctor found" });
//     }
//     // let arr:Array<any>=doctor.likes;
//     // await arr.push(userID);
//     // doctor.likes=arr;
//     await doctor.save();
//     return res.json({ doctor });
//   } catch (err: any) {
//     return res.status(500).json({ message: err.message });
//   }
// };
const searchDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("query params=", req.query);
        let errors = yield (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty() === false) {
            //@ts-ignore
            return res.status(422).json({
                //@ts-ignore
                message: errors.errors[0].param + " " + errors.errors[0].msg,
            });
        }
        //@ts-ignore
        let userID = req.userID;
        let user = yield user_1.default.findById(userID);
        if (user === null) {
            return res.status(401).json({ message: "user not found invalid token" });
        }
        if (user.userType != "patient") {
            return res.status(401).json({ message: "only patients can access it" });
        }
        let { medical_speciality, medical_field, is_24_7, query_text, medical_category, } = req.query;
        let matchConditions = {
            userType: "doctor",
        };
        if (medical_speciality) {
            if (medical_speciality.length === 0) {
                return res
                    .status(422)
                    .json({ message: "medical speciality invalid value" });
            }
            let _medical_speciality = yield medical_specialities_1.default.findOne({
                speciality: medical_speciality,
            });
            if (_medical_speciality === null) {
                return res
                    .status(422)
                    .json({ message: "invalid medical speciality value" });
            }
            matchConditions["doctor.medical_speciality"] = medical_speciality;
        }
        if (medical_field) {
            if (medical_field.length === 0) {
                return res.status(422).json({ message: "medical field invalid value" });
            }
            matchConditions["doctor.medical_field"] = medical_field;
        }
        if (is_24_7) {
            if (is_24_7 != "true" && is_24_7 != "false") {
                return res.status(422).json({ message: "is_24_7 invalid value" });
            }
            matchConditions["doctor.is_24_7"] = is_24_7;
        }
        console.log("medical_category=", medical_category);
        if (medical_category) {
            if (medical_category.length === 0) {
                return res
                    .status(422)
                    .json({ message: "medical category invalid value" });
            }
            matchConditions["doctor.medical_category"] = medical_category;
        }
        let pipeline = [
            {
                $search: {
                    index: "UserSearchIndex",
                    text: {
                        //@ts-ignore
                        query: (query_text === null || query_text === void 0 ? void 0 : query_text.length) > 0 ? query_text : "",
                        path: {
                            wildcard: "*",
                        },
                        fuzzy: {},
                    },
                },
            },
        ];
        console.log("query_text 815 === ", query_text);
        console.log("818 conditions === ", matchConditions);
        let users;
        //@ts-ignore
        if ((query_text === null || query_text === void 0 ? void 0 : query_text.length) > 0) {
            users = yield user_1.default.aggregate(pipeline).match(matchConditions);
        }
        else {
            users = yield user_1.default.find(matchConditions);
        }
        console.log("825 users", users);
        return res.json({ users });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.searchDoctor = searchDoctor;

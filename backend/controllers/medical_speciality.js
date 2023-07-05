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
exports.addMedicalSpeciality = exports.getAllMedicalSpecialities = void 0;
const express_validator_1 = require("express-validator");
const medical_specialities_1 = __importDefault(require("@models/medical_specialities"));
const user_1 = __importDefault(require("@models/user"));
const getAllMedicalSpecialities = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let medical_specialities = yield medical_specialities_1.default.find();
        console.log("medical_specialities 123=", medical_specialities);
        return res.json({ medical_specialities });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getAllMedicalSpecialities = getAllMedicalSpecialities;
const addMedicalSpeciality = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty() === false) {
            return res
                .status(422) //@ts-ignore
                .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
        }
        //@ts-ignore
        let _user_id = req.userID;
        let user = yield user_1.default.findById(_user_id);
        if (user === null) {
            return res.status(401).json({ message: "invalid token, user not found" });
        }
        if (user.userType != "admin") {
            return res.status(401).json({ message: "only admins can access it" });
        }
        let { speciality } = req.body;
        let medical_speciality = yield medical_specialities_1.default.findOne({
            speciality: speciality,
        });
        if (medical_speciality != null) {
            return res.status(422).json({ message: "speciality already exists" });
        }
        medical_speciality = new medical_specialities_1.default();
        medical_speciality.speciality = speciality;
        yield medical_speciality.save();
        return res.json({ medical_speciality });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.addMedicalSpeciality = addMedicalSpeciality;

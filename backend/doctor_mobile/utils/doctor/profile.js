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
exports.professionalProfileUpdate = exports.getProfile = exports.updateUserAttributes = exports.updatePersonalProfile = exports.save_doctor_information = void 0;
const axios_1 = __importDefault(require("axios"));
const save_doctor_information = ({ title, email, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let res = yield axios_1.default
            .post(process.env.API_URL + 'doctor/save-information', {
            title: title,
            email: email,
        })
            .then((res) => {
            console.log('res doctor information utils=', res.data);
            return res.data;
        })
            .catch((err) => {
            return { error: true, message: err.message };
        });
        return { success: true, user: res.user, doctor: res.doctor };
    }
    catch (err) {
        return {
            error: true,
            message: err.response.data.message,
            err_code: err.response.status,
        };
    }
});
exports.save_doctor_information = save_doctor_information;
const updatePersonalProfile = ({ title, full_name, country, city, area, languageSpoken, gender, email, dob, address, timezone_code, timezone_utc, phone, division, }) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield axios_1.default
        .post(process.env.API_URL + 'doctor/update-personal-profile', {
        phone_number: phone,
        email: email,
        title: title,
        dob: dob,
        gender: gender,
        city: city,
        area: area,
        address: address,
        country: country,
        language: languageSpoken,
        division: division,
        timezone_code: timezone_code,
        timezone_utc: timezone_utc,
        full_name: full_name,
    })
        .then((res) => {
        console.log('axios res=', res);
        return res.data;
    })
        .catch((err) => {
        console.log('axios error=', err);
        return {
            error: true,
            err_code: err.response.status,
            message: err.response.data.message,
        };
    });
    return res;
});
exports.updatePersonalProfile = updatePersonalProfile;
const updateUserAttributes = ({}) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateUserAttributes = updateUserAttributes;
const getProfile = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getProfile = getProfile;
const professionalProfileUpdate = ({ degree, Institute, chamberOrHospitality, medicalCertificateNo, certificate, govIDNo, govIDFront, govIDBack, medicalField, medicalSpeciality, consultationFee, followUpFee, experience, isDoctor247, }) => __awaiter(void 0, void 0, void 0, function* () { });
exports.professionalProfileUpdate = professionalProfileUpdate;

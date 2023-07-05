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
exports.updateProfile = exports.getProfile = exports.update_Patient_Profile = void 0;
const axios_1 = __importDefault(require("axios"));
const update_Patient_Profile = ({ phone, gender, dob, email, height_ft, height_inches, weight, bloodGroup, isUnderDoctorCare, deseases, language, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let res = yield axios_1.default.post(process.env.API_URL + 'doctor/update-doctor-');
    }
    catch (err) {
        return { isError: true, message: err.message };
    }
});
exports.update_Patient_Profile = update_Patient_Profile;
const getProfile = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getProfile = getProfile;
const updateProfile = ({ id, bloodGroup, city, area, division, height_ft, height_inches, weight, languageSpoken, country, dob, name, }) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateProfile = updateProfile;

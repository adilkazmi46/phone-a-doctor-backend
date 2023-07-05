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
exports.getDoctorAttributes = exports.getAllDoctors = exports.uploadProfilePic = void 0;
const axios_1 = __importDefault(require("axios"));
const uploadProfilePic = ({ img, profileID, }) => __awaiter(void 0, void 0, void 0, function* () { });
exports.uploadProfilePic = uploadProfilePic;
const getAllDoctors = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAllDoctors = getAllDoctors;
const getDoctorAttributes = () => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield axios_1.default
        .get(process.env.API_URL + 'doctor/get-doctor-attributes')
        .then((res) => {
        return res.data.doctor;
    })
        .catch((err) => {
        console.log('error=', err.response.data);
        return { error: true, message: err.response.data };
    });
    return res;
});
exports.getDoctorAttributes = getDoctorAttributes;

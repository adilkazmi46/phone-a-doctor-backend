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
exports.getMedicalSpecialities = void 0;
const axios_1 = __importDefault(require("axios"));
const getMedicalSpecialities = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('utils method');
    console.log(process.env.API_URL + 'utils/get-medical-specialities');
    let res = yield axios_1.default
        .get(process.env.API_URL + 'utils/get-medical-specialities')
        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
        let tmp = res.data.medical_specialities;
        let arr = [];
        yield tmp.map((item, index) => {
            arr.push({ label: item.speciality, value: item.speciality });
        });
        return arr;
    }))
        .catch((err) => {
        return {
            error: true,
            message: err.response.data.message,
            err_code: err.response.status,
        };
    });
    return res;
});
exports.getMedicalSpecialities = getMedicalSpecialities;

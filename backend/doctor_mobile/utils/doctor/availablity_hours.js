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
exports.setAvailabilityHours = exports.getTimeSlotList = void 0;
const axios_1 = __importDefault(require("axios"));
const getTimeSlotList = () => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield axios_1.default
        .get(process.env.API_URL + 'utils/get-time-slots')
        .then((res) => {
        return res.data.time_slots;
    })
        .catch((err) => {
        console.log('error_status=', err.response.status);
        console.log('error_message=', err.response.message);
    });
    return res;
});
exports.getTimeSlotList = getTimeSlotList;
const setAvailabilityHours = ({ available_days, from_time, to_time, }) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield axios_1.default
        .post(process.env.API_URL + 'doctor/update-availablity-slots', {
        available_days: available_days,
        from_time: from_time,
        to_time: to_time,
    })
        .then((res) => {
        console.log('response availability data=', res.data);
        return res.data;
    })
        .catch((err) => {
        console.log(err.response.data);
        return {
            error: true,
            message: err.response.data.message,
            err_code: err.response.status,
        };
    });
    return res;
});
exports.setAvailabilityHours = setAvailabilityHours;

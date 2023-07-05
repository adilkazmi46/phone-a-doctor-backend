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
exports.getMedicalSpecialities = exports.getTimeSlotsList = exports.getAllTimeSlots = exports.save_diseases = void 0;
const diseases_1 = __importDefault(require("@models/diseases"));
const moment_1 = __importDefault(require("moment"));
const save_diseases = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { disease } = req.body;
        let _disease = yield diseases_1.default.findOne({
            disease: disease,
        });
        if (_disease != null) {
            return res
                .status(422)
                .json({ message: "disease or condition already exists" });
        }
        _disease = new diseases_1.default({
            disease: disease,
        });
        yield _disease.save();
        res.json({ _disease });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.save_diseases = save_diseases;
const getAllTimeSlots = () => __awaiter(void 0, void 0, void 0, function* () {
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
    return allTimes;
});
exports.getAllTimeSlots = getAllTimeSlots;
const getTimeSlotsList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let time_slots = yield (0, exports.getAllTimeSlots)();
        return res.json({ time_slots });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getTimeSlotsList = getTimeSlotsList;
const getMedicalSpecialities = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getMedicalSpecialities = getMedicalSpecialities;

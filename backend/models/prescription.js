"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const prescriptionSchema = new Schema({
    appointment_id: {
        type: String,
    },
    dose_duration: {
        type: String,
        enum: ["once", "days", "weeks", "months", "continue", "not required"],
    },
    dose_frequency: {
        type: String,
    },
    instruction: {
        type: String,
    },
    advice: {
        type: String,
    },
    nned_follow_up_consultation: {
        type: Boolean,
    },
    medicine: {
        _id: {
            type: String,
        },
        brand_name: {
            type: String,
        },
    },
});
const Prescription = mongoose_1.default.model("prescription", prescriptionSchema);
exports.default = Prescription;

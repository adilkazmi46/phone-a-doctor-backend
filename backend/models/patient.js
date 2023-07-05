"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const patientSchema = new Schema({
    name: {
        type: String,
    },
    user_id: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
    },
    height: {
        ft: {
            type: Number,
        },
        inches: {
            type: Number,
        },
    },
    dob: {
        type: String,
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    is_under_doctor_care: {
        type: Boolean,
    },
    diseases_or_conditions: {
        type: Array,
    },
});
const Patient = mongoose_1.default.model("patient", patientSchema);
exports.default = Patient;

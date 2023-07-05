"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const otpSchema = new Schema({
    otp: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    isExpired: {
        type: Boolean,
        required: true
    }
});
const OTP = mongoose_1.default.model("otp", otpSchema);
exports.default = OTP;

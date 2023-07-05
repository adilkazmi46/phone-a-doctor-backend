"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BloodGroupSchema = new Schema({
    blood_group: {
        type: String,
        required: true,
    }
});
const BloodGroup = mongoose_1.default.model("bloodgroup", BloodGroupSchema);
exports.default = BloodGroup;

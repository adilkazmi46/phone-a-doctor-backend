"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const dygnosisSchema = new Schema({
    dygnosis: {
        type: String,
        required: true,
    },
});
const Dygnosis = mongoose_1.default.model("Dygnosis", dygnosisSchema);
exports.default = Dygnosis;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const medicineSchema = new Schema({
    user_id: {
        type: mongoose_1.default.Types.ObjectId,
    },
    generic_name: {
        type: String,
        required: true,
    },
    brand_name: {
        type: String,
        required: true,
    },
    medicineType: {
        type: String,
        enum: [
            "liquid",
            "tablet",
            "capsule",
            "drops",
            "inhaler",
            "injection",
            "patches",
            "implants",
            "suppositories",
            "topical",
        ],
    },
});
const Medicine = mongoose_1.default.model("medicine", medicineSchema);
exports.default = Medicine;

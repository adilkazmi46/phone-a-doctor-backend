"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const diseasesSchema = new Schema({
    disease: {
        type: String,
        required: true,
    },
});
const Diseases = mongoose_1.default.model("Diseases", diseasesSchema);
exports.default = Diseases;
